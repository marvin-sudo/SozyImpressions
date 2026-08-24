import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { View, BlogPost } from '../types';
import { BLOG_POSTS } from '../data/mockData';
import { BlogArticleModal } from './BlogArticleModal';
import { EASE_PREMIUM, VIEWPORT_CONFIG } from '../utils/animations';

interface BlogPreviewSectionProps {
  navigate: (view: View, param?: string) => void;
}

export const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({ navigate }) => {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 px-4 md:px-8 bg-white border-b border-slate-100 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D3094]/10 text-[#2D3094] text-xs font-black uppercase tracking-wider mb-3">
              <BookOpen size={14} className="text-[#ED008C]" />
              <span>Industry Insights & Strategies</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-[#121212] tracking-tight leading-tight">
              Insights, Trends & <br />
              <span className="text-[#2D3094]">Print Strategies.</span>
            </h2>
            <p className="text-base text-slate-600 mt-3 font-normal leading-relaxed">
              Explore strategic guides on brand positioning, offset vs. digital cost modeling, and maximizing executive client retention with high-utility merchandise in Uganda.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('blog')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D3094] hover:text-[#ED008C] transition-colors py-2 border-b-2 border-[#2D3094] hover:border-[#ED008C]"
            >
              <span>View All Articles</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ 
                duration: 0.75, 
                delay: idx * 0.12, 
                ease: EASE_PREMIUM 
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              onClick={() => setActiveArticle(post)}
              className="bg-[#F7F8FA] rounded-3xl overflow-hidden border border-slate-200 hover:border-[#2D3094]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group text-left"
            >
              <div>
                {/* Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-heading font-black text-[#2D3094] shadow-md uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-lg text-slate-900 leading-snug mb-3 group-hover:text-[#2D3094] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Strip */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img 
                    src={post.authorAvatar} 
                    alt={post.author} 
                    className="w-6 h-6 rounded-full object-cover border border-slate-300"
                  />
                  <span className="text-xs font-bold text-slate-700">{post.author}</span>
                </div>

                <span className="text-xs font-bold text-[#ED008C] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  <span>Read</span>
                  <ChevronRight size={14} />
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <BlogArticleModal
          post={activeArticle}
          isOpen={!!activeArticle}
          onClose={() => setActiveArticle(null)}
          onNavigateToQuote={() => navigate('quote')}
        />
      )}
    </section>
  );
};

