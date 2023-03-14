var browser = (window.browser) ? window.browser : window.chrome;
var url = window.location.hostname + window.location.pathname;
var last = url.slice(-1);

window.addEventListener("load", function () {
  setTimeout(function () {
    chrome.runtime.sendMessage({ 'speed': window.performance.getEntriesByType("navigation")[0].loadEventEnd});
  }, 0);
});

if (last != '/' && url != "secure.eicar.org/eicar.com.txt") {
  url = url + '/';
}
const malwareBlocklist = [
  'secure.eicar.org/eicar.com.txt/',
  'secure.eicar.org/eicar.com/',
  'maliciouswebsitetest.com/',
  'aiosetup.com/',
  'downloadhardware.com/',
  'www.amtso.org/check-desktop-phishing-page/',
  'amtso.eicar.org/PotentiallyUnwanted.exe/',
  'amtso.eicar.org/cloudcar.exe/',
  'www.ikarussecurity.com/wp-content/downloads/eicar_com.zip/'
];

const pageHeader = `
    h3{
      color:red;
    }
    body{
      background-color: lightblue !important;
      display:flex;
      align-items:center;
      justify-content:center;
      font-family: 'Segoe UI', Arial, Helvetica, 'Lucida Sans', sans-serif;
    }
    #info{
      display:flex;
      align-items:center;
      justify-content:center;
      flex-direction:column;
      background-color:white;
      border-radius:20px;
      padding:5px;
      word-wrap:break-word;
      width:450px;
      height:280px;
      position:absolute;
      top: 50%;
      left:50%;
      transform:translate(-50%,-50%);
      box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.16);;
    }
    #myPara{text-align:center;}
    #myPara2{font-size:75%;}
    #mailAnchor{text-decoration:none;}`;

function run() {
  malwareBlocklist.find(element => {
    if (element === url) {
      document.documentElement.innerHTML = '';

      var style = document.createElement('style');
      style.appendChild(document.createTextNode(pageHeader));

      var title = document.createElement('title');
      title.textContent = "RR Adblocker-Malware Protection";
      document.getElementsByTagName('head')[0].appendChild(title);
      document.getElementsByTagName('head')[0].appendChild(style);

      var myDiv = document.createElement("div");
      myDiv.setAttribute("id", "info");
      var h3 = document.createElement("h3");
      h3.textContent = "A dangerous website has been blocked";
      var infoPara = document.createElement("p");
      infoPara.setAttribute("id", "myPara");
      infoPara.textContent = "You were protected from visiting this website by RR Adblocker.";

      var p2 = document.createElement("p");
      p2.setAttribute("id", "myPara2");
      p2.textContent = "If this website has been wrongly blocked. Reach to us at: rutujrunwal001@gmail.com ";

      myDiv.appendChild(h3);
      myDiv.appendChild(infoPara);
      myDiv.appendChild(p2);

      document.body.appendChild(myDiv);
    }
  });
}

var scripts = document.getElementsByTagName("script");
var urlDataSet = new Set();
if (scripts.length != 0) {
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].src) {
      if (!scripts[i].src.includes(window.location.hostname) && !scripts[i].src.includes("bootstrap") && !scripts[i].src.includes("jsdelivr") && !scripts[i].src.includes("jquery") && !scripts[i].src.includes("static") && !scripts[i].src.includes("cloudfront") && !scripts[i].src.includes("recaptcha")) {
        urlDataSet.add(scripts[i].src.split("//")[1]);
      }
    }
  }
  if (urlDataSet.size == 0 && (!url.includes("localhost") && !url.includes("127"))) {
    urlDataSet.add("www.google-analytics.com/analytics.js");
  }
}
else {
  urlDataSet.add("www.google-analytics.com/analytics.js");
}

const urlData = [...urlDataSet];
chrome.runtime.sendMessage({'blockedItems':urlData});
var domain = document.location.hostname;
chrome.storage.sync.get('*', function (disabled) {
  if (disabled['*']) return;
  chrome.storage.sync.get(domain, function (disabled) {
    if (disabled[domain]) { return; }
    run();
  });
});