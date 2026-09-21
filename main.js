/**
 * CYBORG 2088 // INTERACTIVE CORE CONTROLLER
 * Futuristic features:
 * 1. Interactive Circuit Board & Cyber Particle Canvas Engine
 * 2. Web Audio API Sci-Fi Sound Synthesizer (Zero-dependency)
 * 3. 3D Tilt Holographic Perspective on Cards & Hero
 * 4. Modular Cyborg HUD Telemetry Mode Switcher
 * 5. Neural Uplink Terminal Transmission Simulator
 * 6. Smooth Scroll Reveal & Active Navigation
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. WEB AUDIO API SCI-FI SOUND SYNTHESIZER
     ========================================================================== */
  let audioCtx = null;
  let sfxEnabled = false;

  const initAudio = () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  };

  const playChirp = (freqStart = 1200, freqEnd = 2400, duration = 0.08, type = 'sine') => {
    if (!sfxEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freqStart, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('SFX Error:', e);
    }
  };

  const playModeSwitch = () => {
    if (!sfxEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      // Low power sweep
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(220, now);
      osc1.frequency.exponentialRampToValueAtTime(110, now + 0.18);
      gain1.gain.setValueAtTime(0.06, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.18);

      // High resonance pulse
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.05);
      osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.22);
      gain2.gain.setValueAtTime(0.08, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now + 0.05);
      osc2.stop(now + 0.22);
    } catch (e) {
      console.warn(e);
    }
  };

  const playTransmissionSuccess = () => {
    if (!sfxEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.09, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.25);
      });
    } catch (e) {
      console.warn(e);
    }
  };

  // SFX Toggle Button
  const sfxToggleBtn = document.getElementById('sfx-toggle');
  if (sfxToggleBtn) {
    sfxToggleBtn.addEventListener('click', () => {
      initAudio();
      sfxEnabled = !sfxEnabled;
      sfxToggleBtn.classList.toggle('sfx-active', sfxEnabled);
      const statusText = sfxToggleBtn.querySelector('.sfx-status');
      if (statusText) {
        statusText.textContent = sfxEnabled ? 'SFX: ON' : 'SFX: OFF';
      }
      if (sfxEnabled) {
        playChirp(800, 1600, 0.1);
      }
    });
  }

  // Generic interaction sounds for buttons
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (sfxEnabled) playChirp(1400, 2200, 0.04, 'triangle');
    });
    el.addEventListener('click', () => {
      if (sfxEnabled) playChirp(600, 1200, 0.08, 'sine');
    });
  });

  /* ==========================================================================
     2. CIRCUIT BOARD & CYBER PARTICLE CANVAS ENGINE
     ========================================================================== */
  const canvas = document.getElementById('circuit-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: -1000, y: -1000 };

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNetwork();
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Particle nodes for circuit mesh
    class CircuitNode {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 1;
        this.baseGlow = Math.random() * 0.5 + 0.2;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
        this.pulseAngle = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        this.pulseAngle += this.pulseSpeed;
      }

      draw() {
        const glow = this.baseGlow + Math.sin(this.pulseAngle) * 0.25;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${glow})`;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Circuit data packet pulses
    class CircuitPulse {
      constructor(fromNode, toNode) {
        this.from = fromNode;
        this.to = toNode;
        this.progress = 0;
        this.speed = Math.random() * 0.015 + 0.008;
      }

      update() {
        this.progress += this.speed;
        return this.progress < 1;
      }

      draw() {
        const curX = this.from.x + (this.to.x - this.from.x) * this.progress;
        const curY = this.from.y + (this.to.y - this.from.y) * this.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    let nodes = [];
    let pulses = [];
    const maxNodes = Math.min(Math.floor((width * height) / 18000), 75);

    function initNetwork() {
      nodes = [];
      pulses = [];
      for (let i = 0; i < maxNodes; i++) {
        nodes.push(new CircuitNode());
      }
    }

    initNetwork();

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      // Connect nodes within proximity with circuit style traces
      const connectDist = 135;
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        nodes[i].draw();

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDist) {
            const alpha = (1 - dist / connectDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);

            // Circuit-style 90-degree bend routing occasionally
            if (i % 2 === 0) {
              ctx.lineTo(nodes[i].x, nodes[j].y);
            }
            ctx.lineTo(nodes[j].x, nodes[j].y);

            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Random chance to spawn a traveling data packet
            if (Math.random() < 0.0007 && pulses.length < 15) {
              pulses.push(new CircuitPulse(nodes[i], nodes[j]));
            }
          }
        }

        // Mouse proximity reaction
        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          const mAlpha = (1 - mdist / 150) * 0.45;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${mAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // Update and render pulses
      pulses = pulses.filter(pulse => {
        const alive = pulse.update();
        if (alive) pulse.draw();
        return alive;
      });

      requestAnimationFrame(renderCanvas);
    }

    renderCanvas();
  }

  /* ==========================================================================
     3. 3D TILT HOLOGRAPHIC PERSPECTIVE
     ========================================================================== */
  const tiltElements = document.querySelectorAll('.tilt-card, .cyborg-image-wrapper');
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  /* ==========================================================================
     4. MODULAR CYBORG HUD TELEMETRY MODE SWITCHER
     ========================================================================== */
  const modeButtons = document.querySelectorAll('.mode-btn');
  const barPower = document.getElementById('bar-power');
  const barSynapse = document.getElementById('bar-synapse');
  const barTorque = document.getElementById('bar-torque');
  const barHeat = document.getElementById('bar-heat');

  const valPower = document.getElementById('val-power');
  const valSynapse = document.getElementById('val-synapse');
  const valTorque = document.getElementById('val-torque');
  const valHeat = document.getElementById('val-heat');
  const logLine = document.getElementById('dynamic-log-line');

  const modesData = {
    combat: {
      power: 98,
      powerVal: '98.4 %',
      synapse: 100,
      synapseVal: '99.8 %',
      torque: 96,
      torqueVal: '96.2 %',
      heat: 78,
      heatVal: '78.5 °C',
      log: '<span class="t-stamp">[' + getCurrentTime() + ']</span> <span class="t-cyan">ACTIVE:</span> Protocol [COMBAT OVERDRIVE] engaged. Muscular torque maximized.'
    },
    stealth: {
      power: 42,
      powerVal: '42.1 %',
      synapse: 94,
      synapseVal: '94.0 %',
      torque: 35,
      torqueVal: '35.0 %',
      heat: 18,
      heatVal: '18.2 °C',
      log: '<span class="t-stamp">[' + getCurrentTime() + ']</span> <span class="t-ok">STEALTH:</span> Acoustic dampening active. Thermal emissions suppressed.'
    },
    analysis: {
      power: 86,
      powerVal: '86.5 %',
      synapse: 100,
      synapseVal: '100.0 % (OVERCLOCKED)',
      torque: 28,
      torqueVal: '28.0 %',
      heat: 54,
      heatVal: '54.1 °C',
      log: '<span class="t-stamp">[' + getCurrentTime() + ']</span> <span class="t-cyan">SCAN:</span> Quantum optical HUD unlocked. 120 TB/s telemetry streamed.'
    },
    harmony: {
      power: 74,
      powerVal: '74.8 %',
      synapse: 99,
      synapseVal: '99.9 %',
      torque: 62,
      torqueVal: '62.4 %',
      heat: 36,
      heatVal: '36.5 °C',
      log: '<span class="t-stamp">[' + getCurrentTime() + ']</span> <span class="t-ok">EQUILIBRIUM:</span> Biological rhythm unified. Cell regeneration at 100%.'
    }
  };

  function getCurrentTime() {
    const d = new Date();
    return d.toTimeString().split(' ')[0];
  }

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const modeKey = btn.dataset.mode;
      const data = modesData[modeKey];
      if (!data) return;

      playModeSwitch();

      // Update gauges
      if (barPower) barPower.style.width = `${data.power}%`;
      if (barSynapse) barSynapse.style.width = `${data.synapse}%`;
      if (barTorque) barTorque.style.width = `${data.torque}%`;
      if (barHeat) barHeat.style.width = `${data.heat}%`;

      if (valPower) valPower.textContent = data.powerVal;
      if (valSynapse) valSynapse.textContent = data.synapseVal;
      if (valTorque) valTorque.textContent = data.torqueVal;
      if (valHeat) valHeat.textContent = data.heatVal;

      if (logLine) {
        logLine.innerHTML = data.log;
      }
    });
  });

  /* ==========================================================================
     5. NEURAL UPLINK TRANSMISSION TERMINAL SIMULATOR
     ========================================================================== */
  const uplinkForm = document.getElementById('neural-uplink-form');
  const terminalOutput = document.getElementById('form-terminal-output');
  const submitBtn = document.getElementById('submit-uplink-btn');

  if (uplinkForm && terminalOutput) {
    uplinkForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('caller-name');
      const emailInput = document.getElementById('caller-email');
      const messageInput = document.getElementById('transmission-packet');
      const augType = document.getElementById('augmentation-type');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        terminalOutput.className = 'form-terminal-box active';
        terminalOutput.innerHTML = `
          <div style="color: #ef4444; font-weight: bold;">[!] TRANSMISSION FAILED // MISSING CREDENTIALS</div>
          <div>Please ensure all mandatory neural parameters are populated before uplink.</div>
        `;
        playChirp(400, 200, 0.15, 'sawtooth');
        return;
      }

      // Start simulated transmission sequence
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
      }

      terminalOutput.className = 'form-terminal-box active';
      terminalOutput.innerHTML = `
        <div style="color: var(--neon-blue);">[+] INITIATING QUANTUM HANDSHAKE WITH RELAY OMEGA-7...</div>
        <div style="color: var(--silver-400);">[+] ENCRYPTING PACKET WITH 4096-BIT LATTICE KEY...</div>
      `;
      playChirp(800, 1600, 0.1);

      setTimeout(() => {
        terminalOutput.innerHTML += `
          <div style="color: var(--silver-400);">[+] ROUTING THROUGH ORBITAL NODE 77-ALPHA...</div>
        `;
      }, 700);

      setTimeout(() => {
        const token = 'CYB-2088-TX-' + Math.random().toString(36).substring(2, 9).toUpperCase();
        playTransmissionSuccess();
        terminalOutput.innerHTML = `
          <div class="terminal-success">[✔] TRANSMISSION CONFIRMED // PACKET ACCEPTED</div>
          <div>OPERATIVE: <strong>${escapeHtml(nameInput.value.trim())}</strong></div>
          <div>FREQUENCY: <strong>${escapeHtml(emailInput.value.trim())}</strong></div>
          <div>AUGMENTATION: <strong>${escapeHtml(augType ? augType.options[augType.selectedIndex].text : 'Direct Synaptic Link')}</strong></div>
          <div style="margin-top: 0.5rem;">VERIFICATION TOKEN: <span class="terminal-token">${token}</span></div>
          <div style="color: var(--silver-400); margin-top: 0.35rem; font-size: 0.72rem;">Stand by for neural diagnostic dispatch from Director of Cybernetics.</div>
        `;

        // Clear inputs
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        }
      }, 1600);
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ==========================================================================
     6. SCROLL REVEAL & NAVIGATION HIGHLIGHT
     ========================================================================== */
  // Header scrolled state
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (header) {
      header.classList.toggle('scrolled', scrollY > 50);
    }
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollY > 450);
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on navigation click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // IntersectionObserver for Scroll Reveal
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // Active Navigation link highlighter
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Animated Telemetry Counters in Hero
  const telemetryNums = document.querySelectorAll('.telemetry-num[data-counter]');
  let counted = false;

  function runCounters() {
    if (counted) return;
    counted = true;
    telemetryNums.forEach(el => {
      const target = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const startTime = performance.now();

      function updateCounter(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = (target * easeOut).toFixed(target < 1 ? 2 : 1);
        el.textContent = `${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = `${target}${suffix}`;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // Trigger counters when hero telemetry enters view
  const heroTelemetry = document.querySelector('.hero-telemetry');
  if (heroTelemetry) {
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        runCounters();
        counterObserver.disconnect();
      }
    }, { threshold: 0.2 });
    counterObserver.observe(heroTelemetry);
  }

});
