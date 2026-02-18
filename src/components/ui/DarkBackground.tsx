
"use client";

import React, { useRef, useEffect } from 'react';

// Fondo para modo oscuro: estrellas blancas pequeñas, parpadean y aparecen/desaparecen random
const STAR_COUNT = 120;
const STAR_MIN_SIZE = 0.5;
const STAR_MAX_SIZE = 1.5;
const STAR_MIN_OPACITY = 0.2;
const STAR_MAX_OPACITY = 1.0;
const STAR_TWINKLE_SPEED = 0.015;

function randomBetween(a: number, b: number) {
	return a + Math.random() * (b - a);
}

export default function DarkBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const stars = useRef(
		Array.from({ length: STAR_COUNT }, () => ({
			x: Math.random(),
			y: Math.random(),
			size: randomBetween(STAR_MIN_SIZE, STAR_MAX_SIZE),
			opacity: randomBetween(STAR_MIN_OPACITY, STAR_MAX_OPACITY),
			twinkle: Math.random() > 0.5 ? 1 : -1,
			speed: randomBetween(0.005, STAR_TWINKLE_SPEED),
		}))
	);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		let animationId: number;

		function resize() {
			if (!canvas) return;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
		resize();
		window.addEventListener('resize', resize);

		function draw() {
			if (!ctx || !canvas) return;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (const star of stars.current) {
				// Twinkle
				star.opacity += star.twinkle * star.speed;
				if (star.opacity > STAR_MAX_OPACITY) {
					star.opacity = STAR_MAX_OPACITY;
					star.twinkle = -1;
				} else if (star.opacity < STAR_MIN_OPACITY) {
					star.opacity = STAR_MIN_OPACITY;
					star.twinkle = 1;
					// Randomly move star to new position
					star.x = Math.random();
					star.y = Math.random();
				}
				ctx.globalAlpha = star.opacity;
				ctx.beginPath();
				ctx.arc(
					star.x * canvas.width,
					star.y * canvas.height,
					star.size,
					0,
					2 * Math.PI
				);
				ctx.fillStyle = '#fff';
				ctx.shadowColor = '#fff';
				ctx.shadowBlur = 2;
				ctx.fill();
				ctx.shadowBlur = 0;
			}
			ctx.globalAlpha = 1;
			animationId = requestAnimationFrame(draw);
		}
		draw();
		return () => {
			window.removeEventListener('resize', resize);
			cancelAnimationFrame(animationId);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 w-full h-full z-0 pointer-events-none"
			aria-hidden="true"
			tabIndex={-1}
			style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
		/>
	);
}
