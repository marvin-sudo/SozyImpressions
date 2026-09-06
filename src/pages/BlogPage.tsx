import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import { View, BlogPost } from '../types';
import { BLOG_POSTS } from '../data/mockData';
import { BlogArticleModal } from '../components/BlogArticleModal';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';

interface BlogPageProps {
  navigate: (view: View, param?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = ['All', 'Strategy', 'Printing', 'Corporate Gifts', 'Branding'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen py-12 px-4 md:px-8 font-sans text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Page Hero Banner */}
        <ScrollReveal yOffset={30} duration={0.8}>
          <div className="bg-[#181B34] text-white rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ED008C]/15 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-wider mb-4 backdrop-blur-md">
                <span>Thought Leadership & Knowledge Base</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight leading-tight mb-4">
                Insights, Print Guides & <br />
                <span className="text-[#ED008C]">Brand Strategy for Africa.</span>
              </h1>
              <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
                Explore technical printing guides, GSM paper weight recommendations, corporate gift psychology, and case study blueprints written by our senior production engineers.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter & Search Bar */}
        <ScrollReveal yOffset={20} duration={0.6}>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 select-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#2D3094] text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search guides, paper specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 outline-none focus:border-[#2D3094] focus:bg-white"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Blog Posts Grid */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <StaggerItem key={post.id}>
              <article
                onClick={() => setActiveArticle(post)}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#2D3094]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group h-full"
              >
                <div>
                  {/* Featured Photo */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-[#ED008C] text-white text-[10px] font-heading font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-[#2D3094]" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} className="text-[#ED008C]" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-base md:text-lg text-slate-900 leading-snug group-hover:text-[#2D3094] transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>

                    {/* Author Snippet */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{post.author}</div>
                        <div className="text-[10px] text-slate-500">{post.authorRole}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 pt-0">
                  <div className="flex items-center justify-between text-xs font-heading font-bold text-[#ED008C] group-hover:translate-x-1 transition-transform">
                    <span>Read Complete Blueprint</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>

      {/* Article Reading Modal */}
      {activeArticle && (
        <BlogArticleModal
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
          navigate={navigate}
        />
      )}
    </div>
  );
};
