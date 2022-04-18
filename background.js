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
        chrome.runtime.onMessage.addListener(
            function (response, sender, sendResponse) {
                chrome.storage.local.set({ tabIDStr: response });
            }
        );
        var domain = tabs[0].url.split("/")[2];
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