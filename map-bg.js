// Minecraft 风格的小地图背景 inspired by Atum
(function () {
  const BIOMES = {
    OCEAN: "#7cc4ff",
    BEACH: "#cde8ff",
    PLAINS: "#9bd5ff",
    FOREST: "#7fbbe9",
    DESERT: "#b8dbf5",
    MOUNTAIN: "#a4b9c9",
    SNOW_MOUNTAIN: "#e8f4ff",
  };

  const lerp = (a, b, t) => a + (b - a) * t;
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);

  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // 二维 Perlin 噪声
  function makePerlin(rng, size = 256) {
    const p = new Uint16Array(size * 2);
    const grads = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1],
    ];
    const perm = [];
    for (let i = 0; i < size; i++) perm[i] = i;
    for (let i = size - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [perm[i], perm[j]] = [perm[j], perm[i]];
    }
    for (let i = 0; i < size * 2; i++) {
      p[i] = perm[i % size];
    }
    const hash = (x, y) => p[p[x & 255] + (y & 255)] & 7;
    return (x, y) => {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const tx = x - xi;
      const ty = y - yi;
      const u = fade(tx);
      const v = fade(ty);
      const g00 = grads[hash(xi, yi)];
      const g10 = grads[hash(xi + 1, yi)];
      const g01 = grads[hash(xi, yi + 1)];
      const g11 = grads[hash(xi + 1, yi + 1)];
      const dot00 = g00[0] * tx + g00[1] * ty;
      const dot10 = g10[0] * (tx - 1) + g10[1] * ty;
      const dot01 = g01[0] * tx + g01[1] * (ty - 1);
      const dot11 = g11[0] * (tx - 1) + g11[1] * (ty - 1);
      const ix0 = lerp(dot00, dot10, u);
      const ix1 = lerp(dot01, dot11, u);
      return lerp(ix0, ix1, v) * 0.7071 + 0.5; // 顺便把值拉到 0..1
    };
  }

  function fbm(perlin, x, y, octaves, lacunarity = 2, gain = 0.5) {
    let amp = 1;
    let freq = 1;
    let total = 0;
    let norm = 0;
    for (let i = 0; i < octaves; i++) {
      total += perlin(x * freq, y * freq) * amp;
      norm += amp;
      amp *= gain;
      freq *= lacunarity;
    }
    return total / (norm || 1);
  }

  function pickBiome(h, t, m) {
    if (h < 0.32) return "OCEAN";
    if (h < 0.36) return "BEACH";
    if (h > 0.8 && t < 0.55) return "SNOW_MOUNTAIN";
    if (h > 0.7) return "MOUNTAIN";
    if (t > 0.65 && m < 0.35) return "DESERT";
    if (m > 0.55) return "FOREST";
    return "PLAINS";
  }

  const hexToRgb = (hex) => {
    const h = hex.replace("#", "");
    const num = parseInt(h, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  };

  function drawVignette(ctx, w, h) {
    const g = ctx.createRadialGradient(
      w * 0.5,
      h * 0.5,
      Math.min(w, h) * 0.25,
      w * 0.5,
      h * 0.5,
      Math.max(w, h) * 0.75
    );
    g.addColorStop(0, "rgba(0,0,20,0)");
    g.addColorStop(1, "rgba(0,40,80,0.18)");
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";
  }

  function drawGridLines(ctx, w, h, cell, chunkSize) {
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += cell * chunkSize) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += cell * chunkSize) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(w, y + 0.5);
      ctx.stroke();
    }
  }

  function render(canvas) {
    const displayW = window.innerWidth;
    const displayH = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(displayW * dpr);
    canvas.height = Math.floor(displayH * dpr);
    canvas.style.width = `${displayW}px`;
    canvas.style.height = `${displayH}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cell = Math.max(3, Math.floor(Math.min(displayW, displayH) / 200));
    const cols = Math.ceil(displayW / cell);
    const rows = Math.ceil(displayH / cell);

    const seed = 0xa17c3 ^ Math.floor(Math.random() * 1e9);
    const rng = mulberry32(seed);
    const perlinH = makePerlin(rng);
    const perlinT = makePerlin(rng);
    const perlinM = makePerlin(rng);

    // Precompute height map
    const heights = Array.from({ length: rows }, () => Array(cols));
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const nx = i / (cols - 1 || 1);
        const ny = j / (rows - 1 || 1);
        const height = fbm(perlinH, nx * 2.4, ny * 2.4, 5, 2, 0.5);
        const ridge = Math.abs(height * 2 - 1);
        const continent = lerp(height, ridge, 0.25);
        heights[j][i] = continent;
      }
    }

    // Lighting
    const shades = Array.from({ length: rows }, () => Array(cols));
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const hL = heights[j][Math.max(0, i - 1)];
        const hR = heights[j][Math.min(cols - 1, i + 1)];
        const hU = heights[Math.max(0, j - 1)][i];
        const hD = heights[Math.min(rows - 1, j + 1)][i];
        const nxg = (hL - hR) * 1.3;
        const nyg = (hU - hD) * 1.3;
        const nz = 1;
        const len = Math.hypot(nxg, nyg, nz) || 1;
        const ndotl = (nxg * -0.6 + nyg * -0.6 + nz * 0.8) / len;
        shades[j][i] = Math.max(0.55, Math.min(1.1, ndotl + 0.4));
      }
    }

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const nx = i / (cols - 1 || 1);
        const ny = j / (rows - 1 || 1);

        const tempLat = 1 - Math.abs(ny - 0.5) * 1.4; // 越靠近两头越冷
        const tempNoise = fbm(perlinT, nx * 3, ny * 3, 4, 2, 0.55);
        const temp = Math.min(1, Math.max(0, tempLat * 0.7 + tempNoise * 0.3));

        const moist = fbm(perlinM, nx * 3.2, ny * 3.2, 4, 2, 0.6);

        const hVal = heights[j][i];
        const biome = pickBiome(hVal, temp, moist);
        const base = hexToRgb(BIOMES[biome]);
        const s = shades[j][i];
        const r = Math.min(255, base.r * s);
        const g = Math.min(255, base.g * s);
        const b = Math.min(255, base.b * s);
        ctx.fillStyle = `rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(
          0
        )})`;
        ctx.fillRect(i * cell, j * cell, cell, cell);
      }
    }

    drawVignette(ctx, displayW, displayH);
    drawGridLines(ctx, displayW, displayH, cell, 8);
  }

  function initMapBackground(canvasId = "map-bg") {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const doRender = () => render(canvas);
    doRender();
    window.addEventListener("resize", () => {
      clearTimeout(doRender._t);
      doRender._t = setTimeout(doRender, 120);
    });
  }

  window.initMapBackground = initMapBackground;
  if (document.getElementById("map-bg")) {
    initMapBackground("map-bg");
  }
})();
