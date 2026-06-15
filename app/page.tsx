"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const BALL_SIZE = 80;

export default function Home() {
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 100;
    let y = 100;

    let dx = 4 + Math.random() * 3;
    let dy = 4 + Math.random() * 3;

    const animate = () => {
      const ball = ballRef.current;
      if (!ball) return;

      const maxX = window.innerWidth - BALL_SIZE;
      const maxY = window.innerHeight - BALL_SIZE - 65;

      x += dx;
      y += dy;

      if (x <= 0 || x >= maxX) {
        dx *= -1;
      }

      if (y <= 0 || y >= maxY) {
        dy *= -1;
      }

      ball.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.8}deg)`;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="flex-1 h-full relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-sky-400" />
        <div className="h-1/3 bg-white flex items-center justify-center">
          <Image src="/sun.png" alt="Sun" width={250} height={250} />
        </div>
        <div className="h-1/3 bg-sky-400" />
      </div>

      <div ref={ballRef} className="absolute top-0 left-0 z-20">
        <Image
          src="/ball.png"
          alt="Football"
          width={BALL_SIZE}
          height={BALL_SIZE}
        />
      </div>
    </div>
  );
}