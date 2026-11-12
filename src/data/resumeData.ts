import { CandidateProfile, WorkExperience, ProjectItem, SkillCategory, RecruiterMessage } from '../types/resume';

export const initialProfile: CandidateProfile = {
  name: 'Fang Stålmarck',
  enName: 'Fang Stålmarck',
  svName: 'Fang Stålmarck',
  title: '资深 DevOps & 全栈研发工程师 | 大模型与生成式 AI 专家',
  enTitle: 'Senior DevOps & Full Stack Developer | Generative AI Specialist',
  svTitle: 'Senior DevOps- & Fullstackutvecklare | Specialist inom Generativ AI',
  tagline: '15+ years of engineering excellence in Azure Cloud, enterprise Microsoft ecosystems, full-stack architectures, and NVIDIA-certified Generative AI LLM platforms.',
  enTagline: '15+ years of engineering excellence in Azure Cloud, enterprise Microsoft ecosystems, full-stack architectures, and NVIDIA-certified Generative AI LLM platforms.',
  svTagline: '15+ års erfarenhet inom Azure Cloud, Microsoft-ekosystem, fullstack-arkitekturer och NVIDIA-certifierad Generativ AI och LLM.',
  bio: 'Based in Stockholm, Sweden, holding an M.Sc. in Software Development from KTH Royal Institute of Technology. Extensive experience delivering high-impact systems for prominent Swedish institutions: Tietoevry, Swedish Council for Higher Education (UHR), Swedish Armed Forces (Försvarsmakten), H&M, SEB, Sveaskog, and Veni AS. Energic team player fluent in Swedish, English, and Chinese.',
  enBio: 'Based in Stockholm, Sweden, holding an M.Sc. in Software Development from KTH Royal Institute of Technology. Extensive experience delivering high-impact systems for prominent Swedish institutions: Tietoevry, Swedish Council for Higher Education (UHR), Swedish Armed Forces (Försvarsmakten), H&M, SEB, Sveaskog, and Veni AS. Energic team player fluent in Swedish, English, and Chinese.',
  svBio: 'Fang är en energisk kollega som sprider glädje i teamet. Fullstackutvecklare och DevOps-ingenjör med inriktning mot Microsoftsystemutvecklingsmiljöer, Azure Cloud och moderna webbramverk. Masterexamen från KTH (Kungliga Tekniska högskolan) samt NVIDIA-certifiering inom Generativ AI (2026). Omfattande erfarenhet från Tietoevry, UHR, Försvarsmakten, H&M, SEB, Sveaskog och Veni AS.',
  avatarUrl: '/src/assets/images/fang_stalmarck_real.png',
  email: 'fang.stalmarck@gmail.com',
  phone: '+4676-1848301',
  wechat: 'fang_stalmarck',
  github: 'https://github.com/fang-stalmarck',
  linkedin: 'https://linkedin.com/in/fang-stalmarck',
  location: 'Sandhamnsgatan 13, 115 40 Stockholm, Sweden',
  enLocation: 'Sandhamnsgatan 13, 115 40 Stockholm, Sweden',
  svLocation: 'Sandhamnsgatan 13, 115 40 Stockholm, Sverige',
  yearsExperience: 15,
  jobStatus: 'Actively Open to Opportunities · Stockholm & Remote',
  enJobStatus: 'Actively Open to Opportunities · Stockholm & Remote',
  svJobStatus: 'Aktivt tillgänglig för nya uppdrag · Stockholm & Remote',
  targetRoles: ['Senior DevOps-ingenjör', 'Fullstackutvecklare', 'Cloud & AI Solutions Architect', 'Tech Lead'],
  enTargetRoles: ['Senior DevOps Engineer', 'Full Stack Developer', 'Cloud & AI Solutions Architect', 'Tech Lead'],
  svTargetRoles: ['Senior DevOps-ingenjör', 'Fullstackutvecklare', 'Cloud & AI Solutions Architect', 'Tech Lead'],
  education: [
    {
      degree: 'NVIDIA-Certified Generative AI LLMs',
      enDegree: 'NVIDIA-Certified Generative AI LLMs',
      svDegree: 'NVIDIA-certifierad inom Generativ AI & LLM',
      institution: 'Coursera & NVIDIA Deep Learning Institute',
      enInstitution: 'Coursera & NVIDIA Deep Learning Institute',
      svInstitution: 'Coursera & NVIDIA Deep Learning Institute',
      period: '2026',
      major: 'Generative AI, Large Language Models, Multi-Agent Systems, LangChain',
      enMajor: 'Generative AI, Large Language Models, Multi-Agent Systems, LangChain',
      svMajor: 'Generativ AI, Stora språkmodeller, Agent AI, LangChain',
      honors: 'Professional Certification',
      enHonors: 'Professional Certification',
      svHonors: 'Professionell certifiering'
    },
    {
      degree: 'DevOps Engineer Certification',
      enDegree: 'DevOps Engineer Certification',
      svDegree: 'DevOps-ingenjörscertifiering',
      institution: 'Tietoevry & Microsoft',
      enInstitution: 'Tietoevry & Microsoft',
      svInstitution: 'Tietoevry & Microsoft',
      period: '2024',
      major: 'Azure Cloud, CI/CD, Kubernetes, Infrastructure as Code',
      enMajor: 'Azure Cloud, CI/CD, Kubernetes, Infrastructure as Code',
      svMajor: 'Azure Cloud, CI/CD, Kubernetes, Infrastruktur som kod',
      honors: 'Enterprise Certified',
      enHonors: 'Enterprise Certified',
      svHonors: 'Företagscertifierad'
    },
    {
      degree: 'Master of Science in Software Development',
      enDegree: 'Master of Science in Software Development',
      svDegree: 'Civilingenjör / Masterprogram i mjukvaruutveckling',
      institution: 'KTH Royal Institute of Technology (Stockholm)',
      enInstitution: 'KTH Royal Institute of Technology (Stockholm)',
      svInstitution: 'Kungliga Tekniska högskolan (KTH), Stockholm',
      period: '2007 - 2012',
      major: 'Software Development & Distributed Systems',
      enMajor: 'Software Development & Distributed Systems',
      svMajor: 'Mjukvaruutveckling och distribuerade system',
      honors: 'M.Sc. Degree',
      enHonors: 'M.Sc. Degree',
      svHonors: 'Masterexamen (M.Sc.)'
    },
    {
      degree: 'Neural Networks & Deep Learning',
      enDegree: 'Neural Networks & Deep Learning',
      svDegree: 'Neuronnät & Deep Learning',
      institution: 'KTH & Stanford University',
      enInstitution: 'KTH & Stanford University',
      svInstitution: 'KTH & Stanford University',
      period: '2018 - 2019',
      major: 'Deep Learning (KTH) & Blockchain Technologies (Stanford)',
      enMajor: 'Deep Learning (KTH) & Blockchain Technologies (Stanford)',
      svMajor: 'Djupinlärning (KTH) & Blockkedjeteknik (Stanford)'
    },
    {
      degree: 'PhD Studies in Computer Science',
      enDegree: 'PhD Studies in Computer Science',
      svDegree: 'Doktorandstudier i datavetenskap',
      institution: 'Chalmers University / Chalmers Tekniska Högskola',
      enInstitution: 'Chalmers University / Chalmers Tekniska Högskola',
      svInstitution: 'Chalmers Tekniska Högskola',
      period: '1996 - 1998',
      major: 'Computer Science Graduate Research',
      enMajor: 'Computer Science Graduate Research',
      svMajor: 'Datavetenskaplig forskning'
    },
    {
      degree: 'Bachelor of Computer Science',
      enDegree: 'Bachelor of Computer Science',
      svDegree: 'Kandidatexamen i datalogi (Bachelor)',
      institution: 'Lanzhou University',
      enInstitution: 'Lanzhou University',
      svInstitution: 'Lanzhou Universitet',
      period: '1992 - 1996',
      major: 'Computer Science & Software Foundations',
      enMajor: 'Computer Science & Software Foundations',
      svMajor: 'Datalogi och programvarukonstruktion'
    }
  ],
  metrics: [
    {
      label: 'Years of Experience',
      enLabel: 'Years of Experience',
      svLabel: 'Års yrkeserfarenhet',
      value: '15+',
      subtext: 'Swedish Enterprise & Public Sector',
      enSubtext: 'Swedish Enterprise & Public Sector',
      svSubtext: 'Svensk industri och offentlig sektor'
    },
    {
      label: 'Core Client Deliveries',
      enLabel: 'Core Client Deliveries',
      svLabel: 'Stora kunduppdrag',
      value: '12+',
      subtext: 'Tietoevry, UHR, SEB, H&M, Sveaskog',
      enSubtext: 'Tietoevry, UHR, SEB, H&M, Sveaskog',
      svSubtext: 'Tietoevry, UHR, SEB, H&M, Sveaskog'
    },
    {
      label: 'System User Reach',
      enLabel: 'System User Reach',
      svLabel: 'Slutanvändare nådda',
      value: '3M+',
      subtext: 'Unemployment & National University Portals',
      enSubtext: 'Unemployment & National University Portals',
      svSubtext: 'A-kassesystem & nationella universitetsportaler'
    },
    {
      label: 'Languages Spoken',
      enLabel: 'Languages Spoken',
      svLabel: 'Språk',
      value: '5',
      subtext: 'Swedish, English, Chinese, Norwegian, French',
      enSubtext: 'Swedish, English, Chinese, Norwegian, French',
      svSubtext: 'Svenska, Engelska, Kinesiska, Norska, Franska'
    }
  ]
};

