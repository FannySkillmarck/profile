import React, { useState } from 'react';
import { RecruiterMessage, Language, CandidateProfile } from '../types/resume';
import {
  MessageSquare,
  Send,
  Mail,
  Copy,
  Check,
  Building,
  User,
  Flame,
  ShieldCheck,
  Download,
  CornerDownRight,
  Trash2,
  QrCode,
  FileText,
} from 'lucide-react';

interface MessageBoardSectionProps {
  messages: RecruiterMessage[];
  onAddMessage: (msg: Omit<RecruiterMessage, 'id' | 'timestamp'>) => void;
  onDeleteMessage: (id: string) => void;
  onReplyMessage: (id: string, replyText: string) => void;
  lang: Language;
  profile: CandidateProfile;
  onShowWechatQr: () => void;
  onNotify: (msg: string) => void;
}

export const MessageBoardSection: React.FC<MessageBoardSectionProps> = ({
  messages,
  onAddMessage,
  onDeleteMessage,
  onReplyMessage,
  lang,
  profile,
  onShowWechatQr,
  onNotify,
}) => {
  // Form State containing all required contact seeker fields:
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<RecruiterMessage['intent']>('job_offer');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [targetPosition, setTargetPosition] = useState('');
  const [consentAndUrgent, setConsentAndUrgent] = useState(false);
  const [messageText, setMessageText] = useState('');

  // Feed Filter & Reply State
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const t = {
    en: {
      kicker: '04. CONTACT & RECRUITER INQUIRIES',
      heading: 'Get in Touch & Online Message Board',
      subtitle:
        'Direct communication channel for recruiters, hiring managers, and collaborators. Messages are persisted and answered promptly.',
      candidateStatusLabel: 'Candidate Status:',
      addressLabel: 'Address:',
      phoneLabel: 'Phone:',
      emailLabel: 'Email:',
      copyEmailBtn: 'Copy Email',
      wechatBtn: 'WeChat',
      vCardBtn: 'Save Contact (vCard)',
      formTitle: 'Contact Form & Inquiries',
      formSubtitle: 'Please provide your contact information below. All fields are handled securely.',
      nameLabel: 'Full Name (Namn)',
      namePlaceholder: 'e.g. Henrik Bergström',
      emailFieldLabel: 'Email Address (E-post)',
      emailPlaceholder: 'name@company.com',
      phoneFieldLabel: 'Phone Number (Telefonnummer)',
      phonePlaceholder: '+46 70 123 4567',
      websiteLabel: 'Website URL (Webbplats)',
      websitePlaceholder: 'https://company.se',
      companyLabel: 'Company / Organization (Företag)',
      companyPlaceholder: 'e.g. Tietoevry / Public Agency',
      inquiryTypeLabel: 'Inquiry Purpose (Välj ärende / Dropdown)',
      optJob: 'Full-time Job Opportunity / Recruitment',
      optInterview: 'Interview Invitation',
      optConsulting: 'DevOps & Cloud Consulting',
      optCollab: 'Generative AI & LLM Collaboration',
      optOther: 'General Inquiries & Networking',
      targetPosLabel: 'Target Position or Project Scope (Optional)',
      targetPosPlaceholder: 'e.g. Senior DevOps Engineer / Azure Solutions Architect',
      messageLabel: 'Message Content (Meddelande / Paragraftext)',
      messagePlaceholder: 'Please describe your project, team opportunity, timeline, or requirements...',
      consentLabel: 'I confirm that I would like Fang Stålmarck to respond to this inquiry (Urgent priority contact requested within 24 hours).',
      sendBtn: 'Send Message (Skicka meddelande)',
      feedTitle: 'Live Message Feed',
      filterAll: 'All Inquiries',
      filterJob: 'Full-time Roles',
      filterInterview: 'Interviews',
      filterConsulting: 'Consulting',
      filterChat: 'Tech Chat',
      noMessages: 'No messages found under this filter. Send the first message using the form!',
      priorityTag: 'Priority',
      replyBtn: 'Reply',
      deleteBtn: 'Delete',
      replyPlaceholder: 'Type reply as candidate...',
      cancelBtn: 'Cancel',
      postReplyBtn: 'Post Reply',
      exportJson: 'Export messages as JSON',
      validationAlert: 'Please complete Name, Email, and your Message.',
      successAlert: 'Thank you! Your inquiry has been sent to Fang Stålmarck.',
    },
    sv: {
      kicker: '04. KONTAKT & REKRYTERINGSMEDDELANDEN',
      heading: 'Kontaktformulär & online-meddelanden',
      subtitle:
        'Direkt kontaktväg för rekryterare, konsultchefer och samarbetspartners. Meddelanden sparas lokalt och besvaras skyndsamt.',
      candidateStatusLabel: 'Kandidatstatus:',
      addressLabel: 'Adress:',
      phoneLabel: 'Telefon:',
      emailLabel: 'E-post:',
      copyEmailBtn: 'Kopiera e-post',
      wechatBtn: 'WeChat',
      vCardBtn: 'Spara kontakt (vCard)',
      formTitle: 'Kontaktformulär (Kontaktuppgifter)',
      formSubtitle: 'Fyll i dina kontaktuppgifter nedan. Samtliga fält hanteras med omsorg.',
      nameLabel: 'Namn (För- och efternamn)',
      namePlaceholder: 't.ex. Henrik Bergström',
      emailFieldLabel: 'E-postadress',
      emailPlaceholder: 'namn@foretag.se',
      phoneFieldLabel: 'Telefonnummer',
      phonePlaceholder: '+46 70 123 4567',
      websiteLabel: 'Webbplats (URL)',
      websitePlaceholder: 'https://foretag.se',
      companyLabel: 'Företag / Organisation',
      companyPlaceholder: 't.ex. Tietoevry / Myndighet',
      inquiryTypeLabel: 'Ärende / Syfte (Dropdown)',
      optJob: 'Rekrytering / Heltidstjänst',
      optInterview: 'Intervjuförfrågan',
      optConsulting: 'DevOps- & Molnkonsultation',
      optCollab: 'Samarbete inom Generativ AI',
      optOther: 'Övriga frågor & nätverkande',
      targetPosLabel: 'Önskad roll eller uppdragstitel (Valfritt)',
      targetPosPlaceholder: 't.ex. Senior DevOps-ingenjör / Fullstackutvecklare',
      messageLabel: 'Meddelande (Paragraftext)',
      messagePlaceholder: 'Beskriv ert uppdrag, team, tekniska krav eller tidsplan...',
      consentLabel: 'Jag önskar att Fang Stålmarck kontaktar mig angående detta ärende (Brådskande svar inom 24 timmar önskas).',
      sendBtn: 'Skicka meddelande',
      feedTitle: 'Inkomna meddelanden i realtid',
      filterAll: 'Alla ärenden',
      filterJob: 'Heltidstjänster',
      filterInterview: 'Intervjuer',
      filterConsulting: 'Konsultuppdrag',
      filterChat: 'Tekniskt utbyte',
      noMessages: 'Inga meddelanden hittades under detta filter. Skicka det första meddelandet ovan!',
      priorityTag: 'Brådskande',
      replyBtn: 'Svara',
      deleteBtn: 'Radera',
      replyPlaceholder: 'Skriv svar som kandidat...',
      cancelBtn: 'Avbryt',
      postReplyBtn: 'Publicera svar',
      exportJson: 'Exportera meddelanden som JSON',
      validationAlert: 'Vänligen fyll i namn, e-postadress och ditt meddelande.',
      successAlert: 'Tack! Ditt meddelande har skickats till Fang Stålmarck.',
    },
    zh: {
      kicker: '04. 在线招聘留言与直连沟通',
      heading: '招聘留言板与联系直通车',
      subtitle: '欢迎猎头顾问、技术主管与招聘团队在线留言。所有留言将同步保存并第一时间答复。',
      candidateStatusLabel: '求职到岗状态：',
      addressLabel: '常住地址：',
      phoneLabel: '电话：',
      emailLabel: '邮箱：',
      copyEmailBtn: '复制邮箱',
      wechatBtn: '微信直联',
      vCardBtn: '存入通讯录 (vCard)',
      formTitle: '填写招聘邀约 / 留言',
      formSubtitle: '请留下您的称呼、公司及意向，直接与候选人建立联系。',
      nameLabel: '您的称呼 / 姓名 *',
      namePlaceholder: '例：Henrik / 张总监',
      emailFieldLabel: '联系邮箱 *',
      emailPlaceholder: 'name@company.com',
      phoneFieldLabel: '手机 / 联系电话',
      phonePlaceholder: '+46 70 123 4567',
      websiteLabel: '公司 / 机构网站',
      websitePlaceholder: 'https://company.se',
      companyLabel: '所属公司 / 团队',
      companyPlaceholder: '例：Tietoevry / 字节跳动',
      inquiryTypeLabel: '沟通性质 / 意向 (下拉菜单) *',
      optJob: '全职猎聘机会 (Full-Time)',
      optInterview: '面试邀约 (Interview)',
      optConsulting: 'DevOps & 架构咨询顾问',
      optCollab: '大模型与生成式 AI 合作',
      optOther: '商务与其他洽谈',
      targetPosLabel: '意向岗位或薪资预算 (选填)',
      targetPosPlaceholder: '例：Senior DevOps Engineer / 全栈架构师',
      messageLabel: '留言详细内容 (段落文本) *',
      messagePlaceholder: '请简述您的团队背景、具体业务方向或期望沟通的日程时间...',
      consentLabel: '确认发送此留言，并希望 Fang Stålmarck 尽快（24小时内）优先联系。',
      sendBtn: '提交留言 (Send Message)',
      feedTitle: '实时留言动态',
      filterAll: '全部类型',
      filterJob: '全职机会',
      filterInterview: '面试邀约',
      filterConsulting: '顾问咨询',
      filterChat: '技术交流',
      noMessages: '暂无符合筛选条件的留言，欢迎成为第一个留言的招聘者！',
      priorityTag: '加急',
      replyBtn: '回复',
      deleteBtn: '删除',
      replyPlaceholder: '输入回复内容...',
      cancelBtn: '取消',
      postReplyBtn: '发布回复',
      exportJson: '导出留言为 JSON',
      validationAlert: '请填写完整的姓名、邮箱以及留言内容。',
      successAlert: '留言已成功发送给 Fang Stålmarck！',
    },
  }[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !messageText.trim()) {
      onNotify(t.validationAlert);
      return;
    }

    onAddMessage({
      name: name.trim(),
      company: company.trim() || (lang === 'sv' ? 'Direktkontakt' : lang === 'zh' ? '直接联系' : 'Direct Inquiry'),
      role: role.trim() || (lang === 'sv' ? 'Rekryterare' : lang === 'zh' ? '招聘负责人' : 'Hiring Partner'),
      intent: inquiryType,
      targetPosition: targetPosition.trim() || undefined,
      salaryBudget: website.trim() ? `Website: ${website.trim()}` : undefined,
      email: email.trim(),
      phoneOrWechat: phone.trim() || undefined,
      content: messageText.trim(),
      isUrgent: consentAndUrgent,
      isVerified: true,
    });

    // Reset Form fields
    setName('');
    setEmail('');
    setWebsite('');
    setPhone('');
    setInquiryType('job_offer');
    setCompany('');
    setRole('');
    setTargetPosition('');
    setConsentAndUrgent(false);
    setMessageText('');

    onNotify(t.successAlert);
  };

  const handleCopyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      onNotify(`${lang === 'sv' ? 'Kopierade' : lang === 'zh' ? '已复制' : 'Copied'} ${label}: ${text}`);
    } catch {
      onNotify(text);
    }
  };

  const handleExportMessages = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(messages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `messages-fang-stalmarck-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onNotify(t.exportJson);
  };

  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Stålmarck;Fang;;;
FN:Fang Stålmarck
TITLE:Senior DevOps & Full Stack Developer
ADR;TYPE=HOME:;;Sandhamnsgatan 13;Stockholm;;115 40;Sweden
EMAIL;TYPE=INTERNET,WORK:fang.stalmarck@gmail.com
TEL;TYPE=CELL:+46761848301
URL:https://github.com/fang-stalmarck
NOTE:M.Sc. KTH Royal Institute of Technology | NVIDIA-Certified Generative AI LLMs
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Fang_Stalmarck_Contact.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onNotify(lang === 'sv' ? 'Laddade ner kontaktkort (vCard)' : lang === 'zh' ? '已下载候选人电子名片 (vCard)' : 'Downloaded contact vCard');
  };

  const filteredMessages =
    activeFilter === 'all'
      ? messages
      : messages.filter((m) => m.intent === activeFilter);

  const getIntentLabel = (int: RecruiterMessage['intent']) => {
    switch (int) {
      case 'job_offer':
        return t.optJob;
      case 'interview':
        return t.optInterview;
      case 'freelance':
        return t.optConsulting;
      case 'tech_chat':
        return t.optCollab;
      default:
        return t.optOther;
    }
  };

  const getLocation = () => {
    if (lang === 'sv') return profile.svLocation;
    if (lang === 'zh') return profile.location;
    return profile.enLocation;
  };

  const getJobStatus = () => {
    if (lang === 'sv') return profile.svJobStatus;
    if (lang === 'zh') return profile.jobStatus;
    return profile.enJobStatus;
  };

  return (
    <section id="contact" className="py-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Level 2 Heading: Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              {t.kicker}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.heading}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
            {t.subtitle}
          </p>
        </div>

        {/* Direct Contact Banner for Fang Stålmarck */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t.candidateStatusLabel}</span>
                <span className="font-normal text-slate-600 dark:text-slate-300">
                  {getJobStatus()}
                </span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>{t.addressLabel} <strong className="text-slate-700 dark:text-slate-300">{getLocation()}</strong></span>
                <span>·</span>
                <span>{t.phoneLabel} <strong className="font-mono text-slate-700 dark:text-slate-300">{profile.phone}</strong></span>
                <span>·</span>
                <span>{t.emailLabel} <strong className="font-mono text-slate-700 dark:text-slate-300">{profile.email}</strong></span>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  handleCopyText(profile.email, 'Email');
                  setCopiedEmail(true);
                  setTimeout(() => setCopiedEmail(false), 2000);
                }}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{t.copyEmailBtn}</span>
              </button>

              <button
                type="button"
                onClick={onShowWechatQr}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>{t.wechatBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadVCard}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors shadow-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.vCardBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout: Left = Full Contact Form; Right = Live Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Semantic Contact Form containing all required fields */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              {/* Level 3 Heading: Contact Form */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {t.formTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              {t.formSubtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Name Input */}
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.nameLabel} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-all"
                />
              </div>

              {/* 2. Email & 4. Phone in 2-column on tablet/desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t.emailFieldLabel} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t.phoneFieldLabel}
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.phonePlaceholder}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-all"
                  />
                </div>
              </div>

              {/* 3. Website & Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="contact-website" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t.websiteLabel}
                  </label>
                  <input
                    type="url"
                    id="contact-website"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder={t.websitePlaceholder}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-company" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t.companyLabel}
                  </label>
                  <input
                    type="text"
                    id="contact-company"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={t.companyPlaceholder}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-all"
                  />
                </div>
              </div>

              {/* 5. Dropdown Menu */}
              <div>
                <label htmlFor="contact-inquiry-type" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.inquiryTypeLabel} <span className="text-rose-500">*</span>
                </label>
                <select
                  id="contact-inquiry-type"
                  name="inquiryType"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value as RecruiterMessage['intent'])}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-all"
                >
                  <option value="job_offer">{t.optJob}</option>
                  <option value="interview">{t.optInterview}</option>
                  <option value="freelance">{t.optConsulting}</option>
                  <option value="tech_chat">{t.optCollab}</option>
                  <option value="other">{t.optOther}</option>
                </select>
              </div>

              {/* Target Position (Optional field) */}
              <div>
                <label htmlFor="contact-target-position" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.targetPosLabel}
                </label>
                <input
                  type="text"
                  id="contact-target-position"
                  name="targetPosition"
                  value={targetPosition}
                  onChange={(e) => setTargetPosition(e.target.value)}
                  placeholder={t.targetPosPlaceholder}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-all"
                />
              </div>

              {/* 7. Textarea for Paragraph Text */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.messageLabel} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-all resize-none"
                />
              </div>

              {/* 6. Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="contact-consent"
                  name="consent"
                  checked={consentAndUrgent}
                  onChange={(e) => setConsentAndUrgent(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-4 h-4 mt-0.5"
                />
                <label htmlFor="contact-consent" className="text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none">
                  {t.consentLabel}
                </label>
              </div>

              {/* 8. Send Button (Skicka-knapp) */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>{t.sendBtn}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Live Recruiter Message Feed */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2">
                {/* Level 3 Heading: Feed Title */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.feedTitle}
                </h3>
                <span className="text-xs font-mono text-slate-500 tabular-nums">
                  ({filteredMessages.length})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                  className="px-2.5 py-1 text-xs rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  <option value="all">{t.filterAll}</option>
                  <option value="job_offer">{t.filterJob}</option>
                  <option value="interview">{t.filterInterview}</option>
                  <option value="freelance">{t.filterConsulting}</option>
                  <option value="tech_chat">{t.filterChat}</option>
                </select>

                <button
                  type="button"
                  onClick={handleExportMessages}
                  title={t.exportJson}
                  className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* List of Messages */}
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
                {t.noMessages}
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-5 sm:p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  {/* Top Bar of Message */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{msg.name}</span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">·</span>
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <Building className="w-3 h-3 text-slate-400" />
                        {msg.company} ({msg.role})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {msg.isUrgent && (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                          <Flame className="w-3 h-3" />
                          <span>{t.priorityTag}</span>
                        </span>
                      )}
                      <span className="text-xs font-mono text-slate-400 tabular-nums">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Intent & Position Metadata */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-slate-400 my-2.5">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      [{getIntentLabel(msg.intent)}]
                    </span>
                    {msg.targetPosition && (
                      <>
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                        <span>Role: {msg.targetPosition}</span>
                      </>
                    )}
                    {msg.salaryBudget && (
                      <>
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="font-mono text-slate-700 dark:text-slate-300">{msg.salaryBudget}</span>
                      </>
                    )}
                  </div>

                  {/* Content Paragraph */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed my-3 bg-slate-50/70 dark:bg-slate-800/40 p-3.5 rounded-lg border border-slate-100 dark:border-slate-800/50">
                    {msg.content}
                  </p>

                  {/* Reply Section */}
                  {msg.reply && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200">
                      <CornerDownRight className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white mb-0.5">
                          {profile.name} {lang === 'sv' ? 'Svar:' : lang === 'zh' ? '回复：' : 'Reply:'}
                        </div>
                        <p>{msg.reply}</p>
                      </div>
                    </div>
                  )}

                  {/* Reply Composer if active */}
                  {replyingId === msg.id && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                      <textarea
                        rows={2}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder={t.replyPlaceholder}
                        className="w-full p-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white resize-none"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setReplyingId(null);
                            setReplyContent('');
                          }}
                          className="px-2.5 py-1 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900"
                        >
                          {t.cancelBtn}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (replyContent.trim()) {
                              onReplyMessage(msg.id, replyContent.trim());
                              setReplyingId(null);
                              setReplyContent('');
                              onNotify(lang === 'sv' ? 'Svar publicerat' : lang === 'zh' ? '已发布回复' : 'Reply posted to message feed');
                            }
                          }}
                          className="px-3 py-1 text-xs font-medium text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded hover:opacity-90"
                        >
                          {t.postReplyBtn}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Actions Footer */}
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyText(msg.email, 'Sender Email')}
                        className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors"
                        title={msg.email}
                      >
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span className="font-mono">{msg.email}</span>
                      </button>
                      {msg.phoneOrWechat && (
                        <>
                          <span>·</span>
                          <span className="font-mono">{msg.phoneOrWechat}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {!msg.reply && replyingId !== msg.id && (
                        <button
                          type="button"
                          onClick={() => {
                            setReplyingId(msg.id);
                            setReplyContent('');
                          }}
                          className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
                        >
                          {t.replyBtn}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(lang === 'sv' ? 'Radera detta meddelande?' : lang === 'zh' ? '确定要删除此留言吗？' : 'Delete this message?')) {
                            onDeleteMessage(msg.id);
                            onNotify(lang === 'sv' ? 'Meddelande raderat' : lang === 'zh' ? '留言已删除' : 'Message deleted');
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                        title={t.deleteBtn}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
