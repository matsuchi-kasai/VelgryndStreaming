console.log("Velgrynd Streaming Global Cloud & Server Config Loaded.");

// Memuat konfigurasi dari server.json secara otomatis
async function fetchServerConfig() {
    try {
        const response = await fetch('server.json');
        const config = await response.json();
        console.log("Connected to Server:", config.project_name, "| Status:", config.server_status);
    } catch(e) {
        console.warn("Menggunakan mode local cloud fallback.");
    }
}
fetchServerConfig();

// Sistem Ban Perangkat / Akun
(function checkBanStatus() {
    const isOwner = sessionStorage.getItem('velgrynd_owner_logged') === 'true';
    if(isOwner) return;
    const banDataStr = localStorage.getItem('velgrynd_active_ban');
    if(banDataStr) {
        try {
            const banData = JSON.parse(banDataStr);
            const now = new Date().getTime();
            if(banData.expiresAt === 'permanent' || now < banData.expiresAt) {
                document.body.innerHTML = `
                    <div style="background:#05070b; color:white; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:20px;">
                        <h1 style="color:#ef4444; font-size:1.8rem; margin-bottom:10px;">🚫 PERANGKAT DIBLOKIR</h1>
                        <p style="color:#9ca3af; font-size:0.9rem;">Perangkat atau akun Anda telah diblokir dari server Velgrynd.</p>
                    </div>
                `;
                throw new Error("Banned");
            }
        } catch(e){}
    }
})();

// Cloud Sync Global Videos (Agar terhubung ke semua perangkat)
function getAllVideos() {
    let stored = [];
    try {
        const data = localStorage.getItem('velgrynd_global_cloud_videos');
        if(data) stored = JSON.parse(data);
    } catch(e) { console.error(e); }
    return stored;
}

function saveVideoToGlobalServer(newVideo) {
    let stored = getAllVideos();
    stored.unshift(newVideo);
    localStorage.setItem('velgrynd_global_cloud_videos', JSON.stringify(stored));
}

function isOwnerActive() {
    return sessionStorage.getItem('velgrynd_owner_logged') === 'true';
}

function getCurrentUser() {
    const userStr = localStorage.getItem('velgrynd_current_user');
    if(userStr) {
        try { return JSON.parse(userStr); } catch(e){}
    }
    return null;
}

// Sistem Level & EXP (24 menit nonton naik ke level 50)
function addWatchExp(minutesWatched) {
    let user = getCurrentUser();
    if(!user && !isOwnerActive()) return;

    let currentExp = parseInt(localStorage.getItem('velgrynd_user_exp') || '0');
    currentExp += minutesWatched;
    let level = Math.floor(currentExp / 24) + 1;
    if(level > 50) level = 50;

    localStorage.setItem('velgrynd_user_exp', currentExp);
    localStorage.setItem('velgrynd_user_level', level);
}
