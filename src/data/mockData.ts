import { 
  ServiceItem, 
  Product, 
  PortfolioProject, 
  Testimonial, 
  IndustrySolution, 
  BlogPost, 
  DeliveryZone 
} from '../types';

export const COMPANY_INFO = {
  name: 'Sozy Impressions Ltd',
  tagline: 'We Build Brands That Stand Out',
  slogan: 'Print. Brand. Create. Impress.',
  logoUrl: 'https://www.image2url.com/r2/default/images/1786717468624-8d57a567-d5cb-4ce7-93eb-959e8e208022.png',
  website: 'https://sozyimpressions.com',
  email: 'sales@sozyimpressions.com',
  phone: '+256 709 390 168',
  whatsapp: '+256 787 662 183',
  whatsappDirectUrl: 'https://wa.me/256787662183',
  address: 'Plot 42, Nkrumah Road & Jinja Road Creative Studio, Kampala, Uganda',
  workingHours: 'Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 4:00 PM',
  establishedYear: '2015',
  yearsExperience: '10+',
  clientsCount: '250+',
  projectsCount: '1,000+',
  socials: {
    instagram: 'https://www.instagram.com/sozyimpressions',
    tiktok: 'https://www.tiktok.com/@sozyimpressions',
    youtube: 'https://www.youtube.com/@sozyimpressions',
    facebook: 'https://www.facebook.com/sozyimpressions',
  },
};

export const PAYMENT_LOGOS = {
  visaMastercard: 'https://www.image2url.com/r2/default/images/1786719126268-b421f366-5bb5-483e-a85c-d7ac3c49e12e.jpg',
  airtelMoney: 'https://www.image2url.com/r2/default/images/1786719401621-7ff52daf-34e7-4ffc-9514-b7269f6ff664.webp',
  mtn: 'https://www.image2url.com/r2/default/images/1786719819931-025c4fce-e200-4027-9881-ec69298e07cf.png',
};

