import { 
  ServiceItem, 
  Product, 
  PortfolioProject, 
  Testimonial, 
  IndustrySolution, 
  BlogPost, 
  DeliveryZone 
} from '../types';

import tumblerMugImg from '../assets/images/tumbler_mug_1788634322323.jpg';
import cushionImg from '../assets/images/personalised_cushion_1788634222492.jpg';
import calendarFrameImg from '../assets/images/calendar_photo_frame_1788634271713.jpg';
import neonLightImg from '../assets/images/neon_lights_gift_1788634255448.jpg';
import rosesBouquetImg from '../assets/images/roses_bouquet_1788634336414.jpg';
import combosImg from '../assets/images/combos_gift_set_1788634366784.jpg';
import stationeryImg from '../assets/images/stationery_caddy_1788634352075.jpg';
import fridgeMagnetsImg from '../assets/images/fridge_photo_magnets_1788634286788.jpg';
import accessoriesImg from '../assets/images/g_lamp_accessories_1788634381991.jpg';
import caricatureImg from '../assets/images/caricature_standee_1788634238550.jpg';
import tabletopFrameImg from '../assets/images/tabletop_frame_1788635214871.jpg';
import photoSpeakerImg from '../assets/images/photo_speaker_1788635229629.jpg';
import moonLampImg from '../assets/images/moon_lamp_1788635244442.jpg';
import deskClockImg from '../assets/images/desk_clock_1788635262427.jpg';
import coupleKeychainsImg from '../assets/images/couple_keychains_1788635276974.jpg';
import barFlaskImg from '../assets/images/bar_flask_1788635290861.jpg';
import customEarbudsImg from '../assets/images/custom_earbuds_1788635304232.jpg';
import celebrationFlowersImg from '../assets/images/celebration_flowers_1788635644325.jpg';
import celebrationCakeImg from '../assets/images/celebration_cake_1788635656003.jpg';
import celebrationExplosionBoxImg from '../assets/images/celebration_explosion_box_1788635668598.jpg';
import celebrationChocolatesImg from '../assets/images/celebration_chocolates_1788635680950.jpg';
import celebrationGreetingCardImg from '../assets/images/celebration_greeting_card_1788635694483.jpg';
import celebrationJewelleryImg from '../assets/images/celebration_jewellery_1788635705456.jpg';

