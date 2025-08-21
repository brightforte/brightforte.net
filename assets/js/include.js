document.addEventListener("DOMContentLoaded", function () {
    const includeElements = document.querySelectorAll('[data-include]');
    const includePromises = Array.from(includeElements).map(async (el) => {
      const file = el.getAttribute('data-include');
      try {
        const response = await fetch(file);
        if (response.ok) {
          const content = await response.text();
          el.innerHTML = content;
        } else {
          console.error(`Error loading ${file}: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error loading ${file}: ${error}`);
      }
    });
  
    Promise.all(includePromises).then(() => {
      console.log("All includes loaded.");
  
      // ✅ FULLY MANUAL TOGGLE HANDLER
      const toggleBtn = document.getElementById("customToggleBtn");
      const navbarCollapse = document.getElementById("navbarNav");
  
      if (toggleBtn && navbarCollapse) {
        toggleBtn.addEventListener("click", () => {
          navbarCollapse.classList.toggle("show");
        });
      }
  
      // Section scroll animation
      const sections = document.querySelectorAll(".section-animate");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      }, { threshold: 0.1 });
      sections.forEach(section => observer.observe(section));
  
      // Navbar background scroll effect
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        window.addEventListener("scroll", function () {
          if (window.scrollY > 300) {
            navbar.classList.add("scrolled");
          } else {
            navbar.classList.remove("scrolled");
          }
        });
      }
  
      // Active nav link
      function cleanPath(path) {
        return path.replace(/\/index\.html$/, "").replace(/\/$/, "");
      }
  
      const currentPath = cleanPath(window.location.pathname);
      document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
        const hrefPath = cleanPath(link.getAttribute("href") || "");
        if (currentPath === hrefPath || (hrefPath && currentPath.startsWith(hrefPath))) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    });
  });
  