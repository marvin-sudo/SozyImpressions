const fs = require('fs');

const parsed = JSON.parse(fs.readFileSync('scripts/parsed_products.json', 'utf8'));

// Unique by name
const uniqueMap = new Map();
for (const p of parsed) {
  if (!uniqueMap.has(p.name)) {
    uniqueMap.set(p.name, p);
  }
}

console.log('Total parsed:', parsed.length);
console.log('Unique names:', uniqueMap.size);

// Read existing BESTSELLERS_DATA
const bsContent = fs.readFileSync('src/data/bestsellersData.ts', 'utf8');
const existingNames = new Set();
const reg = /\"name\":\s*\"([^\"]+)\"/g;
let m;
while ((m = reg.exec(bsContent)) !== null) {
  existingNames.add(m[1]);
}

let inExistingCount = 0;
let newCount = 0;
for (const name of uniqueMap.keys()) {
  if (existingNames.has(name)) {
    inExistingCount++;
  } else {
    newCount++;
  }
}

console.log('Already in bestsellersData:', inExistingCount);
console.log('New products to add:', newCount);
