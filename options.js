var modal = document.getElementById("modal");
var Savebtn = document.getElementById("save");
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
    if (useAdv) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: ["advLIST"]});}
    if (useAntiprn) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: ["antiprnLIST"]});}
    if (useSusp) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: ["suspLIST"]});}
    if (!useAdv) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: ["advLIST"]});}
    if (!useAntiprn) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: ["antiprnLIST"]});}
    if (!useSusp) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: ["suspLIST"]});}
}
advFilter.onclick = function () {
    if (advFilter.checked){modal.style.display = "block";}
}
var settings = document.querySelectorAll("input[type='checkbox']");

settings.forEach(element => {
    element.onchange = () =>{
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
                enableRulesetIds: ["advLIST"]});}
        if (items.antiPrnStat) {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                enableRulesetIds: ["antiprnLIST"]});}
        if (items.suspStat) {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                enableRulesetIds: ["suspLIST"]});}
        if (!items.advStat) {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                disableRulesetIds: ["advLIST"]});}
        if (!items.antiPrnStat) {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                disableRulesetIds: ["antiprnLIST"]});}
        if (!items.suspStat) {
            chrome.declarativeNetRequest.updateEnabledRulesets({
                disableRulesetIds: ["suspLIST"]});}
    });
    
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {modal.style.display = "none";}
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);