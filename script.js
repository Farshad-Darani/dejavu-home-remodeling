// Mobile Hamburger Menu Functions
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Close mobile menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Close all dropdowns when closing the menu
        if (!navMenu.classList.contains('active')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't close menu if it's a dropdown parent link
            if (this.parentElement.classList.contains('nav-dropdown') && window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.parentElement.querySelector('.dropdown-menu');
                const isVisible = dropdown.classList.contains('show');
                
                // Hide all other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('show');
                });
                
                // Toggle current dropdown
                if (!isVisible) {
                    dropdown.classList.add('show');
                }
                return;
            }
            
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Handle dropdown links in mobile
    document.querySelectorAll('.dropdown-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle smooth scrolling for anchor links
            if (href && href.includes('#')) {
                e.preventDefault();
                
                // Extract the target hash from href
                let targetHash;
                if (href.startsWith('#')) {
                    // Same page anchor link (e.g., #services)
                    targetHash = href.substring(1);
                } else if (href.includes('#')) {
                    // Different page with anchor (e.g., index.html#services)
                    const parts = href.split('#');
                    targetHash = parts[1];
                    
                    // If it's linking to a different page, navigate there first
                    if (href.includes('index.html') && !window.location.pathname.includes('index.html') && window.location.pathname !== '/') {
                        window.location.href = href;
                        return;
                    }
                }
                
                // Find target element and smooth scroll to it
                if (targetHash) {
                    const targetElement = document.getElementById(targetHash);
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // Update URL hash
                        history.pushState(null, null, '#' + targetHash);
                    }
                }
            }
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Initialize animations on load
    animateServicesOnScroll();

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Services scroll animation
        animateServicesOnScroll();
    });

    // Animation function for scroll effects
    function animateServicesOnScroll() {
        const triggerHeight = window.innerHeight * 0.9; // More lenient trigger

        // Animate review cards
        const reviewCards = document.querySelectorAll('.review-card');
        reviewCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < triggerHeight && !card.classList.contains('animate-in')) {
                card.classList.add('animate-in');
            }
        });

        // Animate kitchen gallery slider
        const kitchenGallerySlider = document.querySelector('.kitchen-gallery .kitchen-gallery-slider');
        if (kitchenGallerySlider) {
            const sliderTop = kitchenGallerySlider.getBoundingClientRect().top;
            
            if (sliderTop < triggerHeight && !kitchenGallerySlider.classList.contains('animate-in')) {
                kitchenGallerySlider.classList.add('animate-in');
            }
        }

        // Animate social media image
        const socialImage = document.querySelector('.social-image-container');
        if (socialImage) {
            const imageTop = socialImage.getBoundingClientRect().top;
            console.log('Social image top:', imageTop, 'Trigger height:', triggerHeight);
            
            if (imageTop < triggerHeight && !socialImage.classList.contains('animate-in')) {
                console.log('Animating social image!');
                socialImage.classList.add('animate-in');
            }
        }

        // Animate social media buttons
        const socialButtons = document.querySelectorAll('.social-buttons a');
        socialButtons.forEach((button, index) => {
            const buttonTop = button.getBoundingClientRect().top;
            
            if (buttonTop < triggerHeight && !button.classList.contains('animate-in')) {
                console.log('Animating social button:', index);
                // Add delay for staggered animation
                setTimeout(() => {
                    button.classList.add('animate-in');
                }, index * 100); // 100ms delay between buttons
            }
        });
    }

    // Active link highlighting
    function setActiveLink() {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Check if link matches current page or section
            const href = link.getAttribute('href');
            if (href === currentHash || 
                (href === '#home' && (currentHash === '' || currentHash === '#'))) {
                link.classList.add('active');
            }
        });
    }

    // Set active link on page load
    setActiveLink();

    // Update active link on hash change
    window.addEventListener('hashchange', setActiveLink);

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash
                    history.pushState(null, null, href);
                    setActiveLink();
                }
            });
        }
    });
    
    // Also handle smooth scrolling for any other anchor links on the page
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        // Skip if already handled by navLinks
        if (link.classList.contains('nav-link') || link.classList.contains('dropdown-link')) {
            return;
        }
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, this.getAttribute('href'));
            }
        });
    });

    // Phone number formatting (optional)
    const phoneLink = document.querySelector('.nav-phone');
    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            // Analytics tracking could go here
            console.log('Phone number clicked');
        });
    }
});

