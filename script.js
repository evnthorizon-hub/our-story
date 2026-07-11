// ===================================
// CONFIGURATION
// ===================================

const CONFIG = {
    bestieName: 'Badmosh Bauniii',
    typewriterTexts: [
        'Hey Badmosh Bauniii... ❤️',
        'Pta ni tu ye website dekhte time kya soch rhi hogi...',
        'Shyd soch rhi hogi ki mein firse kuch ajeeb kr rha hu 😂',
        'Pr sach batau...',
        'Ye bss ek website ni hai.',
        'Ye vo sb hai jo mein kabse bolna chahta tha pr words hi ni mil rhe the.',
        'Isliye socha...',
        'Jo feel krta hu vo likh deta hu.',
        'Bss ek request hai...',
        'End tk dekhna. ❤️'
    ],
    typewriterSpeed: 80,
    pauseBetweenLines: 1500
};

// ===================================
// MEMORY DATA
// ===================================

const MEMORIES = [
    {
        title: "How It All Started",
        shortTitle: "✨ How It All Started",
        content: "Sb kuch ek random Snapchat request se start hua tha.\n\nUs time to bilkul bhi ni socha tha ki ek random request meri life ka itna acha part bn jayegi.\n\nPehle normal si hi baatein hoti thi...\n\nFir dheere dheere pta hi ni chla kab teri notification ka wait rehne lga.\n\nKab din me ek baar baat krna normal lgne lga.\n\nKab bina baat kiye din adhoora lgne lga.\n\nKab tu meri daily routine bn gyi.\n\nSach bolu...\n\nAaj bhi din ka sbse acha part tere se baat krna hi lgta hai.\n\nOrr shyd isi liye ye sb bnane ka mann kiya.",
        image: "assets/photos/beginning.jpeg"
    },
    {
        title: "Our First Picture",
        shortTitle: "✨ Our First Picture",
        content: "Ye smile...\n\nPta ni kitni baar dekh chuka hu.\n\nFir bhi hr baar pehli baar jesi hi lgti hai. ❤️",
        image: "assets/photos/everyday.jpeg"
    },
    {
        title: "My Favourite Photo",
        shortTitle: "✨ My Favourite Photo",
        content: "Tujhe shyd ye bss ek normal pic lgti hogi...\n\nPr meri gallery me ye favourite wali list me aati hai. 😂",
        image: "assets/photos/smile.jpeg"
    },
    {
        title: "Can't Stop Looking",
        shortTitle: "✨ Can't Stop Looking",
        content: "Kabhi kabhi bss dekhte rehne ka mann krta hai...\n\nBina kisi reason ke.",
        image: "assets/photos/constellation.jpeg"
    },
    {
        title: "Your Smile",
        shortTitle: "✨ Your Smile",
        content: "Is pic me pta ni kya baat hai...\n\nPr hr baar smile aa hi jati hai. 🥹",
        image: "assets/photos/proposal.jpeg"
    },
    {
        title: "One More Memory",
        shortTitle: "✨ One More Memory",
        content: "Ye wala moment...\n\nBss music ke saath dekhne wala hai.\n\nWords ki zrurt hi ni.",
        image: "assets/photos/silent.jpeg",
        silent: true
    },
    {
        title: "The Little Things I Notice",
        shortTitle: "✨ The Little Things I Notice",
        content: "Pta hai merko tere baare me sbse zyada kya psnd hai?\n\nTeri shakal ni...\n\nTeri care.\n\nTere efforts.\n\nTu choti choti cheezo ka dhyan rkhti hai.\n\nTu yaad rkhti hai.\n\nTu sun leti hai.\n\nTu smjh leti hai bina sb kuch explain kiye.\n\nOrr aajkal aise log milte bhi kitne hai...\n\nShyd isi liye tere se baat krke itna acha feel hota hai.",
        image: null
    }
];

