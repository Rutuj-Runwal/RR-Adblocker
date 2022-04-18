var modal = document.getElementById("modal");
var btn = document.getElementById("myBtn");
var span = document.getElementById("close");
var advFilter = document.getElementById('useAdv');
var antiPrnFilter = document.getElementById('useAntiPrn');
var suspFilter = document.getElementById('useSuspBlock');

// Saves options to chrome.storage
function save_options() {
    var useAdv = document.getElementById('useAdv').checked;
    var useAntiprn = document.getElementById('useAntiPrn').checked;
    var useSusp = document.getElementById('useSuspBlock').checked;

    chrome.storage.sync.set({ advStat: useAdv, antiPrnStat: useAntiprn , suspStat:useSusp}, function () {
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
}

advFilter.onclick = function () {
    if (advFilter.checked) {
        modal.style.display = "block";
    }
}

function restore_options() {
    chrome.storage.sync.get(['advStat', 'antiPrnStat', 'suspStat'], function (items) {
        advFilter.checked = items.advStat;
        antiPrnFilter.checked = items.antiPrnStat;
        suspFilter.checked = items.suspStat;
    });
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

// https://adblock-tester.com/banners/pr_advertising_ads_banner.swf?v=1
// https://adblock-tester.com/banners/pr_advertising_ads_banner.gif
// https://adblock-tester.com/banners/pr_advertising_ads_banner.png