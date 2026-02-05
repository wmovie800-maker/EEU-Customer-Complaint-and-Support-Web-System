// 1. ገጹ ሲከፈት በተኖቹን እንዲያነቃቃ
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.btn-green');
    if (loginBtn) {
        loginBtn.onclick = () => showSection('custDashboard');
    }
});

// 2. ገጾችን መቀያየሪያ (Navigation)
function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.style.display = 'none');
    const target = document.getElementById(id);
    if(target) target.style.display = 'block';
}

// 3. የ 140,000 ደንበኞች መፈለጊያ (Search)
function customerAccess() {
    const input = document.getElementById('custID').value;
    if (!input) return alert("እባክዎ መለያ ቁጥር ያስገቡ");
    
    // ለጊዜው ወደ ዳሽቦርድ ያስገባዋል - በኋላ ከ JSON ጋር እናገናኘዋለን
    showSection('custDashboard');
}

// 4. ቅሬታ መላኪያ (ወደ ቴሌግራም የሚልከው)
function submitComplaint() {
    const city = document.getElementById('city').value;
    const phone = document.getElementById('phone').value;

    // GPS ፍቃድ ጠይቆ እንዲልክ
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const gps = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
            
            const token = "8087838649:AAFGVVdmutPvl8iFZviaQZvnsT3WvDKRc0I";
            const chat_id = "8542308552";
            const message = `አዲስ ቅሬታ! \nከተማ: ${city} \nስልክ: ${phone} \nGPS: ${gps}`;

            fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}`)
            .then(() => showSection('successScreen'))
            .catch(err => console.error("Error:", err));
        }, () => {
            // GPS ባይሰራም እንኳ መልዕክቱ እንዲላክ
            showSection('successScreen');
        });
    }
}