// Hero Section Slideshow functionality
class HeroSlideshow {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.hero-slide');
        this.dots = document.querySelectorAll('.hero-dot');
        this.prevBtn = document.querySelector('.hero-nav-btn.prev');
        this.nextBtn = document.querySelector('.hero-nav-btn.next');
        this.autoSlideInterval = null;
        this.autoSlideDelay = 5000; // 5 seconds
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        this.showSlide(0);
        this.bindEvents();
        this.startAutoSlide();
        this.addSwipeSupport();
    }
    
    bindEvents() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Pause on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => this.stopAutoSlide());
            heroSection.addEventListener('mouseleave', () => this.startAutoSlide());
        }
    }
    
    showSlide(index) {
        // Remove active class from all slides and dots
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        if (this.dots[index]) {
            this.dots[index].classList.add('active');
        }
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
        this.resetAutoSlide();
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
        this.resetAutoSlide();
    }
    
    goToSlide(index) {
        this.goToSlide(index);
        this.resetAutoSlide();
    }
    
    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoSlideDelay);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
    
    addSwipeSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        heroSection.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        heroSection.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            
            // Only trigger if horizontal swipe is dominant
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.nextSlide(); // Swipe left - next slide
                } else {
                    this.prevSlide(); // Swipe right - previous slide
                }
            }
        });
    }
}

// Initialize hero slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new HeroSlideshow();
});


// Hero Section JavaScript - Updated for new hero structure
document.addEventListener('DOMContentLoaded', function() {
    // Hero slideshow functionality
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    const scrollIndicator = document.querySelector('.hero-scroll a');
    
    let currentSlide = 0;
    let slideInterval;
    
    // Initialize slideshow
    function initSlideshow() {
        showSlide(0);
        startAutoSlide();
    }
    
    // Show specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (slides[index] && dots[index]) {
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }
    }
    
    // Next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    // Previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    // Start auto slideshow
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    // Stop auto slideshow
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // Navigation button event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }
    
    // Dot navigation event listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        }
    });
    
    // Pause slideshow on hover
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', stopAutoSlide);
        hero.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (hero) {
        hero.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        hero.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            stopAutoSlide();
            if (diff > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
            startAutoSlide();
        }
    }
    
    // Smooth scroll for scroll indicator
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(scrollIndicator.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // If no target found, scroll to next section
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Button click handlers for hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Responsive navigation handling
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        
        // Hide/show navigation elements based on screen size
        if (isMobile) {
            // Mobile optimizations can be added here
            hero?.classList.add('mobile-view');
        } else {
            hero?.classList.remove('mobile-view');
        }
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Performance optimization: Preload next image
    function preloadNextImage() {
        const nextIndex = (currentSlide + 1) % slides.length;
        const nextSlide = slides[nextIndex];
        if (nextSlide) {
            const bgImage = window.getComputedStyle(nextSlide).backgroundImage;
            if (bgImage && bgImage !== 'none') {
                const img = new Image();
                const url = bgImage.match(/url\(['"]?([^'"]*)['"]?\)/);
                if (url && url[1]) {
                    img.src = url[1];
                }
            }
        }
    }
    
    // Initialize everything
    initSlideshow();
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Preload images after initial load
    setTimeout(preloadNextImage, 1000);
    
    // Accessibility improvements
    // Add ARIA labels for screen readers
    slides.forEach((slide, index) => {
        slide.setAttribute('aria-label', `Slide ${index + 1} of ${slides.length}`);
    });
    
    // Focus management for keyboard navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('focus', () => {
            showSlide(index);
        });
    });
    
    console.log('Hero slideshow initialized with', slides.length, 'slides');
});

