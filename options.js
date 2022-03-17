var modal = document.getElementById("modal");
var btn = document.getElementById("myBtn");
var span = document.getElementById("close");
var advFilter = document.getElementById('useAdv');
var antiPrnFilter = document.getElementById('useAntiPrn')

// Saves options to chrome.storage
function save_options() {
    var useAdv = document.getElementById('useAdv').checked;
    var useAntiprn = document.getElementById('useAntiPrn').checked;
    chrome.storage.sync.set({advStat:useAdv , antiPrnStat:useAntiprn}, function () {
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
    chrome.storage.sync.get(['advStat','antiPrnStat'], function (items) {
        advFilter.checked = items.advStat;
        antiPrnFilter.checked = items.antiPrnStat;
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
document.getElementById('save').addEventListener('click',
    save_options);