// Secret memory
const SECRET_MEMORY = {
    title: "One Last Thing ❤️",
    shortTitle: "✨ One Last Thing ❤️",
    content: "Oye Rasmalaiii... 😂❤️\n\nAgar yha tk aa hi gyi hai...\n\nTo iska mtlb tune sb patiently dekha.\n\nThank you yrr.\n\nAb bss thoda sa hi baki hai.",
    image: null
};

// ===================================
// STARTUP OVERLAY
// ===================================

function createStartupStars() {
    const container = document.getElementById('startupStars');
    const numberOfStars = 150;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        star.style.animationDelay = Math.random() * 3 + 's';
        
        container.appendChild(star);
    }
}

function setupStartupOverlay() {
    const overlay = document.getElementById('startupOverlay');
    
    const handleStartupClick = () => {
        // Start music
        playMusic();
        
        // Remove overlay
        overlay.classList.add('hidden');
        
        // Remove event listeners
        overlay.removeEventListener('click', handleStartupClick);
        overlay.removeEventListener('touchstart', handleStartupClick);
    };
    
    // Add click and touch listeners
    overlay.addEventListener('click', handleStartupClick);
    overlay.addEventListener('touchstart', handleStartupClick, { passive: true });
}

// ===================================
// BACKGROUND MUSIC
// ===================================

let musicAttempted = false;
let isPlaying = false;
let audioReady = false;
let lastFocusedElement = null;
let envelopeOpened = false;
let letterContinueStarted = false;
let constellationStarted = false;
let shootingStarsStarted = false;
let heartParticlesStarted = false;
let confettiStarted = false;

function setupBackgroundMusic() {
    const musicButton = document.getElementById('musicButton');
    const audio = document.getElementById('backgroundMusic');
    
    // Set volume to pleasant level (30%)
    audio.volume = 0.3;
    
    // Ensure not muted
    audio.muted = false;
    
    // Preload audio
    audio.load();
    
    // Mark audio as ready when it can play
    audio.addEventListener('canplaythrough', () => {
        audioReady = true;
        console.log('Audio loaded and ready');
    });
    
    // Check if audio file exists by trying to load it
    audio.addEventListener('error', (e) => {
        console.log('Background music file not found. Button will remain visible but non-functional.');
        // Keep button visible but disable it
        musicButton.style.opacity = '0.5';
        musicButton.style.cursor = 'not-allowed';
        musicAttempted = true;
    });
    
    // Update button state on play/pause
    audio.addEventListener('play', () => {
        isPlaying = true;
        updateMusicButton();
        console.log('Music playing');
    });
    
    audio.addEventListener('pause', () => {
        isPlaying = false;
        updateMusicButton();
        console.log('Music paused');
    });
    
    audio.addEventListener('ended', () => {
        isPlaying = false;
        updateMusicButton();
    });
    
    // Button click handler
    musicButton.addEventListener('click', (event) => {
        event.stopPropagation();

        if (audio.error) {
            return;
        }
        
        if (isPlaying) {
            pauseMusic();
        } else {
        playMusic().catch(() => {
            // The story should still begin if the browser blocks audio.
        });
        }
    });
    
    // Setup mobile-specific audio handling
    setupMobileAudioFallback();
}

function setupMobileAudioFallback() {
    const audio = document.getElementById('backgroundMusic');
    let fallbackTriggered = false;
    
    const attemptMobilePlay = (event) => {
        if (fallbackTriggered || isPlaying || audio.error) {
            return;
        }
        
        fallbackTriggered = true;
        
        // Attempt to play audio
        playMusic().then(() => {
            console.log('Mobile audio started');
            // Remove listeners after successful play
            document.removeEventListener('touchstart', attemptMobilePlay);
            document.removeEventListener('click', attemptMobilePlay);
        }).catch((error) => {
            console.log('Mobile audio play attempt failed:', error);
            fallbackTriggered = false; // Allow retry
        });
    };
    
    // Add listeners for mobile interaction
    document.addEventListener('touchstart', attemptMobilePlay, { passive: true, once: false });
    document.addEventListener('click', attemptMobilePlay, { once: false });
}

