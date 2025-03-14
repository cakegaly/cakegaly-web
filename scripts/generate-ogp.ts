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
  family: 'Mono',
});

registerFont('./src/assets/fonts/MPLUSRounded1c-Medium.ttf', {
  family: 'Sans',
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

  const bgImage = await loadImage(BACKGROUND_IMAGE);
  ctx.drawImage(bgImage, 0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = 'white';
  ctx.font = 'bold 60px "Sans"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const maxWidth = WIDTH - 160;
  const lines = wrapText(ctx, title, maxWidth);
  const lineHeight = 80;

  const totalTextHeight = lines.length * lineHeight;
  const startY = (HEIGHT - totalTextHeight) / 2;

  lines.forEach((line, i) => {
    ctx.fillText(line, WIDTH / 2, startY + i * lineHeight);
  });

  const outputPath = path.join(OUTPUT_DIR, `${slug}.png`);
  fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));

  console.log(`✅ Generated: ${outputPath}`);
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const lines: string[] = [];
  let line = '';

  for (let i = 0; i < text.length; i++) {
    const testLine = line + text[i];
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && line !== '') {
      lines.push(line);
      line = text[i];
    } else {
      line = testLine;
    }
  }

  if (line) {
    lines.push(line);
  }

  return lines;
}
