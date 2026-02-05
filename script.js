let selectedIssue = "";
let currentLang = "am";

const translations = {
    am: {
        title: "የኢትዮጵያ ኤሌክትሪክ አገልግሎት",
        welcome: "እንኳን በደህና መጣችሁ ውድ ደንበኞቻችን!",
        thanks: "ውድ ደንበኛችን እናመሰግናለን!"
    },
    en: {
        title: "Ethiopian Electric Utility",
        welcome: "Welcome our dear customers!",
        thanks: "Thank you, dear customer!"
    }
};

function changeLang(lang) {
    currentLang = lang;
    document.getElementById('mainTitle').innerText = translations[lang].title;
    document.getElementById('welcomeText').innerText = translations[lang].welcome;
    document.getElementById('thanksMsg').innerText = translations[lang].thanks;
}

function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

function customerAccess() {
    if(document.getElementById('custID').value) showSection('custDashboard');
    else alert("እባክዎ መለያ ቁጥር ያስገቡ");
}

function selectIssue(issue) {
    selectedIssue = issue;
    showSection('finalForm');
}

function handleStaffLogin() {
    const id = document.getElementById('staffID').value;
    const pass = document.getElementById('staffPass').value;
    
    // ማንኛውንም ID ይቀበላል፣ ፓስወርድ ግን eeu@123 መሆን አለበት
    if(pass === "eeu@123") {
        alert("እንኳን ደህና መጡ ሰራተኛ " + id);
        // እዚህ ጋር የሰራተኛ ዳሽቦርድ መክፈት ይቻላል
    } else {
        alert("የተሳሳተ ፓስወርድ!");
    }
}

function submitComplaint() {
    const city = document.getElementById('city').value;
    const phone = document.getElementById('phone').value;

    if(!city || !phone) return alert("እባክዎ መረጃውን ይሙሉ");

    // Auto-send GPS Location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const gps = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
            document.getElementById('detailsSent').innerText = `ብልሽት፡ ${selectedIssue} | ከተማ፡ ${city} | GPS፡ ${gps}`;
            showSection('successScreen');
        }, () => {
            alert("GPS ማግኘት አልተቻለም ግን ሪፖርቱ ተልኳል");
            showSection('successScreen');
        });            // ቴሌግራም መላኪያ (መስመር 67 አካባቢ)
            const token = "8087838649:AAFGVVdmutPvl8iFZviaQZvnsT3WvDKRc0I";
            const chat_id = "8542308552";
            const message = `አዲስ ቅሬታ! \nብልሽት: ${selectedIssue} \nከተማ: ${city} \nስልክ: ${phone} \nቦታ: ${gps}`;

            fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}`);

    }
}
