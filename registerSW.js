if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/531-calc/sw.js', { scope: '/531-calc/' })})}