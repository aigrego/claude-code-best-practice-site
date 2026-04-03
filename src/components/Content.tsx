import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getContent } from '../data/content';
import { Copy, Check } from 'lucide-react';

interface ContentProps {
  activeId: string;
}

const Content = ({ activeId }: ContentProps) => {
  const content = getContent(activeId);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeId]);

  const handleCopyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Custom components for ReactMarkdown
  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const code = String(children).replace(/\n$/, '');
      
      if (!inline && match) {
        return (
          <div className="relative group">
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleCopyCode(code)}
                className="p-1.5 rounded bg-bg-card border border-border text-text-secondary hover:text-accent-primary hover:border-accent-primary/50 transition-colors"
              >
                {copiedCode === code ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            <pre className="bg-bg-card border border-border rounded-lg p-4 overflow-x-auto">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          </div>
        );
      }
      
      return (
        <code
          className="bg-accent-primary/10 text-accent-primary px-1.5 py-0.5 rounded text-sm font-mono border border-accent-primary/30"
          {...props}
        >
          {children}
        </code>
      );
    },
    h1: ({ children }: any) => (
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent"
      >
        {children}
      </motion.h1>
    ),
    h2: ({ children }: any) => (
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold mt-8 mb-4 text-accent-primary border-b border-border pb-2"
      >
        {children}
      </motion.h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-lg font-semibold mt-6 mb-3 text-text-primary">
        {children}
      </h3>
    ),
    p: ({ children }: any) => (
      <p className="mb-4 text-text-secondary leading-relaxed">
        {children}
      </p>
    ),
    ul: ({ children }: any) => (
      <ul className="mb-4 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="mb-4 space-y-2 list-decimal list-inside">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="text-text-secondary flex items-start gap-2">
        <span className="text-accent-primary mt-1.5">•</span>
        <span>{children}</span>
      </li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-accent-primary pl-4 my-4 italic text-text-secondary bg-accent-primary/5 py-2 pr-4 rounded-r">
        {children}
      </blockquote>
    ),
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-accent-primary/10">
        {children}
      </thead>
    ),
    th: ({ children }: any) => (
      <th className="border border-border px-4 py-2 text-left text-accent-primary font-semibold">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="border border-border px-4 py-2 text-text-secondary">
        {children}
      </td>
    ),
    tr: ({ children }: any) => (
      <tr className="even:bg-text-primary/[0.02]">
        {children}
      </tr>
    ),
    hr: () => (
      <hr className="my-8 border-border" />
    ),
    a: ({ href, children }: any) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-primary hover:underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
  };

  return (
    <motion.div
      ref={contentRef}
      className="flex-1 overflow-y-auto p-6 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Background glow effect */}
        <div className="fixed top-0 right-0 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-0 right-0 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={components}
          >
            {content}
          </ReactMarkdown>
        </motion.div>

        {/* Bottom spacing */}
        <div className="h-20" />
      </div>
    </motion.div>
  );
};

export default Content;
