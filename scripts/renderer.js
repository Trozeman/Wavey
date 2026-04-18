

// --- Canvas ---
const canvas = document.getElementById('waveform');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// --- Settings state ---
const DEFAULTS = {
  style: 'wave',
  colorMode: 'solid',
  color: '#00ff88',
  gradientStart: '#ff0066',
  gradientEnd: '#00ccff',
  delay: 0,
  scale: 1,
  lineWidth: 2,
  bgMode: 'color',
  bgColor: '#3c3c3c',
};

// bgImage stored separately — can be several MB as base64
let bgImage = localStorage.getItem('sw-bg-image') || null;

function loadSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem('sw-settings') || '{}');
    return { ...DEFAULTS, ...stored };
  } catch {
    return { ...DEFAULTS };
  }
}

function saveSettings() {
  localStorage.setItem('sw-settings', JSON.stringify(settings));
}

const settings = loadSettings();

function updateImagePreview() {
  const has = !!bgImage;
  document.getElementById('bg-no-image').classList.toggle('hidden', has);
  document.getElementById('bg-preview-img').classList.toggle('hidden', !has);
  document.getElementById('bg-clear').classList.toggle('hidden', !has);
  if (has) document.getElementById('bg-preview-img').src = bgImage;
}

function applyBackground() {
  if (settings.bgMode === 'image' && bgImage) {
    document.body.style.backgroundImage    = `url(${bgImage})`;
    document.body.style.backgroundSize     = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundColor   = '';
  } else {
    document.body.style.backgroundImage    = '';
    document.body.style.backgroundSize     = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundColor   = settings.bgColor;
  }
}

// Sync all UI controls to the loaded values
function applySettingsToUI() {
  document.querySelectorAll('[data-style]').forEach(b => {
    b.classList.toggle('active', b.dataset.style === settings.style);
  });
  document.querySelectorAll('[data-color-mode]').forEach(b => {
    b.classList.toggle('active', b.dataset.colorMode === settings.colorMode);
  });
  document.querySelectorAll('[data-bg-mode]').forEach(b => {
    b.classList.toggle('active', b.dataset.bgMode === settings.bgMode);
  });
  document.getElementById('solid-section').classList.toggle('hidden', settings.colorMode !== 'solid');
  document.getElementById('gradient-section').classList.toggle('hidden', settings.colorMode !== 'gradient');
  document.getElementById('bg-color-section').classList.toggle('hidden', settings.bgMode !== 'color');
  document.getElementById('bg-image-section').classList.toggle('hidden', settings.bgMode !== 'image');
  document.getElementById('color').value          = settings.color;
  document.getElementById('gradient-start').value = settings.gradientStart;
  document.getElementById('gradient-end').value   = settings.gradientEnd;
  document.getElementById('line-width').value           = settings.lineWidth;
  document.getElementById('line-width-val').textContent = `${settings.lineWidth} px`;
  document.getElementById('scale').value           = settings.scale;
  document.getElementById('scale-val').textContent = `${settings.scale.toFixed(1)}×`;
  document.getElementById('delay').value          = settings.delay;
  document.getElementById('delay-val').textContent = `${settings.delay} ms`;
  document.getElementById('bg-color').value       = settings.bgColor;
  updateImagePreview();
  applyBackground();
}
applySettingsToUI();

// --- Config panel UI ---
document.getElementById('config-toggle').addEventListener('click', () => {
  document.getElementById('config-panel').classList.toggle('open');
});

document.querySelectorAll('[data-style]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-style]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    settings.style = btn.dataset.style;
    saveSettings();
  });
});

document.querySelectorAll('[data-color-mode]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-color-mode]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    settings.colorMode = btn.dataset.colorMode;
    document.getElementById('solid-section').classList.toggle('hidden', settings.colorMode !== 'solid');
    document.getElementById('gradient-section').classList.toggle('hidden', settings.colorMode !== 'gradient');
    saveSettings();
  });
});

document.getElementById('line-width').addEventListener('input', e => {
  settings.lineWidth = Number(e.target.value);
  document.getElementById('line-width-val').textContent = `${settings.lineWidth} px`;
  saveSettings();
});

document.getElementById('scale').addEventListener('input', e => {
  settings.scale = Number(e.target.value);
  document.getElementById('scale-val').textContent = `${settings.scale.toFixed(1)}×`;
  saveSettings();
});

document.getElementById('delay').addEventListener('input', e => {
  settings.delay = Number(e.target.value);
  document.getElementById('delay-val').textContent = `${e.target.value} ms`;
  saveSettings();
});

