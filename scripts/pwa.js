// PWA Installation and Management
(function() {
    'use strict';

    // Check for browser support
    if (!('serviceWorker' in navigator)) {
        console.log('Service Worker not supported');
        return;
    }

    // Register service worker
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
                
                // Check for updates periodically
                setInterval(() => {
                    registration.update();
                }, 60000); // Check every minute

                // Handle updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker available
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });

    // PWA Install Prompt
    let deferredPrompt;
    const installButton = document.createElement('button');
    installButton.className = 'pwa-install-btn';
    installButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2V14M12 14L17 9M12 14L7 9" stroke="currentColor" stroke-width="2"/>
            <path d="M3 16V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V16" stroke="currentColor" stroke-width="2"/>
        </svg>
        <span>Install App</span>
    `;
    installButton.style.display = 'none';
    document.body.appendChild(installButton);

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button
        installButton.style.display = 'flex';
        
        // Add animation
        setTimeout(() => {
            installButton.classList.add('show');
        }, 100);
    });

    // Handle install button click
    installButton.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for the user to respond
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
            installButton.style.display = 'none';
        } else {
            console.log('User dismissed the install prompt');
        }
        
        deferredPrompt = null;
    });

    // Detect if app is installed
    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        installButton.style.display = 'none';
        
        // Track installation
        if (typeof gtag !== 'undefined') {
            gtag('event', 'app_installed');
        }
    });

    // Handle offline/online status
    function updateOnlineStatus() {
        const statusElement = document.createElement('div');
        statusElement.className = 'network-status';
        
        if (navigator.onLine) {
            statusElement.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.55C6.97656 10.8023 9.48217 9.82665 12.07 9.82665C14.6578 9.82665 17.1634 10.8023 19.14 12.55M8.53 16.11C9.58453 15.2303 10.9174 14.7426 12.295 14.7426C13.6726 14.7426 15.0055 15.2303 16.06 16.11M12 19.59H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span>Back Online</span>
            `;
            statusElement.classList.add('online');
            document.body.appendChild(statusElement);
            
            setTimeout(() => {
                statusElement.remove();
            }, 3000);
        } else {
            statusElement.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 19.59H12.01M3 3L21 21M16.06 16.11C15.0055 15.2303 13.6726 14.7426 12.295 14.7426C10.9174 14.7426 9.58453 15.2303 8.53 16.11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span>You're Offline - Content cached for offline use</span>
            `;
            statusElement.classList.add('offline');
            document.body.appendChild(statusElement);
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Show update notification
    function showUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <p>A new version is available!</p>
            <button class="update-btn">Update Now</button>
            <button class="dismiss-btn">Later</button>
        `;
        
        document.body.appendChild(notification);
        
        // Handle update
        notification.querySelector('.update-btn').addEventListener('click', () => {
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({ action: 'skipWaiting' });
            }
            window.location.reload();
        });
        
        // Handle dismiss
        notification.querySelector('.dismiss-btn').addEventListener('click', () => {
            notification.remove();
        });
    }

    // Handle page visibility for performance
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations or resource-intensive tasks
            document.body.classList.add('page-hidden');
        } else {
            // Resume animations
            document.body.classList.remove('page-hidden');
        }
    });

    // Share API
    const shareButton = document.querySelector('.contact-btn');
    if (shareButton && navigator.share) {
        shareButton.addEventListener('click', async (e) => {
            e.preventDefault();
            
            try {
                await navigator.share({
                    title: 'Medical Equipment Portfolio',
                    text: 'Check out our professional medical equipment catalog',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share failed:', err);
            }
        });
    }

    // Background Sync
    if ('sync' in self.registration) {
        // Register background sync
        navigator.serviceWorker.ready.then(registration => {
            document.addEventListener('submit', (e) => {
                if (e.target.classList.contains('contact-form')) {
                    e.preventDefault();
                    
                    // Save form data
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData);
                    
                    // Store in IndexedDB
                    saveFormData(data);
                    
                    // Register sync
                    registration.sync.register('sync-contact-form');
                    
                    // Show confirmation
                    showNotification('Form saved! Will send when online.');
                }
            });
        });
    }

    // Push Notifications
    async function subscribeToPush() {
        if (!('PushManager' in window)) return;
        
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('YOUR_PUBLIC_VAPID_KEY')
            });
            
            // Send subscription to server
            await saveSubscription(subscription);
        } catch (error) {
            console.error('Push subscription failed:', error);
        }
    }

    // Utility functions
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        
        return outputArray;
    }

    // IndexedDB for offline form data
    function saveFormData(data) {
        const request = indexedDB.open('MedPortfolioDB', 1);
        
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['forms'], 'readwrite');
            const store = transaction.objectStore('forms');
            
            store.add({
                timestamp: Date.now(),
                data: data,
                synced: false
            });
        };
    }

    // Performance monitoring
    if ('PerformanceObserver' in window) {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                // Log slow resources
                if (entry.duration > 1000) {
                    console.warn('Slow resource:', entry.name, entry.duration);
                }
            }
        });
        
        perfObserver.observe({ entryTypes: ['resource'] });
    }

    // Add PWA styles
    const pwaStyles = document.createElement('style');
    pwaStyles.textContent = `
        .pwa-install-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #6C63FF 0%, #FF6B6B 100%);
            color: white;
            border: none;
            border-radius: 50px;
            padding: 15px 30px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(108, 99, 255, 0.3);
            transform: translateY(100px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
        }
        
        .pwa-install-btn.show {
            transform: translateY(0);
        }
        
        .pwa-install-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(108, 99, 255, 0.4);
        }
        
        .network-status {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            color: #333;
            padding: 12px 24px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        }
        
        .network-status.online {
            border: 2px solid #4ECDC4;
        }
        
        .network-status.offline {
            border: 2px solid #FF6B6B;
        }
        
        .update-notification {
            position: fixed;
            bottom: 30px;
            left: 30px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            animation: slideUp 0.3s ease-out;
        }
        
        .update-notification button {
            margin: 5px;
            padding: 8px 20px;
            border: none;
            border-radius: 25px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .update-btn {
            background: #6C63FF;
            color: white;
        }
        
        .dismiss-btn {
            background: #f0f0f0;
            color: #666;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -20px);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* iOS PWA styles */
        @media (display-mode: standalone) {
            .pwa-install-btn {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(pwaStyles);
})();