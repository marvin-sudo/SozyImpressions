import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ThumbsUp, 
  MessageSquarePlus, 
  X, 
  ShieldCheck, 
  Clock, 
  Award,
  Filter
} from 'lucide-react';
import brendaAvatar from '../assets/images/review_avatar_brenda_1788636424993.jpg';
import africanManAvatar from '../assets/images/african_man_him_1788636032439.jpg';
import africanWomanAvatar from '../assets/images/african_woman_her_1788636045505.jpg';

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  avatar?: string;
  rating: number;
  date: string;
  category: 'cakes' | 'him' | 'her' | 'explosion' | 'lamps' | 'general';
  purchasedItem: string;
  reviewTitle: string;
  reviewText: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  initials: string;
  bgColor: string;
}

const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Brenda Namubiru',
    location: 'Kololo, Kampala',
    avatar: brendaAvatar,
    rating: 5,
    date: '2 days ago',
    category: 'her',
    purchasedItem: 'Personalised Wooden Cube Flower Box with Fresh Roses',
    reviewTitle: 'Brought tears of joy! The print quality is unmatched',
    reviewText: 'I ordered the custom wooden flower box with our wedding anniversary photo. My husband was completely blown away! The roses were fresh and vibrant, and the UV print directly on the pine wood was razor crisp. Delivered right to his desk in Nakasero right on time!',
    verifiedPurchase: true,
    helpfulCount: 38,
    initials: 'BN',
    bgColor: 'bg-rose-500'
  },
  {
    id: 'rev-2',
    name: 'Brian Mukasa',
    location: 'Ntinda, Kampala',
    avatar: africanManAvatar,
    rating: 5,
    date: '5 days ago',
    category: 'him',
    purchasedItem: 'Personalised True Wireless ANC Earbuds with Laser-Engraved Case',
    reviewTitle: 'Exceeded all expectations. Ultra-premium finish',
    reviewText: 'The laser engraving on the matte black earbud case looks executive and sharp. The bass and audio clarity are exceptional, and having my initials engraved makes it feel like an ultra-luxury bespoke piece. Delivery took less than 24 hours across Kampala.',
    verifiedPurchase: true,
    helpfulCount: 29,
    initials: 'BM',
    bgColor: 'bg-[#2D3094]'
  },
  {
    id: 'rev-3',
    name: 'Fiona Atuhaire',
    location: 'Entebbe, Uganda',
    avatar: africanWomanAvatar,
    rating: 5,
    date: '1 week ago',
    category: 'cakes',
    purchasedItem: 'Custom Edible Photo Birthday & Anniversary Celebration Cake',
    reviewTitle: 'Stunning edible photo and delicious, moist vanilla cake!',
    reviewText: 'We surprised my mother for her 60th birthday with a family portrait cake. The sugar wafer photo print was so high definition that our guests almost did not want to slice it! The Madagascar vanilla cream was light, rich, and fresh. Every single person asked for Sozy Impressions’ contact.',
    verifiedPurchase: true,
    helpfulCount: 44,
    initials: 'FA',
    bgColor: 'bg-amber-500'
  },
  {
    id: 'rev-4',
    name: 'Derrick Ochen',
    location: 'Bugolobi, Kampala',
    rating: 5,
    date: '2 weeks ago',
    category: 'explosion',
    purchasedItem: 'Handcrafted Multi-Layer 3D Photo Explosion Surprise Box',
    reviewTitle: 'The most creative surprise gift in Uganda!',
    reviewText: 'The explosion box was a showstopper. You can feel the real craftsmanship that went into folding every accordion flap and printing each photo memory. The hidden jewelry vault in the center fit the silver bracelet perfectly. 10/10 recommendation!',
    verifiedPurchase: true,
    helpfulCount: 22,
    initials: 'DO',
    bgColor: 'bg-[#ED008C]'
  },
  {
    id: 'rev-5',
    name: 'Sandra Kemigisha',
    location: 'Jinja, Uganda',
    rating: 5,
    date: '3 weeks ago',
    category: 'lamps',
    purchasedItem: '3D Optical Crescent Moon & Cloud Couple Night Lamp',
    reviewTitle: 'Warm cozy glow and crystal-clear etching',
    reviewText: 'Purchased as a housewarming keepsake for my sister. The acrylic panel is thick and crystal clear, and when switched on at night the 3D illuminated portrait creates the warmest ambient glow. Arrived safely packaged with zero scratches.',
    verifiedPurchase: true,
    helpfulCount: 19,
    initials: 'SK',
    bgColor: 'bg-emerald-600'
  },
  {
    id: 'rev-6',
    name: 'Kenneth Kato',
    location: 'Senior Corporate Lead, Stanbic Bank',
    rating: 5,
    date: '1 month ago',
    category: 'him',
    purchasedItem: 'Brushed Stainless Steel Laser-Etched Executive Hip Flasks (Bulk Set)',
    reviewTitle: 'Corporate order executed with absolute flawlessness',
    reviewText: 'We commissioned Sozy Impressions for 40 personalized stainless steel executive flasks for our annual leadership retreat. Every single executive had their individual name and milestone year engraved to microscopic perfection. They delivered 2 days before deadline.',
    verifiedPurchase: true,
    helpfulCount: 51,
    initials: 'KK',
    bgColor: 'bg-slate-800'
  }
];

