/**
 * Image placeholder generator script
 * Creates minimal SVG placeholders in the VELOUR brand aesthetic
 * Run: node scripts/generate-placeholders.js
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'images');

function createSVG(width, height, bgColor, accentColor, text, subtext) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${bgColor}" />
      <stop offset="100%" stop-color="#0A0A0A" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.3" />
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0.05" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)" />
  <rect x="${width * 0.15}" y="${height * 0.2}" width="${width * 0.7}" height="${height * 0.6}" fill="url(#accent)" rx="2" />
  <line x1="${width * 0.3}" y1="${height * 0.35}" x2="${width * 0.7}" y2="${height * 0.35}" stroke="${accentColor}" stroke-width="0.5" opacity="0.3" />
  <line x1="${width * 0.3}" y1="${height * 0.65}" x2="${width * 0.7}" y2="${height * 0.65}" stroke="${accentColor}" stroke-width="0.5" opacity="0.3" />
  <text x="${width / 2}" y="${height / 2 - 10}" text-anchor="middle" font-family="serif" font-size="${Math.min(width, height) * 0.06}" fill="${accentColor}" font-weight="300" letter-spacing="8">${text}</text>
  <text x="${width / 2}" y="${height / 2 + 20}" text-anchor="middle" font-family="sans-serif" font-size="${Math.min(width, height) * 0.025}" fill="#666" font-weight="300" letter-spacing="4">${subtext}</text>
</svg>`;
}

// Mannequin images
const mannequinItems = [
  { name: 'dress', label: 'DRESS', sub: 'THE NOIR DRESS' },
  { name: 'tops', label: 'TOPS', sub: 'THE LINEN SHIRT' },
  { name: 'bottoms', label: 'BOTTOMS', sub: 'WIDE LEG TROUSER' },
  { name: 'coat', label: 'OUTERWEAR', sub: 'LEATHER TRENCH' },
  { name: 'accessories', label: 'ACCESSORIES', sub: 'THE LEATHER BELT' },
];

mannequinItems.forEach((item) => {
  const svg = createSVG(800, 1200, '#1a1a1a', '#C9A96E', item.label, item.sub);
  fs.writeFileSync(path.join(publicDir, 'mannequin', `${item.name}.jpg`), svg);
});

// Product images
const productItems = [
  { slug: 'noir-dress', label: 'NOIR DRESS' },
  { slug: 'blazer', label: 'BLAZER' },
  { slug: 'silk-slip', label: 'SILK SLIP' },
  { slug: 'trouser', label: 'TROUSER' },
  { slug: 'linen-shirt', label: 'LINEN SHIRT' },
  { slug: 'cashmere', label: 'CASHMERE' },
  { slug: 'leather-trench', label: 'LEATHER TRENCH' },
  { slug: 'wrap-skirt', label: 'WRAP SKIRT' },
];

productItems.forEach((item) => {
  for (let i = 1; i <= 3; i++) {
    const colors = ['#1a1a1a', '#2A2A2A', '#151515'];
    const svg = createSVG(800, 1100, colors[i - 1], '#C9A96E', item.label, `VIEW ${i}`);
    fs.writeFileSync(path.join(publicDir, 'products', `${item.slug}-${i}.jpg`), svg);
  }
});

// Editorial
const editSvg = createSVG(800, 1100, '#2A2A2A', '#F5F0E8', 'EDITORIAL', 'VELOUR 2026');
fs.writeFileSync(path.join(publicDir, 'editorial', 'editorial-1.jpg'), editSvg);

// Instagram grid
for (let i = 1; i <= 9; i++) {
  const accents = ['#C9A96E', '#D4B87A', '#B8965A', '#C9A96E', '#E0C88D', '#A68845', '#C9A96E', '#D4B87A', '#B8965A'];
  const svg = createSVG(600, 600, '#1a1a1a', accents[i - 1], 'VELOUR', `@velour.official`);
  fs.writeFileSync(path.join(publicDir, 'instagram', `insta-${i}.jpg`), svg);
}

console.log('✓ All placeholder images generated');