document.getElementById('color').addEventListener('input', e => { settings.color = e.target.value; saveSettings(); });
document.getElementById('gradient-start').addEventListener('input', e => { settings.gradientStart = e.target.value; saveSettings(); });
document.getElementById('gradient-end').addEventListener('input', e => { settings.gradientEnd = e.target.value; saveSettings(); });

document.querySelectorAll('[data-bg-mode]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-bg-mode]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    settings.bgMode = btn.dataset.bgMode;
    document.getElementById('bg-color-section').classList.toggle('hidden', settings.bgMode !== 'color');
    document.getElementById('bg-image-section').classList.toggle('hidden', settings.bgMode !== 'image');
    applyBackground();
    saveSettings();
  });
});

document.getElementById('bg-color').addEventListener('input', e => {
  settings.bgColor = e.target.value;
  applyBackground();
  saveSettings();
});

document.getElementById('bg-file').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    bgImage = ev.target.result;
    localStorage.setItem('sw-bg-image', bgImage);
    updateImagePreview();
    applyBackground();
  };
  reader.readAsDataURL(file);
});

document.getElementById('bg-clear').addEventListener('click', () => {
  bgImage = null;
  localStorage.removeItem('sw-bg-image');
  document.getElementById('bg-file').value = '';
  updateImagePreview();
  applyBackground();
});

// --- Drawing helpers ---
function strokeStyle(x1, y1, x2, y2) {
  if (settings.colorMode === 'solid') return settings.color;
  const g = ctx.createLinearGradient(x1, y1, x2, y2);
  g.addColorStop(0, settings.gradientStart);
  g.addColorStop(1, settings.gradientEnd);
  return g;
}

