var disabled = {};
var myShield = document.getElementById("site_link");
var indvShield = document.getElementById("individualShields");
var showDomainDiv = document.getElementById("showDomain");
var statsCount = document.getElementById("showStatistics");
var optionsSetting = document.getElementById("Openoptions");
var ticks = document.querySelectorAll(".tick");
var crosses = document.querySelectorAll(".cross");
function disableDNR() {
  chrome.declarativeNetRequest.updateEnabledRulesets({
    disableRulesetIds: ["blockLIST"],
  });
}
if(optionsSetting!=undefined){
  document.querySelector('#Openoptions').addEventListener('click', function () {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  });
}
var currtab, currtabID;
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  currtab = tabs[0];
  currtabID = tabs[0].id;
  showDomainDiv.innerText = "Domain: " + currtab.url.split("/")[2];
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var domain = tabs[0].url.split("/")[2];
  // deleteDomainCookies(domain);
  chrome.storage.sync.get('*', function (disabled) {
    chrome.storage.sync.get(domain, function (disabled) {
      if (disabled[domain] == undefined) {
        myShield.checked = true;
        indvShield.classList.remove("pause");
        crosses.forEach(cross => {
          cross.classList.add("hideNDisable");
        }); 
        ticks.forEach(tick => {
          tick.classList.remove("hideNDisable");
        });
        showDomainDiv.style.backgroundColor = "#0F8C44";
        chrome.declarativeNetRequest.updateEnabledRulesets({
          enableRulesetIds: ["blockLIST"],
        });
      }
      else {
        if (disabled[domain]) { // Disable Blocking
          myShield.checked = false;
          showDomainDiv.style.backgroundColor = "#2196F3";
          indvShield.classList.add("pause");
          crosses.forEach(cross => {
            cross.classList.remove("hideNDisable");
          });
          ticks.forEach(tick => {
            tick.classList.add("hideNDisable");
          });
          statsCount.innerText = "0 ";
          disableDNR();
        }
        else { // Enable Blocking 
          myShield.checked = true;
          showDomainDiv.style.backgroundColor = "#0F8C44";
          indvShield.classList.remove("pause");
          crosses.forEach(cross => {
            cross.classList.add("hideNDisable");
          });
          ticks.forEach(tick => {
            tick.classList.remove("hideNDisable");
          });
          chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: ["blockLIST"],
          });
        }
      }
    });
  });
});

chrome.storage.local.get(['tabIDStr'], function (result) {
  var impUrlArray = result.tabIDStr;
  if (impUrlArray != undefined) {
    statsCount.innerText = impUrlArray.length;
  }
});

myShield.addEventListener("change", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var domain = tabs[0].url.split("/")[2];
    myShield.checked ? disabled[domain] = false : disabled[domain] = true;
    console.log(disabled);
    chrome.storage.sync.set(disabled);
    chrome.storage.sync.get(domain, function (disabled) {
      if (disabled[domain] == undefined) {
        myShield.checked = true;
        indvShield.classList.remove("pause");
        crosses.forEach(cross => {
          cross.classList.add("hideNDisable");
        });
        ticks.forEach(tick => {
          tick.classList.remove("hideNDisable");
        });
        showDomainDiv.style.backgroundColor = "#0F8C44";
        chrome.declarativeNetRequest.updateEnabledRulesets({
          enableRulesetIds: ["blockLIST"],
        });
      }
      else{
        if (disabled[domain]==true) { // Disable Blocking
          myShield.checked = false;
          indvShield.classList.add("pause");
          crosses.forEach(cross => {
            cross.classList.remove("hideNDisable");
          });
          ticks.forEach(tick => {
            tick.classList.add("hideNDisable");
          });
          showDomainDiv.style.backgroundColor = "#2196F3";
          statsCount.innerText = "0 ";
          disableDNR();
          chrome.tabs.reload(currtab.id);
        }
        else { // Enable Blocking
          myShield.checked = true;
          indvShield.classList.remove("pause");
          crosses.forEach(cross => {
            cross.classList.add("hideNDisable");
          });
          ticks.forEach(tick => {
            tick.classList.remove("hideNDisable");
          });
          showDomainDiv.style.backgroundColor = "#0F8C44";
          chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: ["blockLIST"],
          });
          chrome.tabs.reload(currtab.id);
        }
      }
    });
  });
});