export const initialSkills: SkillCategory[] = [
  {
    category: 'Cloud, DevOps & Infrastructure',
    enCategory: 'Cloud, DevOps & Infrastructure',
    svCategory: 'Moln, DevOps & Infrastruktur',
    items: [
      { name: 'Azure Cloud & Intern Cloud', level: 95, experience: 'Production Lead', enExperience: 'Production Lead', svExperience: 'Produktionserfarenhet', featured: true },
      { name: 'CI/CD Pipelines & Git', level: 94, experience: 'Extensive Expertise', enExperience: 'Extensive Expertise', svExperience: 'Omfattande expertis', featured: true },
      { name: 'Docker & Kubernetes', level: 90, experience: 'Container Orchestration', enExperience: 'Container Orchestration', svExperience: 'Containerorkestrering', featured: true },
      { name: 'PowerShell, Bash & Linux/Unix (Solaris)', level: 92, experience: 'Automation Scripting', enExperience: 'Automation Scripting', svExperience: 'Automatiseringsskript' },
      { name: 'ITIL-certifiering', level: 88, experience: 'Service Governance', enExperience: 'Service Governance', svExperience: 'Tjänstestyrning' }
    ]
  },
  {
    category: 'Full Stack & Enterprise Web Development',
    enCategory: 'Full Stack & Enterprise Web Development',
    svCategory: 'Fullstack & Webbplattformar',
    items: [
      { name: 'React, Angular & TypeScript', level: 94, experience: 'Modern Frontend', enExperience: 'Modern Frontend', svExperience: 'Modern frontendutveckling', featured: true },
      { name: 'C# .NET & Node.js', level: 93, experience: 'Backend & APIs', enExperience: 'Backend & APIs', svExperience: 'Backend & API-utveckling', featured: true },
      { name: 'SQL, MS SQL & T-SQL Database', level: 92, experience: 'Data Architecture', enExperience: 'Data Architecture', svExperience: 'Databasarkitektur & prestanda' },
      { name: 'EPiServer CMS & EPiServer Commerce', level: 90, experience: 'Certified Enterprise CMS', enExperience: 'Certified Enterprise CMS', svExperience: 'Certifierad EPiServer-utveckling', featured: true },
      { name: 'SharePoint Architecture & Development', level: 90, experience: 'Enterprise Portals', enExperience: 'Enterprise Portals', svExperience: 'Verksamhetskritiska intranät' },
      { name: 'Mobile App Development (iOS & Android)', level: 84, experience: 'Cross-Platform', enExperience: 'Cross-Platform', svExperience: 'Apputveckling' }
    ]
  },
  {
    category: 'Artificial Intelligence & Emerging Tech',
    enCategory: 'Artificial Intelligence & Emerging Tech',
    svCategory: 'Artificiell intelligens & Generativ AI',
    items: [
      { name: 'Generativ AI & LLM (NVIDIA-certifierad 2026)', level: 92, experience: 'Certified Specialist', enExperience: 'Certified Specialist', svExperience: 'Certifierad specialist', featured: true },
      { name: 'Autonoma Agenter & LangChain', level: 90, experience: 'Agent Workflows', enExperience: 'Agent Workflows', svExperience: 'Multi-agent arbetsflöden', featured: true },
      { name: 'Maskininlärning & Neuronnät (KTH)', level: 86, experience: 'Deep Learning', enExperience: 'Deep Learning', svExperience: 'Djupinlärning' },
      { name: 'Python & MATLAB Data Analysis', level: 88, experience: 'Algorithms & Modeling', enExperience: 'Algorithms & Modeling', svExperience: 'Algoritmik & beräkningar' }
    ]
  }
];

