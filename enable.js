
window.addEventListener("load", function () {
    var myShield = document.getElementById("shield");
    var indvShield = document.getElementById("individualShields");
    
    var data = JSON.parse(localStorage.getItem("uniqueKey_RR"));
    document.getElementById("shield").checked = data;

    if (myShield.checked) {
        document.getElementById("shieldStatus").innerHTML = "<h4>Shields Up⚡</h4>";
        indvShield.classList.remove('pause');
    } else {
        document.getElementById("shieldStatus").innerHTML = "<h4>Shields Down😓</h4>";
        indvShield.classList.add('pause');
    }

    myShield.addEventListener('change', function () {
        
        localStorage.setItem("uniqueKey_RR", myShield.checked);
        var data = JSON.parse(localStorage.getItem("uniqueKey_RR"));
        document.getElementById("shield").checked = data;

        if (this.checked) {
            document.getElementById("shieldStatus").innerHTML = "<h4>Shields Up⚡</h4>";  
            indvShield.classList.remove('pause');      
        } else {
            document.getElementById("shieldStatus").innerHTML = "<h4>Shields Down😓</h4>";
            indvShield.classList.add('pause');
        }
    });
    console.log("Adblocking modules loaded✅");
});