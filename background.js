function disableDNR() {
    chrome.declarativeNetRequest.updateEnabledRulesets({
        disableRulesetIds: ["blockLIST"],
    });
}
setInterval(() => {
    chrome.storage.sync.get(['advStat', 'antiPrnStat', 'suspStat'], function (items) {
        if (items.advStat) {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                enableRulesetIds: ["advLIST"],
            });
        }
        if (items.antiPrnStat){
            chrome.declarativeNetRequest.updateEnabledRulesets({
                enableRulesetIds: ["antiprnLIST"],
            });
        }
        if (items.suspStat){
            chrome.declarativeNetRequest.updateEnabledRulesets({
                enableRulesetIds: ["suspLIST"],
            });
        }
        else if(!items.advStat){
            chrome.declarativeNetRequest.updateEnabledRulesets({
                disableRulesetIds: ["advLIST"],
            });
        }
        else if (!items.antiPrnStat) {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                disableRulesetIds: ["antiprnLIST"],
            });
        }
        else if (!items.suspStat) {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                disableRulesetIds: ["suspLIST"],
            });
        }
    });
}, 10);

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if(tabs[0]!=undefined){
        currtab = tabs[0];
        currtabID = tabs[0].id;
        var domain = tabs[0].url.split("/")[2];
        chrome.runtime.onMessage.addListener(
            function (response, sender, sendResponse) {
                chrome.storage.local.set({ tabIDStr: response });
            }
        );
        chrome.storage.sync.get('*', function (disabled) {
            chrome.storage.sync.get(domain, function (disabled) {
                if(disabled[domain]==undefined){
                    chrome.declarativeNetRequest.updateEnabledRulesets({
                        enableRulesetIds: ["blockLIST"],
                    });
                }
                else{
                    if (disabled[domain]==true) { // Disable Blocking
                        disableDNR();
                    }
                    else { // Enable Blocking 
                        chrome.declarativeNetRequest.updateEnabledRulesets({
                            enableRulesetIds: ["blockLIST"],
                        });
                    }
                }
            });
        });
    }
});
const urlHaus = "https://malware-filter.gitlab.io/malware-filter/urlhaus-filter-online.txt";
const urlHausBackup = "https://malware-filter.pages.dev/urlhaus-filter-online.txt";

function saveUpdateTime() {
    const tDate = new Date().toLocaleDateString();
    chrome.storage.local.set({ run_day: tDate });
}
function fetchProtectionRules(urlToFetch){
    fetch(urlToFetch).then(function (response) {
        if (response.status !== 200) {
            console.log('Status Error!');
        }
        else {
            return response.text()
        }
    }).then(function (text) {
        var urlData = text.split("\n");
        if(urlData.length>=4950){
            urlData = urlData.slice(0,4949);
        }
        console.log(urlData);
        var id = 1
        var protectionRulesArr = []
        if (urlData.length>0) {
            var countRules = 0;
            urlData.forEach((item) => {
                if (!item.includes("! ") && item.length != 0) {
                    countRules += 1;
                    if (item.includes("$all")) {
                        item = item.replace('$all', '');
                    }
                    if(item[item.length-1]==='/'){
                        item = item.substring(0, item.length - 1);
                    }
                    protectionRulesArr.push({
                        "id": id++,
                        "priority": 1,
                        "action": {
                            "type": "redirect",
                            "redirect": {"extensionPath": "/block.html"}
                        },
                        "condition": {
                            "urlFilter": item,
                            "resourceTypes": [
                                "main_frame",
                                "sub_frame",
                                "script",
                                "xmlhttprequest",
                                "ping",
                                "csp_report",
                                "media",
                                "websocket",
                                "image",
                                "webtransport",
                                "webbundle",
                                "other"
                            ]
                        }
                    })
                }
            });
            if (countRules > 0) {
                var ruleIDsCount = []
                for (var i = 1; i < countRules+1; i++) {
                    ruleIDsCount.push(i);
                }
            }
        } else { console.log("dNr Error: Ruleset Limit overflow"); }
        if (protectionRulesArr.length > 0) {
            chrome.declarativeNetRequest.updateDynamicRules({
                addRules: protectionRulesArr,
                removeRuleIds: ruleIDsCount,
            });
        }
    }).catch((error) => {
        console.log(error)
    });
}

function performUpdate() {
    try {
        fetchProtectionRules(urlHaus);
        console.log("dNr: Rules Added");
    } catch (err) {
        console.log("Error fetuching rules");
        try {
            fetchProtectionRules(urlHausBackup);
            console.log("dNr: Bkp Rules Added");
        } catch (err) { console.log("Error Fetching backup rules"); }
    }
}

try {
    chrome.storage.local.get(['run_day'], function (result) {
        let checkerDate = new Date().toLocaleDateString();
        if (result.run_day === undefined) {
            try {
                saveUpdateTime();
                performUpdate();
                console.log("First Update Performed!");
            } catch (err) { console.log("Error while fetching urlHaus data:E01!"); }
            
        }
        else if (result.run_day !== checkerDate) {
            try {
                saveUpdateTime();
                performUpdate();
                console.log("Updated Successfully!");
            } catch (err) { console.log("Error while fetching urlHaus data: E02!"); }
        }
    });
} catch (err) {
    console.log(err);
}