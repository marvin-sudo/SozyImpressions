export interface CategoryItem {
  id: string;
  name: string;
  hasDropdown?: boolean;
  subcategories?: string[];
}

export const SHOP_CATEGORIES: CategoryItem[] = [
  { id: 'all', name: 'All Products', hasDropdown: false },
  { 
    id: 'apparel', 
    name: 'Apparel', 
    hasDropdown: true,
    subcategories: ['Executive Polo Shirts', 'Combed Cotton T-Shirts', 'Corporate Hoodies', 'Embroidered Caps']
  },
  { 
    id: 'mugs', 
    name: 'Mugs', 
    hasDropdown: true,
    subcategories: ['Two-Tone Ceramic Mugs', 'Magic Color-Changing Photo Mugs', 'Stainless Travel Mugs', 'Enamel Camp Mugs']
  },
  { 
    id: 'bottles-flasks', 
    name: 'Bottles & Flasks', 
    hasDropdown: true,
    subcategories: ['Smart LED Temperature Flasks', 'Double-Wall Hydro Flasks', 'Sports Aluminum Bottles', 'Bamboo Thermos Bottles']
  },
  { 
    id: 'corporate-gifts', 
    name: 'Corporate Gifts', 
    hasDropdown: true,
    subcategories: ['Executive Desk Organizers', 'VIP Welcome Packages', 'Client Appreciation Sets', 'Conference Giveaways']
  },
  { 
    id: 'gift-sets', 
    name: 'Gift Sets', 
    hasDropdown: true,
    subcategories: ['5-in-1 Luxury Executive Boxes', 'Tech Combo Sets', 'Notebook & Pen Folios', 'Eco-Friendly Bundles']
  },
  { 
    id: 'bamboo-gifts', 
    name: 'Bamboo Gifts', 
    hasDropdown: true,
    subcategories: ['Natural Bamboo Thermos', 'Bamboo Hardcover Journals', 'Eco Bamboo Pens', 'Desk Accessories']
  },
  { 
    id: 'glasses', 
    name: 'Glasses', 
    hasDropdown: true,
    subcategories: ['Laser-Etched Whiskey Glasses', 'Stemless Wine Glasses', 'Beer Steins', 'Champagne Flutes']
  },
  { 
    id: 'keyholders', 
    name: 'Keyholders', 
    hasDropdown: true,
    subcategories: ['Top-Grain Leather Keyrings', '3D Laser-Cut Acrylic Keychains', 'Zinc-Alloy Carabiners', 'Multi-Tool Keyrings']
  },
  { 
    id: 'trophies-medals', 
    name: 'Trophies & Medals', 
    hasDropdown: true,
    subcategories: ['Optic Crystal Awards', 'Handcrafted Mahogany Plaques', 'Antique Gold & Silver Medals', 'Acrylic Statuettes']
  },
  { 
    id: 'wall-clocks', 
    name: 'Wall Clocks', 
    hasDropdown: true,
    subcategories: ['Brushed Aluminum Silent Clocks', 'Floating 3D Laser-Cut Clocks', 'Wooden Wall Clocks']
  },
  { 
    id: 'watches', 
    name: 'Watches', 
    hasDropdown: true,
    subcategories: ['Laser-Engraved Executive Timepieces', 'Minimalist Stainless Steel Watches', 'Gift Box Editions']
  },
  { 
    id: 'umbrellas', 
    name: 'Umbrellas', 
    hasDropdown: true,
    subcategories: ['30" Windproof Golf Umbrellas', 'Compact Auto Open/Close Umbrellas', 'Promotional Rain Umbrellas']
  },
  { 
    id: 'technology', 
    name: 'Technology', 
    hasDropdown: true,
    subcategories: ['Light-Up Logo Power Banks', 'Metal Swivel OTG Flash Drives', 'Wireless Charging Pads', 'Bluetooth Audio']
  },
  { 
    id: 'holiday-gifts', 
    name: 'Special Holiday Gifts', 
    hasDropdown: true,
    subcategories: ['Deluxe Year-End Hampers', 'Christmas & Festive Gift Boxes', 'Easter Keepsake Baskets', 'Milestone Celebrations']
  }
];
