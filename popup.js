var disabled = {};
var myShield = document.getElementById("site_link");
var indvShield = document.getElementById("individualShields");
var showDomainDiv = document.getElementById("showDomain");
var statsCount = document.getElementById("showStatistics");
var optionsSetting = document.getElementById("Openoptions");
var ticks = document.querySelectorAll(".tick");
var crosses = document.querySelectorAll(".cross");
var speedDiv = document.getElementById("pgLoadSpeed");
var acc = document.getElementById("accordion")
var panel = document.getElementById("panel");

acc.addEventListener("click", function () {
  this.classList.toggle("active");
  if (panel.style.display === "block") {
    panel.style.display = "none";
  } else {
    panel.style.display = "block";
  }
});

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
        speedDiv.style.color = "#087034";
        chrome.declarativeNetRequest.updateEnabledRulesets({
          enableRulesetIds: ["blockLIST"],
        });
      }
      else {
        if (disabled[domain]) { // Disable Blocking
          myShield.checked = false;
          showDomainDiv.style.backgroundColor = "#2196F3";
          speedDiv.style.color = "#ED1B24";
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
          speedDiv.style.color = "#087034";
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
    var table = document.getElementById("blockedDomains");
    for (let i = 0; i < impUrlArray.length; i++) {
      var row = table.insertRow(table.rows.length);
      var cellData = row.insertCell(0);
      cellData.innerText = impUrlArray[i];
    }
  }
});
chrome.storage.local.get(['loadSpeed'], (result)=>{
  if(result.loadSpeed !=undefined){
    speedDiv.innerText = Number.parseFloat(result.loadSpeed/1000).toFixed(2) + " secs";
  }
})

myShield.addEventListener("change", function () {
  speedDiv.innerText = "Calculating...";
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
        speedDiv.style.color = "#087034";
        chrome.declarativeNetRequest.updateEnabledRulesets({
          enableRulesetIds: ["blockLIST"],
        });
      }
      else{
        if (disabled[domain]==true){ // Disable Blocking
          myShield.checked = false;
          indvShield.classList.add("pause");
          crosses.forEach(cross => {
            cross.classList.remove("hideNDisable");
          });
          ticks.forEach(tick => {
            tick.classList.add("hideNDisable");
          });
          showDomainDiv.style.backgroundColor = "#2196F3";
          speedDiv.style.color = "#ED1B24";
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
          speedDiv.style.color = "#087034";
          chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: ["blockLIST"],
          });
          chrome.tabs.reload(currtab.id);
        }
      }
    });
  });
  chrome.storage.local.onChanged.addListener((changes, namespace) => {
    if (changes?.loadSpeed?.newValue) {
      setTimeout(() => {
        speedDiv.innerText = Number.parseFloat(changes.loadSpeed.newValue/1000).toFixed(2) + " secs";
      }, 500);
    }
  });
});