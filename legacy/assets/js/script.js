document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeCounterAnimations();
    initializeScrollAnimations();
});

function scrollToProperties() {
    const propertiesSection = document.getElementById('properties-section');
    if (propertiesSection) {
        const offsetTop = propertiesSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = offsetTop - 80; 

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    animatedElements.forEach((element) => {
        observer.observe(element);
    });
}
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-target'));
                
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });
}

// Animate individual counter
function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const startValue = 0;
    const startTime = Date.now();
    
    const isDecimal = target % 1 !== 0;
    const decimalPlaces = isDecimal ? 1 : 0;
    
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = startValue + (target - startValue) * easeOutCubic;
        
        // Format the display value
        let displayValue;
        if (isDecimal) {
            displayValue = currentValue.toFixed(decimalPlaces);
        } else {
            displayValue = Math.floor(currentValue).toLocaleString();
        }
        
        // Add prefix for counters
        if (target >= 1000 && !isDecimal) {
            element.textContent = '+' + displayValue;
        } else if (isDecimal) {
            element.textContent = displayValue + '/10';
        } else {
            element.textContent = '+' + displayValue;
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Ensure final value is exact
            if (isDecimal) {
                element.textContent = target.toFixed(decimalPlaces) + '/10';
            } else {
                element.textContent = '+' + target.toLocaleString();
            }
        }
    };
    
    requestAnimationFrame(animate);
}

// Initialize other animations
function initializeAnimations() {
    // Add staggered animation delays
    const slideUpElements = document.querySelectorAll('.animate-slide-up');
    slideUpElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.property-card, .audience-card, .testimonial-card');
    cards.forEach((card) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button) => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('no-hover')) {
                this.style.transform = 'translateY(-3px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Smooth scroll for all internal links
document.addEventListener('click', function(e) {
    // Check if clicked element is a link with hash
    if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = offsetTop - 80;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Add parallax effect to hero section (optional enhancement)
function initializeParallax() {
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-image');
    
    if (!heroSection || !heroImage) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled < heroSection.offsetHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize parallax if desired (uncomment the line below)
// initializeParallax();

// Form validation for search (optional enhancement)
function validateSearch() {
    const locationInput = document.querySelector('.search-input');
    const propertySelect = document.querySelector('.search-select');
    
    if (!locationInput.value.trim()) {
        alert('Por favor, insira uma localização para buscar.');
        locationInput.focus();
        return false;
    }
    
    return true;
}

// Add search functionality to search button
document.addEventListener('click', function(e) {
    if (e.target.closest('button') && e.target.closest('button').onclick === scrollToProperties) {
        // Optional: Add search validation here
        // if (!validateSearch()) {
        //     e.preventDefault();
        //     return;
        // }
    }
});

// Add loading states for buttons (optional enhancement)
function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = 'Carregando...';
    button.disabled = true;
    
    // Simulate loading time
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1000);
}

// Add intersection observer for fade-in effects
function addFadeInObserver() {
    const fadeElements = document.querySelectorAll('.animate-fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach((element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        fadeObserver.observe(element);
    });
}

// Initialize fade-in observer
document.addEventListener('DOMContentLoaded', addFadeInObserver);

// Add performance optimization for scroll events
let ticking = false;

function updateScrollEffects() {
    // Any scroll-based effects can be added here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Add error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach((img) => {
        img.addEventListener('error', function() {
            // Fallback for broken images
            this.style.backgroundColor = '#f3f4f6';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.alt = 'Imagem não disponível';
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Add Enter key support for buttons
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
    
    // Add Escape key to close any modals (if implemented later)
    if (e.key === 'Escape') {
        // Future modal closing functionality
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach((element) => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Export functions for global access
window.scrollToProperties = scrollToProperties;



const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});