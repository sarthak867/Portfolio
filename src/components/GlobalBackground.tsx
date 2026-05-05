import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  r: number;
  alpha: number;
  hue: number; // 0=cyan, 1=purple
}

export default function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const COUNT = 110;
    const CONNECTION_DIST = 130;
    const MOUSE_REPEL_DIST = 120;
    const MOUSE_REPEL_FORCE = 2.5;

    // Canvas covers the full viewport (fixed), particles use viewport coords
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < COUNT; i++) {
      const vx = (Math.random() - 0.5) * 0.35;
      const vy = (Math.random() - 0.5) * 0.35;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        r: Math.random() * 1.6 + 0.5,
        alpha: Math.random() * 0.45 + 0.1,
        hue: Math.random(),
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      // Use viewport coords since canvas is fixed
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_REPEL_DIST && dist > 0) {
          const force = (MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST;
          p.vx += (dx / dist) * force * MOUSE_REPEL_FORCE * 0.08;
          p.vy += (dy / dist) * force * MOUSE_REPEL_FORCE * 0.08;
        }

        // Ease back to base velocity
        p.vx += (p.baseVx - p.vx) * 0.03;
        p.vy += (p.baseVy - p.vy) * 0.03;

        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 3) {
          p.vx = (p.vx / speed) * 3;
          p.vy = (p.vy / speed) * 3;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Color: cyan (#06b6d4) or purple (#8b5cf6) based on hue
        const nearMouse = dist < MOUSE_REPEL_DIST;
        const r = nearMouse ? (p.hue > 0.5 ? 139 : 6) : (p.hue > 0.5 ? 139 : 6);
        const g = nearMouse ? (p.hue > 0.5 ? 92 : 182) : (p.hue > 0.5 ? 92 : 182);
        const b = nearMouse ? (p.hue > 0.5 ? 246 : 212) : (p.hue > 0.5 ? 246 : 212);
        const alphaBoost = nearMouse ? Math.min(p.alpha * 2.2, 0.9) : p.alpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, nearMouse ? p.r * 1.8 : p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alphaBoost})`;
        ctx.fill();

        // Glow on particles near cursor
        if (nearMouse) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          grad.addColorStop(0, `rgba(${r},${g},${b},0.15)`);
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = 0.07 * (1 - dist / CONNECTION_DIST);
            // Near-cursor connections glow brighter
            const nearI = Math.sqrt((particles[i].x - mx) ** 2 + (particles[i].y - my) ** 2) < MOUSE_REPEL_DIST;
            const nearJ = Math.sqrt((particles[j].x - mx) ** 2 + (particles[j].y - my) ** 2) < MOUSE_REPEL_DIST;
            const boost = nearI || nearJ ? 4 : 1;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(6,182,212,${opacity * boost})`;
            ctx.lineWidth = nearI || nearJ ? 0.8 : 0.4;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
      }}
    />
  );
}