export const initialExperiences: WorkExperience[] = [
  {
    id: 'exp-1',
    company: 'Tietoevry AB, Stockholm, Sweden',
    enCompany: 'Tietoevry AB, Stockholm, Sweden',
    svCompany: 'Tietoevry AB, Stockholm, Sverige',
    role: 'DevOps-ingenjör & Fullstackutvecklare',
    enRole: 'DevOps Engineer & Full Stack Developer',
    svRole: 'DevOps-ingenjör & Fullstackutvecklare',
    period: '2022 - 2025',
    location: 'Stockholm, Sweden',
    enLocation: 'Stockholm, Sweden',
    svLocation: 'Stockholm, Sverige',
    summary: 'Lead engineering for Tietoevry Internal Cloud and enterprise DevOps infrastructure initiatives, driving automation, CI/CD pipelines, and cloud migrations.',
    enSummary: 'Lead engineering for Tietoevry Internal Cloud and enterprise DevOps infrastructure initiatives, driving automation, CI/CD pipelines, and cloud migrations.',
    svSummary: 'Tekniskt ledande inom Tietoevrys interna molnplattform och DevOps-infrastrukturprojekt. Ansvar för automatisering, CI/CD-pipelines, Azure Cloud och driftstabilitet.',
    achievements: [
      'Architected Internal Cloud infrastructure and automated deployment pipelines supporting hybrid cloud workloads',
      'Implemented robust CI/CD workflows, automated testing gates, and Azure Cloud infrastructure integration',
      'Collaborated across cross-functional enterprise teams adhering to ITIL governance and DevOps best practices'
    ],
    enAchievements: [
      'Architected Internal Cloud infrastructure and automated deployment pipelines supporting hybrid cloud workloads',
      'Implemented robust CI/CD workflows, automated testing gates, and Azure Cloud infrastructure integration',
      'Collaborated across cross-functional enterprise teams adhering to ITIL governance and DevOps best practices'
    ],
    svAchievements: [
      'Arkitekterade internt moln och automatiserade distributionspipelines för hybridmoln',
      'Etablerade stabila CI/CD-flöden, automatiserade kvalitetstester och integration mot Azure Cloud',
      'Arbetade nära agila team i enlighet med ITIL-ramverket och bästa DevOps-praxis'
    ],
    techStack: ['Azure Cloud', 'DevOps', 'CI/CD', 'Kubernetes', 'Docker', 'C#', '.NET', 'React', 'PowerShell']
  },
  {
    id: 'exp-2',
    company: 'Veni AS, Stavanger & Oslo, Norway',
    enCompany: 'Veni AS, Stavanger & Oslo, Norway',
    svCompany: 'Veni AS, Stavanger & Oslo, Norge',
    role: 'Fullstack- & Apputvecklare',
    enRole: 'Full Stack & Mobile Developer',
    svRole: 'Fullstack- & Apputvecklare',
    period: '2021 - 2022',
    location: 'Stavanger / Oslo, Norway (Hybrid/Remote)',
    enLocation: 'Stavanger / Oslo, Norway (Hybrid/Remote)',
    svLocation: 'Stavanger / Oslo, Norge (Hybrid/Remote)',
    summary: 'Engineered the "Life@work" connected workplace application ecosystem spanning backend web services, React web dashboard, and mobile companion apps.',
    enSummary: 'Engineered the "Life@work" connected workplace application ecosystem spanning backend web services, React web dashboard, and mobile companion apps.',
    svSummary: 'Produktutveckling för det smarta kontorssystemet "Life@work" med rumsbokning, matmeny och ärendehantering. .NET C#, React, REST API samt iOS- och Android-appar.',
    achievements: [
      'Developed core RESTful APIs and backend services using .NET C# for smart workspace reservations',
      'Built responsive web interfaces with React and developed native iOS and Android application integrations',
      'Optimized real-time API communication and user session lifecycle management'
    ],
    enAchievements: [
      'Developed core RESTful APIs and backend services using .NET C# for smart workspace reservations',
      'Built responsive web interfaces with React and developed native iOS and Android application integrations',
      'Optimized real-time API communication and user session lifecycle management'
    ],
    svAchievements: [
      'Utvecklade REST-API:er och backendtjänster i .NET C# för realtidsbokning av mötesrum och kontorsresurser',
      'Byggde responsiva webbgränssnitt i React och implementerade appintegrationer för iOS och Android',
      'Optimerade API-svarstider och sessionshantering för tusentals dagliga användare'
    ],
    techStack: ['.NET C#', 'React', 'REST API', 'iOS', 'Android', 'SQL', 'Azure']
  },
  {
    id: 'exp-3',
    company: 'H & M, IT Stockholm',
    enCompany: 'H & M, IT Stockholm',
    svCompany: 'H & M, IT Stockholm',
    role: 'Fullstackutvecklare',
    enRole: 'Full Stack Developer',
    svRole: 'Fullstackutvecklare',
    period: '2018 - 2020',
    location: 'Stockholm, Sweden',
    enLocation: 'Stockholm, Sweden',
    svLocation: 'Stockholm, Sverige',
    summary: 'Developed Business Intelligence and production planning systems for global retail supply chain operations.',
    enSummary: 'Developed Business Intelligence and production planning systems for global retail supply chain operations.',
    svSummary: 'Ansvarade i ett mindre utvecklingsteam för vidareutveckling av sälj- och inköpsplaneringsverktyg med komplexa beräkningar mot interna API:er.',
    achievements: [
      'Engineered scalable data interfaces for production planning and inventory intelligence dashboards',
      'Streamlined business reporting pipelines, reducing planning query latency for international merchandising teams'
    ],
    enAchievements: [
      'Engineered scalable data interfaces for production planning and inventory intelligence dashboards',
      'Streamlined business reporting pipelines, reducing planning query latency for international merchandising teams'
    ],
    svAchievements: [
      'Utvecklade datagränssnitt för sälj- och inköpsanalyser som sparar betydande resurser för H&Ms marknader',
      'Integrerade beräkningsmodeller mot H&Ms interna affärssystem via API:er, Service Bus och Azure'
    ],
    techStack: ['C#', '.NET', 'ASP.NET', 'WebAPI', 'Servicebus', 'Azure', 'SignalR', 'React', 'AngularJS', 'SQL']
  },
  {
    id: 'exp-4',
    company: 'Universitets- och högskolerådet (UHR)',
    enCompany: 'Swedish Council for Higher Education (UHR)',
    svCompany: 'Universitets- och högskolerådet (UHR)',
    role: 'Webbutvecklare (EPiServer CMS)',
    enRole: 'Web Developer (EPiServer CMS)',
    svRole: 'Webbutvecklare (EPiServer CMS)',
    period: '2016 - 2018',
    location: 'Stockholm, Sweden',
    enLocation: 'Stockholm, Sweden',
    svLocation: 'Stockholm, Sverige',
    summary: 'Developed, maintained and upgraded nationwide portals www.uhr.se and www.utbyten.se across 12 distinct product owners, providing web infrastructure for all universities in Sweden.',
    enSummary: 'Developed, maintained and upgraded nationwide portals www.uhr.se and www.utbyten.se across 12 distinct product owners, providing web infrastructure for all universities in Sweden.',
    svSummary: 'Utvecklade och underhöll 12 olika webbplatser (bl.a. www.uhr.se och www.utbyten.se) för 12 produktägare. Stöd för särskilt pedagogiskt stöd, EPiServer CMS och Epiforms.',
    achievements: [
      'Managed 12 integrated web portals with respective product owners using EPiServer CMS and custom Epiforms modules',
      'Conducted weekly demonstrations, training sessions and technical documentation for client stakeholders',
      'Configured staging environments (test.uhr.se) ensuring zero downtime during university application cycles'
    ],
    enAchievements: [
      'Managed 12 integrated web portals with respective product owners using EPiServer CMS and custom Epiforms modules',
      'Conducted weekly demonstrations, training sessions and technical documentation for client stakeholders',
      'Configured staging environments (test.uhr.se) ensuring zero downtime during university application cycles'
    ],
    svAchievements: [
      'Vidareutvecklade och förvaltade 12 webbplatser med EPiServer CMS, EPi-forms och anpassade arbetsflöden',
      'Genomförde veckovisa leveransdemonstrationer och utbildningar för produktägare och universitetspersonal',
      'Upprätthöll test- och produktionsmiljöer (test.uhr.se) med 100% tillgänglighet under ansökningsperioder'
    ],
    techStack: ['EPiServer CMS', 'C# .NET', 'MVC', 'Entity Framework', 'JavaScript', 'SQL Server', 'TFS']
  },
  {
    id: 'exp-5',
    company: 'Försvarsmakten (IT-avdelningen)',
    enCompany: 'Swedish Armed Forces (Försvarsmakten IT)',
    svCompany: 'Försvarsmakten (IT-avdelningen)',
    role: 'SharePoint-utvecklare & Systemarkitekt',
    enRole: 'SharePoint Developer & Architect',
    svRole: 'SharePoint-utvecklare & Systemarkitekt',
    period: '2013 - 2016',
    location: 'Stockholm, Sweden',
    enLocation: 'Stockholm, Sweden',
    svLocation: 'Stockholm, Sverige',
    summary: 'Developed and tested secure enterprise systems on SharePoint platforms for the Swedish military defense sector.',
    enSummary: 'Developed and tested secure enterprise systems on SharePoint platforms for the Swedish military defense sector.',
    svSummary: 'Nyutvecklade och förvaltade "VIDAR" – Försvarsmaktens dokument- och ärendehanteringssystem på SharePoint samt intranät och interna säkra system.',
    achievements: [
      'Designed mission-critical SharePoint collaboration workflows with strict security requirements',
      'Provided training materials, architectural guidance, and technical workshops to product owners'
    ],
    enAchievements: [
      'Designed mission-critical SharePoint collaboration workflows with strict security requirements',
      'Provided training materials, architectural guidance, and technical workshops to product owners'
    ],
    svAchievements: [
      'Ledde nyutvecklingen av Försvarsmaktens ärendehanteringssystem VIDAR med rigorösa säkerhetskrav',
      'Förvaltade och vidareutvecklade Försvarsmaktens intranät samt utbildade produktägare och användare'
    ],
    techStack: ['SharePoint', '.NET', 'IIS', 'SQL Server', 'MVC', 'PowerShell', 'FAST', 'TFS']
  },
  {
    id: 'exp-6',
    company: 'Solid Park AB',
    enCompany: 'Solid Park AB',
    svCompany: 'Solid Park AB',
    role: 'Projektledare & Systemutvecklare',
    enRole: 'Project Leader & System Developer',
    svRole: 'Projektledare & Systemutvecklare',
    period: '2008 - 2009',
    location: 'Stockholm, Sweden',
    enLocation: 'Stockholm, Sweden',
    svLocation: 'Stockholm, Sverige',
    summary: 'Project leader and system developer for the Swedish unemployment fund systems (E-kassa för LO) serving approximately 3 million citizens across Sweden.',
    enSummary: 'Project leader and system developer for the Swedish unemployment fund systems (E-kassa för LO) serving approximately 3 million citizens across Sweden.',
    svSummary: 'Kombinerad systemutvecklare och projektledare för E-kassa för LO med 8 utvecklare för 11 klienter och 3 miljoner användare.',
    achievements: [
      'Led an 8-developer agile engineering team delivering monthly product releases for 11 institutional clients',
      'Ensured high availability and regulatory compliance for over 3 million end users'
    ],
    enAchievements: [
      'Led an 8-developer agile engineering team delivering monthly product releases for 11 institutional clients',
      'Ensured high availability and regulatory compliance for over 3 million end users'
    ],
    svAchievements: [
      'Ledde team om 8 utvecklare med månatliga produktreleaser för 11 klientorganisationer',
      'Ansvarade för design, systemutveckling och driftstabilitet för över 3 miljoner användare'
    ],
    techStack: ['J2EE', 'Tomcat', 'C#', 'SQL Server', 'Ant', 'Jira']
  }
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Sveaskog Logistics & GIS Mapping System',
    enTitle: 'Sveaskog Logistics & GIS Mapping System',
    svTitle: 'Sveaskog Logistik & GIS Kartsystem',
    category: 'cloud',
    categoryLabel: 'Moln & GIS Kartor',
    enCategoryLabel: 'Cloud & GIS Systems',
    svCategoryLabel: 'Moln & GIS Kartor',
    role: 'Fullstack- & GIS-utvecklare',
    enRole: 'Full Stack & GIS Developer',
    svRole: 'Fullstack- & GIS-utvecklare',
    period: '2022 - 2023',
    summary: 'Comprehensive logistics and map services platform engineered for Sveaskog (Sweden\'s largest forest owner), integrating interactive geospatial GIS mapping with real-time supply chain logistics on Microsoft Azure Cloud.',
    enSummary: 'Comprehensive logistics and map services platform engineered for Sveaskog (Sweden\'s largest forest owner), integrating interactive geospatial GIS mapping with real-time supply chain logistics on Microsoft Azure Cloud.',
    svSummary: 'Produktutveckling för kartaservice och logistikservice åt Sveaskog (Sveriges största skogsägare). Integrerat GIS-kartsystem med realtidslogistik på Microsoft Azure Cloud.',
    image: '/src/assets/images/project_cloud_observability_1793953473387.jpg',
    metrics: [
      'Nationwide forestry coverage across Sweden',
      'Real-time GIS geospatial route calculations',
      'Azure Cloud DevOps automated deployments'
    ],
    enMetrics: [
      'Nationwide forestry coverage across Sweden',
      'Real-time GIS geospatial route calculations',
      'Azure Cloud DevOps automated deployments'
    ],
    svMetrics: [
      'Rikstäckande skogskartering i hela Sverige',
      'Realtidsberäkning av geospatiala GIS-rutter',
      'Automatiserade driftsättningar via Azure DevOps'
    ],
    highlights: [
      'Interactive GIS map services integration rendered on dynamic React frontends',
      'High-performance backend data queries in C# and SQL handling heavy spatial datasets',
      'Robust Azure Cloud infrastructure and CI/CD automation'
    ],
    enHighlights: [
      'Interactive GIS map services integration rendered on dynamic React frontends',
      'High-performance backend data queries in C# and SQL handling heavy spatial datasets',
      'Robust Azure Cloud infrastructure and CI/CD automation'
    ],
    svHighlights: [
      'Interaktiv GIS-karttjänst integrerad i moderna React-komponenter',
      'Högpresterande backendfrågor i C# och SQL för stora geospatiala datamängder',
      'Stabil Azure Cloud-infrastruktur och automatiserade CI/CD-pipelines'
    ],
    challenges: [
      'Optimizing heavy geospatial map layer rendering without degrading client responsiveness',
      'Ensuring continuous telemetry synchronization with remote forestry transport vehicles'
    ],
    enChallenges: [
      'Optimizing heavy geospatial map layer rendering without degrading client responsiveness',
      'Ensuring continuous telemetry synchronization with remote forestry transport vehicles'
    ],
    svChallenges: [
      'Optimering av tunga kartlager och GIS-geometri utan prestandatapp i webbläsaren',
      'Robust datasync mot skogstransportfordon i glesbygdsmiljöer'
    ],
    architecture: 'Frontend built in React with interactive GIS layer integration; backend powered by .NET C# microservices, Azure SQL database, and Azure DevOps CI/CD pipelines.',
    enArchitecture: 'Frontend built in React with interactive GIS layer integration; backend powered by .NET C# microservices, Azure SQL database, and Azure DevOps CI/CD pipelines.',
    svArchitecture: 'Frontend i React med GIS-kartlager; backend med .NET C#-mikrotjänster, Azure SQL-databas och Azure DevOps automatisering.',
    techStack: ['React', 'C#', '.NET', 'SQL', 'GIS Map', 'Azure Cloud', 'DevOps'],
    demoUrl: 'https://www.sveaskog.se',
    githubUrl: 'https://github.com/fang-stalmarck/sveaskog-gis-logistics'
  },
  {
    id: 'proj-2',
    title: 'Swedish Council for Higher Education (UHR) Portals',
    enTitle: 'Swedish Council for Higher Education (UHR) Portals',
    svTitle: 'Universitets- och högskolerådet (UHR) Webbportaler',
    category: 'web',
    categoryLabel: 'Offentlig sektor & CMS',
    enCategoryLabel: 'Public Sector & CMS',
    svCategoryLabel: 'Offentlig sektor & CMS',
    role: 'Webbutvecklare & EPiServer-arkitekt',
    enRole: 'Lead Web Developer & CMS Architect',
    svRole: 'Webbutvecklare & EPiServer-arkitekt',
    period: '2016 - 2018',
    summary: 'Developing, maintaining, and upgrading www.uhr.se and www.utbyten.se. A network of 12 integrated websites serving all Swedish universities, students, and educational authorities.',
    enSummary: 'Developing, maintaining, and upgrading www.uhr.se and www.utbyten.se. A network of 12 integrated websites serving all Swedish universities, students, and educational authorities.',
    svSummary: 'Utveckling och förvaltning av www.uhr.se och www.utbyten.se. Nätverk av 12 sammankopplade webbplatser för 12 produktägare till stöd för alla Sveriges universitet och studenter.',
    image: '/src/assets/images/project_ai_agent_platform_1793953472508.jpg',
    metrics: [
      '12 integrated portals for 12 product owners',
      'Zero downtime during peak national admission cycles',
      '100% WCAG accessibility compliance'
    ],
    enMetrics: [
      '12 integrated portals for 12 product owners',
      'Zero downtime during peak national admission cycles',
      '100% WCAG accessibility compliance'
    ],
    svMetrics: [
      '12 webbplatser utvecklade med 12 produktägare',
      'Noll driftstopp under högtryck vid antagningsbesked',
      'Full tillgänglighetsefterlevnad enligt WCAG-standard'
    ],
    highlights: [
      'Custom EPiServer / Optimizely CMS development including tailored Epiforms interactive workflows',
      'Delivered weekly client demonstrations and training curriculum for national higher education stakeholders',
      'Maintained test and staging environments (test.uhr.se) for continuous quality validation'
    ],
    enHighlights: [
      'Custom EPiServer / Optimizely CMS development including tailored Epiforms interactive workflows',
      'Delivered weekly client demonstrations and training curriculum for national higher education stakeholders',
      'Maintained test and staging environments (test.uhr.se) for continuous quality validation'
    ],
    svHighlights: [
      'Skräddarsydd EPiServer CMS-utveckling med anpassade formulär- och ansökningsflöden (Epi-forms)',
      'Veckovisa produktdemonstrationer och utbildningsmaterial för universitet och rådgivare',
      'Konfiguration och underhåll av testmiljö (test.uhr.se) för kontinuerlig kvalitetssäkring'
    ],
    challenges: [
      'Balancing the distinct requirements of 12 separate product owners under a unified design architecture',
      'Handling massive concurrent traffic spikes during university admission result release days'
    ],
    enChallenges: [
      'Balancing the distinct requirements of 12 separate product owners under a unified design architecture',
      'Handling massive concurrent traffic spikes during university admission result release days'
    ],
    svChallenges: [
      'Samordna unika verksamhetskrav från 12 produktägare under en gemensam plattformsarkitektur',
      'Extrema trafiktoppar vid nationella antagningsbesked med bibehållen svarstid'
    ],
    architecture: 'EPiServer CMS on .NET C#, custom Epiforms modules, SQL Server backend, and high-availability load-balanced hosting.',
    enArchitecture: 'EPiServer CMS on .NET C#, custom Epiforms modules, SQL Server backend, and high-availability load-balanced hosting.',
    svArchitecture: 'EPiServer CMS på .NET C#, anpassade Epiforms-moduler, SQL Server och högpresterande lastbalansering.',
    techStack: ['EPiServer CMS', 'C#', '.NET', 'JavaScript', 'SQL Server', 'HTML5/CSS3'],
    demoUrl: 'https://www.uhr.se',
    githubUrl: 'https://github.com/fang-stalmarck/uhr-episerver-platform'
  },
  {
    id: 'proj-3',
    title: 'Veni AS Life@work Connected Workplace Ecosystem',
    enTitle: 'Veni AS Life@work Connected Workplace Ecosystem',
    svTitle: 'Veni AS Life@work Uppkopplat Kontorsekosystem',
    category: 'saas',
    categoryLabel: 'SaaS & Appar',
    enCategoryLabel: 'Enterprise SaaS & Mobile',
    svCategoryLabel: 'SaaS & Appar',
    role: 'Fullstack- & Apputvecklare',
    enRole: 'Full Stack & Mobile Engineer',
    svRole: 'Fullstack- & Apputvecklare',
    period: '2021 - 2022',
    summary: 'Next-generation smart office workplace management platform spanning .NET C# cloud APIs, modern React administrative dashboards, and native iOS and Android mobile applications for office occupants.',
    enSummary: 'Next-generation smart office workplace management platform spanning .NET C# cloud APIs, modern React administrative dashboards, and native iOS and Android mobile applications for office occupants.',
    svSummary: 'Modernt smart-office-system med .NET C# moln-API:er, React administrationsgränssnitt och appar för iOS och Android (mötesbokning, matmeny, serviceärenden).',
    image: '/src/assets/images/project_fintech_system_1793953473346.jpg',
    metrics: [
      'Web, iOS & Android unified synchronization',
      'Sub-200ms REST API response times',
      'Deployed across corporate offices in Stavanger & Oslo'
    ],
    enMetrics: [
      'Web, iOS & Android unified synchronization',
      'Sub-200ms REST API response times',
      'Deployed across corporate offices in Stavanger & Oslo'
    ],
    svMetrics: [
      'Enhetlig synkronisering mellan webb, iOS och Android',
      'Svarstider under 200 ms på REST API:er',
      'Driftsatt på företagsfastigheter i Stavanger och Oslo'
    ],
    highlights: [
      'Built reactive management dashboard using modern React with real-time room availability indicators',
      'Engineered cross-platform mobile experiences with push notifications and calendar synchronization',
      'Robust security and multi-tenant access control implemented in .NET C#'
    ],
    enHighlights: [
      'Built reactive management dashboard using modern React with real-time room availability indicators',
      'Engineered cross-platform mobile experiences with push notifications and calendar synchronization',
      'Robust security and multi-tenant access control implemented in .NET C#'
    ],
    svHighlights: [
      'Realtidsöversikt över mötesrum och kontorsplatser byggt i React',
      'Mobilupplevelser med pushnotiser och kalendersynkronisering',
      'Säker flerhyresgästarkitektur (multi-tenant) i .NET C#'
    ],
    challenges: [
      'Real-time conflict resolution when multiple users book the same workspace resource simultaneously',
      'Managing background Bluetooth and geofencing beacon synchronization on mobile platforms'
    ],
    enChallenges: [
      'Real-time conflict resolution when multiple users book the same workspace resource simultaneously',
      'Managing background Bluetooth and geofencing beacon synchronization on mobile platforms'
    ],
    svChallenges: [
      'Realtidskonflikthantering vid samtidiga bokningar av samma resurs',
      'Bluetooth- och geofencing-positionering i mobilapparna'
    ],
    architecture: 'Microservices on .NET C# and Azure Cloud, React web frontends, REST APIs, and iOS/Android companion applications with SQL persistence.',
    enArchitecture: 'Microservices on .NET C# and Azure Cloud, React web frontends, REST APIs, and iOS/Android companion applications with SQL persistence.',
    svArchitecture: 'Mikrotjänster i .NET C# och Azure Cloud, React administrationsgränssnitt och mobilappar med SQL-databas.',
    techStack: ['.NET C#', 'React', 'REST API', 'iOS', 'Android', 'SQL', 'Azure Cloud'],
    demoUrl: 'https://www.veni.no',
    githubUrl: 'https://github.com/fang-stalmarck/veni-life-at-work'
  }
];