export const COMPANY_INFO = {
  name: 'Sozy Impressions Ltd',
  tagline: 'We Build Brands That Stand Out',
  slogan: 'Print. Brand. Create. Impress.',
  logoUrl: 'https://www.image2url.com/r2/default/images/1786717468624-8d57a567-d5cb-4ce7-93eb-959e8e208022.png',
  website: 'https://sozyimpressions.com',
  email: 'sales@sozyimpressions.com',
  phone: '+256 709 390 168',
  whatsapp: '0787662183',
  whatsappDirectUrl: 'https://wa.me/256787662183',
  address: 'Plot 42, Nkrumah Road & Jinja Road Creative Studio, Kampala, Uganda',
  workingHours: 'Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 4:00 PM',
  establishedYear: '2023',
  yearsExperience: '3+',
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
    image: 'https://www.image2url.com/r2/default/images/1787601463920-8b43d53e-0c4f-4c24-9a7b-f4d311fef382.png',
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
    image: 'https://www.image2url.com/r2/default/images/1787602576366-b2c6de93-70bd-4614-b866-d971b97cfa34.jpg',
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
    iconName: 'Flag',
    image: 'https://www.image2url.com/r2/default/images/1787603004866-eb9a323c-894f-4d7d-887a-3907dda8cb1c.png',
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
    image: 'https://www.image2url.com/r2/default/images/1787603237030-2c152050-7643-4328-95ee-ee949ad1243e.jpg',
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
    image: 'https://www.image2url.com/r2/default/images/1787245904300-92b2510a-35e8-48fb-baa3-cf6cad715088.jpg',
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
    image: 'https://www.image2url.com/r2/default/images/1787246892685-e45b897d-1612-4692-8cc4-e3290c8ade28.png',
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
    image: 'https://www.image2url.com/r2/default/images/1787246355569-bd7ea187-358d-4f41-88d0-574e2fe335c7.jpg',
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
    image: 'https://www.image2url.com/r2/default/images/1787246238224-3e208503-a79e-4276-a8a4-f4fd705244a2.jpg',
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
  },
  // Bamboo Gifts
  {
    id: 'prod-bamboo-flask',
    name: 'Natural Bamboo Stainless Vacuum Thermos Flask (500ml)',
    category: 'Bamboo Gifts',
    priceUGX: 48000,
    priceUSD: 12.8,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800',
    description: 'Eco-friendly natural organic bamboo casing over 304 food-grade double-wall stainless steel with removable tea strainer basket. Precision laser-engraved with your recipient name or corporate brand.',
    specifications: {
      'Casing': '100% Genuine Renewable Bamboo',
      'Interior': '304 Food-Grade Stainless Steel Vacuum Sealed',
      'Capacity': '500 ml',
      'Customization': 'Deep Laser Etching or UV Full-Color Print'
    },
    isCustomizable: true,
    minOrderQty: 5,
    rating: 4.9,
    reviewCount: 39,
    inStock: true,
    badge: 'Eco Friendly'
  },
  {
    id: 'prod-bamboo-notebook-set',
    name: 'Organic Bamboo Hardcover Journal & Ballpoint Pen Set',
    category: 'Bamboo Gifts',
    priceUGX: 42000,
    priceUSD: 11,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    description: 'Sustainable real bamboo wood notebook cover with 140 pages of 100% recycled unbleached paper, paired with a matching bamboo twist-action ballpoint pen. Custom laser-engraved cover artwork.',
    specifications: {
      'Cover': 'Natural Bamboo Timber',
      'Paper': '140 Pages Recycled Kraft Paper',
      'Pen': 'Refillable Bamboo Barrel with Black German Ink',
      'Packaging': 'Recycled Kraft Gift Box'
    },
    isCustomizable: true,
    minOrderQty: 10,
    rating: 4.8,
    reviewCount: 28,
    inStock: true
  },
  // Glasses & Drinkware
  {
    id: 'prod-whiskey-glasses',
    name: 'Laser-Etched Heavy-Base Crystal Whiskey Glasses (Set of 2)',
    category: 'Glasses',
    priceUGX: 65000,
    priceUSD: 17.5,
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=80&w=800',
    description: 'Lead-free European ultra-clear crystal old-fashioned whiskey tumblers with heavy weighted bases. Laser-etched with monograms, crests, or corporate insignia. Packaged in a cushioned presentation box.',
    specifications: {
      'Material': 'Lead-Free Ultra-Clarified Crystal Glass',
      'Capacity': '310 ml / 10.5 oz each',
      'Etching': 'Frost Laser Sandblast Micro-Etch (Dishwasher Safe)',
      'Packaging': 'Satin-Lined Rigid Gift Box (Pair)'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 44,
    inStock: true,
    badge: 'Executive Pick'
  },
  {
    id: 'prod-wine-glasses',
    name: 'Personalised Stemless Crystal Wine Glasses (Set of 2)',
    category: 'Glasses',
    priceUGX: 58000,
    priceUSD: 15.5,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
    description: 'Elegant ergonomic stemless wine glasses for red or white wine. Permanently etched with custom commemorative dates, wedding monograms, or corporate partner logos.',
    specifications: {
      'Capacity': '450 ml each',
      'Set': '2 Glasses in Premium White Gift Case',
      'Finish': 'Frosted Laser Engraving'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.9,
    reviewCount: 31,
    inStock: true
  },
  // Keyholders
  {
    id: 'prod-leather-keyholder',
    name: 'Solid Zinc-Alloy & Top-Grain Leather Executive Keyholder',
    category: 'Keyholders',
    priceUGX: 18000,
    priceUSD: 4.8,
    image: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?auto=format&fit=crop&q=80&w=800',
    description: 'High-polish gunmetal zinc alloy with hand-stitched genuine leather strap and heavy spring-lock carabiner ring. Laser engraved with logo or initials.',
    specifications: {
      'Material': 'Zinc Alloy + Genuine Top-Grain Leather',
      'Ring': '30mm Heavy-Duty Split Keyring',
      'Customization': 'Laser Engraving on Metal Plate'
    },
    isCustomizable: true,
    minOrderQty: 10,
    colors: ['Midnight Navy', 'Chestnut Brown', 'Jet Black'],
    rating: 4.8,
    reviewCount: 52,
    inStock: true
  },
  {
    id: 'prod-acrylic-keyholder',
    name: 'Custom Shape 3D Laser-Cut Double-Sided Acrylic Keyring',
    category: 'Keyholders',
    priceUGX: 7500,
    priceUSD: 2,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    description: 'Crystal-clear 3mm acrylic cut into any custom silhouette, badge, or logo outline with scratch-proof embedded double-sided high-definition digital print.',
    specifications: {
      'Material': '3mm Optical Grade Acrylic',
      'Print': 'Double-Sided Embedded UV Gloss Print',
      'Attachment': 'Stainless Steel Swivel Ring'
    },
    isCustomizable: true,
    minOrderQty: 25,
    rating: 4.7,
    reviewCount: 65,
    inStock: true
  },
  // Wall Clocks
  {
    id: 'prod-wall-clock-alum',
    name: 'Branded 30cm Silent-Sweep Brushed Aluminum Wall Clock',
    category: 'Wall Clocks',
    priceUGX: 75000,
    priceUSD: 20,
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80&w=800',
    description: 'Contemporary 30cm circular wall clock with brushed metallic bezel, shatterproof mineral glass lens, and non-ticking silent sweep quartz movement. Full-face custom branded dial.',
    specifications: {
      'Diameter': '30 cm (12 Inches)',
      'Movement': 'High-Torque Silent Sweep Quartz (No Ticking)',
      'Dial': 'Full-Color Photographic CMYK Face Print',
      'Battery': '1 x AA Battery Included'
    },
    isCustomizable: true,
    minOrderQty: 2,
    rating: 4.9,
    reviewCount: 37,
    inStock: true,
    badge: 'Office Classic'
  },
  {
    id: 'prod-wall-clock-acrylic',
    name: 'Floating 3D Laser-Cut Acrylic Corporate Wall Clock',
    category: 'Wall Clocks',
    priceUGX: 85000,
    priceUSD: 22.5,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
    description: 'Modern frameless minimalist clock fabricated from gloss acrylic layers with raised 3D hour markers and custom company logo emblem in center.',
    specifications: {
      'Diameter': '35 cm',
      'Material': '5mm Cast Acrylic with 3D Raised Elements',
      'Warranty': '2-Year Mechanism Guarantee'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 19,
    inStock: true
  },
  // Watches
  {
    id: 'prod-executive-watch',
    name: 'Executive Laser-Engraved Minimalist Stainless Watch',
    category: 'Watches',
    priceUGX: 145000,
    priceUSD: 38,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    description: 'Understated ultra-slim Japanese quartz timepiece with 316L stainless steel case, scratch-resistant sapphire crystal lens, and genuine leather or mesh band. Laser engraved back-case message.',
    specifications: {
      'Case': '40mm Stainless Steel 316L',
      'Glass': 'Hardened Mineral Crystal Lens',
      'Movement': 'Citizen Miyota Quartz Movement',
      'Water Resistance': '3 ATM (Splashproof)',
      'Engraving': 'Custom Inscription or Brandmark on Case Back'
    },
    isCustomizable: true,
    minOrderQty: 1,
    colors: ['Silver Case / Black Leather', 'Rose Gold / Navy Leather', 'All-Black Stealth'],
    rating: 5.0,
    reviewCount: 24,
    inStock: true,
    badge: 'Prestige Award'
  },
  // Technology
  {
    id: 'prod-powerbank-slim',
    name: 'Ultra-Slim 10,000mAh Power Bank with Backlit LED Logo',
    category: 'Technology',
    priceUGX: 68000,
    priceUSD: 18,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=800',
    description: 'Matte rubberized finish power bank that illuminates your engraved company logo in bright white LED when moved or charging. Dual 2.4A USB outputs plus Type-C fast charge input/output.',
    specifications: {
      'Capacity': '10,000 mAh Li-Polymer Battery',
      'Outputs': 'Dual USB-A + Type-C Power Delivery',
      'Branding': 'Laser-Etched Illuminated LED Light-Up Logo',
      'Included': 'Braided 3-in-1 Fast Charging Cable'
    },
    isCustomizable: true,
    minOrderQty: 5,
    colors: ['Matte Black (White Glow)', 'Executive Navy (White Glow)'],
    rating: 4.9,
    reviewCount: 47,
    inStock: true,
    badge: 'Tech Bestseller'
  },
  {
    id: 'prod-metal-usb',
    name: 'Heavy-Duty 32GB Metal Swivel OTG Flash Drive',
    category: 'Technology',
    priceUGX: 25000,
    priceUSD: 6.8,
    image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&q=80&w=800',
    description: 'Solid zinc-alloy housing with 360-degree swivel clip. Features dual USB 3.0 and Type-C connectors for instant file transfer between smartphones, laptops, and conference presentations.',
    specifications: {
      'Capacity': '32 GB Grade-A High-Speed Flash Memory',
      'Interface': 'Dual USB 3.0 + Type-C OTG',
      'Customization': 'Permanent High-Contrast Laser Engraving'
    },
    isCustomizable: true,
    minOrderQty: 10,
    colors: ['Brushed Gunmetal', 'Polished Silver', 'Matte Gold'],
    rating: 4.8,
    reviewCount: 62,
    inStock: true
  },
  // Special Holiday Gifts
  {
    id: 'prod-holiday-hamper',
    name: 'Corporate Year-End Deluxe Celebration Hamper Crate',
    category: 'Special Holiday Gifts',
    priceUGX: 280000,
    priceUSD: 74,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
    description: 'Handmade pine wood keepsake crate with sliding branded lid and festive satin bow. Packed with custom insulated thermal tumbler, premium chocolates, roasted Ugandan coffee, bespoke notebook, and festive greeting card.',
    specifications: {
      'Crate': 'Solid Reusable Natural Pine Wood with Sliding Lid',
      'Contents': 'Smart LED Flask + Coffee + Chocolate + Notebook + Card',
      'Branding': 'Laser Engraved Crate Lid + Customized Card and Gifts'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 38,
    inStock: true,
    badge: 'Holiday Exclusive'
  },
  {
    id: 'prod-magic-photo-mug',
    name: 'Color-Changing Magic Heat-Sensitive Ceramic Photo Mug',
    category: 'Mugs',
    priceUGX: 22000,
    priceUSD: 5.8,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    description: 'Appears as an all-black matte mug at room temperature; pour hot coffee or tea to reveal your custom photo, heartfelt message, or vibrant brand graphic in full photographic color!',
    specifications: {
      'Capacity': '330 ml / 11 oz',
      'Mechanism': 'Thermodynamic Sublimation Pigment',
      'Care': 'Gentle Hand Wash Recommended',
      'Packaging': 'Gift Box with Bubble Protection'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    badge: 'Viral Favourite'
  },
  {
    id: 'prod-wooden-award-plaque',
    name: 'Handcrafted Mahogany Plaque with Laser-Cut Metal Inlay',
    category: 'Trophies & Medals',
    priceUGX: 95000,
    priceUSD: 25,
    image: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&q=80&w=800',
    description: 'Polished solid African mahogany timber wall or desk plaque featuring a precision etched brushed brass plate and beveled piano-finish edges. Ideal for long service, retirement, and partner awards.',
    specifications: {
      'Wood': 'Solid Sustainably Sourced African Mahogany',
      'Plate': 'Brushed Brass or Silver Aluminum with Black Inscription',
      'Size': '8 x 10 Inches (20 x 25 cm)',
      'Mounting': 'Keyhole Wall Mount + Fold-Out Brass Desk Stand'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 33,
    inStock: true
  },
  // Personalised Gifts Showcase Products (Reference: i5j.png)
  {
    id: 'prod-pers-cushion',
    name: 'Personalised Satin Couple Floral Keepsake Cushion',
    category: 'Cushions',
    priceUGX: 35000,
    priceUSD: 9.2,
    originalPriceUGX: 42000,
    originalPriceUSD: 11,
    image: cushionImg,
    description: 'Ultra-soft micro-satin personalised cushion featuring a custom romantic couple photograph framed by a blushing floral garland and elegant script. Includes plush hypoallergenic virgin fiber insert.',
    specifications: {
      'Dimensions': '40 x 40 cm (16 x 16 inches)',
      'Fabric': 'Premium Micro-Satin with Concealed Zipper',
      'Print': 'Permanent Edge-to-Edge Dye Sublimation',
      'Fill': 'Hypoallergenic Virgin Microfiber Insert Included'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 41,
    inStock: true,
    badge: 'Romantic Pick'
  },
  {
    id: 'prod-pers-tumbler-mug',
    name: 'Personalised 40oz Insulated Travel Tumbler Mug with Handle',
    category: 'Mugs',
    priceUGX: 48000,
    priceUSD: 12.5,
    originalPriceUGX: 58000,
    originalPriceUSD: 15,
    image: tumblerMugImg,
    description: 'Double-wall stainless steel travel mug tumbler with ergonomic comfort grip handle, reusable straw, and spill-proof 3-way lid. Precision laser-engraved with your custom name or initials.',
    specifications: {
      'Capacity': '40 oz / 1.18 Litres',
      'Material': '18/8 Kitchen-Grade Stainless Steel',
      'Insulation': 'Triple-Layer Vacuum (Cold for 24h, Hot for 12h)',
      'Customization': 'Permanent High-Precision Laser Engraving'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    badge: 'Trending Gift'
  },
  {
    id: 'prod-pers-calendar-frame',
    name: 'Custom Wooden Block Calendar Photo Collage Standee',
    category: 'Photo Frames',
    priceUGX: 45000,
    priceUSD: 11.8,
    image: calendarFrameImg,
    description: 'Hand-finished solid natural pine wood block base holding a high-gloss 6-photo commemorative grid and anniversary date calendar with engraved names. Perfect for milestone moments.',
    specifications: {
      'Base': 'Solid Natural Pine Wood Block',
      'Display': 'Scratch-Resistant Acrylic Grid Plaque (6 Photos)',
      'Size': '18 x 22 cm Desk Display',
      'Personalisation': '6 High-Res Photos + Custom Engraved Names & Date'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 52,
    inStock: true,
    badge: 'Anniversary Classic'
  },
  {
    id: 'prod-pers-neon-light',
    name: 'Custom LED Neon Acrylic Sign & Polaroid Keepsake ("LOVE")',
    category: 'Neon Lights',
    priceUGX: 85000,
    priceUSD: 22.5,
    originalPriceUGX: 110000,
    originalPriceUSD: 29,
    image: neonLightImg,
    description: 'Warm ambient silicon LED flex neon sign ("LOVE") set inside a modern geometric wooden tabletop frame with hanging mini photo cards. Powered by USB with dimmer switch.',
    specifications: {
      'Lighting': 'Warm White Silicon LED Flex Neon (Low Voltage USB)',
      'Frame': 'Natural Birch Plywood Geometric Stand',
      'Included': 'Dimmer Controller + 4 Mini Photo Polaroid Prints',
      'Size': '25 x 25 cm Tabletop Display'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    badge: 'Ambient Glow'
  },
  {
    id: 'prod-pers-rose-bouquet',
    name: 'Luxury Rose Bouquet with Personalised Printed Ribbon & Card',
    category: 'Flowers',
    priceUGX: 65000,
    priceUSD: 17,
    image: rosesBouquetImg,
    description: 'Hand-tied arrangement of fresh premium red and blush pink roses wrapped in luxurious frosted waterproof paper with customized satin printed ribbon and recipient keepsake photo card.',
    specifications: {
      'Stem Count': '12 Premium Fresh Long-Stem Roses',
      'Wrapping': 'Frosted Korean Water-Resistant Tissue & Silk Wrap',
      'Ribbon': 'Personalised Satin Ribbon with Custom Message',
      'Keepsake': 'Laminated Photo Message Card'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 29,
    inStock: true,
    badge: 'Fresh Blooms'
  },
  {
    id: 'prod-pers-3in1-combo',
    name: 'Personalised 3-in-1 Executive Combo: Bottle, Mug & Desk Caddy',
    category: 'Combos',
    priceUGX: 82000,
    priceUSD: 21.5,
    originalPriceUGX: 98000,
    originalPriceUSD: 26,
    image: combosImg,
    description: 'Coordinated 3-piece daily essentials combo set. Includes personalised sports drinkware bottle, ceramic coffee mug, and solid pine wood desk stationery organizer with custom name imprint.',
    specifications: {
      'Set Items': 'Sports Sipper + Ceramic Mug + Pine Desk Caddy',
      'Notepad': 'Includes 50-Sheet To-Do Notepad & Stylus Pen',
      'Personalisation': 'Matching Name & Monogram Across All 3 Items',
      'Packaging': 'Deluxe Presentation Gift Box'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 45,
    inStock: true,
    badge: 'Best Value Set'
  },
  {
    id: 'prod-pers-stationery-caddy',
    name: 'Personalised Pine Wood Desk Caddy with Photo Frame',
    category: 'Stationery',
    priceUGX: 38000,
    priceUSD: 10,
    image: stationeryImg,
    description: 'Multi-compartment solid pine wood desk caddy featuring pencil slots, stationery compartments, notepad holder, and an integrated high-definition photo frame insert with personalized message.',
    specifications: {
      'Material': 'Solid Natural Pine Wood',
      'Compartments': 'Dual Pen Well + Memo Slot + Business Card Holder',
      'Photo Window': 'Custom Full-Color Printed Photo Insert',
      'Accessories': 'Includes Yellow Highlighter & Memo Notepad'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.8,
    reviewCount: 36,
    inStock: true,
    badge: 'Desk Essential'
  },
  {
    id: 'prod-pers-fridge-magnets',
    name: 'Personalised Polaroid Acrylic Photo Fridge Magnets (Set of 4)',
    category: 'Fridge Magnets',
    priceUGX: 28000,
    priceUSD: 7.5,
    image: fridgeMagnetsImg,
    description: 'Set of 4 premium gloss acrylic magnetic photo tiles styled like retro polaroids with your custom heartfelt promise messages and pictures. Heavy-duty magnetic backing sticks firmly to refrigerators and magnetic boards.',
    specifications: {
      'Set Count': '4 Custom Photo Magnets',
      'Material': '3mm High-Gloss Cast Acrylic with Strong Magnetic Backing',
      'Size': '7 x 9 cm Each',
      'Finish': 'Waterproof Scratch-Resistant UV Printing'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.9,
    reviewCount: 57,
    inStock: true,
    badge: 'Cute Memories'
  },
  {
    id: 'prod-pers-g-lamp-set',
    name: 'G-Shape Fast Wireless Charger Bluetooth Speaker Lamp & Smart Flask',
    category: 'Accessories',
    priceUGX: 125000,
    priceUSD: 33,
    originalPriceUGX: 145000,
    originalPriceUSD: 38,
    image: accessoriesImg,
    description: 'Futuristic G-shaped ambient RGB night lamp with 15W Qi fast wireless charging pad, built-in Bluetooth speaker, and digital clock, bundled with a matching personalised matte black smart LED temperature flask.',
    specifications: {
      'Lamp': '15W Fast Wireless Charging + 3W Bluetooth 5.2 Speaker',
      'Lighting': '6 Dynamic Ambient RGB Color Modes',
      'Flask': '500ml Smart LED Temperature Vacuum Flask with Laser Engraving',
      'Power': 'Type-C Fast Charge Cable Included'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 63,
    inStock: true,
    badge: 'Tech Executive'
  },
  {
    id: 'prod-pers-caricature-standee',
    name: 'Custom Laser-Cut Acrylic Couple Caricature Standee',
    category: 'Caricatures',
    priceUGX: 55000,
    priceUSD: 14.5,
    image: caricatureImg,
    description: 'Hand-illustrated cartoon couple caricature laser-cut from 4mm high-gloss optical acrylic with celebratory quote ("Two Souls One Epic Journey") mounted on a sleek weighted black acrylic desk base.',
    specifications: {
      'Material': '4mm Optical Grade Laser-Cut Cast Acrylic',
      'Base': 'Weighted High-Gloss Jet Black Acrylic Base',
      'Height': '18 cm / 7 Inches',
      'Artwork': 'Custom Digital Caricature Illustration from Your Photo'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 78,
    inStock: true,
    badge: 'Top Customer Pick'
  },
  // Tailor-Made Treasures Showcase Products
  {
    id: 'prod-tailor-tabletop-frame',
    name: 'Rustic Swing Tabletop Photo Frame Desk Plaque',
    category: 'Table Tops',
    priceUGX: 36000,
    priceUSD: 9.5,
    originalPriceUGX: 45000,
    originalPriceUSD: 12,
    image: tabletopFrameImg,
    description: 'Artisanal natural solid pine wood desktop photo frame with brass swing hinge hooks holding a suspended dual-sided high-definition photo plaque with engraved quote.',
    specifications: {
      'Frame': 'Solid Natural Pine Wood Swivel Stand',
      'Plaque': 'High-Gloss Scratch-Proof UV Printed Panel',
      'Dimensions': '18 x 20 cm',
      'Display': 'Double-Sided Swing Photo Tile'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    badge: 'Artisan Pick'
  },
  {
    id: 'prod-tailor-speaker',
    name: 'Smart Touch LED Warm Ambient Bluetooth Photo Speaker',
    category: 'Speakers',
    priceUGX: 58000,
    priceUSD: 15.5,
    originalPriceUGX: 70000,
    originalPriceUSD: 18.5,
    image: photoSpeakerImg,
    description: 'Portable cylindrical Bluetooth speaker with 3-level touch-sensitive warm LED ambient light, crisp 360-degree audio, and your custom photograph printed with personalized text.',
    specifications: {
      'Audio': '5W Hi-Fi 360-Degree Surround Sound Bluetooth 5.0',
      'Lighting': '3-Level Touch Sensitive Warm Nightlight',
      'Battery': '1200mAh Rechargeable (6h Playtime)',
      'Customization': 'Full-Wrap High-Definition Photo Sublimation'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 54,
    inStock: true,
    badge: 'Bestselling Tech'
  },
  {
    id: 'prod-tailor-moon-lamp',
    name: 'Custom 3D Crescent Moon & Cloud LED Couple Photo Lamp',
    category: 'Lamps',
    priceUGX: 68000,
    priceUSD: 18,
    originalPriceUGX: 80000,
    originalPriceUSD: 21,
    image: moonLampImg,
    description: 'Delicate glowing optical acrylic crescent moon and cloud shaped 3D bedside lamp set in a dark solid wood base. Features illuminated couple photo with "Love you to the moon & back" script.',
    specifications: {
      'Material': 'Laser-Cut Optical Cast Acrylic + Natural Wood Base',
      'Light Source': 'Warm Golden Ambient LED (USB Powered with Switch)',
      'Size': '20 x 16 cm',
      'Print': 'Vibrant Embedded Photo Print with Glow Backlight'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 68,
    inStock: true,
    badge: 'Night Glow'
  },
  {
    id: 'prod-tailor-desk-clock',
    name: 'Personalised Geometric Heart Photo Collage Desk Easel Clock',
    category: 'Clocks',
    priceUGX: 42000,
    priceUSD: 11,
    originalPriceUGX: 50000,
    originalPriceUSD: 13,
    image: deskClockImg,
    description: 'Contemporary square desk clock with a sturdy black easel stand, featuring a geometric love collage face, clear silent sweep quartz movement, and custom couple portrait.',
    specifications: {
      'Movement': 'Silent Sweep Quartz (Non-Ticking)',
      'Size': '16 x 16 cm Tabletop Display',
      'Face': 'High-Gloss Scratch-Resistant Photographic Panel',
      'Battery': '1 x AA Included'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.8,
    reviewCount: 39,
    inStock: true,
    badge: 'Desk Classic'
  },
  {
    id: 'prod-tailor-keychains',
    name: 'Set of 2 Luxury Metallic Name Engraved Couple Keyrings',
    category: 'Key Chains',
    priceUGX: 25000,
    priceUSD: 6.5,
    originalPriceUGX: 32000,
    originalPriceUSD: 8.5,
    image: coupleKeychainsImg,
    description: 'Pair of premium mirror-polished square chrome zinc-alloy keychains with pastel pink and turquoise marbled resin inserts, laser-engraved with each partner’s name.',
    specifications: {
      'Set Count': '2 Matching Keychains (His & Hers)',
      'Material': 'Polished Zinc Alloy + Marbled Resin',
      'Ring': 'Heavy-Duty 32mm Swivel Split Ring',
      'Customization': 'Laser-Engraved Typography'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.9,
    reviewCount: 83,
    inStock: true,
    badge: 'Couple Set'
  },
  {
    id: 'prod-tailor-bar-flask',
    name: 'Brushed Stainless Steel Laser-Etched Executive Hip Flask',
    category: 'Bar Accessories',
    priceUGX: 38000,
    priceUSD: 10,
    originalPriceUGX: 48000,
    originalPriceUSD: 12.5,
    image: barFlaskImg,
    description: 'Food-grade brushed 304 stainless steel 8oz curved pocket hip flask with attached leak-proof screw cap. Deeply laser-etched with personalized initials, name, and milestone anniversary date.',
    specifications: {
      'Capacity': '8 oz / 240 ml',
      'Material': '18/8 (304) Food-Grade Stainless Steel',
      'Cap': 'Hinged Leak-Proof Secure Screw Cap',
      'Finishing': 'High-Contrast Permanent Laser Etching'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.9,
    reviewCount: 46,
    inStock: true,
    badge: 'Barware Pick'
  },
  {
    id: 'prod-tailor-earbuds',
    name: 'Personalised True Wireless ANC Earbuds with Laser-Engraved Case',
    category: 'Personalised Electronics',
    priceUGX: 110000,
    priceUSD: 29,
    originalPriceUGX: 135000,
    originalPriceUSD: 36,
    image: customEarbudsImg,
    description: 'Matte black premium true wireless stereo earbuds featuring active environmental noise cancellation, rich bass drivers, and a smooth charging case laser-engraved with your custom name or monogram.',
    specifications: {
      'Audio': 'Bluetooth 5.3 + ENC Quad Mic Clear Call Technology',
      'Battery': 'Up to 28 Hours Total Playtime with Fast USB-C Case',
      'Water Resistance': 'IPX5 Sweat and Splash Proof',
      'Customization': 'Permanent High-Definition Laser Engraving'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 58,
    inStock: true,
    badge: 'High-Tech Treasure'
  },
  // Make Celebrations Special With Collection Products
  {
    id: 'prod-cel-flowers',
    name: 'Personalised Wooden Cube Flower Box with Fresh Roses',
    category: 'Personalised Flowers',
    priceUGX: 75000,
    priceUSD: 19.5,
    originalPriceUGX: 90000,
    originalPriceUSD: 24,
    image: celebrationFlowersImg,
    description: 'Rustic handcrafted wooden cube planter box custom UV-printed with your couple photograph and heartfelt quote, arranged with fresh premium red roses, pink carnations and white baby breath.',
    specifications: {
      'Box': 'Natural Solid Pine Wood with UV Photo Print',
      'Florals': 'Fresh Red Roses, Soft Pink Carnations, Gypsophila',
      'Hydration': 'Oasis Floral Foam Base Keeps Flowers Fresh 5-7 Days',
      'Dimensions': '16 x 16 x 22 cm Total Height'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.9,
    reviewCount: 64,
    inStock: true,
    badge: 'Fresh Florals'
  },
  {
    id: 'prod-cel-cake',
    name: 'Custom Edible Photo Birthday & Anniversary Celebration Cake',
    category: 'Photo Cakes',
    priceUGX: 85000,
    priceUSD: 22.5,
    originalPriceUGX: 100000,
    originalPriceUSD: 26.5,
    image: celebrationCakeImg,
    description: 'Freshly baked artisanal 1.5kg celebration sponge cake layered with Madagascar vanilla buttercream frosting, delicate chocolate edging, and a high-definition edible wafer sugar print of your photo and custom message.',
    specifications: {
      'Flavor Options': 'Rich Red Velvet, Belgian Chocolate, or Madagascan Vanilla',
      'Weight': '1.5 kg (Serves 10-14 Guests)',
      'Photo Topper': '100% Edible Wafer Sheet with Food-Grade Colors',
      'Freshness': 'Baked to Order Same-Day Delivery'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 92,
    inStock: true,
    badge: 'Party Favorite'
  },
  {
    id: 'prod-cel-explosion-box',
    name: 'Handcrafted Multi-Layer 3D Photo Explosion Surprise Box',
    category: 'Explosion Box',
    priceUGX: 52000,
    priceUSD: 13.8,
    originalPriceUGX: 65000,
    originalPriceUSD: 17,
    image: celebrationExplosionBoxImg,
    description: 'Intricate 4-tiered hexagonal explosion gift box with fold-out heart flaps, pull-out photo photo sleeves, custom quotes, cascading accordion mini-albums, and a secret center gift vault for jewellery or treats.',
    specifications: {
      'Layers': '4 Interactive Concentric Tiers with 24 Photo Slots',
      'Material': '350gsm Heavyweight Metallic Cardstock',
      'Finishing': 'Satin Ribbon Bow with Foil-Stamped Accents',
      'Center Vault': 'Fits Perfume, Watch, Ring or Luxury Chocolates'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.9,
    reviewCount: 78,
    inStock: true,
    badge: 'Viral Surprise'
  },
  {
    id: 'prod-cel-chocolates',
    name: 'Gourmet Belgian Chocolate Gift Hamper with Easel Portrait Frame',
    category: 'Chocolates',
    priceUGX: 48000,
    priceUSD: 12.8,
    originalPriceUGX: 60000,
    originalPriceUSD: 16,
    image: celebrationChocolatesImg,
    description: 'Luxury celebration chocolate curation featuring 3 premium handcrafted artisan bars (Dark 70%, Milk, and White Vanilla), golden hazelnut truffles, presented with an easel mini portrait photo print.',
    specifications: {
      'Confections': '3 x 100g Artisan Bars + 6 Gold Foil Truffles',
      'Presentation': 'Wooden Gift Caddy with Gold Foil Ribbon',
      'Photo Display': 'Mini Natural Wood Easel Photo Tile Included',
      'Origin': 'Belgian Cocoa Beans, Pure Cocoa Butter'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.8,
    reviewCount: 51,
    inStock: true,
    badge: 'Sweet Moments'
  },
  {
    id: 'prod-cel-greeting-card',
    name: 'Bespoke Standing Greeting Card with Natural Wood Slice Easel',
    category: 'Greeting Cards',
    priceUGX: 20000,
    priceUSD: 5.5,
    originalPriceUGX: 26000,
    originalPriceUSD: 7,
    image: celebrationGreetingCardImg,
    description: 'Premium heavyweight textured linen fold card customized with high-gloss photo print, personalized calligraphy greeting message, resting on a rustic natural wood tree slice display base.',
    specifications: {
      'Paper': '350gsm Italian Textured Linen Cardstock',
      'Base': 'Natural Kiln-Dried Wood Trunk Slice with Slit',
      'Print': 'High-Definition UltraChrome UV Ink',
      'Envelope': 'Luxury Pearl White Envelope with Wax Seal Stamp'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 4.9,
    reviewCount: 43,
    inStock: true,
    badge: 'Heartfelt Keepsake'
  },
  {
    id: 'prod-cel-jewellery',
    name: 'Custom Engraved Crystal Zirconia Silver Couple Bangle Bracelet',
    category: 'Jewellery',
    priceUGX: 68000,
    priceUSD: 18,
    originalPriceUGX: 82000,
    originalPriceUSD: 22,
    image: celebrationJewelleryImg,
    description: 'Exquisite 925 sterling silver plated hinged cuff bracelet adorned with sparkling pave zirconia stones and precision micro-laser engraving of your name, coordinates, or anniversary date inside.',
    specifications: {
      'Material': '925 Sterling Silver Plated Brass with Anti-Tarnish Finish',
      'Stones': 'AAA Brilliant Cut Cubic Zirconia Pave',
      'Closure': 'Secure Hidden Push-Clasp Hinge',
      'Packaging': 'Velvet Lined Keepsake Presentation Box'
    },
    isCustomizable: true,
    minOrderQty: 1,
    rating: 5.0,
    reviewCount: 71,
    inStock: true,
    badge: 'Luxury Accent'
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
      'https://www.image2url.com/r2/default/images/1787245904300-92b2510a-35e8-48fb-baa3-cf6cad715088.jpg'
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
  { 
    name: 'A3 Collections', 
    category: 'Fashion & Retail',
    logoUrl: 'https://www.image2url.com/r2/default/images/1787245004201-f0d59f9c-1ade-4da1-b5ec-cb4e94bff9a1.png'
  },
  { 
    name: 'Speke Group', 
    category: 'Hospitality & Resorts',
    logoUrl: 'https://www.image2url.com/r2/default/images/1787245175550-6e3b10c5-9f02-4dad-8a3d-863e668aa6c4.png'
  },
  { 
    name: 'Kairos Ministries', 
    category: 'Institution & Faith',
    logoUrl: 'https://www.image2url.com/r2/default/images/1787245228748-c8b8e54b-1754-4428-bd32-108d3ee4e880.png'
  },
  { 
    name: 'Xani Foods', 
    category: 'FMCG & Packaging',
    logoUrl: 'https://www.image2url.com/r2/default/images/1787245323176-3450943d-005a-491c-906b-739950a8c544.jpg'
  },
  { 
    name: 'Elayna Properties', 
    category: 'Real Estate & Land',
    logoUrl: 'https://www.image2url.com/r2/default/images/1787245445160-28b12b4a-7c2f-48c9-b5a1-18d4275a2915.jpg'
  }
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
