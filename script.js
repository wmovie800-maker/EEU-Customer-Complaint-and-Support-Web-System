// ያንተ የግል መረጃዎች
const token = "8087838649:AAFGVVdmutPvL8iFZviaQZvnsT3WvDKRc0I"; 
const chat_id = "8542308552"; 

document.getElementById('complaintForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // መረጃዎቹን ከፎርሙ ላይ መሰብሰብ
    const account = document.getElementById('accountNumber').value;
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('phoneNumber').value;
    const issue = document.getElementById('issueType').value;

    // ለቴሌግራም የሚላከው መልዕክት አቀራረብ
    const message = `🔔 **አዲስ የቅሬታ መረጃ ደርሷል!**\n\n` +
                    `👤 **ስም:** ${name}\n` +
                    `🔢 **አካውንት:** ${account}\n` +
                    `📞 **ስልክ:** ${phone}\n` +
                    `📝 **የቅሬታ አይነት:** ${issue}`;

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

    // መረጃውን ወደ ቴሌግራም መላክ
    fetch(url)
        .then(response => {
            if (response.ok) {
                alert("መረጃው በትክክል ተልኳል። እናመሰግናለን!");
                document.getElementById('complaintForm').reset();
            } else {
                alert("መረጃው አልተላከም። እባክዎ የቦት ቶከን ወይም Chat ID ትክክል መሆኑን ያረጋግጡ።");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("የኢንተርኔት ግንኙነት ችግር አለ።");
        });
});
