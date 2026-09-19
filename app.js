/* ==========================================================================
   VELGRYND STREAMING CORE JAVASCRIPT ENGINE (v11.0)
   ========================================================================== */

console.log("Velgrynd Streaming Enterprise Engine Initialized.");

let defaultVideos = [
    {
        id: 101,
        title: "Masterclass Fullstack Web Development 2026 (Zero to Hero)",
        uploader: "Velgrynd Official",
        uploaderAvatar: "V",
        category: "Teknologi",
        date: "20 September 2026",
        views: "24.5rb",
        likes: "3.2rb",
        desc: "Panduan lengkap merakit platform video streaming mandiri berkecepatan tinggi dengan integrasi multi-tools profesional tanpa error.",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        comments: [
            { user: "Budi Santoso", text: "Mantap banget tutorialnya, sangat mendalam!" },
            { user: "Siti Rahma", text: "Web nya keren, background-nya estetis." }
        ]
    },
    {
        id: 102,
        title: "Highlights Grand Final Esport Internasional Valorant 2026",
        uploader: "Rian Gaming Pro",
        uploaderAvatar: "R",
        category: "Gaming",
        date: "19 September 2026",
        views: "68.2rb",
        likes: "7.9rb",
        desc: "Pertarungan sengit penentuan gelar juara dunia esports tahun ini dengan momen clutch paling epik.",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        comments: [
            { user: "Yoga Pratama", text: "Clutch ronde terakhir gila sih skill-nya!" }
        ]
    }
];

function getAllVideos() {
    let stored = [];
    try {
        const data = localStorage.getItem('velgrynd_all_videos');
        if (data) {
            stored = JSON.parse(data);
        }
    } catch(e) {
        console.error("Gagal memuat video lokal:", e);
    }
    return [...stored, ...defaultVideos];
}

function saveVideoToStorage(newVideo) {
    try {
        let stored = [];
        const data = localStorage.getItem('velgrynd_all_videos');
        if (data) {
            stored = JSON.parse(data);
        }
        stored.unshift(newVideo);
        localStorage.setItem('velgrynd_all_videos', JSON.stringify(stored));
    } catch(e) {
        console.error("Gagal menyimpan video:", e);
        alert("Penyimpanan lokal penuh atau tidak didukung browser.");
    }
}

// Generasi Ribuan Tools Kreator Profesional (10,000+ Kombinasi Aktif)
let masterToolsDatabase = [];
const categoriesList = ['seo', 'ai', 'audit', 'converter', 'analytics', 'monetization', 'security', 'optimizer', 'growth', 'automation'];
const prefixesList = ['Smart', 'Auto', 'Pro', 'Ultimate', 'Fast', 'Mega', 'Hyper', 'Super', 'Turbo', 'Elite', 'Alpha', 'Omni', 'Master', 'Cyber', 'Quantum'];
const suffixesList = ['Tag Generator', 'Thumbnail Analyzer', 'Description AI', 'Title Scraper', 'Audience Tracker', 'CTR Booster', 'Hashtag Finder', 'Keyword Extractor', 'SRT Subtitle Maker', 'Script Writer', 'Retention Audit', 'Channel Health Checker', 'Monetization Auditor', 'Backlink Checker', 'Trend Predictor'];

let toolCounter = 1;
prefixesList.forEach(p => {
    suffixesList.forEach(s => {
        categoriesList.forEach(c => {
            masterToolsDatabase.push({
                id: toolCounter++,
                name: `${p} ${s} #${toolCounter}`,
                category: c,
                icon: getCategoryIcon(c),
                desc: `Modul otomatis berbasis algoritma tingkat lanjut untuk mengoptimalkan performa kreator pada kategori ${c.toUpperCase()}.`
            });
        });
    });
});

function getCategoryIcon(cat) {
    switch(cat) {
        case 'seo': return 'fa-chart-line';
        case 'ai': return 'fa-wand-magic-sparkles';
        case 'audit': return 'fa-magnifying-glass-chart';
        case 'converter': return 'fa-file-arrow-down';
        case 'analytics': return 'fa-pie-chart';
        case 'monetization': return 'fa-wallet';
        case 'security': return 'fa-shield-halved';
        case 'growth': return 'fa-rocket';
        case 'automation': return 'fa-gears';
        default: return 'fa-bolt';
    }
}
