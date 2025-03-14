import type { CanvasRenderingContext2D } from 'canvas';
import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs';
import path from 'path';

import { getAllBlogPosts } from '@/lib/mdx';

const WIDTH = 1200;
const HEIGHT = 630;
const OUTPUT_DIR = './public/ogp';
const BACKGROUND_IMAGE = './public/og.png';

registerFont('./src/assets/fonts/HackNerdFontMono-Regular.ttf', {
  family: 'Hack',
});

registerFont('./src/assets/fonts/MPLUSRounded1c-Medium.ttf', {
  family: 'MPLUSRounded',
});

(async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const allPosts = await getAllBlogPosts();

  for (const post of allPosts) {
    await generateOGP(post.metadata.title, post.slug, post.metadata.date);
  }

  console.log('✅ OGP images generated successfully!');
})();

async function generateOGP(title: string, slug: string, date?: string) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // background
  const bgImage = await loadImage(BACKGROUND_IMAGE);
  ctx.drawImage(bgImage, 0, 0, WIDTH, HEIGHT);

  // site name
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.roundRect(60, 60, 280, 60, 8);
  ctx.fill();

  // site domain
  ctx.fillStyle = '#111A1F';
  ctx.font = 'bold 28px "MPLUSRounded"';
  ctx.fillText('cakegaly.com', 75, 100);

  // pub date
  if (date) {
    ctx.fillStyle = 'white';
    ctx.font = '24px "Hack"';
    ctx.textAlign = 'right';
    ctx.fillText(date, WIDTH - 60, 100);
  }

  // title
  ctx.fillStyle = 'white';
  ctx.font = 'bold 60px "MPLUSRounded"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const maxWidth = WIDTH - 160;
  const lines = wrapText(ctx, title, maxWidth);
  const lineHeight = 80;
  const startY = HEIGHT / 2 - (lines.length - 1) * (lineHeight / 2);

  lines.forEach((line, i) => {
    ctx.fillText(line, WIDTH / 2, startY + i * lineHeight);
  });

  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '28px "Hack"';
  ctx.fillText('cakegaly.com', WIDTH / 2, HEIGHT - 60);

  const outputPath = path.join(OUTPUT_DIR, `${slug}.png`);
  fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));

  console.log(`✅ Generated: ${outputPath}`);
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';

  for (const word of words) {
    const testLine = line + word + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line !== '') {
      lines.push(line.trim());
      line = word + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line.trim());
  return lines;
}
