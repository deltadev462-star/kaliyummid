// Main JavaScript for Medical Equipment Portfolio
document.addEventListener('DOMContentLoaded', () => {
    // Global variables
    let currentLang = 'en';
    let currentCategory = 'all';
    let visibleDevices = 12; // Initially show 12 devices for performance
    const devicesPerLoad = 12;
    
    // DOM Elements
    const langButtons = document.querySelectorAll('.lang-btn');
    const devicesGrid = document.querySelector('.devices-grid');
    const filterTabs = document.querySelector('.filter-tabs');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const exportBtn = document.querySelector('.export-btn');
    const deviceModal = document.getElementById('deviceModal');
    const modalContent = document.querySelector('.modal-body');
    const closeModal = document.querySelector('.modal-close');
    
    // Initialize
    init();
    
    function init() {
        setupLanguageSwitcher();
        renderFilterTabs();
        renderDevices();
        setupEventListeners();
        initScrollAnimations();
        setupMobileMenu();
        checkScreenSize();
    }
    
    // Language Switcher
    function setupLanguageSwitcher() {
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                switchLanguage(lang);
            });
        });
    }
    
    function switchLanguage(lang) {
        currentLang = lang;
        
        // Update button states
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Update all text content
        updateTextContent(lang);
        
        // Re-render dynamic content
        renderFilterTabs();
        renderDevices();
    }
    
    function updateTextContent(lang) {
        // Update all elements with data-en and data-fr attributes
        document.querySelectorAll('[data-en]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        // Update document title
        document.title = lang === 'en' 
            ? 'Medical Equipment Portfolio - Professional Healthcare Solutions'
            : 'Portfolio d\'Équipement Médical - Solutions de Santé Professionnelles';
    }
    
    // Filter Tabs
    function renderFilterTabs() {
        filterTabs.innerHTML = '';
        
        Object.entries(categories).forEach(([key, value]) => {
            const tab = document.createElement('button');
            tab.className = `filter-tab ${key === currentCategory ? 'active' : ''}`;
            tab.dataset.category = key;
            tab.textContent = value[currentLang];
            tab.addEventListener('click', () => filterDevices(key));
            filterTabs.appendChild(tab);
        });
    }
    
    function filterDevices(category) {
        currentCategory = category;
        visibleDevices = devicesPerLoad; // Reset visible count
        
        // Update active tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });
        
        renderDevices();
    }
    
    // Device Rendering
    function renderDevices() {
        devicesGrid.innerHTML = '';
        
        // Filter devices
        const filteredDevices = currentCategory === 'all' 
            ? devicesData 
            : devicesData.filter(device => device.category === currentCategory);
        
        // Get devices to display
        const devicesToShow = filteredDevices.slice(0, visibleDevices);
        
        devicesToShow.forEach((device, index) => {
            const card = createDeviceCard(device, index);
            devicesGrid.appendChild(card);
        });
        
        // Show/hide load more button
        if (loadMoreBtn) {
            loadMoreBtn.style.display = visibleDevices >= filteredDevices.length ? 'none' : 'block';
            loadMoreBtn.textContent = currentLang === 'en' ? 'Load More' : 'Charger Plus';
        }
        
        // Trigger entrance animations
        requestAnimationFrame(() => {
            document.querySelectorAll('.device-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 50);
            });
        });
    }
    
    function createDeviceCard(device, index) {
        const card = document.createElement('div');
        card.className = 'device-card';
        card.dataset.category = device.category;
        card.dataset.deviceId = device.id;
        
        // Create placeholder image with gradient background
        const imageColors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        ];
        
        card.innerHTML = `
            <div class="device-image" style="background: ${imageColors[index % imageColors.length]}">
                <img src="${device.image}" alt="${device.name[currentLang]}" 
                     onerror="this.style.display='none'; this.parentElement.classList.add('placeholder')">
                <div class="device-number">#${device.number}</div>
                ${device.featured ? '<div class="featured-badge">Featured</div>' : ''}
            </div>
            <div class="device-info">
                <h3 class="device-name">${device.name[currentLang]}</h3>
                <p class="device-description">${device.description[currentLang]}</p>
            </div>
        `;
        
        // Add click handler
        card.addEventListener('click', () => openDeviceModal(device));
        
        return card;
    }
    
    // Modal Functionality
    function openDeviceModal(device) {
        modalContent.innerHTML = `
            <div class="modal-device-content">
                <div class="modal-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
                    <img src="${device.image}" alt="${device.name[currentLang]}" 
                         onerror="this.style.display='none'">
                    <div class="device-badge">${device.number}</div>
                </div>
                <div class="modal-info">
                    <h2 class="modal-title">${device.name[currentLang]}</h2>
                    <p class="modal-description">${device.description[currentLang]}</p>
                    <div class="modal-meta">
                        <span class="meta-item">
                            <svg width="16" height="16"><use xlink:href="#icon-category"></use></svg>
                            ${categories[device.category][currentLang]}
                        </span>
                        ${device.featured ? '<span class="featured-tag">Featured Product</span>' : ''}
                    </div>
                    <button class="modal-cta" onclick="window.location.href='#contact'">
                        ${currentLang === 'en' ? 'Request Quote' : 'Demander un Devis'}
                    </button>
                </div>
            </div>
        `;
        
        deviceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeDeviceModal() {
        deviceModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event Listeners
    function setupEventListeners() {
        // Load more button
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                visibleDevices += devicesPerLoad;
                renderDevices();
            });
        }
        
        // Export button
        if (exportBtn) {
            exportBtn.addEventListener('click', exportToPDF);
        }
        
        // Modal close
        if (closeModal) {
            closeModal.addEventListener('click', closeDeviceModal);
        }
        
        if (deviceModal) {
            deviceModal.addEventListener('click', (e) => {
                if (e.target === deviceModal) {
                    closeDeviceModal();
                }
            });
        }
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && deviceModal.classList.contains('active')) {
                closeDeviceModal();
            }
        });
    }
    
    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // Animate children with stagger
                    const children = entry.target.querySelectorAll('.animate-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('in-view');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Mobile Menu
    function setupMobileMenu() {
        const mobileToggle = document.querySelector('.menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (mobileToggle && mainNav) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                mainNav.classList.toggle('active');
            });
            
            // Close menu on link click
            mainNav.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileToggle.contains(e.target) && !mainNav.contains(e.target)) {
                    mobileToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                }
            });
        }
    
    // WhatsApp Contact Click-to-Copy
    function setupWhatsAppContact() {
        const whatsappContact = document.querySelector('.whatsapp-contact');
        const whatsappNumber = '+33766994211';
        
        if (whatsappContact) {
            whatsappContact.addEventListener('click', async () => {
                try {
                    // Try to use the Clipboard API
                    if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(whatsappNumber);
                        showCopySuccess(whatsappContact);
                    } else {
                        // Fallback for older browsers or non-secure contexts
                        copyToClipboardFallback(whatsappNumber);
                        showCopySuccess(whatsappContact);
                    }
                } catch (err) {
                    console.error('Failed to copy:', err);
                    // Show the number for manual copy
                    alert(`WhatsApp: ${whatsappNumber}`);
                }
            });
        }
    }
    
    function copyToClipboardFallback(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback copy failed:', err);
        } finally {
            textArea.remove();
        }
    }
    
    function showCopySuccess(element) {
        element.classList.add('copied');
        element.setAttribute('data-copied', currentLang === 'en' ? 'Copied!' : 'Copié!');
        
        setTimeout(() => {
            element.classList.remove('copied');
        }, 2000);
    }
    
    // Initialize WhatsApp contact
    setupWhatsAppContact();
    }
    
    // Export to PDF
    function exportToPDF() {
        // Show all devices for export
        const tempVisible = visibleDevices;
        visibleDevices = devicesData.length;
        renderDevices();
        
        // Add print class to body
        document.body.classList.add('printing');
        
        // Pre-load all images to ensure they show in print
        const images = document.querySelectorAll('img');
        const imagePromises = [];
        
        images.forEach(img => {
            if (!img.complete) {
                imagePromises.push(new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                }));
            }
        });
        
        // Wait for all images, then print
        Promise.all(imagePromises).then(() => {
            // Additional delay to ensure browser rendering
            setTimeout(() => {
                window.print();
                
                // Restore original state after print dialog
                setTimeout(() => {
                    document.body.classList.remove('printing');
                    visibleDevices = tempVisible;
                    renderDevices();
                }, 100);
            }, 1500); // Increased delay for image rendering
        });
    }
    
    // Responsive check
    function checkScreenSize() {
        const updateGridColumns = () => {
            const width = window.innerWidth;
            let columns = 5; // Default
            
            if (width < 480) columns = 1;
            else if (width < 768) columns = 2;
            else if (width < 1024) columns = 3;
            else if (width < 1440) columns = 4;
            
            document.documentElement.style.setProperty('--grid-columns', columns);
        };
        
        updateGridColumns();
        window.addEventListener('resize', debounce(updateGridColumns, 250));
    }
    
    // Utility: Debounce
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
    
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offset = 80; // Header height
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax Effect
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // Dynamic Theme Color
    const setThemeColor = () => {
        const hour = new Date().getHours();
        const isNight = hour < 6 || hour > 18;
        
        if (isNight) {
            document.documentElement.style.setProperty('--theme-modifier', '0.9');
        } else {
            document.documentElement.style.setProperty('--theme-modifier', '1');
        }
    };
    
    setThemeColor();
    
    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        }
    });
});

// Service Worker Registration (for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
}