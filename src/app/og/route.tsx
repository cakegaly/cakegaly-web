import fs from 'fs';
import path from 'path';
import { ImageResponse } from 'next/og';

function SiteLogo({
  size = 48,
  color = '#ffffff',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 256 256" style={{ color }}>
        <path
          d="M184 80 A72 72 0 1 0 184 176"
          fill="none"
          stroke="currentColor"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M136 124 C120 124 110 138 110 152 C110 170 120 184 136 196 C152 184 162 170 162 152 C162 138 152 124 136 124 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

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

function wrapText(text: string, maxLength: number): string[] {
  if (!text || text.length <= maxLength) {
    return [text || ''];
  }

  const lines: string[] = [];
  let currentLine = '';

  const breakChars = [
    '　',
    ' ',
    'で',
    'を',
    'に',
    'と',
    'が',
    'は',
    'の',
    'も',
  ];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const testLine = currentLine + char;

    if (testLine.length > maxLength && currentLine.length > 0) {
      let breakIndex = currentLine.length - 1;

      for (
        let j = currentLine.length - 1;
        j >= Math.max(0, currentLine.length - 5);
        j--
      ) {
        if (breakChars.includes(currentLine[j])) {
          breakIndex = j;
          break;
        }
      }

      if (breakIndex === currentLine.length - 1) {
        for (
          let j = currentLine.length - 1;
          j >= Math.max(0, currentLine.length - 8);
          j--
        ) {
          const prevChar = currentLine[j - 1];
          const currChar = currentLine[j];

          if (
            prevChar &&
            ((isHiragana(prevChar) && !isHiragana(currChar)) ||
              (isKatakana(prevChar) && !isKatakana(currChar)) ||
              (isKanji(prevChar) && isHiragana(currChar)))
          ) {
            breakIndex = j - 1;
            break;
          }
        }
      }

      if (breakIndex > 0 && breakIndex < currentLine.length - 1) {
        lines.push(currentLine.substring(0, breakIndex + 1));
        currentLine = currentLine.substring(breakIndex + 1) + char;
      } else {
        lines.push(currentLine);
        currentLine = char;
      }
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function isHiragana(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= 0x3041 && code <= 0x3096;
}

function isKatakana(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= 0x30a1 && code <= 0x30fa;
}

function isKanji(char: string): boolean {
  const code = char.charCodeAt(0);
  return (
    (code >= 0x4e00 && code <= 0x9faf) || (code >= 0x3400 && code <= 0x4dbf)
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'cakegaly';
    const description = searchParams.get('description');

    const fonts = await loadJapaneseFont();

    const titleLength = title.length;
    let titleFontSize = 72;
    let maxTitleLength = 22;

    if (titleLength > 40) {
      titleFontSize = 48;
      maxTitleLength = 30;
    } else if (titleLength > 25) {
      titleFontSize = 56;
      maxTitleLength = 26;
    }

    const titleLines = wrapText(title, maxTitleLength);
    const maxLines = 3;
    const displayLines = titleLines.slice(0, maxLines);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            background: 'linear-gradient(135deg, #282d3e 0%, #1f242f 100%)',
            fontFamily: fonts.length > 0 ? 'MPlusRounded' : 'sans-serif',
            color: '#ffffff',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              padding: '64px',
              position: 'relative',
            }}
          >
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {displayLines.map((line, index) => (
                  <div
                    key={index}
                    style={{
                      fontSize: titleFontSize,
                      fontWeight: 500,
                      lineHeight: 1.1,
                      color: '#ffffff',
                      marginBottom:
                        index < displayLines.length - 1 ? '12px' : '0',
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>

              {description && (
                <div
                  style={{
                    marginTop: '32px',
                    fontSize: '24px',
                    lineHeight: 1.4,
                    color: '#b5bac8',
                    maxWidth: '900px',
                  }}
                >
                  {description.length > 120
                    ? description.substring(0, 120) + '...'
                    : description}
                </div>
              )}
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '64px',
                right: '64px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 500,
                  color: '#b5bac8',
                }}
              >
                cakegaly
              </div>
              <SiteLogo size={48} color="#b5bac8" />
            </div>
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
