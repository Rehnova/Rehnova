/**
* Template Name: Arsha
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Updated: Feb 22 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  (function(){
    const hamburger = document.getElementById('hamburger');
    const mobilePanel = document.getElementById('mobilePanel');
    const body = document.body;

    // Desktop dropdown accessible attributes (so screen readers know)
    document.querySelectorAll('.nav-item > button[aria-haspopup="true"]').forEach(btn=>{
      const menu = document.getElementById(btn.getAttribute('aria-controls'));
      // update aria-hidden on hover/focus for desktop
      btn.addEventListener('mouseenter', ()=> {
        if (window.matchMedia('(min-width:901px)').matches){
          menu.style.opacity = '1';
          menu.style.transform = 'translateY(0) scale(1)';
          menu.style.pointerEvents = 'auto';
          menu.setAttribute('aria-hidden','false');
          btn.setAttribute('aria-expanded','true');
        }
      });
      const parent = btn.closest('.nav-item');
      parent.addEventListener('mouseleave', ()=>{
        if (window.matchMedia('(min-width:901px)').matches){
          menu.style.opacity = '';
          menu.style.transform = '';
          menu.style.pointerEvents = '';
          menu.setAttribute('aria-hidden','true');
          btn.setAttribute('aria-expanded','false');
        }
      });

      // keyboard toggle (enter/space)
      btn.addEventListener('click', (e)=>{
        if (window.matchMedia('(min-width:901px)').matches) {
          // on desktop clicks toggle visible state (useful for keyboard)
          const shown = menu.getAttribute('aria-hidden') === 'false';
          menu.setAttribute('aria-hidden', shown ? 'true' : 'false');
          btn.setAttribute('aria-expanded', shown ? 'false' : 'true');
          e.preventDefault();
        }
      });
    });

    // Hamburger open/close
    function openMobile(){
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded','true');
      mobilePanel.classList.add('open');
      mobilePanel.setAttribute('aria-hidden','false');
      // prevent body scroll
      body.style.overflow = 'hidden';
      // set focus inside panel for accessibility
      const firstBtn = mobilePanel.querySelector('.mobile-button');
      if(firstBtn) firstBtn.focus();
    }
    function closeMobile(){
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded','false');
      mobilePanel.classList.remove('open');
      mobilePanel.setAttribute('aria-hidden','true');
      body.style.overflow = '';
      // close any open accordions
      document.querySelectorAll('.accordion.open').forEach(acc=>{
        acc.classList.remove('open');
        acc.style.maxHeight = null;
        const toggle = document.querySelector(`[aria-controls="${acc.id}"]`);
        if(toggle) toggle.setAttribute('aria-expanded','false');
      });
    }

    hamburger.addEventListener('click', ()=>{
      if(mobilePanel.classList.contains('open')) closeMobile(); else openMobile();
    });

    // Accordion toggles on mobile
    document.querySelectorAll('.accordion-toggle').forEach(toggle=>{
      const panel = document.getElementById(toggle.getAttribute('aria-controls'));
      toggle.addEventListener('click', (e)=>{
        const opening = !panel.classList.contains('open');
        // close other accordions (optional single-open)
        document.querySelectorAll('.accordion.open').forEach(openAcc=>{
          if(openAcc !== panel){
            openAcc.classList.remove('open');
            openAcc.style.maxHeight = null;
            const t = document.querySelector(`[aria-controls="${openAcc.id}"]`);
            if(t) t.setAttribute('aria-expanded','false');
          }
        });

        if(opening){
          panel.classList.add('open');
          // set maxHeight to scrollHeight to animate
          panel.style.maxHeight = panel.scrollHeight + 8 + 'px';
          toggle.setAttribute('aria-expanded','true');
          panel.setAttribute('aria-hidden','false');
        } else {
          panel.classList.remove('open');
          panel.style.maxHeight = null;
          toggle.setAttribute('aria-expanded','false');
          panel.setAttribute('aria-hidden','true');
        }
      });
    });

    // close mobile panel on outside click/tap
    document.addEventListener('click', (e)=>{
      if(window.matchMedia('(max-width:900px)').matches){
        if(mobilePanel.classList.contains('open')){
          const insidePanel = mobilePanel.contains(e.target);
          const onHamburger = hamburger.contains(e.target);
          if(!insidePanel && !onHamburger){
            closeMobile();
          }
        }
      }
    });

    // close on escape
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){
        if(mobilePanel.classList.contains('open')) closeMobile();
        // also close desktop dropdowns
        document.querySelectorAll('.dropdown-desktop').forEach(dd=>{
          dd.setAttribute('aria-hidden','true');
        });
        document.querySelectorAll('[aria-haspopup="true"]').forEach(b=>b.setAttribute('aria-expanded','false'));
      }
    });

    // if window resizes to desktop, ensure mobile panel closed and body unlocked
    window.addEventListener('resize', ()=>{
      if(window.matchMedia('(min-width:901px)').matches){
        closeMobile();
        // hide any open desktop dropdowns (they will show on hover)
        document.querySelectorAll('.dropdown-desktop').forEach(dd=>{
          dd.setAttribute('aria-hidden','true');
        });
        document.querySelectorAll('[aria-haspopup="true"]').forEach(b=>b.setAttribute('aria-expanded','false'));
      }
    });

    // improve touch responsiveness by adding small delay guard (prevent accidental double-tap)
    let lastTap = 0;
    document.addEventListener('touchend', (e)=>{
      const now = Date.now();
      if(now - lastTap <= 300) { e.preventDefault(); } // suppress quick double-tap zoom-like behavior
      lastTap = now;
    }, {passive:false});

    // ensure accordion panels compute height if fonts/images change
    window.addEventListener('load', ()=> {
      document.querySelectorAll('.accordion.open').forEach(acc=>{
        acc.style.maxHeight = acc.scrollHeight + 'px';
      });
    });
  })();

window.addEventListener('scroll', () => {
if (window.scrollY > lastScrollY) {
navbar.classList.add('hide');
} else {
navbar.classList.remove('hide');
}
lastScrollY = window.scrollY;
});

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();