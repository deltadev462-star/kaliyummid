// Service Worker for Medical Equipment Portfolio
const CACHE_NAME = 'med-portfolio-v1';
const urlsToCache = [
    '/kalium-medical-portfolio/',
    '/kalium-medical-portfolio/index.html',
    '/kalium-medical-portfolio/styles/main.css',
    '/kalium-medical-portfolio/styles/animations.css',
    '/kalium-medical-portfolio/styles/print.css',
    '/kalium-medical-portfolio/scripts/devices-data.js',
    '/kalium-medical-portfolio/scripts/main.js',
    '/kalium-medical-portfolio/manifest.json'
];

// Install Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Cache and return requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    response => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                // Cache images, fonts, and other assets dynamically
                                if (event.request.url.includes('/images/') || 
                                    event.request.url.includes('/fonts/') ||
                                    event.request.url.includes('.jpg') ||
                                    event.request.url.includes('.png') ||
                                    event.request.url.includes('.svg') ||
                                    event.request.url.includes('.woff') ||
                                    event.request.url.includes('.woff2')) {
                                    cache.put(event.request, responseToCache);
                                }
                            });

                        return response;
                    }
                ).catch(() => {
                    // Network request failed, try to get from cache
                    return caches.match('/kalium-medical-portfolio/offline.html');
                });
            })
    );
});

// Update Service Worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background Sync
self.addEventListener('sync', event => {
    if (event.tag === 'sync-devices') {
        event.waitUntil(syncDevices());
    }
});

async function syncDevices() {
    try {
        // Sync any pending device updates when back online
        const cache = await caches.open(CACHE_NAME);
        // Implementation for syncing device data
        console.log('Devices synced successfully');
    } catch (error) {
        console.error('Sync failed:', error);
    }
}

// Push Notifications (optional)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New medical equipment added to catalog!',
        icon: '/kalium-medical-portfolio/images/icons/icon-192x192.png',
        badge: '/kalium-medical-portfolio/images/icons/icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Catalog',
                icon: '/kalium-medical-portfolio/images/icons/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/kalium-medical-portfolio/images/icons/xmark.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Medical Equipment Portfolio', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        // Open the catalog
        clients.openWindow('/kalium-medical-portfolio/#devices');
    } else {
        // Open the home page
        clients.openWindow('/kalium-medical-portfolio/');
    }
});

// Skip waiting
self.addEventListener('message', event => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});