// Phone number submission functionality
function submitPhoneNumber() {
    const phoneInput = document.getElementById('heroPhone');
    const phoneNumber = phoneInput.value.trim();
    
    if (phoneNumber === '') {
        alert('Please enter your phone number');
        phoneInput.focus();
        return;
    }
    
    // Basic phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
        alert('Please enter a valid phone number');
        phoneInput.focus();
        return;
    }
    
    // Here you can add your actual submission logic
    // For now, we'll show a success message
    alert(`Thank you! We'll call you at ${phoneNumber} within 24 hours for your free estimate.`);
    
    // Clear the input
    phoneInput.value = '';
    
    // You can add actual form submission here:
    // - Send to your backend
    // - Integrate with CRM
    // - Send email notification, etc.
}

// Allow Enter key to submit phone number
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('heroPhone');
    if (phoneInput) {
        phoneInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitPhoneNumber();
            }
        });
    }

    // Hero Contact Form functionality
    const heroContactForm = document.getElementById('heroContactForm');
    
    if (heroContactForm) {
        heroContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phoneInput = document.getElementById('customerPhone');
            const phone = phoneInput.value.trim();
            
            // Basic validation
            if (!phone) {
                alert('Please enter your phone number');
                phoneInput.focus();
                return;
            }
            
            // Phone number validation (basic)
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
                alert('Please enter a valid phone number');
                phoneInput.focus();
                return;
            }
            
            // Success feedback
            const submitButton = heroContactForm.querySelector('.btn-primary');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.style.background = '#d4ad4a';
            
            // Simulate form submission (replace with actual form handler)
            setTimeout(() => {
                alert(`Thank you! We'll contact you at ${phone} within 24 hours for your free quote.`);
                
                // Reset form
                nameInput.value = '';
                phoneInput.value = '';
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.style.background = '#E9C46A';
                
                // You can add actual form submission logic here
                // For example: send data to your server or email service
                
            }, 1500);
        });
    }
});




// --- Process Section Animation ---
document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.process-step');
    if (!steps.length) return;
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, idx * 180); // staggered animation
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    steps.forEach(step => observer.observe(step));
});