export const EXCHANGE_RATE_USD_TO_UGX = 3800;

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'offset-printing',
    number: '01',
    title: 'Offset Printing',
    subtitle: 'High-Volume Commercial Printing',
    tagline: 'Flawless color accuracy, sharp details, and unrivaled cost-efficiency at high volumes.',
    description: 'Professional high-volume printing for businesses, educational institutions, government bodies, and corporations. We utilize advanced German Heidelberg offset presses to achieve unmatched color fidelity, crisp registration, and premium finishes.',
    iconName: 'Printer',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
    popularProducts: [
      'Business Cards (Embossed & Foil Stamped)',
      'Corporate Brochures & Annual Reports',
      'Marketing Flyers & Leaflets',
      'Official Letterheads & Continuation Sheets',
      'Branded Envelopes (DL, C5, C4)',
      'Books, Manuals & Product Catalogues',
      'Corporate Magazines & Newsletters',
      'Carbonless Receipt & Invoice Books',
      'Desk & Wall Calendars (Wire-O Bound)',
      'Custom Product Packaging Boxes'
    ],
    features: [
      'German Heidelberg Multi-Color Offset Presses',
      'Pantone Matching System (PMS) Exact Colors',
      'Spot UV, Matte/Gloss Lamination, Foil Stamping',
      'Bulk Quantity Cost Optimizations',
      'Precision Die-Cutting and Folding'
    ],
    turnaroundTime: '2 - 5 Business Days',
    startingPriceUGX: 120000,
    startingPriceUSD: 32
  },
  {
    id: 'digital-printing',
    number: '02',
    title: 'Digital Printing',
    subtitle: 'Fast, On-Demand High-Definition Printing',
    tagline: 'Ultra-fast turnarounds, variable data customization, and vibrant short-run print perfection.',
    description: 'Fast, flexible, high-definition printing engineered for tight deadlines, short runs, event collateral, and customized variable-data campaigns. Print exactly what you need with zero compromise on quality.',
    iconName: 'Zap',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1200',
    popularProducts: [
      'High-Resolution Promotional Posters (A3 to A0)',
      'Express Event Flyers & Handouts',
      'Executive Express Business Cards',
      'Graduation, Training & Achievement Certificates',
      'Laminated Restaurant & Bar Menus',
      'Custom Vinyl Die-Cut Stickers & Labels',
      'Event Invitations & VIP Access Passes',
      'Short-Run Booklets & Presentation Decks'
    ],
    features: [
      'Same-Day & Next-Day Express Turnaround Available',
      'Zero Minimum Order Quantity Restrictions',
      'Waterproof, Scratch-Resistant UV Inks',
      'Custom Variable Data Printing (VDP)',
      'Instant Color Proofing'
    ],
    turnaroundTime: 'Same Day to 24 Hours',
    startingPriceUGX: 45000,
    startingPriceUSD: 12
  },
  {
    id: 'corporate-branding',
    number: '03',
    title: 'Corporate Branding',
    subtitle: 'Complete Organization Brand Implementation',
    tagline: 'Transform every customer touchpoint into an authoritative, memorable brand experience.',
    description: 'Turn your physical workplaces, company fleets, and executive stationery into cohesive brand ambassadors. From conceptual architectural signage to full fleet wrapping, we engineer authority for leading East African corporations.',
    iconName: 'Building2',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    popularProducts: [
      '3D Acrylic & Brushed Metal Reception Signage',
      'Architectural Glass Frosted Vinyl Branding',
      'Full & Partial Commercial Vehicle Fleet Wraps',
      'Corporate Wall Murals & Core Values Graphics',
      'Wayfinding & Directional Door Signage',
      'Executive Stationery Suites & Welcome Kits',
      'Staff Lanyards, RFID Badges & Uniforms',
      'Corporate Identity Guidelines Manuals'
    ],
    features: [
      'Turnkey Site Survey & Architectural Measurements',
      'High-Grade Cast Vinyl with UV Overlaminate (5-Year Durability)',
      'Precision CNC Router & Laser Cutting',
      'Professional Certified Installation Crew',
      'Brand Identity System Cohesion'
    ],
    turnaroundTime: '3 - 7 Business Days',
    startingPriceUGX: 350000,
    startingPriceUSD: 95
  },
  {
    id: 'event-branding',
    number: '04',
    title: 'Event Branding',
    subtitle: 'Immersive Experiential Visuals for Conferences & Galas',
    tagline: 'Command the room and captivate attendees with unforgettable experiential event graphics.',
    description: 'Professional visual branding for corporate conferences, AGMs, exhibitions, product launches, galas, and sporting events. We supply durable, high-impact hardware and vibrant fabrics that make sponsors shine.',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    popularProducts: [
      'Seamless Stage Backdrops & Media Photo Walls',
      'Heavy-Duty Aluminum Pull-Up Banners (Roll-Ups)',
      'Custom Outdoor Branded Gazebos & Pop-Up Tents',
      'Teardrop, Sharkfin & Telescopic Flying Flags',
      'Exhibition Booth Shell Scheme Fabric Graphics',
      'VIP Badges, Lanyards, Wristbands & Accreditation',
      'Directional Totems & Step-and-Repeat Media Walls',
      'Custom Podium & Lectern Brand Panels'
    ],
    features: [
      'Heavy-Duty Tear-Resistant Banner Media & Dye-Sublimation Fabrics',
      'Sturdy Aluminum Hardware with Padded Carry Bags',
      'Fast Setup & Tear-Down Onsite Assistance',
      'Glare-Free Matte Finishes for Broadcast & Photography',
      'Weatherproof Wind-Resistant Outdoor Structures'
    ],
    turnaroundTime: '24 - 48 Hours',
    startingPriceUGX: 180000,
    startingPriceUSD: 48
  },
  {
    id: 'customised-gifts',
    number: '05',
    title: 'Customised Gifts',
    subtitle: 'Premium Personalised Merchandise & Corporate Swag',
    tagline: 'High-utility, executive promotional gifts that keep your brand on top of clients’ minds.',
    description: 'Delight valued clients, reward top performers, and build community with curated corporate merchandise. From laser-engraved vacuum flasks and luxury executive gift sets to custom apparel, we personalize with perfection.',
    iconName: 'Gift',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200',
    popularProducts: [
      'Laser-Engraved Smart Temperature LED Vacuum Flasks',
      'Ceramic Two-Tone & Magic Color-Changing Mugs',
      'Premium Combed Cotton 100% Branded T-Shirts & Polos',
      'Embroidered Structured Caps & Sun Visors',
      'Luxury Metal Executive Rollerball Pens',
      'Hardcover Leather PU Notebooks with Elastic Band',
      'Bespoke Executive Onboarding & VIP Gift Boxes',
      'Crystal, Acrylic & Wooden Corporate Awards & Trophies',
      'Heavy-Duty Auto-Open Golf & Storm Umbrellas',
      'Custom Metal & Leather Keyrings & Powerbanks'
    ],
    features: [
      'Laser Engraving, Screen Printing, UV Flatbed & Embroidery',
      'Curated Luxury Presentation Packaging & Custom Ribbon',
      'Tiered Wholesale & Corporate Bulk Discounts',
      'Free Digital Artwork Mockup Preview',
      'Durability Tested Dishwasher & Wash-Safe Inks'
    ],
    turnaroundTime: '2 - 5 Business Days',
    startingPriceUGX: 25000,
    startingPriceUSD: 7
  },
  {
    id: 'general-supplies',
    number: '06',
    title: 'General Supplies',
    subtitle: 'Institutional & Business Supply Solutions',
    tagline: 'Dependable, scheduled procurement and bulk consumables for corporate and educational enterprises.',
    description: 'A trusted single-source procurement partner for businesses, government parastatals, universities, hospitals, and NGOs across Uganda. We guarantee certified genuine quality, dependable supply chains, and transparent invoicing.',
    iconName: 'PackageCheck',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200',
    popularProducts: [
      'Bulk Premium Copier Paper (A4, A3 75gsm / 80gsm)',
      'Office Filing Cabinets, Lever Arch Files & Folders',
      'Custom Institutional Envelopes, Slips & Forms',
      'Printer Toners, Cartridges & Imaging Consumables',
      'School Examination Answer Booklets & School Badges',
      'Industrial Safety PPE, Branded Reflector Jackets & Boots',
      'Corporate Sanitation, Cleaning & Hygiene Consumables',
      'Conference Stationery Kits & Writing Pads'
    ],
    features: [
      'Credit Terms & LPO (Local Purchase Order) Acceptance for Registered Corporates',
      'Scheduled Monthly Re-Order Automated Delivery',
      'Guaranteed Original OEM Consumables',
      'Volume Wholesale Pricing Structures',
      'Nationwide Doorstep Logistics'
    ],
    turnaroundTime: '24 - 48 Hours',
    startingPriceUGX: 85000,
    startingPriceUSD: 23
  },
  {
    id: 'graphics-designing',
    number: '07',
    title: 'Graphics Designing',
    subtitle: 'Strategic Visual Communication & Brand Strategy',
    tagline: 'World-class visual identities, business profiles, and marketing collateral engineered to convert.',
    description: 'Transform your brand vision into persuasive, aesthetically commanding visual systems. Our senior design team crafts corporate logos, brand guidelines, pitch decks, investor profiles, and packaging designs that elevate market valuation.',
    iconName: 'PenTool',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200',
    popularProducts: [
      'Complete Corporate Brand Identity System & Style Guides',
      'Primary Logo Suite (Vector Master Files, Favicons, Brandmarks)',
      'Corporate Company Profiles & Capability Decks (PDF + Print)',
      'Annual Reports, Financial Summaries & Infographics',
      'E-Commerce & Retail Product Packaging Design',
      'High-Converting Social Media Templates & Ad Creatives',
      'Product Catalogues, Lookbooks & Sales Brochures',
      'Investor Pitch Decks & Keynote Presentation Designs'
    ],
    features: [
      'Full Commercial Copyright Transfer & Source Vector Files (AI, EPS, SVG, PDF)',
      'Comprehensive Brand Color Palettes (CMYK, RGB, Pantone, HEX)',
      'Typography Hierarchy Pairings & Usage Documentation',
      'Structured 3-Round Iteration and Refinement Protocol',
      'Print-Ready Pre-Press File Preparation'
    ],
    turnaroundTime: '2 - 4 Business Days',
    startingPriceUGX: 150000,
    startingPriceUSD: 40
  }
];

