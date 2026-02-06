'use strict';

/**
 * RacketPro Web - Interactive Features
 * Handles mobile navigation, smooth scrolling, form validation, and UI interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initNavbarScroll();
    initTestimonialRotation();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggleBtn.classList.toggle('is-active');
        
        // Accessibility
        const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', !expanded);
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggleBtn.classList.remove('is-active');
            toggleBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Contact Form Validation & Submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic Validation
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        let isValid = true;

        if (!data.name || data.name.length < 2) {
            showFieldError('name', 'Please enter your full name');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!isValid) return;

        // UI Feedback - Loading State
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Message...';

        try {
            // Logic for Supabase integration would go here
            // Example: const { error } = await supabase.from('leads').insert([data]);
            
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success State
            contactForm.reset();
            submitBtn.textContent = 'Message Sent!';
            submitBtn.classList.add('btn-success');
            
            alert('Thank you! Your inquiry has been received. Our professional stringer will contact you shortly.');

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('btn-success');
            }, 3000);

        } catch (error) {
            console.error('Submission error:', error);
            alert('There was an error sending your message. Please try again.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

function showFieldError(fieldName, message) {
    const field = document.getElementsByName(fieldName)[0];
    if (field) {
        field.focus();
        // Simple visual feedback: you could expand this with actual DOM elements
        field.style.borderColor