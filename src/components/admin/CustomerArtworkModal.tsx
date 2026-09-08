import React from 'react';
import { X, Download, ExternalLink, Paperclip } from 'lucide-react';

interface CustomerArtworkModalProps {
  artworkUrl: string | null;
  fileName?: string;
  onClose: () => void;
}

export const CustomerArtworkModal: React.FC<CustomerArtworkModalProps> = ({
  artworkUrl,
  fileName,
  onClose
}) => {
  if (!artworkUrl) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in-50">
      <div className="bg-[#12142B] text-white w-full max-w-3xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Paperclip size={18} className="text-[#ED008C]" />
            <div>
              <h3 className="text-sm font-bold">{fileName || 'Customer Uploaded Artwork Asset'}</h3>
              <p className="text-[10px] text-slate-400">High-resolution print production inspection</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={artworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink size={13} />
              <span>Open in New Tab</span>
            </a>

            <a
              href={artworkUrl}
              download={fileName || 'customer_artwork'}
              className="px-3 py-1.5 rounded-xl bg-[#2D3094] hover:bg-[#232573] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Download size={13} />
              <span>Download</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Image Preview Container */}
        <div className="p-8 flex items-center justify-center bg-slate-900/60 min-h-[350px] max-h-[70vh] overflow-auto">
          <img
            src={artworkUrl}
            alt="Customer Artwork"
            className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-lg border border-white/5"
          />
        </div>

      </div>
    </div>
  );
};
