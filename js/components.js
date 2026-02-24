/* ============================================
   TechX Forum — Shared Components
   Header, Footer, Nav injection
   ============================================ */

const SITE_NAME = 'TechX Forum';
const LOGO_PATH = 'assets/croppedlogo.png';

const NAV_ITEMS = [
  { label: 'Home', href: 'index.html' },
  { label: 'About', href: 'about.html' },
  { label: 'Founders', href: 'founders.html' },
  { label: 'Representatives', href: 'representatives.html' },
  { label: 'Contact', href: 'contact.html' },
];

function getCurrentPage() {
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  return filename;
}

function createHeader() {
  const currentPage = getCurrentPage();
  const header = document.createElement('header');
  header.className = 'site-header';
  header.setAttribute('role', 'banner');

  const navLinks = NAV_ITEMS.map(item => {
    const isActive = currentPage === item.href ||
      (currentPage === '' && item.href === 'index.html');
    return `<a href="${item.href}" class="nav-link${isActive ? ' active' : ''}" aria-current="${isActive ? 'page' : 'false'}">${item.label}</a>`;
  }).join('');

  header.innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="logo-link" aria-label="${SITE_NAME} — Home">
        <img src="${LOGO_PATH}" alt="${SITE_NAME} Logo" class="logo-img" width="42" height="42">
        <span class="logo-text">Tech<span>X</span> Forum</span>
      </a>
      <nav class="main-nav" id="main-nav" role="navigation" aria-label="Main navigation">
        ${navLinks}
      </nav>
      <button class="menu-toggle" id="menu-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="main-nav">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  `;

  document.body.prepend(header);
}

function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.setAttribute('role', 'contentinfo');

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="${LOGO_PATH}" alt="${SITE_NAME} Logo" class="logo-img" width="40" height="40">
          <p>Exploring the frontiers of AI and technology. Join our community of innovators, researchers, and enthusiasts shaping the future.</p>
          <div class="social-links">
            <a href="https://whatsapp.com/channel/0029VbCBLRJI7Be9FssqwL1F" class="social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=texhxforum26@gmail.com" class="social-link" aria-label="Gmail" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="52 42 88 66" fill="currentColor">
                <path d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/>
                <path d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/>
                <path d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/>
                <path d="M72 74V48l24 18 24-18v26L96 92"/>
                <path d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/>
              </svg>
            </a>
            <a href="https://linkedin.com/company/techxforum" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://discord.gg/TYKBwKs2VV" class="social-link" aria-label="Discord" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Community</h4>
          <a href="about.html">About Us</a>
          <a href="founders.html">Founders</a>
          <a href="representatives.html">Representatives</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <a href="https://whatsapp.com/channel/0029VbCBLRJI7Be9FssqwL1F" target="_blank" rel="noopener">WhatsApp</a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=texhxforum26@gmail.com" target="_blank" rel="noopener">Gmail</a>
          <a href="https://linkedin.com/company/techxforum" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://discord.gg/TYKBwKs2VV" target="_blank" rel="noopener">Discord</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved. Built with passion for AI and open-source.</p>
      </div>
    </div>
  `;

  document.body.appendChild(footer);
}

/* Initialize components on load */
document.addEventListener('DOMContentLoaded', () => {
  createHeader();
  createFooter();
  init3DTilt();
});

// Dynamically scale/load Vanilla Tilt for 3D card effects
function init3DTilt() {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js';
  script.onload = () => {
    VanillaTilt.init(document.querySelectorAll(".card-hover-glow"), {
      max: 7,        // Reduced max tilt for better performance
      speed: 1000,   // Slower smoother transition 
      glare: true,
      "max-glare": 0.15, // Reduced glare opacity
      scale: 1.02
    });
  };
  document.body.appendChild(script);
}
