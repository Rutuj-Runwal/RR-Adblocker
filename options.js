var modal = document.getElementById("modal");
var Savebtn = document.getElementById("save");
var span = document.getElementById("close");
var advFilter = document.getElementById('useAdv');
var antiPrnFilter = document.getElementById('useAntiPrn');
var suspFilter = document.getElementById('useSuspBlock');
var updtBtn = document.getElementById('updtchk');
var checkStateChanged = false;
// Saves options to chrome.storage
function save_options() {
    var useAdv = document.getElementById('useAdv').checked;
    var useAntiprn = document.getElementById('useAntiPrn').checked;
    var useSusp = document.getElementById('useSuspBlock').checked;

    chrome.storage.sync.set({ advStat: useAdv, antiPrnStat: useAntiprn, suspStat: useSusp }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
        status.textContent = '';
    }, 750);
    if (useAdv) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: ["advLIST"]
        });
    }
    if (useAntiprn) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: ["antiprnLIST"]
        });
    }
    if (useSusp) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: ["suspLIST"]
        });
    }
    if (!useAdv) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: ["advLIST"]
        });
    }
    if (!useAntiprn) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: ["antiprnLIST"]
        });
    }
    if (!useSusp) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: ["suspLIST"]
        });
    }

    checkStateChanged = false;
}
advFilter.onclick = function () {
    if (advFilter.checked) { modal.style.display = "block"; }
}
var settings = document.querySelectorAll("input[type='checkbox']");

settings.forEach(element => {
    element.onchange = () => {
        Savebtn.classList.remove('saveBefore');
        Savebtn.classList.add('saveAfter');
    }
});

function restore_options() {
    chrome.storage.sync.get(['advStat', 'antiPrnStat', 'suspStat'], function (items) {
        advFilter.checked = items.advStat;
        antiPrnFilter.checked = items.antiPrnStat;
        suspFilter.checked = items.suspStat;
        if (items.advStat) {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                enableRulesetIds: ["advLIST"]
            });
        }
        if (items.antiPrnStat) {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                enableRulesetIds: ["antiprnLIST"]
            });
        }
        if (items.suspStat) {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                enableRulesetIds: ["suspLIST"]
            });
        }
        if (!items.advStat) {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                disableRulesetIds: ["advLIST"]
            });
        }
        if (!items.antiPrnStat) {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                disableRulesetIds: ["antiprnLIST"]
            });
        }
        if (!items.suspStat) {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                disableRulesetIds: ["suspLIST"]
            });
        }
    });

}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) { modal.style.display = "none"; }
}
if (updtBtn) {
    updtBtn.onclick = function () {
        var updtUrl = "https://raw.githubusercontent.com/Rutuj-Runwal/RR-Adblocker/main/patch.txt";
        try {
            fetch(updtUrl)
                .then(response => response.text())
                .then(function (text) {
                    let urlPatchDt = text.split("\n");
                    let patchRules = [];
                    let patchRulesId = [];
                    let id = 4950;
                    if (urlPatchDt.length > 2) {
                        for (let i = 2; i < urlPatchDt.length; i++) {
                            patchRulesId.push(id);
                            if (urlPatchDt[i].includes("U: ")) {
                                var data = urlPatchDt[i].split(' ');
                                var blockOrAllow = data[2].trim() === "A" ? "allow" : "block";
                                var priorityBorA = blockOrAllow === "allow" ? 2 : 1;
                                patchRules.push({
                                    "id": id++,
                                    "priority": priorityBorA,
                                    "action": {
                                        "type": blockOrAllow,
                                    },
                                    "condition": {
                                        "urlFilter": "||" + data[1].trim() + "^",
                                        "resourceTypes": [
                                            "main_frame",
                                            "sub_frame",
                                            "script",
                                            "xmlhttprequest",
                                            "ping",
                                            "csp_report",
                                            "stylesheet",
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
                            else if (urlPatchDt[i].includes("R: ")) {
                                console.log(urlPatchDt[i].split(' ')[1]);
                                patchRules.push({
                                    "id": id++,
                                    "priority": 1,
                                    "action": {
                                        "type": "block",
                                    },
                                    "condition": {
                                        "regexFilter": urlPatchDt[i].split(' ')[1].trim(),
                                        "resourceTypes": [
                                            "main_frame",
                                            "sub_frame",
                                            "script",
                                            "xmlhttprequest",
                                            "ping",
                                            "csp_report",
                                            "stylesheet",
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
                        }
                        patchRulesId = patchRulesId.slice(0, patchRulesId.length - 1);
                        chrome.declarativeNetRequest.updateDynamicRules({
                            addRules: patchRules,
                            removeRuleIds: patchRulesId,
                        });
                    }
                    console.log(patchRules);
                    console.log(patchRulesId);
                    alert("Done! Latest filters have been applied. If you still face issues with certain website report the Bug/Issue");
                }).catch(function (err) { console.log(err); alert("Failed to get updates! Ensure you have a stable network connection.") });
        } catch (err) {
            alert("Failed to get updates! Ensure you have a stable network connection.");
        }
    }
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

function add_state_change_listener(element) {
    element.addEventListener('change', e => {
        checkStateChanged = true;
    });
}
add_state_change_listener(advFilter);
add_state_change_listener(antiPrnFilter);
add_state_change_listener(suspFilter);
window.addEventListener('beforeunload', function (event) {
    if (checkStateChanged) {
        event.preventDefault();
        event.returnValue = '';
    }
})

window.onload = () => {
    let nightMode = document.getElementsByClassName("mode")[0]
    let lightMode = document.getElementsByClassName("mode")[1]
    nightMode.onclick = () => {
        toggleMode()
    }
    lightMode.onclick = () => {
        toggleMode()
    }
}

const toggleMode = () => {
    let nightMode = document.getElementsByClassName("mode")[0]
    let lightMode = document.getElementsByClassName("light-mode")[0]

    if (nightMode.style.display == "") {
        nightMode.style.display = "block"
    } else {
        nightMode.style.display = ""
    }

    if (lightMode.style.display == "") {
        lightMode.style.display = "block"
    } else {
        lightMode.style.display = ""
    }
    document.getElementsByTagName("body")[0].classList.toggle("night-mode-style")
}
