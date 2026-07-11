// ─── Scroll Progress ───
    const scrollProgress = document.getElementById('scroll-progress');
    function updateScrollProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = progress + '%';
    }

    // ─── Nav Scroll Behavior ───
    const nav = document.getElementById('navbar');
    let lastScroll = 0;
    function handleNavScroll() {
      const scrollTop = window.scrollY;
      if (scrollTop > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastScroll = scrollTop;
    }

    // ─── Active Nav Link ───
    const sections = document.querySelectorAll('.section[id], .hero[id]');
    const navLinks = document.querySelectorAll('.nav__links a');
    function updateActiveNav() {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', () => {
      updateScrollProgress();
      handleNavScroll();
      updateActiveNav();
    }, { passive: true });

    // ─── Mobile Menu ───
    const burger = document.getElementById('navBurger');
    const navLinksEl = document.getElementById('navLinks');
    burger.addEventListener('click', () => {
      navLinksEl.classList.toggle('open');
    });
    navLinksEl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksEl.classList.remove('open');
      });
    });

    // ─── Theme Toggle ───
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check saved preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });

    // ─── Typewriter Effect ───
    const typewriterEl = document.getElementById('typewriter-text');
    const phrases = [
      'A web developer who builds practical tools and modern web applications.',
      'Based in the Philippines. Focused on clean code and great UX.',
      'Turning caffeine into functional software since day one.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 45;

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex];

      if (!isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          typingSpeed = 2500; // Pause at end
        } else {
          typingSpeed = 35 + Math.random() * 40; // Natural variation
        }
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          typingSpeed = 400; // Pause before next phrase
        } else {
          typingSpeed = 20;
        }
      }

      setTimeout(typeWriter, typingSpeed);
    }

    // Start typewriter after a small delay
    setTimeout(typeWriter, 1200);

    // ─── Manila Time ───
    const manilaTimeEl = document.getElementById('manila-time');
    function updateManilaTime() {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      manilaTimeEl.textContent = now.toLocaleTimeString('en-US', options);
    }
    updateManilaTime();
    setInterval(updateManilaTime, 1000);

    // ─── IntersectionObserver for Reveals ───
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    revealElements.forEach(el => revealObserver.observe(el));

    // ─── Skill Tag Stagger Animation ───
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, i) => {
      tag.style.transitionDelay = (i * 0.03) + 's';
    });

    // ─── Smooth anchor scrolling ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offset = 100;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });