
"use client";

import React, { useRef, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

// Fondo para modo claro: partículas sutiles sobre fondo blanco
const PARTICLE_COUNT = 120; // Igual que modo oscuro
const LAYERS = 1; // Sin parallax para efecto clásico
const PARTICLE_MIN_SIZE = 0.5;
const PARTICLE_MAX_SIZE = 1.5;
const PARTICLE_MIN_OPACITY = 0.2;
const PARTICLE_MAX_OPACITY = 1.0;
const PARTICLE_MIN_SPEED = 0.005;
const PARTICLE_MAX_SPEED = 0.015;
const BASE_COLOR = "#fff"; // Fondo blanco puro
const GRADIENT_COLOR = "#f8fafc"; // Degradado sutil

function randomBetween(a: number, b: number) {
	return a + Math.random() * (b - a);
}

function createParticle(layer: number) {
	return {
		x: Math.random(),
		y: Math.random(),
		size: randomBetween(PARTICLE_MIN_SIZE, PARTICLE_MAX_SIZE),
		opacity: randomBetween(PARTICLE_MIN_OPACITY, PARTICLE_MAX_OPACITY),
		color: "#111", // Negro profundo
		speed: randomBetween(PARTICLE_MIN_SPEED, PARTICLE_MAX_SPEED) * (layer + 1),
		twinkle: Math.random() > 0.5 ? 1 : -1,
		layer,
	};
}

export default function LightBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { theme } = useTheme();

	useEffect(() => {
		if (theme !== "light") return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		let animationId: number;
		let width = window.innerWidth;
		let height = window.innerHeight;

		// Crear partículas por capa
		let particles: any[] = [];
		function generateParticles() {
			particles = [];
			for (let layer = 0; layer < LAYERS; layer++) {
				const count = Math.floor(PARTICLE_COUNT / LAYERS);
				for (let i = 0; i < count; i++) {
					particles.push(createParticle(layer));
				}
			}
		}

		function resize() {
			width = window.innerWidth;
			height = window.innerHeight;
			if (canvas) {
				canvas.width = width;
				canvas.height = height;
			}
			generateParticles();
		}
		resize();
		window.addEventListener("resize", resize);

		function drawGradient() {
			if (!ctx) return;
			const grad = ctx.createLinearGradient(0, 0, 0, height);
			grad.addColorStop(0, BASE_COLOR);
			grad.addColorStop(1, GRADIENT_COLOR);
			ctx.fillStyle = grad;
			ctx.fillRect(0, 0, width, height);
		}

		function draw() {
			if (!ctx) return;
			drawGradient();
			for (const p of particles) {
				// Twinkle (parpadeo sutil)
				p.opacity += p.twinkle * p.speed;
				if (p.opacity > PARTICLE_MAX_OPACITY) {
					p.opacity = PARTICLE_MAX_OPACITY;
					p.twinkle = -1;
				} else if (p.opacity < PARTICLE_MIN_OPACITY) {
					p.opacity = PARTICLE_MIN_OPACITY;
					p.twinkle = 1;
					// Reubicar partícula
					p.x = Math.random();
					p.y = Math.random();
				}
				ctx.globalAlpha = p.opacity;
				ctx.beginPath();
				ctx.arc(
					p.x * width,
					p.y * height,
					p.size,
					0,
					2 * Math.PI
				);
				ctx.fillStyle = p.color;
				ctx.shadowColor = p.color;
				ctx.shadowBlur = 2;
				ctx.fill();
				ctx.shadowBlur = 0;
			}
			ctx.globalAlpha = 1;
			animationId = requestAnimationFrame(draw);
		}
		draw();

		return () => {
			window.removeEventListener("resize", resize);
			cancelAnimationFrame(animationId);
		};
	}, [theme]);

	if (theme !== "light") return null;
	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 w-full h-full z-0 pointer-events-none"
			aria-hidden="true"
			tabIndex={-1}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				zIndex: 0,
			}}
		/>
	);
}
