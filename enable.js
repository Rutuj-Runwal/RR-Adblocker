window.addEventListener("load",function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var table = document.getElementById("blockedDomains");
        currtab = tabs[0];
        currtabID = tabs[0].id;
        chrome.storage.local.get(['tabIDStr'], function (result) {
            var impUrlArray = result.tabIDStr;
            if(impUrlArray!=undefined){
                for (let i = 0; i < impUrlArray.length; i++) {
                        var row = table.insertRow(table.rows.length);
                        var cellData = row.insertCell(0);
                        cellData.innerText = impUrlArray[i];
                }
            }
        });
    });
});
