const fs = require('fs');

const parsed = JSON.parse(fs.readFileSync('scripts/parsed_products.json', 'utf8'));

// Unique map
const uniqueMap = new Map();
for (const p of parsed) {
  if (!uniqueMap.has(p.name)) {
    uniqueMap.set(p.name, p);
  }
}

const items = Array.from(uniqueMap.values());

function getCategory(p) {
  const n = p.name.toLowerCase();
  const b = p.badge ? p.badge.toLowerCase() : '';

  if (n.includes('cushion') || n.includes('pillow')) return 'Cushions';
  if (n.includes('cake') || n.includes('bento') || n.includes('dates')) return 'Photo Cakes';
  if (n.includes('mug')) return 'Mugs';
  if (n.includes('sipper') || n.includes('tumbler') || n.includes('flask') || n.includes('bottle')) return 'Sippers';
  if (n.includes('jewel') || n.includes('necklace') || n.includes('bracelet') || n.includes('ring') || n.includes('pendant') || n.includes('locket') || n.includes('cufflink') || n.includes('kada') || n.includes('clutch')) return 'Jewellery';
  if (n.includes('flower') || n.includes('rose') || n.includes('orchid') || n.includes('sunflower') || n.includes('carnation') || n.includes('gerbera') || n.includes('bouquet') || n.includes('plant') || n.includes('bloom') || n.includes('vase')) return 'Flowers';
  if (n.includes('frame') || n.includes('lamp') || n.includes('led') || n.includes('light') || n.includes('night light') || n.includes('photo string') || n.includes('shadow box') || n.includes('illuminating')) return 'Photo Frames';
  if (b.includes('bestseller')) return 'Bestsellers';
  if (b.includes('just launched') || n.includes('balloon') || n.includes('decor')) return 'New Arrivals';
  if (n.includes('congratulation') || n.includes('trophy') || n.includes('caricature') || n.includes('avatar') || n.includes('retirement') || n.includes('milestone')) return 'Congratulations';
  if (n.includes('magnet') || n.includes('keychain') || n.includes('keyring') || n.includes('puzzle') || n.includes('pen') || n.includes('diary') || n.includes('notebook') || n.includes('perfume') || n.includes('earbud') || n.includes('speaker') || n.includes('glass') || n.includes('hamper') || n.includes('basket') || n.includes('crate') || n.includes('box') || n.includes('set') || n.includes('kit') || n.includes('organis') || n.includes('organizer') || n.includes('stand') || n.includes('t-shirt') || n.includes('candle') || n.includes('wallet')) return 'Get Same Day';
  
  return 'Get Same Day';
}

function getImage(p, category) {
  const n = p.name.toLowerCase();
  
  if (category === 'Cushions') return '/src/assets/images/personalised_cushion_1788634222492.jpg';
  if (category === 'Photo Cakes') return '/src/assets/images/celebration_cake_1788635656003.jpg';
  if (category === 'Mugs') return '/src/assets/images/tumbler_mug_1788634322323.jpg';
  if (category === 'Sippers') return '/src/assets/images/bar_flask_1788635290861.jpg';
  if (category === 'Jewellery') {
    if (n.includes('cufflink')) return 'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=800&auto=format&fit=crop&q=80';
    return '/src/assets/images/celebration_jewellery_1788635705456.jpg';
  }
  if (category === 'Flowers') {
    if (n.includes('hamper') || n.includes('crate') || n.includes('basket')) return '/src/assets/images/celebration_flowers_1788635644325.jpg';
    return '/src/assets/images/roses_bouquet_1788634336414.jpg';
  }
  if (category === 'Photo Frames') {
    if (n.includes('lamp') || n.includes('light') || n.includes('led')) return '/src/assets/images/moon_lamp_1788635244442.jpg';
    if (n.includes('calendar')) return '/src/assets/images/calendar_photo_frame_1788634271713.jpg';
    return '/src/assets/images/tabletop_frame_1788635214871.jpg';
  }
  if (category === 'New Arrivals') {
    if (n.includes('balloon') || n.includes('decor')) return '/src/assets/images/birthday_gifts_1788634707174.jpg';
    return '/src/assets/images/g_lamp_accessories_1788634381991.jpg';
  }
  if (category === 'Congratulations') {
    if (n.includes('caricature') || n.includes('avatar')) return '/src/assets/images/caricature_standee_1788634238550.jpg';
    return '/src/assets/images/wedding_gifts_1788634722972.jpg';
  }
  
  // Get Same Day
  if (n.includes('speaker')) return '/src/assets/images/photo_speaker_1788635229629.jpg';
  if (n.includes('clock')) return '/src/assets/images/desk_clock_1788635262427.jpg';
  if (n.includes('earbud') || n.includes('power bank')) return '/src/assets/images/custom_earbuds_1788635304232.jpg';
  if (n.includes('pen') || n.includes('organis') || n.includes('stand') || n.includes('diary') || n.includes('notebook')) return '/src/assets/images/stationery_caddy_1788634352075.jpg';
  if (n.includes('magnet') || n.includes('string') || n.includes('puzzle')) return '/src/assets/images/fridge_photo_magnets_1788634286788.jpg';
  if (n.includes('keychain') || n.includes('keyring') || n.includes('badge')) return '/src/assets/images/couple_keychains_1788635276974.jpg';
  if (n.includes('hamper') || n.includes('box') || n.includes('kit') || n.includes('set')) return '/src/assets/images/combos_gift_set_1788634366784.jpg';
  if (n.includes('chocolate')) return '/src/assets/images/celebration_chocolates_1788635680950.jpg';
  
  return '/src/assets/images/sozy_hero_workspace_1777014868067.png';
}

