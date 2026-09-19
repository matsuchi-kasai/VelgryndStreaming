console.log("Velgrynd Streaming v13.0 Ultimate Engine Active.");

// Cek apakah perangkat/member sedang diblokir (Owner ID 1 kebal mutlak dari ban)
(function checkBanStatus() {
    const isOwner = sessionStorage.getItem('velgrynd_owner_logged') === 'true';
    if(isOwner) return; // Owner kebal dari sistem ban

    const banDataStr = localStorage.getItem('velgrynd_active_ban');
    if(banDataStr) {
        try {
            const banData = JSON.parse(banDataStr);
            const now = new Date().getTime();
            if(banData.expiresAt === 'permanent' || now < banData.expiresAt) {
                const durText = banData.expiresAt === 'permanent' ? 'Permanen' : `hingga ${new Date(banData.expiresAt).toLocaleString('id-ID')}`;
                document.body.innerHTML = `
                    <div style="background:#05070b; color:white; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:20px;">
                        <h1 style="color:#ef4444; font-size:2rem; margin-bottom:10px;">🚫 AKUN / PERANGKAT ANDA DIBLOKIR</h1>
                        <p style="color:#9ca3af; max-width:450px; margin-bottom:15px;">Anda telah dikenakan sanksi banned oleh Owner Velgrynd Streaming (${banData.reason}).</p>
                        <p style="color:#f59e0b; font-size:0.9rem;">Status Durasi: <b>${durText}</b></p>
                    </div>
                `;
                throw new Error("Account Banned");
            } else {
                localStorage.removeItem('velgrynd_active_ban');
            }
        } catch(e) { console.error(e); }
    }
})();

function getAllVideos() {
    let stored = [];
    try {
        const data = localStorage.getItem('velgrynd_all_videos');
        if(data) stored = JSON.parse(data);
    } catch(e) { console.error(e); }
    
    // Jika kosong, tampilkan array kosong sesuai permintaan agar bersih
    return stored;
}

function saveVideoToStorage(newVideo) {
    let stored = [];
    try {
        const data = localStorage.getItem('velgrynd_all_videos');
        if(data) stored = JSON.parse(data);
        stored.unshift(newVideo);
        localStorage.setItem('velgrynd_all_videos', JSON.stringify(stored));
    } catch(e) { alert('Gagal menyimpan video ke server.'); }
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