export const initialMessages: RecruiterMessage[] = [
  {
    id: 'msg-1',
    name: 'Henrik Bergström',
    company: 'Tietoevry Cloud Solutions',
    role: 'Engineering Director',
    intent: 'job_offer',
    targetPosition: 'Lead DevOps & Cloud Solutions Architect',
    salaryBudget: 'Konkurrenskraftigt svenskt paket + Tjänstepension',
    email: 'henrik.bergstrom@tietoevry.example',
    phoneOrWechat: '+46 8 123 4567',
    content: 'Hej Fang! Dina tidigare insatser i vårt interna moln och din nya 2026 NVIDIA Generativ AI-certifiering gör dig högintressant för vårt expanderande Enterprise AI & Cloud-team. Låt oss ta en fika i Stockholm eller ett Teams-möte i veckan!',
    isUrgent: true,
    isVerified: true,
    timestamp: '2026-11-05 14:30',
    reply: 'Tack Henrik! Mycket roligt att höras. Jag diskuterar gärna initiativen inom Enterprise AI. Låt oss boka ett möte via Teams.'
  },
  {
    id: 'msg-2',
    name: 'Elin Lindqvist',
    company: 'Svensk Tech-rekrytering',
    role: 'Senior Talent Partner',
    intent: 'interview',
    targetPosition: 'Senior Fullstack-specialist (EPiServer & React)',
    salaryBudget: '65 000 - 80 000 SEK / månad',
    email: 'elin.lindqvist@techrecruitment.example',
    phoneOrWechat: '+46 70 987 6543',
    content: 'Hej Fang, vi har noterat din gedigna bakgrund med UHR (www.uhr.se) och Försvarsmakten IT. Vi har ett spännande uppdrag inom modernisering av offentliga webbplattformar. Skulle du vara öppen för ett förutsättningslöst introduktionssamtal?',
    isUrgent: false,
    isVerified: true,
    timestamp: '2026-11-05 16:45',
    reply: 'Hej Elin! Efter att ha lett de 12 UHR-portalerna är jag mycket väl förtrogen med kraven inom offentlig sektor och EPiServer. Jag återkopplar via e-post!'
  }
];
