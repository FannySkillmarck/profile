import React, { useState } from 'react';
import { X, Copy, Check, MessageSquareCode } from 'lucide-react';
import { Language } from '../types/resume';

interface WechatModalProps {
  wechatId: string;
  lang: Language;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const WechatModal: React.FC<WechatModalProps> = ({
  wechatId,
  lang,
  onClose,
  onNotify,
}) => {
  const isZh = lang === 'zh';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(wechatId);
      setCopied(true);
      onNotify(isZh ? `已复制微信号: ${wechatId}` : `Copied WeChat ID: ${wechatId}`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onNotify(wechatId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white">
          <MessageSquareCode className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {isZh ? '微信快速直联' : 'Connect via WeChat'}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
          {isZh ? '添加时请备注：公司名称 + 职位意向' : 'Please note: Company Name + Target Role'}
        </p>

        {/* QR Code Container (Crisp vector SVG representation) */}
        <div className="w-48 h-48 mx-auto p-3 bg-white rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
            {/* Corner position squares */}
            <rect x="5" y="5" width="26" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
            <rect x="11" y="11" width="14" height="14" fill="currentColor" />
            
            <rect x="69" y="5" width="26" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
            <rect x="75" y="11" width="14" height="14" fill="currentColor" />

            <rect x="5" y="69" width="26" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
            <rect x="11" y="75" width="14" height="14" fill="currentColor" />

            {/* Simulated QR matrix elements */}
            <rect x="37" y="8" width="8" height="8" fill="currentColor" />
            <rect x="49" y="8" width="6" height="6" fill="currentColor" />
            <rect x="40" y="22" width="6" height="6" fill="currentColor" />
            <rect x="54" y="20" width="8" height="8" fill="currentColor" />

            <rect x="8" y="38" width="6" height="8" fill="currentColor" />
            <rect x="20" y="44" width="8" height="6" fill="currentColor" />
            <rect x="36" y="36" width="10" height="10" fill="currentColor" />
            <rect x="52" y="36" width="8" height="8" fill="currentColor" />
            <rect x="68" y="40" width="10" height="6" fill="currentColor" />
            <rect x="84" y="38" width="8" height="8" fill="currentColor" />

            <rect x="36" y="52" width="8" height="8" fill="currentColor" />
            <rect x="48" y="50" width="6" height="10" fill="currentColor" />
            <rect x="60" y="54" width="10" height="6" fill="currentColor" />
            <rect x="78" y="52" width="8" height="8" fill="currentColor" />

            <rect x="38" y="70" width="8" height="8" fill="currentColor" />
            <rect x="52" y="68" width="10" height="6" fill="currentColor" />
            <rect x="68" y="74" width="8" height="10" fill="currentColor" />
            <rect x="82" y="70" width="10" height="6" fill="currentColor" />

            <rect x="40" y="84" width="10" height="8" fill="currentColor" />
            <rect x="58" y="82" width="8" height="10" fill="currentColor" />
            <rect x="74" y="86" width="8" height="6" fill="currentColor" />
          </svg>
        </div>

        {/* WeChat ID and Copy button */}
        <div className="mt-5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
          <div className="text-left">
            <span className="block text-[11px] text-slate-400">微信号 (WeChat ID)</span>
            <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">{wechatId}</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 dark:bg-white dark:text-slate-900"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (isZh ? '已复制' : 'Copied') : (isZh ? '复制' : 'Copy')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
