import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device is desktop (has fine pointer = mouse)
    const checkDesktop = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isWideScreen = window.innerWidth >= 1024;
      setIsDesktop(hasFinePointer && isWideScreen);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = el.closest('a, button, [data-cursor-hover]');
      setHovered(!!isInteractive);
    };

    const animate = () => {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.15);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.15);
      setPos({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousemove', checkHover);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousemove', checkHover);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render on mobile/tablet
  if (!isDesktop) return null;

  return (
    <>
      {/* Main dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: clicked ? 8 : 10,
          height: clicked ? 8 : 10,
          background: '#06b6d4',
          boxShadow: '0 0 10px rgba(6,182,212,0.8), 0 0 20px rgba(6,182,212,0.4)',
          transform: `translate(${pos.x - 5}px, ${pos.y - 5}px)`,
          transition: 'width 0.1s, height 0.1s',
        }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        style={{
          width: hovered ? 44 : 32,
          height: hovered ? 44 : 32,
          borderColor: hovered ? 'rgba(139,92,246,0.8)' : 'rgba(6,182,212,0.4)',
          boxShadow: hovered
            ? '0 0 15px rgba(139,92,246,0.4)'
            : '0 0 10px rgba(6,182,212,0.2)',
          transform: `translate(${pos.x - (hovered ? 22 : 16)}px, ${pos.y - (hovered ? 22 : 16)}px)`,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, box-shadow 0.2s',
        }}
        animate={{ opacity: 1 }}
      />
    </>
  );
}
