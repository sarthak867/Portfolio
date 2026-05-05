import { useEffect, useRef } from 'react';

type BGVariant = 'floating-rings' | 'grid-pulse' | 'wave-lines' | 'hex-dots' | 'meteor-shower' | 'dna-helix' | 'code-rain' | 'orbiting-dots';

interface Props {
  variant: BGVariant;
  opacity?: number;
}

/* ─── 1. FLOATING RINGS (About) ─────────────────────────── */
function FloatingRings({ opacity = 0.5 }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    const rings: { x: number; y: number; r: number; maxR: number; speed: number; alpha: number; color: string }[] = [];
    const COLORS = ['rgba(6,182,212,', 'rgba(139,92,246,'];

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const spawn = () => {
      rings.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0,
        maxR: Math.random() * 120 + 60,
        speed: Math.random() * 0.4 + 0.2,
        alpha: Math.random() * 0.25 + 0.1,
        color: COLORS[Math.floor(Math.random() * 2)],
      });
    };
    for (let i = 0; i < 8; i++) spawn();
    const spawnInterval = setInterval(spawn, 1800);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.r += ring.speed;
        const fade = 1 - ring.r / ring.maxR;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `${ring.color}${ring.alpha * fade})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        if (ring.r >= ring.maxR) rings.splice(i, 1);
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); clearInterval(spawnInterval); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }} />;
}

/* ─── 2. GRID PULSE (Skills) ────────────────────────────── */
function GridPulse({ opacity = 0.5 }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const CELL = 48;
      const cols = Math.ceil(canvas.width / CELL) + 1;
      const rows = Math.ceil(canvas.height / CELL) + 1;
      t += 0.012;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * CELL;
          const y = r * CELL;
          const wave = Math.sin(t + c * 0.4 + r * 0.3) * 0.5 + 0.5;
          const alpha = wave * 0.18;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139,92,246,${alpha})`;
          ctx.fill();
        }
      }
      // Horizontal lines
      for (let r = 0; r < rows; r++) {
        const wave = Math.sin(t + r * 0.5) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, r * CELL);
        ctx.lineTo(canvas.width, r * CELL);
        ctx.strokeStyle = `rgba(6,182,212,${wave * 0.06})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }} />;
}

/* ─── 3. WAVE LINES (Projects) ──────────────────────────── */
function WaveLines({ opacity = 0.5 }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;
      const LINES = 10;
      for (let l = 0; l < LINES; l++) {
        const yBase = (canvas.height / (LINES + 1)) * (l + 1);
        const amp = 18 + l * 4;
        const freq = 0.008 + l * 0.001;
        const phase = l * 0.6;
        const isCyan = l % 2 === 0;
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 4) {
          const y = yBase + Math.sin(x * freq + t + phase) * amp;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = isCyan
          ? `rgba(6,182,212,${0.06 + (l / LINES) * 0.06})`
          : `rgba(139,92,246,${0.06 + (l / LINES) * 0.06})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }} />;
}

/* ─── 4. HEX DOTS (Achievements) ────────────────────────── */
function HexDots({ opacity = 0.5 }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.015;
      const SIZE = 36;
      const cols = Math.ceil(canvas.width / (SIZE * 1.73)) + 2;
      const rows = Math.ceil(canvas.height / (SIZE * 1.5)) + 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SIZE * 1.73 + (r % 2 === 0 ? 0 : SIZE * 0.865);
          const y = r * SIZE * 1.5;
          const wave = Math.sin(t + c * 0.5 + r * 0.7) * 0.5 + 0.5;
          const alpha = wave * 0.15;
          // Draw hexagon
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const px = x + SIZE * 0.45 * Math.cos(angle);
            const py = y + SIZE * 0.45 * Math.sin(angle);
            if (i === 0) {
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(245,158,11,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }} />;
}

/* ─── 5. METEOR SHOWER (Certifications) ─────────────────── */
function MeteorShower({ opacity = 0.5 }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    const meteors: { x: number; y: number; len: number; speed: number; alpha: number; color: string }[] = [];
    const COLORS = ['rgba(6,182,212,', 'rgba(139,92,246,', 'rgba(16,185,129,'];

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const spawn = () => {
      meteors.push({
        x: Math.random() * canvas.width * 1.5,
        y: -20,
        len: Math.random() * 60 + 30,
        speed: Math.random() * 2.5 + 1.5,
        alpha: Math.random() * 0.35 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    };
    for (let i = 0; i < 6; i++) spawn();
    const spawnInterval = setInterval(spawn, 600);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x -= m.speed * 0.5;
        m.y += m.speed;
        const grad = ctx.createLinearGradient(m.x, m.y, m.x + m.len * 0.5, m.y - m.len);
        grad.addColorStop(0, `${m.color}${m.alpha})`);
        grad.addColorStop(1, `${m.color}0)`);
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x + m.len * 0.5, m.y - m.len);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        if (m.y > canvas.height + 50) meteors.splice(i, 1);
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); clearInterval(spawnInterval); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }} />;
}