function getRecipient(p) {
  const n = p.name.toLowerCase();
  if (n.includes('dad') || n.includes('father') || n.includes('husband') || n.includes('him') || n.includes('bro') || n.includes('men') || n.includes('papa')) return 'Him';
  if (n.includes('mom') || n.includes('mother') || n.includes('wife') || n.includes('her') || n.includes('sister') || n.includes('women') || n.includes('maa') || n.includes('mumma')) return 'Her';
  if (n.includes('kid') || n.includes('child') || n.includes('baby') || n.includes('bear') || n.includes('teddy') || n.includes('unicorn')) return 'Kids';
  if (n.includes('couple') || n.includes('love') || n.includes('together') || n.includes('anniversary') || n.includes('wedding')) return 'Couples';
  if (n.includes('teacher')) return 'Teacher';
  return 'All';
}

function getOccasion(p) {
  const n = p.name.toLowerCase();
  if (n.includes('birthday') || n.includes('b\'day') || n.includes('born')) return 'Birthday';
  if (n.includes('anniversary') || n.includes('wedding') || n.includes('love') || n.includes('valentine') || n.includes('romance') || n.includes('couple')) return 'Anniversary';
  if (n.includes('mother') || n.includes('mom') || n.includes('maa')) return "Mother's Day";
  if (n.includes('father') || n.includes('dad') || n.includes('papa')) return "Father's Day";
  if (n.includes('corporate') || n.includes('boss') || n.includes('doctor') || n.includes('ca ') || n.includes('office') || n.includes('retirement')) return 'Corporate';
  if (n.includes('teacher')) return "Teacher's Day";
  return 'General';
}

const finalProducts = items.map((p, idx) => {
  const category = getCategory(p);
  const image = getImage(p, category);
  const recipient = getRecipient(p);
  const occasion = getOccasion(p);
  
  return {
    id: `bs-${idx + 1}`,
    name: p.name,
    badge: p.badge || 'PERSONALISE IT!',
    category,
    recipient,
    occasion,
    priceUGX: p.priceUGX,
    originalPriceUGX: p.originalPriceUGX,
    priceUSD: p.priceUSD,
    originalPriceUSD: p.originalPriceUSD,
    discountPercent: p.discountPercent || '10% OFF',
    rating: p.rating || 4.9,
    reviewCount: p.reviewCount || (30 + (idx * 7) % 250),
    image,
    gallery: [image, '/src/assets/images/sozy_hero_workspace_1777014868067.png'],
    isCustomizable: true
  };
});

console.log('Final product count:', finalProducts.length);
console.log('Sample product 1:', finalProducts[0]);
console.log('Sample product 200:', finalProducts[199]);

fs.writeFileSync('scripts/final_products.json', JSON.stringify(finalProducts, null, 2));
