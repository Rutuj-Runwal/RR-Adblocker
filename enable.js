window.addEventListener("load", function () {
    // chrome.action.setBadgeText({ text: "10+" });
    var myShield = document.getElementById("shield");
    var indvShield = document.getElementById("individualShields");
    var webBlock = document.getElementById("webBlock");
    
    var data = JSON.parse(localStorage.getItem("uniqueKey_RR"));
    myShield.checked = data;

    var webBlockStat = JSON.parse(localStorage.getItem("webBlockKey_RR"));
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { webBlock: webBlockStat });
    }
    );
    webBlock.checked = webBlockStat;
    

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
        myShield.checked = data;

        if (this.checked) {
            document.getElementById("shieldStatus").innerHTML = "<h4>Shields Up⚡</h4>";  
            indvShield.classList.remove('pause');      
        } else {
            document.getElementById("shieldStatus").innerHTML = "<h4>Shields Down😓</h4>";
            indvShield.classList.add('pause');
        }
    });

    webBlock.addEventListener('change', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { webBlock: webBlock.checked });
        });
        localStorage.setItem("webBlockKey_RR", webBlock.checked);
        var webBlockStat = JSON.parse(localStorage.getItem("webBlockKey_RR"));
        webBlock.checked = webBlockStat; 
    });

    console.log("Adblocking modules loaded✅");
});