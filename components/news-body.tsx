import type { ReactNode } from 'react';

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={index}>{bold[1]}</strong>;

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = link[2].startsWith('http');
      return (
        <a
          href={link[2]}
          key={index}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
        >
          {link[1]}
        </a>
      );
    }

    return part;
  });
}

export function NewsBody({ body }: { body: string }) {
  const blocks = body.split(/\r?\n\r?\n/).filter(Boolean);

  return (
    <div className="news-body">
      {blocks.map((block, index) => {
        if (block.startsWith('## ')) {
          return <h2 key={index}>{renderInline(block.slice(3).trim())}</h2>;
        }

        if (block.startsWith('### ')) {
          return <h3 key={index}>{renderInline(block.slice(4).trim())}</h3>;
        }

        const lines = block.split(/\r?\n/);
        if (lines.every((line) => line.startsWith('- '))) {
          return (
            <ul key={index}>
              {lines.map((line) => <li key={line}>{renderInline(line.slice(2))}</li>)}
            </ul>
          );
        }

        return <p key={index}>{renderInline(lines.join(' '))}</p>;
      })}
    </div>
  );
}
