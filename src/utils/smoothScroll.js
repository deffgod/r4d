/**
 * Smooth scroll to element with offset for fixed header
 * @param {string} elementId - ID of the element to scroll to
 * @param {number} offset - Offset from top in pixels (default: 80)
 */
export const smoothScrollTo = (elementId, offset = 80) => {
  const element = document.getElementById(elementId);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Add smooth scroll behavior to all anchor links
 */
export const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      const targetId = href.substring(1);
      smoothScrollTo(targetId);
    });
  });
};