function drawWave(buf) {
  const { width, height } = canvas;
  ctx.beginPath();
  ctx.strokeStyle = strokeStyle(0, 0, width, 0);
  ctx.lineWidth = settings.lineWidth;
  const step = width / buf.length;
  for (let i = 0; i < buf.length; i++) {
    const x = i * step;
    const y = height / 2 + buf[i] * 0.5 * height * settings.scale;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawBars(buf) {
  const { width, height } = canvas;
  const count = buf.length;
  const bw = width / count;
  for (let i = 0; i < count; i++) {
    const bh = Math.min(((buf[i] / 255) * height * settings.scale)/2, height/2);
    const x = i * bw;
    const y = height - bh;
    if (settings.colorMode === 'gradient') {
      const g = ctx.createLinearGradient(x, y, x, height);
      g.addColorStop(0, settings.gradientStart);
      g.addColorStop(1, settings.gradientEnd);
      ctx.fillStyle = g;
    } else {
      ctx.fillStyle = settings.color;
    }
    ctx.fillRect(x + 0.5, y, bw - 1, bh);
  }
}

function drawCircle(buf) {
  const { width, height } = canvas;
  const cx = width / 2;
  const cy = height / 2;
  const base = Math.min(width, height) * 0.25;
  const amp  = Math.min(width, height) * 0.18;

  ctx.beginPath();
  ctx.strokeStyle = strokeStyle(cx - base, cy, cx + base, cy);
  ctx.lineWidth = settings.lineWidth;

  const len = buf.length;
  for (let i = 0; i <= len; i++) {
    const v = buf[i % len];
    const angle = (i / len) * Math.PI * 2 - Math.PI / 2;
    const r = base + v * amp * settings.scale;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawPulse(buf) {
  const { width, height } = canvas;
  const count  = 25;
  const gap    = 7;
  const barW   = (width - (count * gap)) / count  ;
  const originX =  gap;
  const midY    = height / 2;

  for (let i = 0; i < count; i++) {
    const norm = buf[Math.floor(i * buf.length / count)] / 255;
    const half = Math.max(3, norm * height * 0.45 * settings.scale);
    const x    = originX + i * (barW + gap);
    const y    = midY - half;

    if (settings.colorMode === 'gradient') {
      const g = ctx.createLinearGradient(x, y, x, y + half * 2);
      g.addColorStop(0, settings.gradientStart);
      g.addColorStop(1, settings.gradientEnd);
      ctx.fillStyle = g;
    } else {
      ctx.fillStyle = settings.color;
    }

    ctx.beginPath();
    ctx.roundRect(x, y, barW, half * 2, 4);
    ctx.fill();
  }
}

function drawSideBars(buf) {
  const { width, height } = canvas;
  const count = 40;
  const slotH = height / count;
  const barH  = Math.max(1, slotH - 3);
  const half  = width / 2;

  for (let i = 0; i < count; i++) {
    const norm = buf[Math.floor(i * buf.length / count)] / 255;
    const barW = Math.max(2, norm * half * settings.scale);
    const y    = i * slotH + (slotH - barH) / 2;

    if (settings.colorMode === 'gradient') {
      const gL = ctx.createLinearGradient(0, 0, barW, 0);
      gL.addColorStop(0, settings.gradientStart);
      gL.addColorStop(1, settings.gradientEnd);
      ctx.fillStyle = gL;
    } else {
      ctx.fillStyle = settings.color;
    }
    ctx.beginPath();
    ctx.roundRect(0, y, barW, barH, [0, 4, 4, 0]);
    ctx.fill();

    if (settings.colorMode === 'gradient') {
      const gR = ctx.createLinearGradient(width, 0, width - barW, 0);
      gR.addColorStop(0, settings.gradientStart);
      gR.addColorStop(1, settings.gradientEnd);
      ctx.fillStyle = gR;
    }
    ctx.beginPath();
    ctx.roundRect(width - barW, y, barW, barH, [4, 0, 0, 4]);
    ctx.fill();
  }
}

// --- Decay smoothing ---
// Snaps toward louder values instantly, decays back toward 0 at the configured rate.
// k = per-frame decay factor derived from the time constant (delay ms at ~60 fps).
function applyDecay(raw, display) {
  if (settings.delay === 0) {
    for (let i = 0; i < raw.length; i++) display[i] = raw[i];
    return;
  }
  const k = Math.exp(-16.67 / settings.delay); // 16.67ms ≈ one frame at 60fps
  for (let i = 0; i < raw.length; i++) {
    if (Math.abs(raw[i]) >= Math.abs(display[i])) display[i] = raw[i];
    else display[i] *= k;
  }
}

// --- Audio ---
let audioCtx    = null;
let analyser    = null;
let curSource   = null;
let curStream   = null;

async function initAudio(deviceId) {
  const audioConstraint = deviceId ? { deviceId: { exact: deviceId } } : true;
  const stream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraint, video: false });

  // Tear down previous stream/source
  curStream?.getTracks().forEach(t => t.stop());
  curSource?.disconnect();

  if (!audioCtx) {
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
  }

  curStream = stream;
  curSource = audioCtx.createMediaStreamSource(stream);
  curSource.connect(analyser);
}

async function populateDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const select  = document.getElementById('mic-select');
  select.innerHTML = '';
  devices
    .filter(d => d.kind === 'audioinput')
    .forEach(d => {
      const opt     = document.createElement('option');
      opt.value     = d.deviceId;
      opt.textContent = d.label || 'Microphone';
      select.appendChild(opt);
    });

  // Highlight whichever device is currently active
  const activeId = curStream?.getAudioTracks()[0]?.getSettings().deviceId;
  if (activeId) select.value = activeId;

  select.addEventListener('change', () => initAudio(select.value));
}

async function start() {
  await initAudio(null);    // first call — triggers OS permission prompt
  await populateDevices();  // labels are available only after permission

  const timeBuf     = new Float32Array(analyser.fftSize);
  const freqBuf     = new Uint8Array(analyser.frequencyBinCount);
  const dispTimeBuf = new Float32Array(analyser.fftSize);
  const dispFreqBuf = new Float32Array(analyser.frequencyBinCount);

  function draw() {
    requestAnimationFrame(draw);
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    if (settings.style === 'bars' || settings.style === 'pulse' || settings.style === 'sides') {
      analyser.getByteFrequencyData(freqBuf);
      applyDecay(freqBuf, dispFreqBuf);
      if (settings.style === 'bars')       drawBars(dispFreqBuf);
      else if (settings.style === 'pulse') drawPulse(dispFreqBuf);
      else                                 drawSideBars(dispFreqBuf);
    } else {
      analyser.getFloatTimeDomainData(timeBuf);
      applyDecay(timeBuf, dispTimeBuf);
      if (settings.style === 'wave') drawWave(dispTimeBuf);
      else                           drawCircle(dispTimeBuf);
    }
  }

  draw();
}

const preload = document.getElementById('preload');

start()
  .then(() => {
    preload.classList.add('done');
    preload.addEventListener('transitionend', () => preload.remove(), { once: true });
  })
  .catch(err => {
    console.error('Mic access error:', err);
    preload.classList.add('done');
  });