function playMusic() {
    const audio = document.getElementById('backgroundMusic');
    
    if (audio.error) {
        return Promise.reject('Audio file error');
    }
    
    musicAttempted = true;
    
    // Ensure audio is loaded
    if (audio.readyState < 2) {
        audio.load();
    }
    
    // Ensure not muted and volume is correct
    audio.muted = false;
    audio.volume = 0.3;
    
    return audio.play().then(() => {
        isPlaying = true;
        updateMusicButton();
        console.log('Audio play successful');
    }).catch((error) => {
        console.log('Could not play audio:', error.name, error.message);
        isPlaying = false;
        updateMusicButton();
        throw error;
    });
}

function pauseMusic() {
    const audio = document.getElementById('backgroundMusic');
    audio.pause();
    isPlaying = false;
    updateMusicButton();
}

function updateMusicButton() {
    const musicButton = document.getElementById('musicButton');
    const musicIcon = musicButton.querySelector('.music-icon');
    const musicText = musicButton.querySelector('.music-text');
    
    if (isPlaying) {
        musicButton.classList.add('playing');
        musicButton.classList.remove('paused');
        musicIcon.textContent = '🎵';
        musicText.textContent = 'Music On';
        musicButton.setAttribute('aria-pressed', 'true');
        musicButton.title = 'Pause music';
    } else {
        musicButton.classList.remove('playing');
        musicButton.classList.add('paused');
        musicIcon.textContent = '🔇';
        musicText.textContent = 'Music Off';
        musicButton.setAttribute('aria-pressed', 'false');
        musicButton.title = 'Play music';
    }
}

// ===================================
// LOADING SCREEN
// ===================================

function createLoadingStars() {
    const container = document.getElementById('loadingStars');
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        star.style.animationDelay = Math.random() * 3 + 's';
        
        container.appendChild(star);
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Show startup overlay after loading screen
        showStartupOverlay();
    }, 2000);
}

function showStartupOverlay() {
    const startupOverlay = document.getElementById('startupOverlay');
    // Startup overlay starts hidden so the loading screen can be seen first.
    startupOverlay.style.display = 'flex';
    startupOverlay.classList.remove('hidden');
}

// ===================================
// CINEMATIC STAR BACKGROUND
// ===================================

function createStars() {
    const container = document.getElementById('starsContainer');

    // Star type definitions: [class, count, minSize, maxSize, minDur, maxDur]
    const starTypes = [
        { cls: 'tiny',   count: 220, minS: 0.5, maxS: 1.2,  minD: 3.5, maxD: 7  },
        { cls: 'small',  count: 130, minS: 1.0, maxS: 1.8,  minD: 2.8, maxD: 5.5 },
        { cls: 'medium', count: 60,  minS: 1.6, maxS: 2.8,  minD: 4.5, maxD: 9   },
        { cls: 'bright', count: 25,  minS: 2.4, maxS: 3.8,  minD: 6,   maxD: 12  },
        { cls: 'gold',   count: 12,  minS: 1.8, maxS: 3.0,  minD: 7,   maxD: 14  },
    ];

    const frag = document.createDocumentFragment();

    starTypes.forEach(({ cls, count, minS, maxS, minD, maxD }) => {
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star ' + cls;

            // Position with slight depth clustering — more stars near top
            star.style.left = (Math.random() * 100) + '%';
            const yBias = Math.pow(Math.random(), 0.8); // slight top-heavy bias
            star.style.top  = (yBias * 100) + '%';

            const size = minS + Math.random() * (maxS - minS);
            star.style.width  = size + 'px';
            star.style.height = size + 'px';

            const dur = minD + Math.random() * (maxD - minD);
            const del = -(Math.random() * maxD); // negative delay = start mid-animation
            star.style.setProperty('--twinkle-dur', dur + 's');
            star.style.setProperty('--twinkle-del', del + 's');

            frag.appendChild(star);
        }
    });

    container.appendChild(frag);
}

// ===================================
// TYPEWRITER EFFECT
// ===================================