// --- Gallery Section Functionality ---
document.addEventListener('DOMContentLoaded', function () {
    // --- Gallery Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const slides = document.querySelectorAll('.gallery-slide');
    let currentCategory = null;
    let currentSlideIdx = 0;

    function showSlidesByCategory(category) {
        slides.forEach((slide, idx) => {
            if (!category || slide.dataset.category === category) {
                slide.style.display = '';
                slide.classList.remove('prev');
            } else {
                slide.style.display = 'none';
            }
        });
        // Reset to first visible slide
        const visibleSlides = Array.from(slides).filter(slide => slide.style.display !== 'none');
        if (visibleSlides.length) {
            setActiveSlide(visibleSlides[0]);
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.filter;
            showSlidesByCategory(currentCategory);
        });
    });

    // --- Gallery Slider Navigation ---
    const sliderContainer = document.querySelector('.gallery-slider-container');
    const navPrev = sliderContainer.querySelector('.slider-nav.prev');
    const navNext = sliderContainer.querySelector('.slider-nav.next');
    const indicators = sliderContainer.querySelectorAll('.indicator');

    function getVisibleSlides() {
        return Array.from(slides).filter(slide => slide.style.display !== 'none');
    }

    function setActiveSlide(slide) {
        getVisibleSlides().forEach(s => s.classList.remove('active', 'prev'));
        slide.classList.add('active');
        currentSlideIdx = getVisibleSlides().indexOf(slide);
        updateIndicators();
    }

    function showSlideByIdx(idx) {
        const visible = getVisibleSlides();
        if (!visible.length) return;
        let newIdx = (idx + visible.length) % visible.length;
        setActiveSlide(visible[newIdx]);
    }

    navPrev.addEventListener('click', () => {
        showSlideByIdx(currentSlideIdx - 1);
    });
    navNext.addEventListener('click', () => {
        showSlideByIdx(currentSlideIdx + 1);
    });

    // --- Slider Indicators ---
    function updateIndicators() {
        const visible = getVisibleSlides();
        indicators.forEach((ind, i) => {
            if (i < visible.length) {
                ind.classList.toggle('active', i === currentSlideIdx);
                ind.style.display = '';
            } else {
                ind.style.display = 'none';
            }
        });
    }
    indicators.forEach((ind, i) => {
        ind.addEventListener('click', () => {
            const visible = getVisibleSlides();
            if (i < visible.length) setActiveSlide(visible[i]);
        });
    });

    // --- Before/After Toggle ---
    const beforeAfterBtns = document.querySelectorAll('.toggle-btn');
    beforeAfterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            beforeAfterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const state = btn.dataset.state;
            // Change image for current visible slide
            getVisibleSlides().forEach(slide => {
                const img = slide.querySelector('img');
                if (img) {
                    img.src = img.dataset[state];
                }
            });
        });
    });
    // Set initial state to 'after'
    document.querySelector('.toggle-btn[data-state="after"]').click();

    // --- Keyboard Navigation ---
    sliderContainer.tabIndex = 0;
    sliderContainer.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') showSlideByIdx(currentSlideIdx - 1);
        if (e.key === 'ArrowRight') showSlideByIdx(currentSlideIdx + 1);
    });

    // --- Swipe Navigation ---
    let startX = null;
    sliderContainer.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });
    sliderContainer.addEventListener('touchend', e => {
        if (startX === null) return;
        let dx = e.changedTouches[0].clientX - startX;
        if (dx > 40) showSlideByIdx(currentSlideIdx - 1);
        else if (dx < -40) showSlideByIdx(currentSlideIdx + 1);
        startX = null;
    });

    // --- Initialize ---
    showSlidesByCategory(null); // Show all by default
    setActiveSlide(getVisibleSlides()[0]);
});

// --- Gallery Section Animation ---
document.addEventListener('DOMContentLoaded', () => {
    // Gallery fade-in animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, idx * 120);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        galleryItems.forEach(item => observer.observe(item));
    }
});

// Kitchen Gallery Slider functionality

// Multi-gallery support for .kitchen-gallery
document.addEventListener('DOMContentLoaded', function () {
    const galleries = document.querySelectorAll('.kitchen-gallery-slider');
    galleries.forEach((gallery, galleryIdx) => {
        let currentIndex = 1;
        const slides = gallery.querySelectorAll('.kitchen-gallery-slide');
        const dots = gallery.querySelectorAll('.kitchen-gallery-dots .dot');
        const prevBtn = gallery.querySelector('.kitchen-gallery-nav.prev');
        const nextBtn = gallery.querySelector('.kitchen-gallery-nav.next');

        function showSlide(idx) {
            if (!slides.length) return;
            if (idx > slides.length) currentIndex = 1;
            if (idx < 1) currentIndex = slides.length;
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            if (slides[currentIndex - 1]) slides[currentIndex - 1].classList.add('active');
            if (dots[currentIndex - 1]) dots[currentIndex - 1].classList.add('active');
        }

        function changeSlide(dir) {
            showSlide(currentIndex += dir);
        }

        function goToSlide(idx) {
            showSlide(currentIndex = idx);
        }

        // Attach event listeners
        if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => goToSlide(i + 1));
        });

        // Auto-advance for each gallery
        setInterval(() => {
            // Only auto-advance if gallery is in the DOM (not removed)
            if (document.body.contains(gallery)) {
                changeSlide(1);
            }
        }, 5000);

        // Initialize
        showSlide(currentIndex);
    });
});

