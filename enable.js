window.addEventListener("load", function () {
    const MAX_GETMATCHEDRULES_CALLS = 20;
    var myShield = document.getElementById("site_link");
    var indvShield = document.getElementById("individualShields");
    var showDomainDiv = document.getElementById("showDomain");

    function disableDNR(){
        chrome.declarativeNetRequest.updateEnabledRulesets({disableRulesetIds: ["blockLIST"] });
    }

    var currtab , currtabID;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        currtab = tabs[0];
        currtabID = tabs[0].id;
        showDomainDiv.innerText = "Domain: " + currtab.url.split('/')[2];
    });

    var data = JSON.parse(localStorage.getItem("uniqueKey_RR"));
    myShield.checked = data;

    if (myShield.checked) {
        showDomainDiv.style.backgroundColor = "#0F8C44";
        document.getElementById("shieldStatus").innerHTML = "<h4>Shields Up⚡</h4>";
        indvShield.classList.remove('pause');
        chrome.declarativeNetRequest.updateEnabledRulesets(
            {
                enableRulesetIds: ["blockLIST"]
            }
        );
        chrome.declarativeNetRequest.getMatchedRules(
            {
                tabId: currtabID
            },
            (RulesMatchedDetails) => {
                if (RulesMatchedDetails.rulesMatchedInfo.length <= MAX_GETMATCHEDRULES_CALLS) {
                    var num = RulesMatchedDetails.rulesMatchedInfo.length.toString();
                    chrome.action.setBadgeText({ text: num });
                }
            }
        );

    } else {
        showDomainDiv.style.backgroundColor = "#2196F3";
        document.getElementById("shieldStatus").innerHTML = "<h4>Shields Down😓</h4>";
        indvShield.classList.add('pause');
        disableDNR();
    }

    myShield.addEventListener('change', function () {

        localStorage.setItem("uniqueKey_RR", myShield.checked);
        var data = JSON.parse(localStorage.getItem("uniqueKey_RR"));
        myShield.checked = data;

        if (this.checked) {
            document.getElementById("shieldStatus").innerHTML = "<h4>Shields Up⚡</h4>";
            indvShield.classList.remove('pause');
            showDomainDiv.style.backgroundColor = "#0F8C44"; 
            chrome.declarativeNetRequest.updateEnabledRulesets(
                {
                    enableRulesetIds: ["blockLIST"]
                }
            );
            chrome.declarativeNetRequest.getMatchedRules(
                {
                    tabId: currtabID
                },
                (RulesMatchedDetails) => {
                    if (RulesMatchedDetails.rulesMatchedInfo.length <= MAX_GETMATCHEDRULES_CALLS) {
                        var num = RulesMatchedDetails.rulesMatchedInfo.length.toString();
                        chrome.action.setBadgeText({ text: num });
                    }
                }
            );
            chrome.tabs.reload(currtab.id);

        } else {
            document.getElementById("shieldStatus").innerHTML = "<h4>Shields Down😓</h4>";
            indvShield.classList.add('pause');
            showDomainDiv.style.backgroundColor = "#2196F3";
            disableDNR();
            chrome.tabs.reload(currtab.id);  
        }
    });

    console.log("Adblocking modules loaded✅");
});