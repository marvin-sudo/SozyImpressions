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

function categorize(p) {
  const n = p.name.toLowerCase();
  const b = p.badge ? p.badge.toLowerCase() : '';

  if (n.includes('cushion') || n.includes('pillow')) return 'Cushions';
  if (n.includes('cake') || n.includes('bento') || n.includes('dates')) return 'Photo Cakes';
  if (n.includes('mug')) return 'Mugs';
  if (n.includes('sipper') || n.includes('tumbler') || n.includes('flask') || n.includes('bottle')) return 'Sippers';
  if (n.includes('jewel') || n.includes('necklace') || n.includes('bracelet') || n.includes('ring') || n.includes('pendant') || n.includes('locket') || n.includes('cufflink') || n.includes('kada') || n.includes('clutch')) return 'Jewellery';
  if (n.includes('flower') || n.includes('rose') || n.includes('orchid') || n.includes('sunflower') || n.includes('carnation') || n.includes('gerbera') || n.includes('bouquet') || n.includes('plant') || n.includes('bloom') || n.includes('vase')) return 'Flowers';
  if (n.includes('frame') || n.includes('lamp') || n.includes('led') || n.includes('light') || n.includes('night light') || n.includes('photo string')) return 'Photo Frames';
  if (b.includes('bestseller')) return 'Bestsellers';
  if (b.includes('just launched') || n.includes('balloon') || n.includes('decor')) return 'New Arrivals';
  if (n.includes('congratulation') || n.includes('trophy') || n.includes('caricature') || n.includes('avatar') || n.includes('retirement') || n.includes('milestone')) return 'Congratulations';
  if (n.includes('magnet') || n.includes('keychain') || n.includes('keyring') || n.includes('puzzle') || n.includes('pen') || n.includes('diary') || n.includes('notebook') || n.includes('perfume') || n.includes('earbud') || n.includes('speaker') || n.includes('glass') || n.includes('hamper') || n.includes('basket') || n.includes('crate') || n.includes('box') || n.includes('set') || n.includes('kit') || n.includes('organis') || n.includes('organizer') || n.includes('stand') || n.includes('t-shirt') || n.includes('candle') || n.includes('wallet')) return 'Get Same Day';
  
  return 'Get Same Day';
}

const counts = {};
for (const p of items) {
  const cat = categorize(p);
  counts[cat] = (counts[cat] || 0) + 1;
}

console.log('Category distribution for', items.length, 'products:');
console.table(counts);
