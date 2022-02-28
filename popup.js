var browser = (window.browser) ? window.browser : window.chrome;
var site_link = document.getElementById('site_link');
var domain = '???';
var disabled = {};

function toggleSiteLink() {
    var action = disabled[domain] ? false : true;
    site_link.checked = action;
}

function runInTab(fn) {
    var options = { 'active': true, 'windowId': browser.windows.WINDOW_ID_CURRENT };
    browser.tabs.query(options, function (tabs) { fn(tabs[0]); });
}

runInTab(function (tab) {
    browser.storage.sync.get('*', function (result) {
        disabled['*'] = result['*'] == true;
        if (!disabled['*']) {
            domain = tab.url.split('/')[2];
            browser.storage.sync.get(domain, function (result) {
                disabled[domain] = result[domain] == true;
                toggleSiteLink();
            })
        }
    })
});

site_link.addEventListener("change", function () {
    toggle(domain);
});

function reload() {
    runInTab(function (tab) {
        browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            browser.tabs.reload(tabs[0].id);
        });
    });
}

function toggle(target) {
    disabled[target] = disabled[target] != true;
    browser.storage.sync.set(disabled, function () {
        if (browser.runtime.lastError) {
            browser.storage.sync.clear(function () {
                browser.storage.sync.set(disabled, function () {
                    reload();
                });
            });
        } else {
            reload();
        }
    });
}