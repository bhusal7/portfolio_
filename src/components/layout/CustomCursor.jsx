import { useEffect, useRef } from "react";

// Lightweight custom cursor: a small phosphor dot with a trailing ring.
// Skipped entirely on touch/coarse-pointer devices.
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.body.classList.add("cursor-none-fine");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
    };
    window.addEventListener("mousemove", onMove);

    const onOver = (e) => {
      const interactive = e.target.closest("a, button, input, textarea, [data-cursor='hover']");
      if (ringRef.current) ringRef.current.style.setProperty("--scale", interactive ? "1.8" : "1");
    };
    window.addEventListener("mouseover", onOver);

    let raf;
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("cursor-none-fine");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 z-[200] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-phosphor-bright pointer-events-none"
      />
      <div
        ref={ringRef}
        style={{ "--scale": 1 }}
        className="fixed left-0 top-0 z-[200] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-phosphor/60 pointer-events-none transition-[width,height] duration-200"
      >
        <div
          className="h-full w-full rounded-full transition-transform duration-200 ease-out"
          style={{ transform: "scale(var(--scale))" }}
        />
      </div>
    </div>
  );
}
