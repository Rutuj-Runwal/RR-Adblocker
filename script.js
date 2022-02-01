setInterval(function () {
    var skipButton = document.getElementsByClassName("ytp-ad-skip-button");
    
    if (skipButton != undefined && skipButton.length > 0) {
        console.log("AD DETECTED!");
        skipButton[0].click();
    }

}, 7);
// youtube.com##.ytp-ad-progress-list
window.addEventListener("load", function () {
    setInterval(() => {
        var companion = document.getElementById("player-ads");
        var homepgAd = document.getElementsByClassName("style-scope ytd-display-ad-renderer");
        if(companion!=undefined){
            companion.style.display = "none";
        }
        if (homepgAd != undefined && homepgAd.length != 0) {
            homepgAd[0].style.display = "none";
        }
    }, 700);
 });