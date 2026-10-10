'use client';

import { useEffect, useState } from 'react';

type Phase = 'typing' | 'pausing' | 'deleting';

type TypewriterProps = {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
  className?: string;
};

export function Typewriter({
  words,
  typeSpeed = 60,
  deleteSpeed = 30,
  pause = 1400,
  className,
}: TypewriterProps) {
  const [idx, setIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');

  useEffect(() => {
    if (!words.length) return;
    const current = words[idx % words.length] ?? '';
    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      timer =
        charCount < current.length
          ? setTimeout(() => setCharCount((c) => c + 1), typeSpeed)
          : setTimeout(() => setPhase('pausing'), 0);
    } else if (phase === 'pausing') {
      timer = setTimeout(() => setPhase('deleting'), pause);
    } else if (charCount > 0) {
      timer = setTimeout(() => setCharCount((c) => c - 1), deleteSpeed);
    } else {
      timer = setTimeout(() => {
        setIdx((i) => (i + 1) % words.length);
        setPhase('typing');
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [charCount, phase, idx, words, typeSpeed, deleteSpeed, pause]);

  const current = words[idx % words.length] ?? '';
  // The longest word is rendered invisibly (CSS ::after) in the same grid cell as the typed text,
  // so the box is always tall enough and typing never moves the content below it.
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '');
  return (
    <span className={`typewriter ${className ?? ''}`.trim()} data-ghost={longest}>
      <span>{current.slice(0, charCount)}</span>
    </span>
  );
}
