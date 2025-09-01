// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    
    // Mobile menu toggle functionality
    function toggleMobileMenu() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Close mobile menu when clicking on a nav link
    function closeMobileMenu() {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Header scroll effect
    function handleHeaderScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Smooth scroll to sections - Fixed implementation
    function smoothScrollTo(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: 'smooth'
            });
        }
    }
    
    // Handle contact form submission
    function handleFormSubmission(event) {
        event.preventDefault();
        
        // Remove existing messages first
        const existingMessages = contactForm.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }
        
        // Validate form
        if (!validateForm(formObject)) {
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Reset button and form
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
        }, 1500);
    }
    
    // Form validation
    function validateForm(formData) {
        const { name, email, phone } = formData;
        
        // Check required fields
        if (!name || !name.trim()) {
            showError('Please enter your full name');
            focusField('name');
            return false;
        }
        
        if (!email || !email.trim()) {
            showError('Please enter your email address');
            focusField('email');
            return false;
        }
        
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            focusField('email');
            return false;
        }
        
        if (!phone || !phone.trim()) {
            showError('Please enter your phone number');
            focusField('phone');
            return false;
        }
        
        if (!isValidPhone(phone)) {
            showError('Please enter a valid phone number (minimum 10 digits)');
            focusField('phone');
            return false;
        }
        
        return true;
    }
    
    // Focus on field with error
    function focusField(fieldName) {
        const field = document.getElementById(fieldName);
        if (field) {
            field.focus();
            field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    // Phone validation (improved)
    function isValidPhone(phone) {
        const cleanPhone = phone.replace(/\s|\-|\(|\)|\+/g, '');
        return cleanPhone.length >= 10 && /^[0-9]+$/.test(cleanPhone);
    }
    
    // Show error message
    function showError(message) {
        // Remove existing error messages
        const existingError = contactForm.querySelectorAll('.error-message');
        existingError.forEach(error => error.remove());
        
        // Create and show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `<strong>Error:</strong> ${message}`;
        
        // Insert error message at the top of the form
        contactForm.insertBefore(errorDiv, contactForm.firstChild);
        
        // Scroll to error message
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    // Show success message
    function showSuccessMessage() {
        // Remove existing messages
        const existingMessages = contactForm.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create and show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <strong>Thank you!</strong> Your message has been sent successfully. 
            We'll get back to you within 24 hours.
        `;
        
        // Insert success message at the top of the form
        contactForm.insertBefore(successDiv, contactForm.firstChild);
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove success message after 8 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 8000);
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .contact-item, .feature-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize animations
    function initAnimations() {
        const elements = document.querySelectorAll('.service-card, .contact-item, .feature-item');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }
    
    // Add active state to current nav link
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 200;
        
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const sectionTop = targetSection.offsetTop;
                    const sectionBottom = sectionTop + targetSection.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            }
        });
    }
    
    // Handle window resize
    function handleResize() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 767 && nav && nav.classList.contains('active')) {
            closeMobileMenu();
        }
    }
    
    // Event listeners
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
    }
    
    // Navigation link clicks - Fixed implementation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                
                // Smooth scroll to target
                smoothScrollTo(href);
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Fix select dropdown issues
        const selectElement = document.getElementById('service');
        if (selectElement) {
            // Ensure the select is properly styled and functional
            selectElement.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--color-primary)';
            });
            
            selectElement.addEventListener('blur', function() {
                this.style.outline = '';
            });
        }
    }
    
    // Scroll events with throttling
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleHeaderScroll();
                animateOnScroll();
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', handleResize);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav && nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Initialize animations and set initial states
    initAnimations();
    
    // Trigger initial scroll check after a short delay
    setTimeout(() => {
        handleHeaderScroll();
        animateOnScroll();
        updateActiveNavLink();
    }, 100);
    
    // Add CSS for enhanced functionality
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--color-primary) !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        
        .error-message {
            background: rgba(var(--color-error-rgb), 0.1);
            color: var(--color-error);
            padding: var(--space-16);
            border-radius: var(--radius-base);
            border: 1px solid rgba(var(--color-error-rgb), 0.2);
            margin-bottom: var(--space-16);
            text-align: center;
            animation: slideIn 0.3s ease;
        }
        
        .success-message {
            background: rgba(var(--color-success-rgb), 0.1);
            color: var(--color-success);
            padding: var(--space-16);
            border-radius: var(--radius-base);
            border: 1px solid rgba(var(--color-success-rgb), 0.2);
            margin-bottom: var(--space-16);
            text-align: center;
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .btn.loading {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        /* Fix select dropdown styling */
        select.form-control {
            cursor: pointer;
            position: relative;
        }
        
        select.form-control:focus {
            border-color: var(--color-primary);
            outline: 2px solid var(--color-primary);
            outline-offset: 2px;
        }
        
        /* Enhanced mobile menu styles */
        @media (max-width: 767px) {
            .nav-link {
                padding: var(--space-16) 0;
                border-bottom: 1px solid var(--color-border);
                display: block;
                font-size: var(--font-size-lg);
            }
            
            .nav-link:last-child {
                border-bottom: none;
            }
            
            .nav-link::after {
                display: none;
            }
            
            .menu-toggle {
                z-index: 1001;
            }
            
            .nav.active {
                z-index: 1000;
            }
        }
        
        /* Smooth transitions for all interactive elements */
        .service-card,
        .contact-item,
        .btn,
        .form-control {
            transition: all var(--duration-normal) var(--ease-standard);
        }
        
        /* Enhanced focus styles for better accessibility */
        .btn:focus,
        .form-control:focus,
        .nav-link:focus {
            outline: 2px solid var(--color-primary);
            outline-offset: 2px;
        }
        
        /* Page loading animation */
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Add loading animation for page load
    setTimeout(() => {
        document.body.classList.add('loaded');
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('Vrisa Job Consultancy website loaded successfully!');
    
    // Debug logging for navigation
    console.log('Navigation links found:', navLinks.length);
    console.log('Contact form found:', !!contactForm);
    console.log('Menu toggle found:', !!menuToggle);
});