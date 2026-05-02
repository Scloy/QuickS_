/**
 * QUICK S - CORE LOGIC (SCROLL RESET + HIGH-SPEED LOADER)
 */

// 0. Force Scroll to Top on Refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// 1. Reveal Observer
function initReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const options = { threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, options);
    revealElements.forEach(el => revealObserver.observe(el));
}

// 2. Main Page Typewriter
function startMainTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const words = ["oftware", "ystem", "ervice", "olution", "aaS"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const baseText = "QuickS "; 
        
        if (isDeleting) {
            typewriterElement.textContent = baseText + currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = baseText + currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 70 : 130;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    type();
}

// 3. Sequential Loading Sequence (ULTRA-FAST)
function startLoadingSequence() {
    // Reset scroll again just to be safe
    window.scrollTo(0, 0);
    
    const loaderText = document.getElementById('loader-text');
    const loader = document.getElementById('loading-screen');
    const navbar = document.getElementById('navbar');
    const fullText = "QuickS";
    let i = 0;

    function typeLoader() {
        if (i < fullText.length) {
            loaderText.textContent += fullText.charAt(i);
            i++;
            setTimeout(typeLoader, 80);
        } else {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.4s ease-out';
                if (navbar) navbar.style.opacity = '1';
                
                setTimeout(() => {
                    loader.style.display = 'none';
                    
                    // Trigger Slide Up Entrance
                    const heroReveals = document.querySelectorAll('section:first-of-type .reveal');
                    heroReveals.forEach(el => el.classList.add('active'));
                    
                    initReveal();
                    startMainTypewriter();
                    lucide.createIcons();
                }, 400);
            }, 400);
        }
    }

    setTimeout(typeLoader, 300);
}

// Initialize on Load
window.addEventListener('load', startLoadingSequence);

// 4. Navbar Background Logic
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar && window.scrollY > 50) navbar.classList.add('nav-scrolled');
    else if (navbar) navbar.classList.remove('nav-scrolled');
});

// 5. AJAX Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const status = document.createElement('div');
        status.className = 'fixed bottom-10 right-10 bg-white text-ig-text px-8 py-4 shadow-2xl font-sans text-xs uppercase tracking-widest z-50 reveal active';
        status.innerHTML = 'Enviando...';
        document.body.appendChild(status);
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                status.innerHTML = 'Sucesso! Entraremos em contato.';
                status.style.backgroundColor = '#1A1A1A';
                status.style.color = 'white';
                contactForm.reset();
                setTimeout(() => status.remove(), 5000);
            }
        } catch (error) {
            status.innerHTML = 'Erro de conexão.';
            setTimeout(() => status.remove(), 4000);
        }
    });
}
