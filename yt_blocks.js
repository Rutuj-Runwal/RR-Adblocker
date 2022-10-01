// "tvcap" and "bottomads" are id's of ads in google's search
var Google_ResultAd = document.getElementById("tvcap");
var Google_ResultAdBottom = document.getElementById("bottomads");
var DDG_ResultAd = document.getElementById("ads");

if (Google_ResultAd != undefined && Google_ResultAd.length != 0) {
    console.log("DONE!");
    Google_ResultAd.style.display = "none";
}
if (Google_ResultAdBottom != undefined && Google_ResultAdBottom.length != 0) {
    Google_ResultAdBottom.style.display = "none";
}

if (DDG_ResultAd != undefined && DDG_ResultAd.length != 0) {
    DDG_ResultAd.style.display = "none";
}

setInterval(function () {
    var YT_skipButton = document.getElementsByClassName("ytp-ad-skip-button");

    if (YT_skipButton != undefined && YT_skipButton.length > 0) {
        console.log("AD DETECTED!");
        YT_skipButton[0].click();
    }
}, 7);

window.addEventListener("load", function () {
    var domain = document.location.hostname;
    setInterval(() => {
        var YT_companion = document.getElementById("player-ads");
        var YT_homepgAd = document.getElementsByClassName("style-scope ytd-display-ad-renderer");
        var YT_searchAd = document.getElementsByClassName("style-scope ytd-promoted-sparkles-text-search-renderer");
        var YT_overlayAd = document.getElementsByClassName('video-ads ytp-ad-module')[0];

        if (YT_companion != undefined) {
            YT_companion.style.display = "none";
        }
        if (YT_homepgAd != undefined && YT_homepgAd.length != 0) {
            YT_homepgAd[0].style.display = "none";
        }
        if (YT_searchAd != undefined && YT_searchAd.length != 0) {
            for (let i = 0; i < YT_searchAd.length; i++) {
                YT_searchAd[i].style.display = "none";
            }
        }

        if (YT_overlayAd != undefined && YT_overlayAd.length > 0) {
            console.log("OVERLAY DETECTED!");
            YT_overlayAd.style.display = "none";
        }

        var adUnbreak2 = document.getElementsByClassName("mrec-scrollable-cont");
        var adUnbreak4 = document.getElementsByClassName("clmb_eoa");
        if ((adUnbreak2 != undefined && adUnbreak2.length != 0) || (adUnbreak4 != undefined && adUnbreak4.length != 0)) {
            for (let i = 0; i < adUnbreak2.length; i++) {
                adUnbreak2[i].style.display = "none";
            }
            for (let i = 0; i < adUnbreak4.length; i++) {
                adUnbreak4[i].style.display = "none";
            }
        }

        // When some advertising domains are blocked, webpages can contain empty div's where the advertisment
        // was supposed to be displayed, the below lines hide those empty containers and make page formatting better.
        // The below code runs when the shield's are turned on by the user
        try {
            if (!window.location.hostname.includes("crunchyroll")){
            var addepthLimit = 3;
            chrome.storage.sync.get('*', function (disabled) {
                if (disabled['*']) return;
                chrome.storage.sync.get(domain, function (disabled) {
                    if (disabled[domain]) return;
                    else {
                        document.querySelectorAll('[class*="advertisement"]').forEach(el => {
                            var collection = el.children;
                            var flag = true;
                            if (collection.length <= addepthLimit) {
                                for (var i = 0; i < collection.length; i++) {
                                    // console.log(collection[i].children.length);
                                    if (collection[i].children) {
                                        if (collection[i].children.length > addepthLimit) {
                                            flag = false;
                                        }
                                    }
                                }
                                if (flag) {
                                    console.log(el);
                                    el.remove();
                                }
                            }});
                        document.querySelectorAll('[id*="advertisement"]').forEach(el => { 
                            var collection = el.children;
                            var flag = true;
                            if (collection.length <= addepthLimit) {
                                for (var i = 0; i < collection.length; i++) {
                                    // console.log(collection[i].children.length);
                                    if (collection[i].children) {
                                        if (collection[i].children.length > addepthLimit) {
                                            flag = false;
                                        }
                                    }
                                }
                                if (flag) {
                                    console.log(el);
                                    el.remove();
                                }
                            }
                         });

                        document.querySelectorAll('[class^="ads-"]').forEach(el => {
                            var collection = el.children;
                            var flag = true;
                            if (collection.length <= addepthLimit) {
                                for (var i = 0; i < collection.length; i++) {
                                    // console.log(collection[i].children.length);
                                    if (collection[i].children) {
                                        if (collection[i].children.length > addepthLimit) {
                                            flag = false;
                                        }
                                    }
                                }
                                if (flag) {
                                    console.log(el);
                                    el.remove();
                                }
                            }
                        });
                        document.querySelectorAll('[class^="ads_"]').forEach(el => { 
                            var collection = el.children;
                            var flag = true;
                            if (collection.length <= addepthLimit) {
                                for (var i = 0; i < collection.length; i++) {
                                    // console.log(collection[i].children.length);
                                    if (collection[i].children) {
                                        if (collection[i].children.length > addepthLimit) {
                                            flag = false;
                                        }
                                    }
                                }
                                if (flag) {
                                    console.log(el);
                                    el.remove();
                                }
                            }
                        });

                        document.querySelectorAll('[class^="ad-"]').forEach(el => { 
                            var collection = el.children;
                            var flag = true;
                            if (collection.length <= addepthLimit) {
                                for (var i = 0; i < collection.length; i++) {
                                    // console.log(collection[i].children);
                                    if(collection[i].children){
                                        if(collection[i].children.length>addepthLimit){
                                            flag = false;
                                        }
                                    }
                                }
                                if(flag){
                                    console.log(el);
                                    el.remove();
                                }
                            }
                        });
                        document.querySelectorAll('[class^="ad_"]').forEach(el => { 
                            var collection = el.children;
                            var flag = true;
                            if (collection.length <= addepthLimit) {
                                for (var i = 0; i < collection.length; i++) {
                                    // console.log(collection[i].children.length);
                                    if (collection[i].children) {
                                        if (collection[i].children.length > addepthLimit) {
                                            flag = false;
                                        }
                                    }
                                }
                                if (flag) {
                                    console.log(el);
                                    el.remove();
                                }
                            }
                         });

                        document.querySelectorAll('[class$="_ads"]').forEach(el => { 
                            var collection = el.children;
                            var flag = true;
                            if (collection.length <= addepthLimit) {
                                for (var i = 0; i < collection.length; i++) {
                                    // console.log(collection[i].children.length);
                                    if (collection[i].children) {
                                        if (collection[i].children.length > addepthLimit) {
                                            flag = false;
                                        }
                                    }
                                }
                                if (flag) {
                                    console.log(el);
                                    el.remove();
                                }
                            }
                         });
                        document.querySelectorAll('[class$="-ads"]').forEach(el => { 
                            var collection = el.children;
                            var flag = true;
                            if (collection.length <= addepthLimit) {
                                for (var i = 0; i < collection.length; i++) {
                                    // console.log(collection[i].children.length);
                                    if (collection[i].children) {
                                        if (collection[i].children.length > addepthLimit) {
                                            flag = false;
                                        }
                                    }
                                }
                                if (flag) {
                                    console.log(el);
                                    el.remove();
                                }
                            }
                         });

                        document.querySelectorAll('[class$="-ad"]').forEach(el => { 
                            var collection = el.children;
                            var flag = true;
                            if (collection.length <= addepthLimit) {
                                for (var i = 0; i < collection.length; i++) {
                                    // console.log(collection[i].children.length);
                                    if (collection[i].children) {
                                        if (collection[i].children.length > addepthLimit) {
                                            flag = false;
                                        }
                                    }
                                }
                                if (flag) {
                                    console.log(el);
                                    el.remove();
                                }
                            }
                         });
                        document.querySelectorAll('[class$="_ad"]').forEach(el => { 
                            var collection = el.children;
                            var flag = true;
                            if (collection.length <= addepthLimit) {
                                for (var i = 0; i < collection.length; i++) {
                                    // console.log(collection[i].children.length);
                                    if (collection[i].children) {
                                        if (collection[i].children.length > addepthLimit) {
                                            flag = false;
                                        }
                                    }
                                }
                                if (flag) {
                                    console.log(el);
                                    el.remove();
                                }
                            }
                         });

                        document.querySelectorAll('[class*="adsbygoogle"]').forEach(el => { 
                            var collection = el.children;
                            var flag = true;
                            if (collection.length <= addepthLimit) {
                                for (var i = 0; i < collection.length; i++) {
                                    // console.log(collection[i].children.length);
                                    if (collection[i].children) {
                                        if (collection[i].children.length > addepthLimit) {
                                            flag = false;
                                        }
                                    }
                                }
                                if (flag) {
                                    console.log(el);
                                    el.remove();
                                }
                            }
                         });
                        document.querySelectorAll('[id*="adsbygoogle"]').forEach(el => {
                            var collection = el.children;
                            var flag = true;
                            if (collection.length <= addepthLimit) {
                                for (var i = 0; i < collection.length; i++) {
                                    // console.log(collection[i].children.length);
                                    if (collection[i].children) {
                                        if (collection[i].children.length > addepthLimit) {
                                            flag = false;
                                        }
                                    }
                                }
                                if (flag) {
                                    console.log(el);
                                    el.remove();
                                }
                            }
                         });
                    }
                });
            });
        }
        } catch (err) {
            console.log(err);
        }
        
    }, 700);
});