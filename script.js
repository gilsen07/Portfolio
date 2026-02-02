// Handle smooth scrolling and active nav highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Smooth scroll when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Highlight active section on scroll
window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });

    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to current section link
    if (currentSection) {
        document.querySelector(`a[data-section="${currentSection}"]`)?.classList.add('active');
    }
});

// Set initial active link on page load
window.addEventListener('load', () => {
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);

    // Attach details toggle handlers
    document.querySelectorAll('.details-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('aria-controls');
            const el = document.getElementById(id);
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            if (!el) return;

            // Toggle
            el.hidden = expanded;
            btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            btn.textContent = expanded ? 'View details' : 'Hide details';
        });
    });
});
