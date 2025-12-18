// NovaGen Automation Systems & Solution - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.classList.toggle('theme-dark', savedTheme === 'dark');
    
    // Update button text based on current theme
    updateThemeButton();
    
    function toggleTheme() {
        html.classList.toggle('theme-dark');
        const isDark = html.classList.contains('theme-dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeButton();
        
        // Add smooth transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
        
        // Trigger custom event for other components
        const themeChangeEvent = new CustomEvent('themeChanged', {
            detail: { isDark: isDark }
        });
        document.dispatchEvent(themeChangeEvent);
    }
    
    function updateThemeButton() {
        const isDark = html.classList.contains('theme-dark');
        const buttonText = isDark ? '☀️ Light' : '🌙 Dark';
        const ariaLabel = isDark ? 'Switch to light theme' : 'Switch to dark theme';
        
        if (themeToggle) {
            themeToggle.textContent = buttonText;
            themeToggle.setAttribute('aria-label', ariaLabel);
        }
        
        if (themeToggleMobile) {
            themeToggleMobile.textContent = buttonText;
            themeToggleMobile.setAttribute('aria-label', ariaLabel);
        }
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', isDark ? '#6A6268' : '#ffffff');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = isDark ? '#6A6268' : '#ffffff';
            document.head.appendChild(meta);
        }
    }
    
    // Add theme toggle event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const body = document.body;
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = mobileNav.classList.contains('active');
            mobileNav.classList.toggle('active');
            mobileMenuToggle.setAttribute('aria-expanded', !isActive);
            
            // Update button icon and state
            mobileMenuToggle.textContent = isActive ? '☰' : '✕';
            
            // Prevent body scrolling when menu is open
            if (!isActive) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !mobileNav.contains(event.target)) {
                mobileNav.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking on menu links
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            });
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
                mobileMenuToggle.focus();
            }
        });
        
        // Handle window resize to reset mobile menu state
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768 && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gallery Modal Functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    
    let currentImageIndex = 0;
    let galleryImages = []; // Store all gallery images with metadata
    
    // Initialize gallery - collect all images from gallery items
    if (galleryItems.length > 0) {
        // Build galleryImages array with metadata
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption');
            const brand = item.getAttribute('data-brand');
            
            if (img) {
                // Add loading state
                img.addEventListener('load', function() {
                    item.classList.add('loaded');
                });
                
                // Add error handling
                img.addEventListener('error', function() {
                    console.warn(`Failed to load image: ${img.src}`);
                    item.classList.add('error');
                });
                
                galleryImages.push({
                    src: img.src,
                    alt: img.alt,
                    caption: caption ? {
                        title: caption.querySelector('h4')?.textContent || '',
                        description: caption.querySelector('p')?.textContent || ''
                    } : null,
                    brand: brand
                });
            }
            
            // Add click handler
            item.addEventListener('click', function() {
                openModal(index);
            });
            
            // Make items keyboard accessible
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `View ${img?.alt || 'product image'} in full size`);
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(index);
                }
            });
        });
    }
    
    function openModal(index) {
        if (index < 0 || index >= galleryImages.length) return;
        
        currentImageIndex = index;
        const imageData = galleryImages[index];
        
        if (modal && modalImage && imageData) {
            modalImage.src = imageData.src;
            modalImage.alt = imageData.alt;
            modalImage.className = 'modal-image';
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            if (modalCaption && imageData.caption) {
                const brandInfo = imageData.brand ? `<div class="brand-info" style="color: #F7A800; font-weight: 600; margin-bottom: 0.5rem;">${imageData.brand}</div>` : '';
                modalCaption.innerHTML = `
                    ${brandInfo}
                    <h4>${imageData.caption.title}</h4>
                    <p>${imageData.caption.description}</p>
                `;
            }
            
            // Update ARIA labels for navigation buttons
            if (modalPrev) {
                const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                modalPrev.setAttribute('aria-label', `View previous image: ${galleryImages[prevIndex].alt}`);
            }
            
            if (modalNext) {
                const nextIndex = (currentImageIndex + 1) % galleryImages.length;
                modalNext.setAttribute('aria-label', `View next image: ${galleryImages[nextIndex].alt}`);
            }
            
            // Focus trap
            modal.setAttribute('aria-label', `Image viewer: ${imageData.alt}`);
            modal.focus();
        }
    }
    
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        openModal(currentImageIndex);
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        openModal(currentImageIndex);
    }
    
    // Modal event listeners
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalPrev) {
        modalPrev.addEventListener('click', showPrevImage);
    }
    
    if (modalNext) {
        modalNext.addEventListener('click', showNextImage);
    }
    
    // Close modal on overlay click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        if (modal && modal.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    if (galleryItems.length > 1) {
                        showPrevImage();
                    }
                    break;
                case 'ArrowRight':
                    if (galleryItems.length > 1) {
                        showNextImage();
                    }
                    break;
            }
        }
    });
    
    // Form handling with mobile optimizations
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                
                // Focus on first empty field
                if (!name) {
                    contactForm.querySelector('input[name="name"]').focus();
                } else if (!email) {
                    contactForm.querySelector('input[name="email"]').focus();
                } else {
                    contactForm.querySelector('textarea[name="message"]').focus();
                }
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                contactForm.querySelector('input[name="email"]').focus();
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual Formspree endpoint)
            setTimeout(() => {
                showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Scroll to top of form on success
                const formTop = contactForm.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({
                    top: formTop,
                    behavior: 'smooth'
                });
            }, 2000);
        });
        
        // Add mobile-specific improvements
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            // Prevent zoom on iOS when focusing on inputs
            input.addEventListener('focus', function() {
                if (window.innerWidth < 768) {
                    document.querySelector('meta[name="viewport"]').setAttribute(
                        'content', 
                        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
                    );
                }
            });
            
            input.addEventListener('blur', function() {
                // Restore normal viewport
                document.querySelector('meta[name="viewport"]').setAttribute(
                    'content', 
                    'width=device-width, initial-scale=1.0'
                );
            });
            
            // Add touch-friendly labels
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }
    
    // Contact form alternatives
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track email clicks for analytics (if needed)
            console.log('Email clicked:', this.href);
        });
    });
    
    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            backgroundColor: type === 'error' ? '#dc3545' : '#28a745',
            color: 'white',
            borderRadius: '5px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
    
    // Dropdown accessibility improvements
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a, button');
        const menu = dropdown.querySelector('.dropdown-content');
        
        if (trigger && menu) {
            // Keyboard navigation
            trigger.addEventListener('keydown', function(e) {
                switch(e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        menu.classList.add('show');
                        const firstItem = menu.querySelector('a');
                        if (firstItem) firstItem.focus();
                        break;
                    case 'Escape':
                        menu.classList.remove('show');
                        trigger.focus();
                        break;
                }
            });
            
            // Close dropdown when focus leaves
            menu.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    const items = menu.querySelectorAll('a');
                    const lastItem = items[items.length - 1];
                    
                    if (e.shiftKey && document.activeElement === items[0]) {
                        dropdown.classList.remove('show');
                        trigger.focus();
                    } else if (!e.shiftKey && document.activeElement === lastItem) {
                        dropdown.classList.remove('show');
                    }
                }
            });
        }
    });
    
    // Initialize tooltips (if any)
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 14px;
                white-space: nowrap;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => tooltip.style.opacity = '1', 100);
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.style.opacity = '0';
                setTimeout(() => {
                    if (this._tooltip && this._tooltip.parentNode) {
                        this._tooltip.parentNode.removeChild(this._tooltip);
                    }
                    this._tooltip = null;
                }, 300);
            }
        });
    });
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Performance optimization: debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debounce to scroll-heavy operations
    const debouncedScrollHandler = debounce(() => {
        // Any scroll-heavy operations can be added here
    }, 16); // ~60fps
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Console branding
    console.log('%cNovaGen Automation Systems & Solution', 'color: #224488; font-size: 20px; font-weight: bold;');
    console.log('%cWebsite developed with ❤️ for automation excellence', 'color: #F7A800; font-size: 14px;');
});

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker can be added later for offline functionality
        console.log('Service Worker support detected');
    });
}