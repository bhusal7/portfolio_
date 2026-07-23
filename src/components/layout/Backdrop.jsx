import { useEffect, useRef } from "react";

const GLYPHS = "01アカサタナ<RAG/>{ML}$#";

export default function Backdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width, height, columns, drops, raf;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const fontSize = 15;
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -100);
    };
    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) return () => window.removeEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(5,8,7,0.08)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#39e07a";
      ctx.font = "15px JetBrains Mono, monospace";
      for (let i = 0; i < drops.length; i++) {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx.fillText(glyph, i * 15, drops[i] * 15);
        if (drops[i] * 15 > height && Math.random() > 0.978) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-[0.12]" />
      <div className="grain-overlay" />
      <div className="scanline-overlay" />
      <div className="vignette-overlay" />
    </>
  );
}
