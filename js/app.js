/* ============================================
   TechX Forum — Main Application Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initSearchFunctionality();
    initContactForm();
    initStarRatings();
});

/* --- Mobile Menu --- */
function initMobileMenu() {
    // Wait for components to inject header
    setTimeout(() => {
        const toggle = document.getElementById('menu-toggle');
        const nav = document.getElementById('main-nav');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close on link click
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
                nav.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                nav.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                toggle.focus();
            }
        });
    }, 50);
}

/* --- Scroll-Triggered Animations --- */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Remove CSS transition delays after entrance animation completes
                // so they don't lag interactive hover JS effects like VanillaTilt.
                setTimeout(() => {
                    entry.target.classList.remove('animate-on-scroll', 'visible', 'slide-left', 'slide-right', 'scale-up');
                }, 1000);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animate-on-scroll elements
    const observeElements = () => {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    };

    // Initial observe + re-observe after dynamic content loads
    observeElements();
    window.addEventListener('content-loaded', observeElements);
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* --- Search Functionality --- */
function initSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    let debounceTimer;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = searchInput.value.toLowerCase().trim();
            filterContent(query);
        }, 300);
    });
}

function filterContent(query) {
    const cards = document.querySelectorAll('[data-searchable]');
    let visibleCount = 0;

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const tags = (card.dataset.tags || '').toLowerCase();
        const match = !query || text.includes(query) || tags.includes(query);
        card.style.display = match ? '' : 'none';
        if (match) visibleCount++;
    });

    // Show/hide no results message
    const noResults = document.getElementById('no-results');
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

/* --- Filter Tabs --- */
function initFilterTabs(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const tabs = container.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.dataset.filter;
            filterByCategory(filter);
        });
    });
}

function filterByCategory(category) {
    const cards = document.querySelectorAll('[data-category]');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

/* --- Star Ratings --- */
function initStarRatings() {
    document.querySelectorAll('.star-rating').forEach(container => {
        const stars = container.querySelectorAll('.star');
        const input = container.querySelector('input[type="hidden"]');

        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', () => {
                stars.forEach((s, i) => {
                    s.classList.toggle('filled', i <= index);
                });
            });

            star.addEventListener('click', () => {
                if (input) input.value = index + 1;
                stars.forEach((s, i) => {
                    s.classList.toggle('filled', i <= index);
                    s.dataset.selected = i <= index ? 'true' : 'false';
                });
            });
        });

        container.addEventListener('mouseleave', () => {
            stars.forEach(s => {
                s.classList.toggle('filled', s.dataset.selected === 'true');
            });
        });
    });
}

/* --- Contact Form --- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const subject = form.querySelector('#subject');
        const message = form.querySelector('#message');
        let valid = true;

        [name, email, subject, message].forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--error)';
                valid = false;
            } else {
                field.style.borderColor = '';
            }
        });

        if (email && !isValidEmail(email.value)) {
            email.style.borderColor = 'var(--error)';
            valid = false;
        }

        if (!valid) return;

        // Simulate submission
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            showToast('Message sent successfully! We\'ll get back to you soon.');
            form.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* --- Toast Notification --- */
function showToast(message, duration = 4000) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

/* --- Utility: Get URL Parameters --- */
function getUrlParam(key) {
    return new URLSearchParams(window.location.search).get(key);
}

/* --- Utility: Format Date --- */
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/* --- Utility: Generate Star HTML --- */
function generateStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<span class="star ${i <= rating ? 'filled' : ''}">★</span>`;
    }
    return html;
}

/* Export for use by other scripts */
window.TechXApp = {
    showToast,
    getUrlParam,
    formatDate,
    generateStars,
    filterContent,
    filterByCategory,
    initFilterTabs
};
