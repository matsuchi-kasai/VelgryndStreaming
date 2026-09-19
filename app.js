console.log("Velgrynd Streaming v12.0 Ultimate Engine Active.");

// Cek apakah device diblokir oleh Owner
(function checkDeviceBan() {
    const isBanned = localStorage.getItem('velgrynd_device_banned');
    if(isBanned === 'true') {
        document.body.innerHTML = `
            <div style="background:#05070b; color:white; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:20px;">
                <h1 style="color:#ef4444; font-size:2rem; margin-bottom:10px;">🚫 PERANGKAT DIBLOKIR</h1>
                <p style="color:#9ca3af; max-width:400px;">Perangkat atau akun Anda telah diblokir secara permanen oleh Owner Velgrynd Streaming.</p>
            </div>
        `;
        throw new Error("Device Banned");
    }
})();

function getAllVideos() {
    let stored = [];
    try {
        const data = localStorage.getItem('velgrynd_all_videos');
        if(data) stored = JSON.parse(data);
    } catch(e) { console.error(e); }
    
    // Video bawaan default
    let defaults = [
        {
            id: 1001,
            title: "Masterclass Fullstack Web Development 2026",
            uploader: "Velgrynd Official",
            isOwner: true,
            category: "Teknologi",
            date: "20 September 2026",
            views: "45.2rb",
            likes: "4.1rb",
            desc: "Platform video streaming mandiri dengan fitur lengkap dan server bebas lag tanpa error.",
            url: "https://www.w3schools.com/html/mov_bbb.mp4",
            comments: [{ user: "Budi", text: "Mantap web nya!" }]
        }
    ];
    return [...stored, ...defaults];
}

function saveVideoToStorage(newVideo) {
    let stored = [];
    try {
        const data = localStorage.getItem('velgrynd_all_videos');
        if(data) stored = JSON.parse(data);
        stored.unshift(newVideo);
        localStorage.setItem('velgrynd_all_videos', JSON.stringify(stored));
    } catch(e) { alert('Gagal menyimpan video ke storage.'); }
}

// Cek Status Owner Sesi Persisten
function isOwnerActive() {
    return sessionStorage.getItem('velgrynd_owner_logged') === 'true';
}
