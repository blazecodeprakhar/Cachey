// Cachey v3.3 - High-Performance Future Tech Website Engine
document.addEventListener('DOMContentLoaded', () => {

  // 1. High-Performance 60 FPS Shooting Stars & Twinkling Starfield Canvas Engine
  (function initStarfieldCanvas() {
    const canvas = document.getElementById('shooting-stars-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Gentle Twinkling Background Space Stars & Galaxy Dust
    const backgroundStars = [];
    const starCount = Math.min(120, Math.floor((width * height) / 14000));
    const starColors = ['#ffffff', '#38bdf8', '#c084fc', '#34d399', '#7dd3fc'];

    for (let i = 0; i < starCount; i++) {
      backgroundStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.7 + 0.15,
        speed: Math.random() * 0.008 + 0.003,
        direction: Math.random() > 0.5 ? 1 : -1,
        color: starColors[Math.floor(Math.random() * starColors.length)]
      });
    }

    // 8 Light, Infinite-Path Shooting Meteors
    const shootingStars = [];
    const shootingStarCount = 8;
    const angle = Math.PI / 4; // Uniform 45-degree trajectory

    class ShootingStar {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        // Always spawn outside top or right screen boundary
        if (Math.random() > 0.5) {
          this.x = Math.random() * (width + 600) - 100;
          this.y = -150;
        } else {
          this.x = width + 150;
          this.y = Math.random() * (height + 400) - 200;
        }

        // On initial page load, distribute along trajectory so meteors are already gliding
        if (initial) {
          const progress = Math.random() * Math.max(width, height);
          this.x -= Math.cos(angle) * progress;
          this.y += Math.sin(angle) * progress;
        }

        this.length = Math.random() * 240 + 160;  // Long, light blurry tail (160px to 400px)
        this.speed = Math.random() * 3.5 + 2.5;    // Smooth, light gliding speed (2.5px to 6.0px/frame)
        this.size = Math.random() * 1.5 + 0.8;    // Subtle meteor head radius
        this.alpha = Math.random() * 0.35 + 0.15;  // Light subtle opacity
        this.colorHead = '#ffffff';
        this.colorMid = Math.random() > 0.5 ? '#38bdf8' : '#a855f7'; // Cyan or Purple glow
      }

      update() {
        // Continuous travel across entire screen
        this.x -= Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;

        // Reset ONLY when completely outside screen boundaries (infinite continuous trail)
        if (this.x < -this.length * 2 || this.y > height + this.length * 2) {
          this.reset(false);
        }
      }

      draw() {
        const tailX = this.x + Math.cos(angle) * this.length;
        const tailY = this.y - Math.sin(angle) * this.length;

        ctx.save();
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.colorMid;

        const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
        grad.addColorStop(0.3, this.colorMid);
        grad.addColorStop(1, 'rgba(3, 7, 18, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.fillStyle = this.colorHead;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    for (let i = 0; i < shootingStarCount; i++) {
      shootingStars.push(new ShootingStar());
    }

    // Prominent 4-Point Cross Sparkle Flare Stars (Matching Screenshots)
    const flareStars = [
      { xRatio: 0.18, yRatio: 0.44, color: '#38bdf8', size: 14, alpha: 0.85, speed: 0.005, dir: 1 },
      { xRatio: 0.82, yRatio: 0.22, color: '#c084fc', size: 16, alpha: 0.90, speed: 0.004, dir: -1 },
      { xRatio: 0.10, yRatio: 0.72, color: '#38bdf8', size: 12, alpha: 0.78, speed: 0.006, dir: 1 },
      { xRatio: 0.86, yRatio: 0.58, color: '#34d399', size: 14, alpha: 0.82, speed: 0.005, dir: -1 },
      { xRatio: 0.50, yRatio: 0.85, color: '#c084fc', size: 11, alpha: 0.70, speed: 0.007, dir: 1 }
    ];

    function drawCrossFlareStar(x, y, size, color, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = 12;
      ctx.shadowColor = color;

      // Horizontal beam
      let gradH = ctx.createLinearGradient(x - size, y, x + size, y);
      gradH.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradH.addColorStop(0.5, color);
      gradH.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.strokeStyle = gradH;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(x + size, y);
      ctx.stroke();

      // Vertical beam
      let gradV = ctx.createLinearGradient(x, y - size, x, y + size);
      gradV.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradV.addColorStop(0.5, color);
      gradV.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.strokeStyle = gradV;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x, y + size);
      ctx.stroke();

      // Central white core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x, y, 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Render twinkling stars
      backgroundStars.forEach(star => {
        star.alpha += star.speed * star.direction;
        if (star.alpha >= 0.95 || star.alpha <= 0.15) {
          star.direction *= -1;
        }

        ctx.save();
        ctx.shadowBlur = star.radius > 1.0 ? 8 : 4;
        ctx.shadowColor = star.color;
        ctx.fillStyle = star.color === '#ffffff' ? `rgba(255, 255, 255, ${star.alpha})` : star.color;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Render 4-point cross flare stars (from screenshots)
      flareStars.forEach(fStar => {
        fStar.alpha += fStar.speed * fStar.dir;
        if (fStar.alpha >= 0.95 || fStar.alpha <= 0.3) {
          fStar.dir *= -1;
        }
        const fx = fStar.xRatio * width;
        const fy = fStar.yRatio * height;
        drawCrossFlareStar(fx, fy, fStar.size, fStar.color, fStar.alpha);
      });

      // Render shooting stars
      shootingStars.forEach(star => {
        star.update();
        star.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();
  })();

  // 2. Toast Notification System
  window.showToast = function(message, icon = 'fa-circle-check') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3000);
  };

  // 3. Download Handlers
  const downloadBtns = document.querySelectorAll('.download-exe-trigger, [download], a[href$=".zip"], a[href$=".exe"], a[href$=".py"], a[href$=".txt"]');
  
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const href = btn.getAttribute('href');
      const filename = btn.getAttribute('download') || (href ? href.split('/').pop() : '');

      if (btn.classList.contains('download-exe-trigger')) {
        showToast('Downloading Cachey.exe (38.1 MB)...', 'fa-file-arrow-down');
      } else if (filename) {
        showToast(`Downloading ${filename}...`, 'fa-file-arrow-down');
      }
    });
  });

  // 4. Copy Code Functionality
  window.copyCode = function(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
      const originalText = buttonElement.innerHTML;
      buttonElement.innerHTML = `<i class="fa-solid fa-check"></i> Copied`;
      buttonElement.style.color = '#34d399';
      showToast('Command copied to clipboard!');

      setTimeout(() => {
        buttonElement.innerHTML = originalText;
        buttonElement.style.color = '';
      }, 2000);
    }).catch(() => {
      showToast('Failed to copy text', 'fa-circle-exclamation');
    });
  };

  // 5. Mobile Navigation Drawer Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.className = isActive ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }

});
