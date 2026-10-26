/* ==========================================================================
   INTERACTIVE JAVASCRIPT LOGIC
   Portfolio Website for Sravan Kumar Reddy Guddigari
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initTypingEffect();
  initSkillsFilter();
  initProjectModals();
  initContactForm();
  initClipboardCopy();
  initSmoothScrollSpy();
});

/* --------------------------------------------------------------------------
   1. Navbar Scroll Effect
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. Hero Subtitle Dynamic Typing Effect
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typedSpan = document.querySelector('.typed-text');
  if (!typedSpan) return;

  const roles = [
    "Full-Stack Angular & Spring Boot Developer",
    "Integrated M.Tech CSE Student (CGPA: 9.36)",
    "Java & Python Backend Developer",
    "Scalable Software Solutions Enthusiast"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 70;
  const deletingSpeed = 35;
  const delayBetweenRoles = 2000;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      currentSpeed = delayBetweenRoles;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      currentSpeed = 400;
    }

    setTimeout(type, currentSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   4. Skills Category Tag Filtering
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Project Details Modal System
   -------------------------------------------------------------------------- */
const projectData = {
  fsds: {
    title: "Food Surplus Distribution System",
    subtitle: "Angular, Spring Boot, MySQL, Java, HTML, CSS, Bootstrap",
    image: "assets/food_surplus_app.png",
    overview: "A full-stack web platform engineered to combat food waste and hunger by seamlessly bridging surplus food donors with orphanages, old age homes, and NGOs in real-time.",
    features: [
      "Multi-Role System Architecture: Built custom user journeys & dashboard views for donors (restaurants, hostels, event organizers), receiver organizations (NGOs, shelters), and logistics dispatchers.",
      "Last-Mile Homeless Outreach: Designed an innovative volunteer-driven distribution module to route excess packaged meals to unsheltered individuals on streets.",
      "Real-Time Matching & Logistics: Spring Boot REST APIs matching surplus meals with nearest verified receivers based on geo-proximity and shelf-life constraints.",
      "Dynamic Single-Page Frontend: Built with Angular using reactive forms, RxJS streams, and responsive Bootstrap layouts."
    ]
  },
  naturalfarms: {
    title: "NaturalFarms — E-commerce Platform",
    subtitle: "Angular, Spring Boot, MySQL, RESTful APIs",
    image: "assets/naturalfarms_ecommerce.png",
    overview: "A robust full-stack e-commerce web platform for direct-to-consumer organic farm produce, providing an interactive shopping experience from catalog discovery to checkout.",
    features: [
      "Modular Frontend Architecture: Component-driven single page app with Angular, leveraging service-based state management and dynamic client routing.",
      "Interactive Product Catalog & Shopping Cart: Real-time item filtering, search autosuggestions, dynamic cart calculations, and reactive checkout form validation.",
      "Spring Boot REST Backend: Scalable micro-services design managing inventory, user profiles, order processing, and MySQL relational persistence.",
      "Seamless User Experience: Optimized page loads with lazy-loaded modules and clean visual design hierarchy."
    ]
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.querySelector('.modal-close');
  const viewDetailBtns = document.querySelectorAll('.view-project-btn');

  if (!modalOverlay) return;

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      const data = projectData[projId];
      if (!data) return;

      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalSubtitle').textContent = data.subtitle;
      document.getElementById('modalImage').src = data.image;
      document.getElementById('modalImage').alt = data.title;
      document.getElementById('modalOverview').textContent = data.overview;

      const featureList = document.getElementById('modalFeatures');
      featureList.innerHTML = '';
      data.features.forEach(ft => {
        const li = document.createElement('li');
        li.textContent = ft;
        featureList.appendChild(li);
      });

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

/* --------------------------------------------------------------------------
   6. Contact Form Validation & Toast Notification
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toastNotification');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('senderSubject').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !message) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    // Success response simulation
    showToast(`Thank you, ${name}! Your message has been sent successfully.`, "success");
    form.reset();
  });
}

function showToast(message, type = "success") {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* --------------------------------------------------------------------------
   7. Clipboard One-Click Copy for Contact Info
   -------------------------------------------------------------------------- */
function initClipboardCopy() {
  const copyBtns = document.querySelectorAll('.copy-trigger');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(err => {
        showToast(`Failed to copy to clipboard`, "error");
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. Smooth Scroll & Active Nav Section Highlight
   -------------------------------------------------------------------------- */
function initSmoothScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}