// reCAPTCHA and Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.querySelector('.quote-form');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            // Check if reCAPTCHA is completed before allowing form submission
            const recaptchaResponse = grecaptcha.getResponse();
            
            if (recaptchaResponse.length === 0) {
                e.preventDefault();
                alert('Please complete the reCAPTCHA verification to submit the form.');
                return false;
            }
            
            // Show loading state
            const submitBtn = document.querySelector('.quote-submit-btn');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
                submitBtn.disabled = true;
                
                // Re-enable button after 10 seconds in case of slow submission
                setTimeout(() => {
                    if (submitBtn.disabled) {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }
                }, 10000);
            }
            
            // Form will submit normally to PHP handler
            return true;
        });
    }
    
    // Check for error messages in URL
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = urlParams.get('error');
    if (errorMessage) {
        showErrorMessage(decodeURIComponent(errorMessage));
    }
});

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="error-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add error styles if not already added
    if (!document.querySelector('#error-styles')) {
        const style = document.createElement('style');
        style.id = 'error-styles';
        style.textContent = `
            .error-message {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #e74c3c;
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(231, 76, 60, 0.3);
                z-index: 10000;
                max-width: 400px;
                animation: slideInRight 0.3s ease-out;
            }
            
            .error-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .error-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                margin-left: auto;
                padding: 5px;
                border-radius: 3px;
                transition: background 0.2s;
            }
            
            .error-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @media (max-width: 480px) {
                .error-message {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(errorDiv);
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 8000);
}

// Introduction Gallery Slider Functions
let introSlideIndex = 1;

function changeIntroSlide(n) {
    showIntroSlide(introSlideIndex += n);
}

function currentIntroSlide(n) {
    showIntroSlide(introSlideIndex = n);
}

function showIntroSlide(n) {
    const slides = document.querySelectorAll('.intro-slide');
    const dots = document.querySelectorAll('.intro-dot');
    
    if (n > slides.length) { introSlideIndex = 1; }
    if (n < 1) { introSlideIndex = slides.length; }
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide and activate corresponding dot
    if (slides[introSlideIndex - 1]) {
        slides[introSlideIndex - 1].classList.add('active');
    }
    if (dots[introSlideIndex - 1]) {
        dots[introSlideIndex - 1].classList.add('active');
    }
}

// Auto-advance intro slider every 4 seconds
document.addEventListener('DOMContentLoaded', function() {
    setInterval(() => {
        changeIntroSlide(1);
    }, 4000);
});

// Before/After Gallery Switcher
function showBeforeAfter(type) {
    // Hide all galleries
    const galleries = document.querySelectorAll('.before-after-gallery');
    galleries.forEach(gallery => gallery.classList.remove('active'));
    
    // Remove active class from all thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Show selected gallery
    const selectedGallery = document.getElementById(type + '-gallery');
    if (selectedGallery) {
        selectedGallery.classList.add('active');
    }
    
    // Activate selected thumbnail
    const selectedThumbnail = document.querySelector(`[onclick="showBeforeAfter('${type}')"]`);
    if (selectedThumbnail) {
        selectedThumbnail.classList.add('active');
    }
}

// Scroll Animation for Gallery Section
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe the gallery elements
    const gallerySlider = document.querySelector('.intro-gallery-slider');
    const galleryContent = document.querySelector('.intro-content');
    
    if (gallerySlider) {
        observer.observe(gallerySlider);
    }
    
    if (galleryContent) {
        observer.observe(galleryContent);
    }

    // Observe the before/after transformation section
    const thumbnailGallery = document.querySelector('.thumbnail-gallery');
    const mainBeforeAfter = document.querySelector('.main-before-after');
    
    if (thumbnailGallery) {
        observer.observe(thumbnailGallery);
        
        // Also observe individual thumbnail items for staggered animation
        const thumbnailItems = document.querySelectorAll('.thumbnail-item');
        thumbnailItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    if (mainBeforeAfter) {
        observer.observe(mainBeforeAfter);
    }

    // Observe the services section images
    const serviceImages = document.querySelectorAll('.service-image');
    serviceImages.forEach(image => {
        observer.observe(image);
    });

    // Observe the review cards for staggered animation
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        observer.observe(card);
    });

    // Observe the reviews header elements
    const reviewsHeaderElements = document.querySelectorAll('.animate-header');
    reviewsHeaderElements.forEach(element => {
        observer.observe(element);
    });

    // Observe the reviews button
    const reviewsBtn = document.querySelector('.animate-btn');
    if (reviewsBtn) {
        observer.observe(reviewsBtn);
    }

    // Observe the projects gallery section elements
    const projectsHeaderElements = document.querySelectorAll('.animate-projects-header');
    projectsHeaderElements.forEach(element => {
        observer.observe(element);
    });

    const projectsSlider = document.querySelector('.animate-projects-slider');
    if (projectsSlider) {
        observer.observe(projectsSlider);
    }

    const projectsNavElements = document.querySelectorAll('.animate-projects-nav');
    projectsNavElements.forEach(element => {
        observer.observe(element);
    });

    // Observe the guarantee section title only
    const guaranteeTitle = document.querySelector('.animate-guarantee-title');
    if (guaranteeTitle) {
        observer.observe(guaranteeTitle);
    }

    // Observe the service areas section elements
    const serviceAreasSection = document.querySelector('.service-areas');
    if (serviceAreasSection) {
        observer.observe(serviceAreasSection);
    }

    const serviceAreasBox = document.querySelector('.animate-service-areas-box');
    if (serviceAreasBox) {
        observer.observe(serviceAreasBox);
    }

    const serviceAreasTitle = document.querySelector('.animate-service-areas-title');
    if (serviceAreasTitle) {
        observer.observe(serviceAreasTitle);
    }

    const serviceAreasCities = document.querySelector('.animate-service-areas-cities');
    if (serviceAreasCities) {
        observer.observe(serviceAreasCities);
    }

    // Observe the social media section elements
    const socialHeaderElements = document.querySelectorAll('.animate-social-header');
    socialHeaderElements.forEach(element => {
        observer.observe(element);
    });

    const socialImage = document.querySelector('.animate-social-image');
    if (socialImage) {
        observer.observe(socialImage);
    }

    const socialContent = document.querySelector('.animate-social-content');
    if (socialContent) {
        observer.observe(socialContent);
    }

    const socialTitle = document.querySelector('.animate-social-title');
    if (socialTitle) {
        observer.observe(socialTitle);
    }

    const socialButtons = document.querySelectorAll('.animate-social-btn');
    socialButtons.forEach(button => {
        observer.observe(button);
    });

    const socialDescription = document.querySelector('.animate-social-description');
    if (socialDescription) {
        observer.observe(socialDescription);
    }

    // Observe the quote section elements
    const quoteMap = document.querySelector('.animate-quote-map');
    if (quoteMap) {
        observer.observe(quoteMap);
    }

    const quoteMapHeader = document.querySelector('.animate-quote-map-header');
    if (quoteMapHeader) {
        observer.observe(quoteMapHeader);
    }

    const quoteMapIframe = document.querySelector('.animate-quote-map-iframe');
    if (quoteMapIframe) {
        observer.observe(quoteMapIframe);
    }

    const quoteInfoElements = document.querySelectorAll('.animate-quote-info');
    quoteInfoElements.forEach(element => {
        observer.observe(element);
    });

    const quoteForm = document.querySelector('.animate-quote-form');
    if (quoteForm) {
        observer.observe(quoteForm);
    }

    const quoteFormHeader = document.querySelector('.animate-quote-form-header');
    if (quoteFormHeader) {
        observer.observe(quoteFormHeader);
    }

    const quoteFormFields = document.querySelector('.animate-quote-form-fields');
    if (quoteFormFields) {
        observer.observe(quoteFormFields);
    }
});