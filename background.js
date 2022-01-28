const defaultFilters = [
    "*://*.doubleclick.net/*",
    "*://partner.googleadservices.com/*",
    "*://*.googlesyndication.com/*",
    "*://*.google-analytics.com/*",
    "*://creative.ak.fbcdn.net/*",
    "*://*.adbrite.com/*",
    "*://*.exponential.com/*",
    "*://*.quantserve.com/*",
    "*://*.scorecardresearch.com/*",
    "*://*.zedo.com/*",
    "*://*.amazon-adsystem.com/*",
    "*://*.evidon.com/*",
    "*://*.googletagmanager.com/*",
    "*://*.hs-analytics.net/*",
    "*://analytics.twitter.com/*",

]

chrome.webRequest.onBeforeRequest.addListener(
    function (details) { return { cancel: true } },
    { urls: defaultFilters },
    ["blocking"]
)