export const PRODUCTS_DATA: Product[] = [
  // Apparel
  {
    id: 'prod-tshirt-polo',
    name: 'Executive Pique Cotton Branded Polo',
    category: 'Apparel',
    priceUGX: 38000,
    priceUSD: 10,
    originalPriceUGX: 45000,
    originalPriceUSD: 12,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800',
    description: 'Heavyweight 220gsm breathable combed cotton polo shirt. Features reinforced collar, 3-button placket, and custom high-density embroidery or screen-printed chest and sleeve logos.',
    specifications: {
      'Fabric': '100% Combed Pique Cotton (220 GSM)',
      'Customization': 'Direct Embroidery or Screen Print',
      'Fit': 'Modern Corporate Fit (Unisex)',
      'Colors': 'Navy, Royal Blue, Black, White, Maroon, Heather Grey'
    },
    isCustomizable: true,
    minOrderQty: 10,
    bulkTiers: [
      { minQty: 10, discountPercent: 0 },
      { minQty: 50, discountPercent: 10 },
      { minQty: 100, discountPercent: 18 },
      { minQty: 250, discountPercent: 25 }
    ],
    colors: ['Navy', 'Royal Blue', 'Black', 'White', 'Maroon'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    isFeatured: true,
    badge: 'Best Seller'
  },
  {
    id: 'prod-crewneck-tee',
    name: 'Premium 100% Combed Cotton T-Shirt',
    category: 'Apparel',
    priceUGX: 25000,
    priceUSD: 6.5,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-soft 180gsm ring-spun cotton t-shirt. Ideal for promotional campaigns, team offsites, product launches, and casual corporate gear.',
    specifications: {
      'Fabric': '180 GSM Ring-Spun Cotton',
      'Print Method': 'Durable Screen Print or Direct-to-Film (DTF)',
      'Washing': 'Machine wash cold inside out'
    },
    isCustomizable: true,
    minOrderQty: 20,
    colors: ['Black', 'Navy', 'White', 'Red', 'Royal Blue'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    rating: 4.8,
    reviewCount: 38,
    inStock: true
  },
  // Bottles & Flasks
  {
    id: 'prod-smart-flask',
    name: 'Smart LED Temperature Vacuum Flask (500ml)',
    category: 'Flasks',
    priceUGX: 45000,
    priceUSD: 12,
    originalPriceUGX: 55000,
    originalPriceUSD: 14.5,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800',
    description: 'Double-wall stainless steel thermal bottle featuring a smart touch LED temperature display lid. Keeps beverages hot for 12 hours or ice-cold for 24 hours. Custom laser-engraved with your logo.',
    specifications: {
      'Material': 'Food-Grade 304 Stainless Steel',
      'Capacity': '500 ml',
      'Insulation': 'Double-Wall Vacuum Insulation',
      'Customization': 'Laser Engraving (Silver finish) or UV Print'
    },
    isCustomizable: true,
    minOrderQty: 10,
    bulkTiers: [
      { minQty: 10, discountPercent: 0 },
      { minQty: 50, discountPercent: 12 },
      { minQty: 100, discountPercent: 20 }
    ],
    colors: ['Matte Black', 'Navy Blue', 'Silver Chrome', 'Rose Pink', 'Pure White'],
    rating: 5.0,
    reviewCount: 56,
    inStock: true,
    isFeatured: true,
    badge: 'Popular Corporate Gift'
  },
  // Mugs
  {
    id: 'prod-ceramic-mug',
    name: 'Executive Two-Tone Ceramic Mug (350ml)',
    category: 'Mugs',
    priceUGX: 18000,
    priceUSD: 4.8,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    description: 'High-gloss ceramic coffee mug with vibrant colored interior and matching handle. Scratch-proof, sublimation printed with crisp photographic resolution.',
    specifications: {
      'Material': 'Premium Grade AAA Ceramic',
      'Capacity': '350 ml / 11 oz',
      'Care': 'Dishwasher and Microwave Safe',
      'Packaging': 'Individual White Gift Box Included'
    },
    isCustomizable: true,
    minOrderQty: 12,
    colors: ['Navy / White', 'Pink / White', 'Black / White', 'Blue / White'],
    rating: 4.9,
    reviewCount: 64,
    inStock: true,
    badge: 'Daily Essential'
  },
  // Pens & Notebooks
  {
    id: 'prod-leather-notebook',
    name: 'Executive Hardcover Leather PU Journal (A5)',
    category: 'Notebooks',
    priceUGX: 32000,
    priceUSD: 8.5,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    description: 'Luxurious thermal PU leather notebook with ribbon bookmark, elastic closure band, and pen loop. Contains 192 numbered ruled pages of 80gsm cream woodfree paper. Custom blind debossed or gold foiled.',
    specifications: {
      'Cover': 'Thermo PU Leather (Smooth Touch)',
      'Size': 'A5 (148 x 210 mm)',
      'Pages': '192 Lined 80gsm Cream Pages',
      'Finish': 'Debossing, Foil Stamping, or UV Color Print'
    },
    isCustomizable: true,
    minOrderQty: 15,
    colors: ['Executive Navy', 'Jet Black', 'Rich Tan Brown', 'Ruby Red'],
    rating: 4.9,
    reviewCount: 29,
    inStock: true
  },
  {
    id: 'prod-metal-pen',
    name: 'Heavyweight Metal Executive Rollerball Pen',
    category: 'Pens',
    priceUGX: 15000,
    priceUSD: 4,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=800',
    description: 'Solid brass barrel with matte metallic coating and polished chrome accents. Smooth Swiss 0.7mm rollerball ink cartridge. Laser engraved with company name or recipient initials.',
    specifications: {
      'Material': 'Solid Brass & Chrome',
      'Ink': 'German Document-Proof Black Gel',
      'Customization': 'Precision Laser Engraving'
    },
    isCustomizable: true,
    minOrderQty: 25,
    colors: ['Midnight Navy', 'Matte Black', 'Brushed Silver'],
    rating: 4.8,
    reviewCount: 31,
    inStock: true
  },
  // Gift Sets & Awards
  {
    id: 'prod-vip-gift-box',
    name: 'Prestige 5-in-1 Executive Corporate Gift Set',
    category: 'Gift Sets',
    priceUGX: 165000,
    priceUSD: 43.5,
    originalPriceUGX: 195000,
    originalPriceUSD: 51,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate VIP welcome and client appreciation gift box. Includes Smart LED Flask, A5 Leather Journal, Metal Rollerball Pen, 10,000mAh Slim Power Bank, and 32GB Metal USB Key, presented in a custom rigid presentation box with die-cut EVA foam.',
    specifications: {
      'Box': 'Rigid Custom Foam Padded Gift Box with Magnetic Clasp',
      'Contents': 'Flask + Notebook + Pen + Powerbank + 32GB USB',
      'Branding': 'Coordinated Logo on all 5 items + Box Lid Foil'
    },
    isCustomizable: true,
    minOrderQty: 5,
    colors: ['Executive Navy / Silver', 'All Black Stealth Edition'],
    rating: 5.0,
    reviewCount: 22,
    inStock: true,
    isFeatured: true,
    badge: 'Luxury VIP Pick'
  },
  {
    id: 'prod-crystal-award',
    name: 'Optic Crystal Star Corporate Achievement Trophy',
    category: 'Trophies',
    priceUGX: 120000,
    priceUSD: 31.5,
    image: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&q=80&w=800',
    description: 'Premium K9 optical heavy crystal award with faceted bevel edges and solid black crystal base. 3D sub-surface laser engraving or deep sandblast etching with silver/gold fill. Comes in satin-lined gift box.',
    specifications: {
      'Material': 'Grade K9 Optical Pure Crystal',
      'Height': '220 mm / 8.6 inches',
      'Weight': '1.4 kg',
      'Packaging': 'Deluxe Velvet & Satin Lined Presentation Case'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 19,
    inStock: true
  },
  // Banners & Event Signage
  {
    id: 'prod-pullup-banner',
    name: 'Executive Deluxe Broad-Base Roll-Up Banner (85x200cm)',
    category: 'Banners',
    priceUGX: 185000,
    priceUSD: 48.5,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    description: 'Heavy-duty teardrop aluminum luxury broad base stand. High-resolution anti-curl blackout PET film banner print with glare-free matte finish. Includes luxury padded canvas carry bag with shoulder strap.',
    specifications: {
      'Size': '85 cm x 200 cm (Standard) or 120 x 200 cm (Wide)',
      'Media': 'Anti-Curl Non-Tear Matte Blockout Polymer',
      'Base': 'Weighted Aluminum Luxury Broad Base (No swing-out feet needed)',
      'Carry Bag': 'Padded Heavy-Duty Nylon Zipper Case'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.9,
    reviewCount: 53,
    inStock: true,
    isFeatured: true,
    badge: 'Event Standard'
  },
  {
    id: 'prod-teardrop-flag',
    name: 'Outdoor Wind-Resistant Teardrop Flying Flag (3.5m)',
    category: 'Banners',
    priceUGX: 240000,
    priceUSD: 63,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
    description: 'High-visibility outdoor flag engineered for wind resistance. 110gsm knitted polyester fabric with vivid double-sided dye sublimation print. Includes flexible fiberglass pole and heavy steel cross base with water ring.',
    specifications: {
      'Pole Height': '3.5 Meters',
      'Fabric': '110 GSM Knitted Polyester (UV & Rain Resistant)',
      'Base Options': 'Steel Ground Spike or Indoor Cross Base + Water Bag'
    },
    isCustomizable: true,
    minOrderQty: 2,
    rating: 4.8,
    reviewCount: 27,
    inStock: true
  },
  // Business Cards & Brochures
  {
    id: 'prod-business-cards',
    name: 'Executive 450gsm Cotton Velvet Soft-Touch Business Cards',
    category: 'Business Cards',
    priceUGX: 95000,
    priceUSD: 25,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-thick 450gsm cardstock with double-sided velvet soft-touch lamination, raised metallic gold/silver foil highlights, and precision edge foiling or rounded corners. Box of 200 cards.',
    specifications: {
      'Stock': '450 GSM Premium Duplex Cardboard',
      'Quantity': 'Pack of 200 Cards',
      'Finishing': 'Soft-Touch Matte Lamination + Raised Gold/Silver Foil',
      'Packaging': 'Deluxe Acrylic Magnetic Desk Case'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 71,
    inStock: true,
    badge: 'Flagship Card'
  },
  {
    id: 'prod-tri-fold-brochure',
    name: 'Corporate Gloss Tri-Fold Marketing Brochures (A4 to DL)',
    category: 'Brochures',
    priceUGX: 180000,
    priceUSD: 47,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    description: 'Full-color offset printed on 170gsm silk art paper with machine coating for smudge-free handling. Precision machine scored and folded into sleek 6-panel presentations. Pack of 250 brochures.',
    specifications: {
      'Paper': '170 GSM Silk / Gloss Art Paper',
      'Quantity': 'Pack of 250 Copies',
      'Folding': 'Z-Fold or Roll Fold (Tri-Fold)',
      'Colors': 'Full Color CMYK Front & Back'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.9,
    reviewCount: 34,
    inStock: true
  },
  // Packaging & Stickers
  {
    id: 'prod-rigid-packaging',
    name: 'Custom Luxury Rigid Presentation Product Boxes',
    category: 'Packaging',
    priceUGX: 18000,
    priceUSD: 4.7,
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=800',
    description: 'Sturdy 1200gsm greyboard wrapped with printed 157gsm coated art paper. Custom printed with foil accents, magnetic closure, and custom die-cut high-density foam inserts.',
    specifications: {
      'Structure': 'Book-Style Magnetic Flip Box or Lid & Base',
      'Board': '1200 GSM Heavy Industrial Board',
      'Insert': 'Custom Cut High-Density EVA Foam with Velvet Flocking'
    },
    isCustomizable: true,
    minOrderQty: 50,
    rating: 4.9,
    reviewCount: 18,
    inStock: true
  },
  {
    id: 'prod-vinyl-stickers',
    name: 'Waterproof Die-Cut Vinyl Brand Stickers (Pack of 500)',
    category: 'Stickers',
    priceUGX: 75000,
    priceUSD: 19.5,
    image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&q=80&w=800',
    description: 'Durable vinyl labels with matte or gloss laminate. 100% waterproof, oil-resistant, and scratch-proof for bottles, takeaway packaging, laptops, and cosmetic jars.',
    specifications: {
      'Material': 'Premium Polypropylene Vinyl',
      'Cutting': 'Custom Die-Cut or Kiss-Cut Sheets',
      'Quantity': 'Pack of 500 Stickers (Approx 5cm x 5cm)'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.9,
    reviewCount: 46,
    inStock: true
  },
  // Umbrellas & Keyholders
  {
    id: 'prod-golf-umbrella',
    name: 'Executive Heavy-Duty Windproof Golf Umbrella (30")',
    category: 'Umbrellas',
    priceUGX: 55000,
    priceUSD: 14.5,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800',
    description: 'Double canopy wind-vented golf umbrella with fiberglass ribs, auto-open button, and soft EVA foam grip handle. High-definition screen printed logo across alternating panels.',
    specifications: {
      'Canopy Size': '30 Inches / 130 cm Open Diameter',
      'Shaft': '14mm Heavy-Duty Fiberglass Rod',
      'Fabric': '190T Pongee Water-Repellent Fabric'
    },
    isCustomizable: true,
    minOrderQty: 10,
    colors: ['Navy / White', 'All Black', 'Royal Blue / White', 'Maroon / White'],
    rating: 4.9,
    reviewCount: 25,
    inStock: true
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'port-1',
    title: 'Xani Foods Complete Brand & Packaging Overhaul',
    client: 'Xani Foods Ltd',
    category: 'Corporate Branding',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Complete visual identity transformation, retail packaging architecture, and corporate fleet branding for Uganda’s fast-rising organic snack manufacturer.',
    challenge: 'Xani Foods had outgrown their initial artisanal label and needed an international retail presence capable of competing in regional supermarket chains across East Africa.',
    solution: 'Engineered a striking visual language centered on Ugandan agricultural authenticity, custom food-safe barrier packaging with foil accents, and high-impact shelf-ready corrugated boxes.',
    execution: 'Delivered 250,000 retail pouches, branded 6 distribution delivery vans, and created a 48-page corporate brand identity manual.',
    results: [
      '140% Increase in retail distribution placement within 90 days',
      'Successfully listed in 35+ major supermarket outlets across Kampala and Entebbe',
      'Won Best Agro-Processing Packaging at the 2025 Uganda SME Awards'
    ],
    testimonial: {
      quote: 'Sozy Impressions delivered a packaging system that allowed us to negotiate top-tier supermarket shelf placement immediately. Their precision and speed are world-class.',
      author: 'David Kato',
      role: 'Managing Director, Xani Foods Ltd'
    }
  },
  {
    id: 'port-2',
    title: 'East African Fintech Summit 2025 Experiential Branding',
    client: 'East Africa Digital Finance Council',
    category: 'Event Branding',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Turnkey visual production for a 1,200-delegate international financial technology summit at the Speke Resort Munyonyo Convention Centre.',
    challenge: 'Strict 48-hour setup window requiring 40+ branded stage backdrops, 3D illuminated podiums, 1,200 RFID delegate kits, and 12 sponsor booth structures.',
    solution: 'Deployed a dedicated 24-man production and installation crew. Fabricated lightweight modular aluminum tension fabric walls and high-density laser-engraved VIP gift packs.',
    execution: 'Delivered zero-defect execution across 3 conference auditoriums, 1 VIP lounge, and 2 outdoor networking marquees.',
    results: [
      '1,200 Delegates registered and equipped without delay',
      '100% Sponsor brand satisfaction rating across 24 corporate sponsors',
      'Contract renewed for the 2026 regional edition in Nairobi'
    ],
    testimonial: {
      quote: 'Flawless execution under impossible deadlines. The stage backdrops looked incredible on international live streams.',
      author: 'Grace Namutebi',
      role: 'Head of Events, EADFC'
    }
  },
  {
    id: 'port-3',
    title: 'Apex Law Advocates Corporate Office & Stationery Architecture',
    client: 'Apex Law Advocates',
    category: 'Corporate Branding',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'High-end architectural signage, frosted acoustic glass vinyl, executive stationery, and leather partner gift kits for a premier Kampala commercial law firm.',
    challenge: 'Communicating prestige, confidentiality, and modern legal authority in a newly acquired corporate tower on Nakasero Hill.',
    solution: 'Designed and installed brushed brass 3D backlit lettering, bespoke frosted privacy films with traditional African geometric watermarks, and 450gsm foil-stamped cotton stationery.',
    execution: 'Turnkey delivery over 10 days covering 3 floors of partner offices, boardrooms, and reception lobbies.',
    results: [
      'Elevated firm positioning to top-tier institutional clients',
      'Seamless brand consistency from reception entrance to legal brief folios'
    ]
  },
  {
    id: 'port-4',
    title: 'Victoria Health Foundation 10th Anniversary Merchandise',
    client: 'Victoria Health Foundation',
    category: 'Customised Gifts',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Custom VIP gift sets, embroidered cotton polos, vacuum flasks, and commemorative crystal awards for 500 healthcare leaders and donor partners.',
    challenge: 'Producing luxury, sustainable, medical-grade branded items with exact Pantone color matching for international donor presentation.',
    solution: 'Sourced food-grade stainless steel temperature flasks and bamboo-trimmed notebooks packaged in 100% recycled rigid magnetic boxes.',
    execution: 'Delivered 500 complete boxed gift sets on schedule to international delegates.',
    results: [
      'Overwhelmingly positive feedback from USAID, WHO, and Ministry of Health dignitaries'
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    name: 'Godfrey Mugisha',
    company: 'Nile Exports & Logistics Ltd',
    position: 'Chief Commercial Officer',
    quote: 'Sozy Impressions is by far the most reliable corporate printing and branding partner in Uganda. When we rebranded our nationwide distribution fleet and corporate stationery, their precision, Heidelberg offset quality, and adherence to delivery deadlines exceeded our expectations.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    projectType: 'Fleet Branding & Offset Printing',
    verified: true
  },
  {
    id: 't-2',
    name: 'Brenda Kyomugisha',
    company: 'Stanbic Business Incubator Member',
    position: 'Founder & CEO',
    quote: 'From our initial product packaging design to our custom smart flasks and branded exhibition booths, Sozy Impressions transformed our startup into an authoritative corporate brand. Our conversion rates at regional expos doubled.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    projectType: 'Brand Identity & Custom Merchandise',
    verified: true
  },
  {
    id: 't-3',
    name: 'Dr. Arthur Ssenyange',
    company: 'Kampala International Medical Centre',
    position: 'Director of Operations',
    quote: 'The hospital signage, frosted glass branding, and institutional stationery delivered by Sozy Impressions gave our new medical wing a modern, trustworthy, and welcoming atmosphere. Highly recommended for corporate institutional work.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    projectType: 'Corporate Signage & Wayfinding',
    verified: true
  },
  {
    id: 't-4',
    name: 'Joanita Akello',
    company: 'East Africa Youth Empowerment NGO',
    position: 'Head of Communications',
    quote: 'We ordered 800 custom polo shirts, notebooks, and pull-up banners for our annual summit in Jinja. Delivered 2 days ahead of schedule, vibrant colors, and premium embroidery that our donors loved!',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    projectType: 'Event Branding & Apparel',
    verified: true
  }
];

export const CLIENT_LOGOS = [
  { name: 'Xani Foods', category: 'FMCG' },
  { name: 'A3 Collections', category: 'Retail' },
  { name: 'Speke Group', category: 'Hospitality' },
  { name: 'Kairos Ministries', category: 'Institution' },
  { name: 'Elayna Estates', category: 'Real Estate' },
  { name: 'Nile Exports', category: 'Logistics' },
  { name: 'Apex Law Advocates', category: 'Legal' },
  { name: 'Victoria Health', category: 'Healthcare' },
  { name: 'Kampala University', category: 'Education' },
  { name: 'Eco-Solar Africa', category: 'Energy' }
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'zone-kla-central',
    name: 'Kampala Central & CBD',
    districts: ['Kampala Central', 'Nakasero', 'Kololo', 'Old Kampala', 'Kamwokya'],
    feeUGX: 10000,
    feeUSD: 2.5,
    estimatedDays: 'Same Day / 24 Hours'
  },
  {
    id: 'zone-greater-kla',
    name: 'Greater Kampala & Wakiso',
    districts: ['Ntinda', 'Naguru', 'Kira', 'Najjera', 'Entebbe', 'Kajjansi', 'Makindye', 'Rubaga', 'Kawempe'],
    feeUGX: 15000,
    feeUSD: 4.0,
    estimatedDays: '24 - 48 Hours'
  },
  {
    id: 'zone-central-reg',
    name: 'Central Region (Mukono, Jinja, Luwero, Masaka)',
    districts: ['Mukono', 'Jinja', 'Luwero', 'Masaka', 'Mityana', 'Kayunga'],
    feeUGX: 30000,
    feeUSD: 8.0,
    estimatedDays: '1 - 2 Business Days'
  },
  {
    id: 'zone-upcountry',
    name: 'Upcountry Uganda (Mbarara, Gulu, Mbale, Arua, Fort Portal, Kabale)',
    districts: ['Mbarara', 'Gulu', 'Mbale', 'Arua', 'Fort Portal', 'Kabale', 'Lira', 'Soroti', 'Hoima', 'Tororo'],
    feeUGX: 45000,
    feeUSD: 12.0,
    estimatedDays: '2 - 3 Business Days (Courier / Bus Partner)'
  },
  {
    id: 'zone-pickup',
    name: 'Free Studio Pickup (Nkrumah Road Studio, Kampala)',
    districts: ['Self-Pickup at Workshop'],
    feeUGX: 0,
    feeUSD: 0,
    estimatedDays: 'Ready for Collection during Business Hours'
  }
];

export const INDUSTRIES_DATA: IndustrySolution[] = [
  {
    id: 'corporate-finance',
    name: 'Corporates & Financial Institutions',
    tagline: 'High-trust, security-conscious branding and executive collateral.',
    description: 'We help banks, fintechs, insurance firms, and multinational corporations maintain flawless brand consistency across branches, shareholder reports, executive boardrooms, and staff merchandise.',
    iconName: 'Building',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    keyNeeds: [
      'High-security carbonless continuous stationery & receipts',
      'Annual financial reports with spot UV & Smyth sewn binding',
      'Branch reception signage and privacy frosted glass films',
      'Executive client appreciation VIP gift hampers'
    ],
    recommendedServices: ['Offset Printing', 'Corporate Branding', 'Customised Gifts'],
    caseStudySnippet: 'Delivered nationwide branch signage and stationery for leading financial institutions in Uganda.'
  },
  {
    id: 'education-institutions',
    name: 'Schools & Universities',
    tagline: 'Institutional prestige, examination security, and graduation essentials.',
    description: 'Partnering with universities, secondary schools, and training institutes for tamper-evident certificates, student identity cards, branded uniforms, examination booklets, and prospectus books.',
    iconName: 'GraduationCap',
    heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    keyNeeds: [
      'Security holographic certificates and diplomas',
      'Custom school magazines, yearbooks & prospectuses',
      'Embroidered staff and student polo shirts, blazers & ties',
      'Graduation ceremony stage branding & awards plaques'
    ],
    recommendedServices: ['Offset Printing', 'Digital Printing', 'Customised Gifts', 'General Supplies'],
    caseStudySnippet: 'Equipped over 20,000 students and staff with custom badges and academic planners annually.'
  },
  {
    id: 'ngos-development',
    name: 'NGOs & Development Agencies',
    tagline: 'Field-ready project visibility, donor compliance, and community campaign kits.',
    description: 'We supply international NGOs and humanitarian missions with compliant, rugged visibility merchandise, pull-up banners, community awareness posters, and field staff gear.',
    iconName: 'Globe',
    heroImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200',
    keyNeeds: [
      'High-visibility reflective field vests and rain jackets',
      'Donor-compliant multilingual educational flipcharts and posters',
      'Durable outdoor event tents and flying banner flags',
      'Conference kits with eco-friendly bamboo and jute bags'
    ],
    recommendedServices: ['Event Branding', 'Customised Gifts', 'Digital Printing'],
    caseStudySnippet: 'Executed nationwide public health campaign collateral across 40 districts in Uganda.'
  },
  {
    id: 'healthcare-pharma',
    name: 'Healthcare & Pharmaceuticals',
    tagline: 'Sterile packaging, patient forms, and hygienic facility branding.',
    description: 'Supporting hospitals, clinics, and pharmaceutical distributors with precision clinical forms, medicine packaging cartons, wayfinding signs, and staff medical scrubs.',
    iconName: 'HeartPulse',
    heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
    keyNeeds: [
      'Patient file folders, prescription pads & laboratory slips',
      'Antimicrobial wall vinyl and hospital room wayfinding totems',
      'Custom pharmaceutical carton packaging and insert leaflets',
      'Branded doctor lab coats and nurse scrubs'
    ],
    recommendedServices: ['Offset Printing', 'Corporate Branding', 'General Supplies'],
    caseStudySnippet: 'Complete hospital wing rebranding and clinical documentation system for top medical centres.'
  },
  {
    id: 'hospitality-tourism',
    name: 'Hospitality & Tourism',
    tagline: 'Memorable guest experiences, luxury menus, and safari lodge branding.',
    description: 'Elevate safari lodges, luxury hotels, and high-end restaurants with waterproof luxury menus, guest room amenity packaging, vehicle safari wraps, and safari merchandise.',
    iconName: 'Utensils',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
    keyNeeds: [
      'Waterproof, stain-resistant leather & acrylic food & wine menus',
      'Custom branded wooden keycards and door hangers',
      'Safari 4x4 vehicle fleet magnetic and cast vinyl wraps',
      'Guest welcome gift packs with Ugandan coffee and local crafts'
    ],
    recommendedServices: ['Customised Gifts', 'Corporate Branding', 'Digital Printing'],
    caseStudySnippet: 'Bespoke menu design and lodge branding for premiere tourist destinations in Murchison and Bwindi.'
  },
  {
    id: 'real-estate-construction',
    name: 'Real Estate & Construction',
    tagline: 'Large-scale hoardings, sales brochures, and site safety signs.',
    description: 'Transform construction sites into powerful sales magnets with weather-resistant perimeter hoardings, luxury architectural sales brochures, and branded safety gear.',
    iconName: 'HardHat',
    heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200',
    keyNeeds: [
      'Heavy-duty outdoor billboard hoardings and mesh banners',
      'Foil-stamped property investor prospectuses and floorplans',
      'Branded safety helmets, high-vis reflector jackets and boots',
      'Show-house 3D acrylic signs and acrylic sales models'
    ],
    recommendedServices: ['Event Branding', 'Offset Printing', 'General Supplies'],
    caseStudySnippet: 'Branded 5 luxury residential estates in Kololo and Naguru with total sales collateral suites.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: '10 Essential Branding Strategies for High-Growth Kampala Enterprises in 2026',
    slug: 'essential-branding-strategies-kampala-startups',
    category: 'Branding',
    date: 'August 10, 2026',
    readTime: '6 min read',
    author: 'Marvin Sozy',
    authorRole: 'Founder & Creative Director',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'Building an authoritative corporate brand in Uganda’s dynamic economy requires far more than a flashy logo. Discover 10 strategic pillars that win customer trust and enterprise contracts.',
    tags: ['Branding', 'Uganda Business', 'Strategy', 'Corporate Identity'],
    content: `### 1. The Trust Equation in the Ugandan Marketplace
In Kampala’s competitive business landscape, corporate buyers and consumers alike make purchasing decisions based on perceived institutional stability. A fragmented visual identity—with different logos on your invoices, social media, delivery vans, and office reception—signals operational unreliability.

### 2. High-Impact Physical Touchpoints
While digital marketing is essential, East African business remains deeply relational. When an executive receives an ultra-thick 450gsm soft-touch business card with raised gold foil, or drinks from a laser-engraved LED smart flask during a board meeting, your company immediately stands apart from fly-by-night competitors.

### 3. Consistency Across Corporate Fleet and Signage
Your company vehicles travel hundreds of kilometers daily across Kampala, Jinja, and upcountry routes. High-grade cast vinyl fleet branding turns your daily logistics into high-ROI floating billboards.

### 4. Precision Print Collateral for Procurement
When bidding on major government, NGO, or corporate tenders, the quality of your printed Company Profile directly impacts evaluation scoring. Crisp offset printing, Heidelberg color registration, and Smyth-sewn binding command serious attention.

### 5. Summary Blueprint
- Audit your brand touchpoints every 6 months
- Standardize your Pantone color codes across print and digital
- Invest in premium merchandise that clients will actually keep on their desks
- Work with an integrated full-service partner to maintain strict quality control.`
  },
  {
    id: 'blog-2',
    title: 'Offset vs. Digital Printing: How to Choose the Cost-Effective Method for Your Business',
    slug: 'offset-vs-digital-printing-guide-uganda',
    category: 'Printing',
    date: 'July 28, 2026',
    readTime: '5 min read',
    author: 'Alex Mukasa',
    authorRole: 'Head of Pre-Press & Production',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'Demystifying the economics of commercial printing. Understand when to choose high-speed digital printing for short runs versus German Heidelberg offset printing for massive cost savings at volume.',
    tags: ['Offset Printing', 'Digital Printing', 'Cost Optimization', 'Pre-Press'],
    content: `### Understanding the Core Technologies
Many business managers struggle to determine whether their project requires digital or offset printing. Here is the definitive breakdown:

### Digital Printing (The Speed King)
- **Best for:** Quantities under 500 units, variable data (individual names/numbers), same-day urgent turnarounds.
- **How it works:** Direct toner or liquid electroink transfer with zero setup plate costs.
- **Ideal products:** Express conference flyers, personalized certificates, event invitations, sample packaging mockups.

### Offset Printing (The Volume Champion)
- **Best for:** Quantities over 1,000 units, strict Pantone color matching, specialty paper weights over 350gsm.
- **How it works:** Custom aluminum CTP plates transfer ink to rubber blankets, then onto paper at speeds up to 15,000 sheets per hour.
- **Ideal products:** Annual reports, carbonless invoice books, product catalogues, retail packaging boxes, brochures.

### Cost Crossover Analysis
For a standard A4 tri-fold brochure in Kampala:
- 100 copies: Digital is 60% cheaper (no plate setup fees).
- 5,000 copies: Offset is 75% cheaper per unit than digital!

At Sozy Impressions Ltd, our pre-press engineers automatically evaluate your job parameters to route it to the most cost-effective production press.`
  },
  {
    id: 'blog-3',
    title: 'The ROI of Executive Corporate Gifts: Why Smart Companies Never Give Cheap Swag',
    slug: 'roi-corporate-gifts-custom-merchandise',
    category: 'Corporate Gifts',
    date: 'July 14, 2026',
    readTime: '4 min read',
    author: 'Sarah Namatovu',
    authorRole: 'Client Success & Merchandise Lead',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1200',
    excerpt: 'Cheap pens that leak and flimsy t-shirts hurt your brand reputation. Discover how curated, high-utility corporate gift sets generate long-term executive client loyalty.',
    tags: ['Corporate Gifts', 'Merchandise', 'Client Retention', 'Swag'],
    content: `### Why Cheap Swag is Brand Suicide
When you hand a prospective client or VIP partner a flimsy plastic pen that stops writing on day two, you are subconsciously teaching them that your company cuts corners on quality.

### The Power of High-Utility Merchandise
Research shows that recipients keep high-quality promotional products for an average of 18 months. The most impactful items share three traits:
1. **Daily Utility:** Smart temperature vacuum flasks, heavy-duty umbrellas, hardcover notebooks.
2. **Subtle Elegance:** Precision laser-engraved or debossed logos that don’t scream like a billboard.
3. **Packaging Experience:** Magnetic presentation boxes with custom foam cutouts create a genuine 'unboxing' delight.

### Calculating Lifetime Value (LTV)
An investment of UGX 150,000 in a premium VIP gift set given to a key client holding a UGX 50M annual contract represents a mere 0.3% relationship cost that cements multi-year loyalty.`
  }
];

export const FAQS_DATA = [
  {
    question: 'Where is Sozy Impressions Ltd located, and do you deliver nationwide across Uganda?',
    answer: 'Our main creative studios and offset pre-press production facility are strategically located on Nkrumah Road & Jinja Road in Kampala, Uganda. We provide fast doorstep delivery across all divisions of Kampala, Wakiso, and Entebbe, as well as reliable scheduled regional delivery to Jinja, Mbarara, Gulu, Mbale, Fort Portal, Arua, and upcountry districts through our verified courier network.'
  },
  {
    question: 'What is your standard turnaround time for printing and custom merchandise?',
    answer: 'Turnaround depends on the service and quantity: Digital printing and express banners are typically ready within 24 to 48 hours. High-volume Heidelberg offset printing (brochures, magazines, packaging) takes 2 to 5 business days. Custom corporate gifts and embroidery generally take 3 to 5 business days. We also offer express rush services for urgent corporate deadlines.'
  },
  {
    question: 'Can I request a digital mockup and physical sample before mass production?',
    answer: 'Absolutely. We provide a complimentary high-resolution 3D digital PDF proof for every custom order prior to production. For large-scale corporate offset printing or high-volume merchandise runs (over 500 units), physical pre-production sample proofs can be arranged for sign-off.'
  },
  {
    question: 'What artwork formats do you accept for printing and engraving?',
    answer: 'We recommend vector formats for highest print clarity: Adobe Illustrator (.AI), Editable Vector PDF (.PDF), CorelDraw (.CDR), or EPS. For raster artwork, ensure images are CMYK mode with at least 300 DPI resolution. If you do not have print-ready files, our in-house graphics design team can prepare or reconstruct your artwork.'
  },
  {
    question: 'What payment methods do you accept, and do you accept corporate LPOs?',
    answer: 'We accept MTN Mobile Money, Airtel Money, Visa, Mastercard, Direct Bank Wire Transfers (EFT / RTGS), and Cheques. For registered corporate clients, NGOs, educational institutions, and government parastatals, we accept formal Local Purchase Orders (LPOs) with standard 30-day invoice credit terms upon pre-approval.'
  },
  {
    question: 'Do you offer wholesale bulk discounts for corporate organizations and agencies?',
    answer: 'Yes! We have structured tiered bulk discount pricing starting from 50, 100, 250, 500, and 1,000+ units across our entire e-commerce and printing catalogue. The larger your order volume, the lower your unit cost.'
  }
];
