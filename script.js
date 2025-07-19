// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
        menuToggle.classList.toggle('open');
    });
}

// Close menu on nav link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 769) {
            nav.classList.remove('nav-open');
            menuToggle.classList.remove('open');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Optional: Add form validation here if needed

        // Simulate sending...
        contactForm.querySelector('button[type="submit"]').disabled = true;

        setTimeout(() => {
            contactForm.reset();
            if (successMessage) {
                successMessage.style.display = 'flex';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 4000);
            }
            contactForm.querySelector('button[type="submit"]').disabled = false;
        }, 1200);
    });
}

// Optional: Close the success message when user clicks anywhere
if (successMessage) {
    successMessage.addEventListener('click', () => {
        successMessage.style.display = 'none';
    });
}

// Optional: Highlight active nav on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
            if (activeLink) activeLink.classList.add('active');
        }
    });
});