async function typeWriter(element, texts) {
    const cursor = element.querySelector('.cursor');
    
    for (let i = 0; i < texts.length; i++) {
        const text = texts[i].replace('[BESTIE_NAME]', CONFIG.bestieName);
        
        // Type out the text
        for (let j = 0; j <= text.length; j++) {
            const currentText = text.substring(0, j);
            element.innerHTML = currentText + '<span class="cursor">|</span>';
            await sleep(CONFIG.typewriterSpeed);
        }
        
        // Pause between lines
        if (i < texts.length - 1) {
            await sleep(CONFIG.pauseBetweenLines);
            element.innerHTML = element.innerHTML.replace('<span class="cursor">|</span>', '<br><br><span class="cursor">|</span>');
        }
    }
    
    // Remove cursor after typing
    setTimeout(() => {
        const finalCursor = element.querySelector('.cursor');
        if (finalCursor) finalCursor.remove();
    }, 500);
    
    // Show the button with animation
    await sleep(300);
    const button = document.getElementById('openMessageBtn');
    button.classList.remove('hidden');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ===================================
// SECTION TRANSITIONS
// ===================================

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) {
        return;
    }

    targetSection.classList.add('active');
    
    // Smooth scroll to section
    setTimeout(() => {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// ===================================
// MEMORY GALAXY
// ===================================

function createMemoryStars() {
    const container = document.getElementById('memoryStarsContainer');
    container.innerHTML = '';
    
    MEMORIES.forEach((memory, index) => {
        const star = document.createElement('button');
        star.type = 'button';
        star.className = 'memory-star';
        star.setAttribute('aria-label', `Open chapter: ${memory.title}`);
        star.innerHTML = `
            <div class="star-glow"></div>
            <div class="star-icon">⭐</div>
            <div class="star-label">${memory.shortTitle}</div>
        `;
        
        star.addEventListener('click', () => {
            openMemoryModal(memory, index);
        });
        
        container.appendChild(star);
    });
    
    // Add secret memory star
    const secretStar = document.createElement('button');
    secretStar.type = 'button';
    secretStar.className = 'memory-star secret-star';
    secretStar.setAttribute('aria-label', `Open chapter: ${SECRET_MEMORY.title}`);
    secretStar.innerHTML = `
        <div class="star-glow secret-glow"></div>
        <div class="star-icon">🐶</div>
        <div class="star-label">${SECRET_MEMORY.shortTitle}</div>
    `;
    
    secretStar.addEventListener('click', () => {
        openSecretMemoryModal();
    });
    
    container.appendChild(secretStar);
}

function openMemoryModal(memory, index) {
    lastFocusedElement = document.activeElement;

    const modal = document.getElementById('memoryModal');
    const title = document.getElementById('memoryModalTitle');
    const text = document.getElementById('memoryModalText');
    const progress = document.getElementById('memoryProgress');
    const imageContainer = document.getElementById('memoryModalImage');
    
    modal.classList.toggle('silent-memory-active', Boolean(memory.silent));
    title.textContent = memory.silent ? '' : memory.title;
    text.textContent = memory.silent ? '' : memory.content;
    progress.textContent = memory.silent ? '' : `Memory ${index + 1}/${MEMORIES.length}`;
    
    // Set image — hide container completely when no image
    if (memory.image) {
        imageContainer.innerHTML = `<img src="${memory.image}" alt="${memory.title}" class="memory-modal-img cinematic-photo" loading="lazy" decoding="async">`;
        imageContainer.classList.remove('hidden-image');
    } else {
        imageContainer.innerHTML = '';
        imageContainer.classList.add('hidden-image');
    }
    
    // Remove existing continue button
    const existingBtn = document.querySelector('.memory-continue-btn');
    if (existingBtn) {
        existingBtn.remove();
    }
    
    // Add continue button if it's the last memory
    if (index === MEMORIES.length - 1) {
        const continueBtn = document.createElement('button');
        continueBtn.className = 'memory-continue-btn';
        continueBtn.textContent = 'Continue →';
        continueBtn.addEventListener('click', () => {
            closeMemoryModal();
            setTimeout(() => {
                showSection('envelopeSection');
            }, 400);
        });
        document.querySelector('.memory-modal-content').appendChild(continueBtn);
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Scroll modal and content to top so image appears first
    modal.scrollTop = 0;
    const modalContent = document.querySelector('.memory-modal-content');
    if (modalContent) modalContent.scrollTop = 0;
    
    document.getElementById('memoryClose').focus();
}

function openSecretMemoryModal() {
    lastFocusedElement = document.activeElement;

    const modal = document.getElementById('memoryModal');
    const title = document.getElementById('memoryModalTitle');
    const text = document.getElementById('memoryModalText');
    const progress = document.getElementById('memoryProgress');
    const imageContainer = document.getElementById('memoryModalImage');
    
    modal.classList.remove('silent-memory-active');
    title.textContent = SECRET_MEMORY.title;
    text.textContent = SECRET_MEMORY.content;
    progress.textContent = 'Secret Memory';
    
    // Set image — hide container completely when no image
    if (SECRET_MEMORY.image) {
        imageContainer.innerHTML = `<img src="${SECRET_MEMORY.image}" alt="${SECRET_MEMORY.title}" class="memory-modal-img cinematic-photo" loading="lazy" decoding="async">`;
        imageContainer.classList.remove('hidden-image');
    } else {
        imageContainer.innerHTML = '';
        imageContainer.classList.add('hidden-image');
    }
    
    // Remove any continue button
    const existingBtn = document.querySelector('.memory-continue-btn');
    if (existingBtn) {
        existingBtn.remove();
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Scroll modal and content to top so image appears first
    modal.scrollTop = 0;
    const modalContent = document.querySelector('.memory-modal-content');
    if (modalContent) modalContent.scrollTop = 0;
    
    document.getElementById('memoryClose').focus();
}

function closeMemoryModal() {
    const modal = document.getElementById('memoryModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';

    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

// ===================================
// ENVELOPE PARTICLES
// ===================================

function createEnvelopeParticles() {
    const container = document.getElementById('envelopeParticles');
    const numParticles = 30;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'light-particle';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.animationDuration = (Math.random() * 2 + 3) + 's';
        
        container.appendChild(particle);
    }
}

// ===================================
// ENVELOPE ANIMATION
// ===================================

function setupEnvelope() {
    const envelope = document.getElementById('envelope');
    
    envelope.addEventListener('click', () => {
        if (envelopeOpened) {
            return;
        }

        envelopeOpened = true;

        // Add opening animation
        envelope.classList.add('opening');
        envelope.style.cursor = 'default';
        
        // After animation, show letter and scroll
        setTimeout(() => {
            showSection('letterSection');
        }, 900);
    });
}

// ===================================
// CONSTELLATION ANIMATION
// ===================================

function createConstellation() {
    if (constellationStarted) {
        return;
    }

    constellationStarted = true;

    const canvas = document.getElementById('constellationCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = [];
    const numStars = 50;
    
    // Create star positions
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.5,
            velocity: {
                x: (Math.random() - 0.5) * 0.3,
                y: (Math.random() - 0.5) * 0.3
            }
        });
    }
    
    let animationFrame = 0;
    
    // Animation
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        animationFrame++;
        
        // Draw stars
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
            
            // Slow movement
            star.x += star.velocity.x * 0.5;
            star.y += star.velocity.y * 0.5;
            
            // Wrap around
            if (star.x < 0) star.x = canvas.width;
            if (star.x > canvas.width) star.x = 0;
            if (star.y < 0) star.y = canvas.height;
            if (star.y > canvas.height) star.y = 0;
        });
        
        // Draw connections (slower update)
        if (animationFrame % 2 === 0) {
            stars.forEach((star1, i) => {
                stars.forEach((star2, j) => {
                    if (i !== j) {
                        const distance = Math.sqrt(
                            Math.pow(star2.x - star1.x, 2) + 
                            Math.pow(star2.y - star1.y, 2)
                        );
                        
                        if (distance < 150) {
                            ctx.beginPath();
                            ctx.moveTo(star1.x, star1.y);
                            ctx.lineTo(star2.x, star2.y);
                            ctx.strokeStyle = `rgba(102, 126, 234, ${0.15 * (1 - distance / 150)})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                });
            });
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===================================
// CINEMATIC SHOOTING STARS
// ===================================

function createShootingStars() {
    if (shootingStarsStarted) {
        return;
    }

    shootingStarsStarted = true;

    const canvas = document.getElementById('shootingStarsCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const shootingStars = [];

    function spawnShootingStar() {
        // Rare — random angle across upper 2/3 of sky
        const angle = (Math.PI / 6) + Math.random() * (Math.PI / 6); // 30–60 deg
        const length = 90 + Math.random() * 140;
        const speed  = 4 + Math.random() * 6;
        // Warm white to pale gold colour
        const r = 255;
        const g = Math.floor(245 + Math.random() * 10);
        const b = Math.floor(200 + Math.random() * 55);
        shootingStars.push({
            x: Math.random() * canvas.width * 0.8,
            y: Math.random() * canvas.height * 0.45,
            angle,
            length,
            speed,
            opacity: 0,
            phase: 'fadein', // fadein | trail | fadeout
            r, g, b,
            tailFade: 0
        });
    }

    // Schedule rare appearances: 8–25 seconds between each
    function scheduleNext() {
        const delay = 8000 + Math.random() * 17000;
        setTimeout(() => {
            spawnShootingStar();
            scheduleNext();
        }, delay);
    }
    scheduleNext();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const s = shootingStars[i];

            // Phase management
            if (s.phase === 'fadein') {
                s.opacity = Math.min(1, s.opacity + 0.08);
                if (s.opacity >= 1) s.phase = 'trail';
            } else if (s.phase === 'trail') {
                s.tailFade += 0.018;
                if (s.tailFade >= 1) s.phase = 'fadeout';
            } else {
                s.opacity = Math.max(0, s.opacity - 0.05);
                if (s.opacity <= 0) { shootingStars.splice(i, 1); continue; }
            }

            ctx.save();
            ctx.translate(s.x, s.y);
            ctx.rotate(s.angle);

            // Main trail gradient
            const grad = ctx.createLinearGradient(-s.length * 0.3, 0, s.length * 0.7, 0);
            grad.addColorStop(0,   `rgba(${s.r},${s.g},${s.b},0)`);
            grad.addColorStop(0.4, `rgba(${s.r},${s.g},${s.b},${s.opacity * 0.30})`);
            grad.addColorStop(0.75,`rgba(${s.r},${s.g},${s.b},${s.opacity * 0.80})`);
            grad.addColorStop(1,   `rgba(${s.r},${s.g},${s.b},0)`);

            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-s.length * 0.3, 0);
            ctx.lineTo(s.length * 0.7, 0);
            ctx.stroke();

            // Bright head glow
            const headGrad = ctx.createRadialGradient(s.length * 0.7, 0, 0, s.length * 0.7, 0, 8);
            headGrad.addColorStop(0, `rgba(255,255,255,${s.opacity * 0.9})`);
            headGrad.addColorStop(0.4,`rgba(${s.r},${s.g},${s.b},${s.opacity * 0.4})`);
            headGrad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = headGrad;
            ctx.beginPath();
            ctx.arc(s.length * 0.7, 0, 8, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();

            // Move
            s.x += Math.cos(s.angle) * s.speed;
            s.y += Math.sin(s.angle) * s.speed;
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// ===================================
// HEART PARTICLES ANIMATION
// ===================================

function createHeartParticles() {
    if (heartParticlesStarted) {
        return;
    }

    heartParticlesStarted = true;

    const canvas = document.getElementById('heartParticlesCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const hearts = [];
    
    function createHeart() {
        hearts.push({
            x: Math.random() * canvas.width,
            y: canvas.height + 50,
            size: Math.random() * 20 + 10,
            speedY: Math.random() * 1 + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.3
        });
    }
    
    // Create hearts periodically
    setInterval(createHeart, 500);
    
    function drawHeart(x, y, size, opacity) {
        ctx.save();
        ctx.translate(x, y);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = '#ff6b6b';
        ctx.font = `${size}px Arial`;
        ctx.fillText('❤️', 0, 0);
        ctx.restore();
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        hearts.forEach((heart, index) => {
            drawHeart(heart.x, heart.y, heart.size, heart.opacity);
            
            heart.y -= heart.speedY;
            heart.x += heart.speedX;
            heart.opacity -= 0.002;
            
            if (heart.opacity <= 0 || heart.y < -50) {
                hearts.splice(index, 1);
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===================================
// GOLDEN PARTICLES (YES RESPONSE)
// ===================================

let goldenParticlesActive = false;

function createGoldenParticles() {
    if (goldenParticlesActive) return;
    goldenParticlesActive = true;

    const canvas = document.getElementById('goldenParticlesCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.classList.add('visible');

    const particles = [];
    const count = 55;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height * (0.3 + Math.random() * 0.7),
            r: 0.8 + Math.random() * 2.2,
            vy: -(0.12 + Math.random() * 0.35),
            vx: (Math.random() - 0.5) * 0.18,
            opacity: 0.2 + Math.random() * 0.6,
            flicker: 0.008 + Math.random() * 0.018,
            phase: Math.random() * Math.PI * 2,
            // warm gold to pale cream
            h: 38 + Math.random() * 20,
            s: 60 + Math.random() * 30,
            l: 65 + Math.random() * 25
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.phase += p.flicker;
            const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.phase));

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.h}, ${p.s}%, ${p.l}%, ${alpha})`;
            ctx.fill();

            p.y  += p.vy;
            p.x  += p.vx;

            // Gently wrap vertically
            if (p.y < -10) {
                p.y = canvas.height + 5;
                p.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ===================================
// ATMOSPHERE PARTICLES
// ===================================

function createAtmosphereParticles() {
    const container = document.getElementById('atmosphereLayer');
    if (!container) return;

    const layers = [
        { cls: 'layer-a', count: 18, durMin: 80, durMax: 110 },
        { cls: 'layer-b', count: 24, durMin: 60, durMax: 85  },
        { cls: 'layer-c', count: 20, durMin: 48, durMax: 68  },
    ];

    const frag = document.createDocumentFragment();

    layers.forEach(({ cls, count, durMin, durMax }) => {
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'atm-particle ' + cls;
            p.style.left = (Math.random() * 100) + '%';
            p.style.top  = (Math.random() * 100) + '%';
            const dur = durMin + Math.random() * (durMax - durMin);
            const del = -(Math.random() * dur);
            p.style.setProperty('--dur', dur + 's');
            p.style.setProperty('--del', del + 's');
            frag.appendChild(p);
        }
    });

    container.appendChild(frag);
}

// ===================================
// CONFETTI ANIMATION
// ===================================

function createConfetti() {
    if (confettiStarted) {
        return;
    }

    confettiStarted = true;

    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const confettiCount = 200;
    const colors = ['#ff6b6b', '#ee5a6f', '#667eea', '#764ba2', '#ffd700', '#48dbfb', '#ff9ff3', '#54a0ff'];
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 10 + 5,
            speedY: Math.random() * 4 + 3,
            speedX: Math.random() * 3 - 1.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 15 - 7.5
        });
    }
    
    // Animation
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((piece, index) => {
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate(piece.rotation * Math.PI / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            ctx.restore();
            
            // Update position
            piece.y += piece.speedY;
            piece.x += piece.speedX;
            piece.rotation += piece.rotationSpeed;
            
            // Reset if off screen
            if (piece.y > canvas.height) {
                confetti[index] = {
                    x: Math.random() * canvas.width,
                    y: -20,
                    size: Math.random() * 10 + 5,
                    speedY: Math.random() * 4 + 3,
                    speedX: Math.random() * 3 - 1.5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    rotation: Math.random() * 360,
                    rotationSpeed: Math.random() * 15 - 7.5
                };
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===================================
// EVENT LISTENERS
// ===================================

document.getElementById('openMessageBtn').addEventListener('click', () => {
    showSection('memoryGalaxySection');
});

document.getElementById('memoryClose').addEventListener('click', closeMemoryModal);

// Close modal on outside click
document.getElementById('memoryModal').addEventListener('click', (e) => {
    if (e.target.id === 'memoryModal') {
        closeMemoryModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.getElementById('memoryModal').classList.contains('active')) {
        closeMemoryModal();
    }
});

document.getElementById('continueBtn').addEventListener('click', (event) => {
    if (letterContinueStarted) {
        return;
    }

    letterContinueStarted = true;
    event.currentTarget.disabled = true;
    showSection('constellationSection');
    setTimeout(() => {
        createConstellation();
        createShootingStars();
    }, 200);
    
    // Automatically move to final section after 7 seconds
    setTimeout(() => {
        showSection('finalSection');
        createHeartParticles();
    }, 7000);
});

document.getElementById('yesBtn').addEventListener('click', () => {
    // Warm star brightening
    document.body.classList.add('yes-accepted');

    // Reduce particle activity before golden reveal
    document.body.classList.add('proposal-calm');

    // Golden particles — subtle, not confetti
    createGoldenParticles();

    // Slightly brighter stars via CSS class (smooth 3s transition)
    const starsContainer = document.getElementById('starsContainer');
    if (starsContainer) {
        setTimeout(() => {
            starsContainer.querySelectorAll('.star').forEach(s => {
                s.style.transition = 'filter 3s ease, opacity 2s ease';
                if (s.classList.contains('bright') || s.classList.contains('gold')) {
                    s.style.filter = 'brightness(1.8) sepia(0.2)';
                } else {
                    s.style.filter = 'brightness(1.3)';
                }
            });
        }, 400);
    }

    document.querySelector('.final-message').innerHTML = `
        <h2 class="response-message">Hehe... ❤️</h2>
        <p class="response-text">Officially meri bby.<br><br>Sach bolu...<br><br>Ye answer shyd meri life ke sbse ache moments me se ek hoga.<br><br>Thank you.<br><br>Mujhpe trust krne ke liye.<br><br>Meri life ka itna pyara part bnne ke liye.<br><br>Aaj se...<br><br>Ye story officially humari hai. ❤️</p>
    `;
});

document.getElementById('maybeBtn').addEventListener('click', () => {
    document.querySelector('.final-message').innerHTML = `
        <h2 class="response-message">It's okay darling. ❤️</h2>
        <p class="response-text">Jitna time chahiye...<br><br>Utna lele.<br><br>Mein wait kr skta hu.<br><br>Kyuki feelings force ni hoti.<br><br>Orr mein chahta hu jo bhi answer aaye...<br><br>Vo dil se aaye.<br><br>No pressure.<br><br>Bss ek baat yaad rkhna...<br><br>Tu hmesha mere liye special rhegi.</p>
    `;
});

// Handle window resize for canvas
window.addEventListener('resize', () => {
    const canvases = [
        'constellationCanvas',
        'shootingStarsCanvas',
        'confettiCanvas',
        'heartParticlesCanvas',
        'goldenParticlesCanvas'
    ];
    
    canvases.forEach(id => {
        const canvas = document.getElementById(id);
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
});

// ===================================
// INITIALIZATION
// ===================================

window.addEventListener('DOMContentLoaded', () => {
    // Create loading stars
    createLoadingStars();
    
    // Create startup stars
    createStartupStars();
    
    // Hide loading screen (will show startup overlay)
    hideLoadingScreen();
    
    // Setup startup overlay
    setupStartupOverlay();
    
    // Setup background music
    setupBackgroundMusic();
    
    // Create cinematic star background
    createStars();

    // Create floating atmosphere particles
    createAtmosphereParticles();
    
    // Create memory stars
    createMemoryStars();
    
    // Create envelope particles
    createEnvelopeParticles();
    
    // Setup envelope
    setupEnvelope();
    
    // Start typewriter effect after loading
    const typewriterElement = document.getElementById('typewriterText');
    setTimeout(() => {
        typeWriter(typewriterElement, CONFIG.typewriterTexts);
    }, 2500);
});
