import fs from 'fs';
import path from 'path';
import { ImageResponse } from 'next/og';

async function loadJapaneseFont(): Promise<
  { name: string; data: Buffer; weight: 500; style: 'normal' }[]
> {
  const fontPath = path.join(
    process.cwd(),
    'public/fonts/MPLUSRounded1c-Medium.ttf'
  );
  if (!fs.existsSync(fontPath)) {
    throw new Error('Font file not found');
  }

  const fontData = fs.readFileSync(fontPath);

  return [
    {
      name: 'MPlusRounded',
      data: fontData,
      weight: 500 as const,
      style: 'normal' as const,
    },
  ];
}

async function loadBackgroundImage(): Promise<string> {
  const imagePath = path.join(process.cwd(), 'public/og.png');
  if (!fs.existsSync(imagePath)) {
    throw new Error('Background image not found');
  }

  const imageData = fs.readFileSync(imagePath);
  const base64Image = imageData.toString('base64');
  return `data:image/png;base64,${base64Image}`;
}

function wrapText(text: string, maxLength: number): string[] {
  const lines: string[] = [];
  let line = '';

  for (let i = 0; i < text.length; i++) {
    const testLine = line + text[i];

    if (testLine.length > maxLength && line !== '') {
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'cakegaly';

    const fonts = await loadJapaneseFont();
    const backgroundImage = await loadBackgroundImage();

    const maxTitleLength = 24;
    const titleLines = wrapText(title, maxTitleLength);
    const lineHeight = 80;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {titleLines.map((line, index) => (
              <div
                key={index}
                style={{
                  fontSize: 60,
                  fontWeight: 'bold',
                  color: 'white',
                  fontFamily: fonts.length > 0 ? 'MPlusRounded' : 'sans-serif',
                  textAlign: 'center',
                  lineHeight: `${lineHeight}px`,
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts,
      }
    );
  } catch (error) {
    console.error('OG image generation error:', error);
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#282d3e',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#ffffff',
            }}
          >
            cakegaly.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
