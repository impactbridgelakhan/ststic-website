// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
        menuToggle.classList.toggle('open');
        
        // Prevent body scroll when menu is open
        if (nav.classList.contains('nav-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close menu on nav link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 769) {
            nav.classList.remove('nav-open');
            menuToggle.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    if (window.innerWidth < 769 && 
        nav && nav.classList.contains('nav-open') && 
        !nav.contains(event.target) && 
        !menuToggle.contains(event.target)) {
        nav.classList.remove('nav-open');
        menuToggle.classList.remove('open');
        document.body.style.overflow = '';
    }
});

// Reset menu state on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth >= 769) {
        nav.classList.remove('nav-open');
        menuToggle.classList.remove('open');
        document.body.style.overflow = '';
    }
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
const errorMessage = document.getElementById('error-message');
const fallbackContact = document.getElementById('fallback-contact');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'message'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = contactForm.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                input.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (!isValid) {
            showErrorMessage('Please fill in all required fields.');
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        
        // Hide previous messages
        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';
        if (fallbackContact) fallbackContact.style.display = 'none';
        
        // Submit to Netlify
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(response => {
            if (response.ok) {
                // Success
                contactForm.reset();
                if (successMessage) {
                    successMessage.style.display = 'flex';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 8000);
                }
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            showErrorMessage('Form submission failed. Please try alternative contact methods below.');
            // Show fallback contact options and populate with form data
            if (fallbackContact) {
                populateFallbackContacts(formData);
                fallbackContact.style.display = 'block';
            }
        })
        .finally(() => {
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        });
    });
}

function showErrorMessage(message) {
    if (errorMessage) {
        errorMessage.querySelector('span').textContent = message;
        errorMessage.style.display = 'flex';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 10000);
    }
}

function populateFallbackContacts(formData) {
    const firstName = formData.get('firstName') || '';
    const lastName = formData.get('lastName') || '';
    const email = formData.get('email') || '';
    const service = formData.get('service') || '';
    const message = formData.get('message') || '';
    const company = formData.get('company') || '';
    
    // Create email body
    const emailBody = `Hello,%0D%0A%0D%0AI would like to inquire about your services.%0D%0A%0D%0AName: ${firstName} ${lastName}%0D%0A${company ? `Company: ${company}%0D%0A` : ''}${service ? `Service Interest: ${service}%0D%0A` : ''}%0D%0AMessage: ${message}%0D%0A%0D%0ABest regards,%0D%0A${firstName} ${lastName}${email ? `%0D%0A${email}` : ''}`;
    
    // Create WhatsApp message
    const whatsappMessage = `Hello, I would like to inquire about your services.%0A%0AName: ${firstName} ${lastName}${company ? `%0ACompany: ${company}` : ''}${service ? `%0AService Interest: ${service}` : ''}%0A%0AMessage: ${message}`;
    
    // Update fallback links
    const emailLink = fallbackContact.querySelector('.fallback-btn.email');
    const whatsappLink = fallbackContact.querySelector('.fallback-btn.whatsapp');
    
    if (emailLink) {
        emailLink.href = `mailto:impactbridgeconsultingpvt@gmail.com?subject=Business Inquiry from ${firstName} ${lastName}&body=${emailBody}`;
    }
    
    if (whatsappLink) {
        whatsappLink.href = `https://wa.me/918975547228?text=${whatsappMessage}`;
    }
}

// Close messages when clicked
if (successMessage) {
    successMessage.addEventListener('click', () => {
        successMessage.style.display = 'none';
    });
}

if (errorMessage) {
    errorMessage.addEventListener('click', () => {
        errorMessage.style.display = 'none';
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

// Flip card on "Learn More" click for mobile/touch devices
document.querySelectorAll('.btn-learn-more').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const card = btn.closest('.flip-card');
    card.classList.toggle('flipped');
  });
});

// Flip back when clicking outside or on the back side (mobile usability)
document.querySelectorAll('.flip-card-back').forEach(back => {
  back.addEventListener('click', function() {
    const card = back.closest('.flip-card');
    card.classList.remove('flipped');
  });
});