import React from 'react';
import { X } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogArticleModalProps {
  post?: BlogPost | null;
  article?: BlogPost | null;
  isOpen?: boolean;
  onClose: () => void;
  onNavigateToQuote?: () => void;
  navigate?: (view: any, param?: string) => void;
}

export const BlogArticleModal: React.FC<BlogArticleModalProps> = ({
  post,
  article,
  isOpen = true,
  onClose,
  onNavigateToQuote,
  navigate
}) => {
  const activePost = post || article;
  if (!isOpen || !activePost) return null;

  const handleQuoteClick = () => {
    onClose();
    if (onNavigateToQuote) {
      onNavigateToQuote();
    } else if (navigate) {
      navigate('quote');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 relative text-left my-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-[#2D3094]/10 text-[#2D3094] px-2.5 py-1 rounded-full">
              {activePost.category}
            </span>
            <span className="text-xs text-slate-400">• {activePost.readTime}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 md:p-10">
          
          <h1 className="font-heading font-black text-2xl md:text-3xl text-[#121212] leading-tight mb-4">
            {activePost.title}
          </h1>

          {/* Author Strip */}
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
            <img 
              src={activePost.authorAvatar} 
              alt={activePost.author} 
              className="w-10 h-10 rounded-full object-cover border border-[#ED008C]"
            />
            <div>
              <div className="text-xs font-bold text-slate-900">{activePost.author}</div>
              <div className="text-[10px] text-slate-500">{activePost.authorRole} • {activePost.date}</div>
            </div>
          </div>

          {/* Feature Image */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-slate-200 shadow-sm">
            <img 
              src={activePost.image} 
              alt={activePost.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Markdown / Text Content */}
          <div className="prose prose-slate max-w-none text-xs md:text-sm text-slate-700 leading-relaxed space-y-4">
            {activePost.content ? (
              <div className="whitespace-pre-line">
                {activePost.content}
              </div>
            ) : (
              <p>{activePost.excerpt}</p>
            )}
          </div>

          {/* Tags */}
          {activePost.tags && (
            <div className="flex flex-wrap items-center gap-2 pt-6 mt-8 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400">Tags:</span>
              {activePost.tags.map((tag, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-600 text-[11px] font-bold px-2.5 py-1 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Bottom Action */}
          <div className="mt-8 p-6 rounded-2xl bg-[#F7F8FA] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-900">Ready to implement these branding strategies?</div>
              <div className="text-[11px] text-slate-500">Contact our senior creative and pre-press team today.</div>
            </div>
            <button
              onClick={handleQuoteClick}
              className="bg-[#ED008C] hover:bg-[#d4007d] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full shadow-md shrink-0"
            >
              Get a Project Quote
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