/* ─── 6. DNA HELIX (Contact) ────────────────────────────── */
function DnaHelix({ opacity = 0.5 }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.01;
      const STRANDS = 3;
      for (let s = 0; s < STRANDS; s++) {
        const xBase = (canvas.width / (STRANDS + 1)) * (s + 1);
        const amp = 30;
        const freq = 0.025;
        const offset = (s / STRANDS) * Math.PI * 2;

        // Strand A
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 3) {
          const x = xBase + Math.sin(y * freq + t + offset) * amp;
          if (y === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = `rgba(6,182,212,0.12)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Strand B (opposite phase)
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 3) {
          const x = xBase + Math.sin(y * freq + t + offset + Math.PI) * amp;
          if (y === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = `rgba(139,92,246,0.12)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Cross-links
        const STEP = 28;
        for (let y = 0; y <= canvas.height; y += STEP) {
          const xA = xBase + Math.sin(y * freq + t + offset) * amp;
          const xB = xBase + Math.sin(y * freq + t + offset + Math.PI) * amp;
          const alpha = (Math.sin(y * freq + t + offset) * 0.5 + 0.5) * 0.12;
          ctx.beginPath();
          ctx.moveTo(xA, y);
          ctx.lineTo(xB, y);
          ctx.strokeStyle = `rgba(16,185,129,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }} />;
}

/* ─── 7. EDUCATION (falling binary / code rain) ─────────── */
function CodeRain({ opacity = 0.5 }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    const FONT_SIZE = 13;
    let cols: number[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const count = Math.floor(canvas.width / FONT_SIZE);
      cols = Array.from({ length: count }, () => Math.random() * canvas.height / FONT_SIZE);
    };
    resize();
    window.addEventListener('resize', resize);

    const CHARS = '01アイウエオカキクケコ</>{}[]';

    const draw = () => {
      ctx.fillStyle = 'rgba(13,21,38,0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px monospace`;

      cols.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const alpha = Math.random() * 0.12 + 0.03;
        ctx.fillStyle = `rgba(139,92,246,${alpha})`;
        ctx.fillText(char, x, y * FONT_SIZE);
        if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          cols[i] = 0;
        } else {
          cols[i] += 0.4;
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }} />;
}

/* ─── 8. ORBITING DOTS (About) ──────────────────────────── */
function OrbitingDots({ opacity = 0.5 }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    // Cluster centers scattered across section
    const clusters = [
      { x: 0.15, y: 0.25, r: 70, count: 6, speed: 0.004, color: '6,182,212' },
      { x: 0.82, y: 0.6,  r: 90, count: 8, speed: 0.003, color: '139,92,246' },
      { x: 0.5,  y: 0.85, r: 55, count: 5, speed: 0.005, color: '6,182,212' },
      { x: 0.3,  y: 0.55, r: 65, count: 6, speed: 0.0035, color: '139,92,246' },
      { x: 0.75, y: 0.2,  r: 50, count: 5, speed: 0.006, color: '6,182,212' },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 1;

      clusters.forEach((cl) => {
        const cx = cl.x * canvas.width;
        const cy = cl.y * canvas.height;

        // Faint orbit ring
        ctx.beginPath();
        ctx.arc(cx, cy, cl.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${cl.color},0.06)`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        // Orbiting dots
        for (let i = 0; i < cl.count; i++) {
          const angle = (i / cl.count) * Math.PI * 2 + t * cl.speed;
          const px = cx + Math.cos(angle) * cl.r;
          const py = cy + Math.sin(angle) * cl.r;
          const pulse = Math.sin(t * 0.05 + i) * 0.5 + 0.5;

          // Glow
          const grad = ctx.createRadialGradient(px, py, 0, px, py, 6);
          grad.addColorStop(0, `rgba(${cl.color},${0.25 * pulse})`);
          grad.addColorStop(1, `rgba(${cl.color},0)`);
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cl.color},${0.5 + pulse * 0.3})`;
          ctx.fill();
        }

        // Center dot
        ctx.beginPath();
        ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cl.color},0.15)`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }} />;
}

/* ─── MAIN EXPORT ────────────────────────────────────────── */
export default function SectionBackground({ variant, opacity = 0.5 }: Props) {
  switch (variant) {
    case 'floating-rings':   return <FloatingRings opacity={opacity} />;
    case 'grid-pulse':       return <GridPulse opacity={opacity} />;
    case 'wave-lines':       return <WaveLines opacity={opacity} />;
    case 'hex-dots':         return <HexDots opacity={opacity} />;
    case 'meteor-shower':    return <MeteorShower opacity={opacity} />;
    case 'dna-helix':        return <DnaHelix opacity={opacity} />;
    case 'code-rain':        return <CodeRain opacity={opacity} />;
    case 'orbiting-dots':    return <OrbitingDots opacity={opacity} />;
    default:                 return null;
  }
}
