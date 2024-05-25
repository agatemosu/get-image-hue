import Vibrant from "node-vibrant";

function rgbToHsv(red: number, green: number, blue: number) {
	const r = red / 255;
	const g = green / 255;
	const b = blue / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const d = max - min;

	let h = 0;
	const s = max === 0 ? 0 : d / max;
	const v = max;

	if (max !== min) {
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return [h * 360, s * 100, v * 100];
}

export default async function getHueDegree(imagePath: string) {
	const palette = await Vibrant.from(imagePath).getPalette();

	let totalHue = 0;
	let pixelCount = 0;

	const properties = [
		"Vibrant",
		"DarkVibrant",
		"LightVibrant",
		"Muted",
		"DarkMuted",
		"LightMuted",
	];

	for (const prop of properties) {
		const color = palette[prop];
		if (color) {
			const hue = rgbToHsv(color.r, color.g, color.b)[0];
			totalHue += hue;
			pixelCount++;
		}
	}

	return Math.round(totalHue / pixelCount);
}
