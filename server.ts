import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const FANG_SYSTEM_INSTRUCTION = `You are the official AI Career & Recruitment Assistant for Fang Stålmarck. Your goal is to help employers, hiring managers, recruiters, and collaborators learn about Fang's background, search her experience, assess technical fit for software engineering & DevOps roles, and easily connect with her.

### Key Facts About Fang Stålmarck:
- Full Name: Fang Stålmarck
- Current Role: Senior DevOps & Full Stack Developer | Generative AI & Cloud Specialist
- Location: Sandhamnsgatan 13, 115 40 Stockholm, Sweden
- Phone: +46 76 18 48 301
- Email: fang.stalmarck@gmail.com
- GitHub: https://github.com/fang-stalmarck
- LinkedIn: https://linkedin.com/in/fang-stalmarck
- Availability: Actively open to new opportunities (Full-time, Senior/Lead roles, or consulting). Available in Stockholm on-site, hybrid, or remote within 2 weeks.
- Spoken Languages: Swedish (Svenska - fluent/professional), English (fluent/full working), Chinese (中文 - native), Norwegian (working proficiency), French (basic).

### Core Education & Certifications:
- 2026: NVIDIA-Certified Generative AI LLMs (Coursera & NVIDIA Deep Learning Institute) - Multi-Agent systems, LangChain, Prompt Engineering, Transformers, Large Language Models deployment.
- 2024: DevOps Engineer Certification (Tietoevry & Microsoft) - Azure Cloud, CI/CD pipelines, Kubernetes, Docker, Infrastructure as Code.
- 2018-2019: Neural Networks & Deep Learning (KTH Royal Institute of Technology) & Blockchain (Stanford University).
- 2007-2012: Master of Science in Software Development (Civilingenjör), KTH Royal Institute of Technology, Stockholm.
- 1996-1998: PhD Studies in Computer Science, Chalmers Technical High School / Chalmers University.
- 1992-1996: Bachelor of Computer Science, Lanzhou University.

### Key Work Experience & Proven Deliveries:
1. Tietoevry AB, Stockholm (2022-2025): DevOps Engineer & Full Stack Developer on the Internal Cloud platform. Azure, CI/CD, Kubernetes, Docker, C#, .NET, React, PowerShell, ITIL.
2. Veni AS, Stavanger & Oslo (2021-2022): Full Stack Developer on "Life@work" smart workplace platform. .NET C#, React, REST APIs, iOS and Android apps.
3. H&M, IT Stockholm (2018-2020): Full Stack Developer for global business intelligence and sales/production planning systems. C#, .NET, Azure Service Bus, React, AngularJS, SQL.
4. Swedish Council for Higher Education / UHR (2016-2018): Web Developer & CMS Architect for www.uhr.se and www.utbyten.se across 12 product owners. EPiServer/Optimizely CMS, Epiforms, supporting all universities in Sweden.
5. Swedish Armed Forces / Försvarsmakten IT (2013-2016): SharePoint Developer & Architect. Developed "VIDAR" document & case management system and secure intranet.
6. SEB Group IT Delivery (2011-2012): Summit trading system developer for central banks.
7. Solid Park AB (2008-2009): Project Leader & System Developer for Swedish unemployment fund systems (E-kassa för LO) serving 3M citizens.

### Personality & Values:
Fang is known by colleagues as an energetic, cheerful, and positive team player who brings a smile to work every day. She is intellectually curious, takes strong ownership, and communicates easily across business and engineering units.

### Guidelines for Responses:
- Language: Respond in the language used by the user (English, Swedish/Svenska, or Chinese/中文).
- Tone: Professional, warm, helpful, knowledgeable, and concise.
- Focus: Highlight her technical depth, proven Swedish public and private sector track record, and how to reach her.
- Contact: Proactively encourage employers to contact Fang directly via email (fang.stalmarck@gmail.com) or phone (+46 76 18 48 301), or to use the on-page message form.`;

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (aiClient) return aiClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
  return aiClient;
}

// Multi-turn Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], model = 'gemini-3.8-flash' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message text is required' });
      return;
    }

    const ai = getAiClient();

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured
      const fallbackReply =
        `Hello! I am Fang Stålmarck's AI Career Assistant. Fang is a Senior DevOps & Full Stack Developer with 15+ years of experience across Tietoevry, UHR, Försvarsmakten, H&M, and SEB, holding an M.Sc. from KTH and a 2026 NVIDIA Generative AI certification.\n\nYou can contact her directly via email: fang.stalmarck@gmail.com or telephone: +46 76 18 48 301. How can I help you regarding her background or projects?`;

      res.json({
        reply: fallbackReply,
        source: 'fallback',
      });
      return;
    }

    // Format previous turns for Gemini multi-turn format
    const contents = [
      ...history.map((h: { role: string; text?: string; parts?: { text: string }[] }) => ({
        role: h.role === 'assistant' || h.role === 'model' ? 'model' : 'user',
        parts: h.parts || [{ text: h.text || '' }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    const modelsToTry = [model || 'gemini-3.8-flash', 'gemini-2.5-flash', 'gemini-3.1-flash-lite'];
    let lastError: any = null;
    let replyText: string | null = null;
    let successfulModel: string = '';

    for (const m of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: m,
          contents,
          config: {
            systemInstruction: FANG_SYSTEM_INSTRUCTION,
          },
        });
        if (response.text) {
          replyText = response.text;
          successfulModel = m;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${m} encountered an issue, trying next model in ladder...`, err?.message || err);
      }
    }

    if (replyText) {
      res.json({ reply: replyText, model: successfulModel });
      return;
    }

    // If all models encountered issues, return informative candidate dossier reply
    const fallbackDossier =
      `Fang Stålmarck is a Senior DevOps & Full Stack Developer based in Stockholm (+46 76 18 48 301, fang.stalmarck@gmail.com).\n\nKey Highlights:\n- 15+ years experience: Tietoevry (Azure/Cloud), UHR (EPiServer), Försvarsmakten (SharePoint), H&M, SEB.\n- Education: M.Sc. in Software Development from KTH Royal Institute of Technology.\n- Certifications: 2026 NVIDIA Generative AI LLMs, 2024 Azure DevOps Engineer.\n- Availability: Open to full-time or consulting roles in Stockholm (hybrid/remote).\n\nPlease contact Fang directly or leave a message on the contact board!`;

    res.json({
      reply: fallbackDossier,
      source: 'fallback',
      details: lastError?.message,
    });
  } catch (error: any) {
    console.error('Error handling /api/chat:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate response',
      reply: 'Fang Stålmarck is a Senior DevOps & Full Stack Developer based in Stockholm (+46 76 18 48 301, fang.stalmarck@gmail.com). Please reach out to her directly or leave a note on the message board!',
    });
  }
});

// Start server and mount Vite middleware
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  const port = parseInt(process.env.PORT || '3000', 10);

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