export const CustomerReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});

  // New review form state
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newProduct, setNewProduct] = useState('Personalised Flowers');
  const [newCategory, setNewCategory] = useState<'cakes' | 'him' | 'her' | 'explosion' | 'lamps' | 'general'>('her');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleVoteHelpful = (id: string) => {
    if (helpfulVotes[id]) return;
    
    setHelpfulVotes(prev => ({ ...prev, [id]: true }));
    setReviews(prev => prev.map(r => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const initials = newName.trim().split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'CU';

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      location: newLocation.trim() || 'Kampala, Uganda',
      rating: newRating,
      date: 'Just now',
      category: newCategory,
      purchasedItem: newProduct,
      reviewTitle: newTitle.trim() || 'Wonderful custom gift experience',
      reviewText: newComment.trim(),
      verifiedPurchase: true,
      helpfulCount: 1,
      initials,
      bgColor: 'bg-[#2D3094]'
    };

    setReviews([newRev, ...reviews]);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsModalOpen(false);
      setNewName('');
      setNewLocation('');
      setNewTitle('');
      setNewComment('');
    }, 1500);
  };

  const filteredReviews = reviews.filter(r => {
    if (selectedFilter === 'all') return true;
    return r.category === selectedFilter;
  });

  return (
    <section 
      id="customer-reviews-section" 
      aria-label="Customer Reviews and Testimonials"
      className="py-16 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-slate-200/80"
    >
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D3094]/10 text-[#2D3094] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-[#ED008C]" />
            <span>Verified Buyer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-950 tracking-tight leading-tight">
            Loved By Celebrants <br className="hidden sm:inline" />
            <span className="text-[#2D3094]">Across Uganda.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal mt-2.5 max-w-2xl leading-relaxed">
            Read real stories from genuine customers who trusted Sozy Impressions to deliver custom anniversary presents, surprise birthday hampers, and bespoke celebration keepsakes.
          </p>
        </div>

        {/* WRITE A REVIEW ACTION */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#2D3094] hover:bg-[#1e2063] text-white px-5 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md self-start lg:self-auto cursor-pointer"
        >
          <MessageSquarePlus size={17} />
          <span>Write a Review</span>
        </button>
      </div>

      {/* RATING SUMMARY SCORECARD */}
      <div className="bg-gradient-to-br from-slate-900 via-[#1a1b4b] to-[#12133a] rounded-3xl p-6 sm:p-8 text-white mb-12 shadow-xl border border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Big Score Box */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-8">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-heading font-black text-white tracking-tight">4.9</span>
              <span className="text-xl text-slate-400 font-medium">/ 5.0</span>
            </div>
            
            <div className="my-2.5 inline-flex items-center gap-2 px-3 py-1 bg-amber-400/10 text-amber-300 rounded-full text-xs font-bold border border-amber-400/20">
              <span>Overall Satisfaction Score</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Based on <strong className="text-white">1,420+ verified orders</strong> in Kampala, Entebbe, Jinja & East Africa.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full font-semibold">
              <CheckCircle2 size={13} />
              <span>98.4% Customer Recommendation Rate</span>
            </div>
          </div>

          {/* Breakdown Bars */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-12 text-slate-300 font-bold">5 Stars</span>
              <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[94%]" />
              </div>
              <span className="w-9 text-right text-slate-400 font-semibold">94%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 text-slate-300 font-bold">4 Stars</span>
              <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[5%]" />
              </div>
              <span className="w-9 text-right text-slate-400 font-semibold">5%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 text-slate-300 font-bold">3 Stars</span>
              <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[1%]" />
              </div>
              <span className="w-9 text-right text-slate-400 font-semibold">1%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 text-slate-300 font-bold">2 Stars</span>
              <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[0%]" />
              </div>
              <span className="w-9 text-right text-slate-400 font-semibold">0%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 text-slate-300 font-bold">1 Star</span>
              <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[0%]" />
              </div>
              <span className="w-9 text-right text-slate-400 font-semibold">0%</span>
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="md:col-span-4 flex flex-col gap-3.5 bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-700/60">
            <div className="flex items-start gap-3">
              <ShieldCheck size={18} className="text-[#ED008C] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">100% Mockup Approval</h4>
                <p className="text-[11px] text-slate-400 leading-snug">We share your print layout on WhatsApp before crafting begins.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-[#ED008C] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Same-Day Kampala Rush Available</h4>
                <p className="text-[11px] text-slate-400 leading-snug">Emergency cakes, mugs, and flower gifts delivered within hours.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Award size={18} className="text-[#ED008C] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Uganda Quality Assurance</h4>
                <p className="text-[11px] text-slate-400 leading-snug">Damage-free guarantee with complimentary replacement.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CATEGORY FILTER PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar select-none text-xs">
        <div className="inline-flex items-center gap-1.5 text-slate-500 font-bold mr-2">
          <Filter size={14} />
          <span>Category:</span>
        </div>
        {[
          { id: 'all', label: 'All Reviews (1,420+)' },
          { id: 'her', label: 'Gifts For Her' },
          { id: 'him', label: 'Gifts For Him' },
          { id: 'cakes', label: 'Photo Cakes' },
          { id: 'explosion', label: 'Explosion Boxes' },
          { id: 'lamps', label: '3D Optical Lamps' }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === filter.id
                ? 'bg-[#2D3094] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* REVIEWS GRID (3-COLUMNS DESKTOP) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredReviews.map((review) => {
          const hasVoted = helpfulVotes[review.id];

          return (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-[#2D3094]/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top: Rating Badge, Date */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold">
                    <span>{review.rating}.0 / 5.0 Rating</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{review.date}</span>
                </div>

                {/* Review Title */}
                <h3 className="font-heading font-black text-base text-slate-900 leading-snug mb-2 group-hover:text-[#2D3094] transition-colors">
                  "{review.reviewTitle}"
                </h3>

                {/* Review Body */}
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-5 font-normal">
                  {review.reviewText}
                </p>
              </div>

              <div>
                {/* Purchased Product Tag */}
                <div className="mb-4 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Purchased Item:
                  </span>
                  <div className="inline-block text-xs font-semibold text-[#2D3094] bg-[#2D3094]/10 px-2.5 py-1 rounded-lg line-clamp-1">
                    {review.purchasedItem}
                  </div>
                </div>

                {/* Reviewer Profile & Helpful Action */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt={review.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#ED008C] shrink-0"
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-full ${review.bgColor} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                        {review.initials}
                      </div>
                    )}
                    <div>
                      <div className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                        {review.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                        <span>{review.location}</span>
                        {review.verifiedPurchase && (
                          <span className="inline-flex items-center gap-0.5 text-emerald-600 font-semibold text-[10px]">
                            • <CheckCircle2 size={11} className="inline" /> Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Helpful Button */}
                  <button
                    onClick={() => handleVoteHelpful(review.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      hasVoted
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700'
                    }`}
                    title="Mark as helpful"
                  >
                    <ThumbsUp size={12} className={hasVoted ? 'fill-emerald-600' : ''} />
                    <span>{review.helpfulCount}</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* WRITE A REVIEW MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-heading font-black text-2xl text-slate-900 mb-2">
                  Thank You For Your Review!
                </h3>
                <p className="text-sm text-slate-600">
                  Your feedback helps fellow gift shoppers across Uganda choose the perfect surprise.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview}>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D3094]/10 text-[#2D3094] text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles size={13} className="text-[#ED008C]" />
                    <span>Share Your Experience</span>
                  </div>
                  <h3 className="font-heading font-black text-2xl text-slate-900">
                    Write a Customer Review
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Tell us about your personalized gift order and delivery in Uganda.
                  </p>
                </div>

                {/* Rating selection */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Rating (1 to 5)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        type="button"
                        key={score}
                        onClick={() => setNewRating(score)}
                        className={`w-9 h-9 rounded-xl font-heading font-black text-xs transition-all cursor-pointer flex items-center justify-center ${
                          score === newRating
                            ? 'bg-[#2D3094] text-white shadow-md scale-105'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-600 ml-2">
                      {newRating === 5 ? '5.0 / 5.0 (Excellent)' : `${newRating}.0 / 5.0`}
                    </span>
                  </div>
                </div>

                {/* Name and Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Grace Tumusiime"
                      value={newName}
                      onChange={e => setNewName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#2D3094] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      City / District
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kampala or Entebbe"
                      value={newLocation}
                      onChange={e => setNewLocation(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#2D3094] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Product Purchased */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Gift / Item Purchased
                  </label>
                  <select
                    value={newProduct}
                    onChange={e => {
                      setNewProduct(e.target.value);
                      if (e.target.value.includes('Cake')) setNewCategory('cakes');
                      else if (e.target.value.includes('Earbuds') || e.target.value.includes('Flask')) setNewCategory('him');
                      else if (e.target.value.includes('Lamp')) setNewCategory('lamps');
                      else if (e.target.value.includes('Explosion')) setNewCategory('explosion');
                      else setNewCategory('her');
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#2D3094] cursor-pointer"
                  >
                    <option value="Personalised Wooden Cube Flower Box">Personalised Wooden Cube Flower Box</option>
                    <option value="Custom Edible Photo Birthday Cake">Custom Edible Photo Birthday Cake</option>
                    <option value="Handcrafted 3D Photo Explosion Box">Handcrafted 3D Photo Explosion Box</option>
                    <option value="Personalised True Wireless ANC Earbuds">Personalised True Wireless ANC Earbuds</option>
                    <option value="3D Optical Crescent Moon Couple Lamp">3D Optical Crescent Moon Couple Lamp</option>
                    <option value="Brushed Stainless Steel Laser-Etched Flask">Brushed Stainless Steel Laser-Etched Flask</option>
                    <option value="Silver Zirconia Engraved Couple Bangle">Silver Zirconia Engraved Couple Bangle</option>
                  </select>
                </div>

                {/* Review Headline */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Unbelievable print quality and prompt delivery"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#2D3094] focus:bg-white"
                  />
                </div>

                {/* Review Text */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Share how the gift was received, the packaging quality, and your overall delivery experience..."
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 outline-none focus:border-[#2D3094] focus:bg-white resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#ED008C] hover:bg-[#d0007b] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Submit Verified Review
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
