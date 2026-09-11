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

    // 150 Twinkling Background Space Stars
    const backgroundStars = [];
    const starCount = Math.min(220, Math.floor((width * height) / 7000));

    for (let i = 0; i < starCount; i++) {
      backgroundStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.015 + 0.005,
        direction: Math.random() > 0.5 ? 1 : -1
      });
    }

    // 25 High-Speed Blurring Shooting Meteors
    const shootingStars = [];
    const shootingStarCount = 25;
    const angle = Math.PI / 4; // Uniform 45-degree trajectory

    class ShootingStar {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        // Spawn along top or right boundaries
        if (Math.random() > 0.4) {
          this.x = Math.random() * (width + 600) - 200;
          this.y = initial ? Math.random() * height * 0.85 : -120;
        } else {
          this.x = width + 150;
          this.y = Math.random() * (height + 500) - 200;
        }

        this.length = Math.random() * 180 + 150; // Long blurry glowing tail (150px to 330px)
        this.speed = Math.random() * 18 + 16;     // Fast meteor speed (16px to 34px/frame)
        this.size = Math.random() * 2.4 + 1.2;    // Meteor head radius
        this.alpha = Math.random() * 0.7 + 0.3;   // Opacity
        this.life = 0;
        this.maxLife = Math.random() * 90 + 70;
        this.colorHead = '#ffffff';
        this.colorMid = Math.random() > 0.45 ? '#38bdf8' : '#c084fc'; // Electric Cyan or Deep Purple glow
      }

      update() {
        this.x -= Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
        this.life++;

        if (this.life > this.maxLife * 0.65) {
          this.alpha -= 0.035;
        }

        if (this.x < -this.length || this.y > height + this.length || this.alpha <= 0) {
          this.reset();
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

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Render twinkling stars
      backgroundStars.forEach(star => {
        star.alpha += star.speed * star.direction;
        if (star.alpha >= 0.95 || star.alpha <= 0.15) {
          star.direction *= -1;
        }

        ctx.save();
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#38bdf8';
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
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
