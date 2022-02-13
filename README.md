[![Commit rate](https://img.shields.io/github/commit-activity/m/Rutuj-Runwal/RR-Adblocker?label=Commits)](https://github.com/Rutuj-Runwal/RR-Adblocker/commits/master)
[![License](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://github.com/Rutuj-Runwal/RR-adblocker/blob/master/LICENSE)
<!-- [![Mozilla Add-ons](https://img.shields.io/amo/rating/rr-adblocker?label=Firefox)](https://addons.mozilla.org/firefox/addon/rr-adblocker/) -->

*** 
  <h1 align="center">
    <sub>
      <img  src="https://github.com/Rutuj-Runwal/RR-Adblocker/blob/main/RR_logo.png?raw=true" height="45" width="45" style="border-raduis:20%">
    </sub>
    RR Adblocker
  </h1>
  <p align="center">
    An efficient blocker add-on for various browsers! Fast, Robust and Open-Source.
  </p>

***

<p align="center">
<a href="https://addons.mozilla.org/firefox/addon/rr-adblocker/"><img src="https://raw.githubusercontent.com/Rutuj-Runwal/RR-Adblocker/main/Assests/firefox.png" alt="Get RR Adblocker for Firefox Today!"></a> 
</p>

***

RR Adblocker is a an open-source browser extension that blocks ads and trackers to make your web surfing faster and safer.
Out of the box, the extension blocks ads, trackers and malware sites and is powered by [_EasyList_](https://easylist.github.io/#easylist), [_EasyPrivacy_](https://easylist.github.io/#easyprivacy), [_Online Malicious URL Blocklist_](https://gitlab.com/curben/urlhaus-filter#urlhaus-malicious-url-blocklist)

## Installation Instructions
- Download/clone this repo as a [ZIP file from GitHub](https://github.com/Rutuj-Runwal/RR-Adblocker/archive/refs/heads/main.zip) and extract it to a folder
- In Chrome go to the extensions page (`chrome://extensions`).
- Enable Developer Mode(If not enabled already)
- Click on "Load Unpacked" and choose the folder where you extracted this repo 
- Pin the extension and enable the shields
- Done, Enjoy your experience!

![User iterface](https://github.com/Rutuj-Runwal/RR-Adblocker/blob/main/Assests/1.png)

## Features Include:
- Trackers Blocking
- Adverts Blocking
- Malware Protection[BETA]
- Phishing Protectiong[BETA]


### Advert and Trackers blocking

To test the advert and trackers blocking feature head over to any website of your choice that contains ads.
Here we have used https://www.speedtest.net/ to demonstrate

#### When the extension is enabled
![Ads Blocked](https://raw.githubusercontent.com/Rutuj-Runwal/RR-Adblocker/main/Assests/3.png)

#### When the extension is disabled
![Ads visible](https://raw.githubusercontent.com/Rutuj-Runwal/RR-Adblocker/main/Assests/7.png)

#### Malware Blocking

For the purpose of this demo we have used EICAR Official site: https://secure.eicar.org/eicar.com.txt
When the extension is enabled the site is blocked. 

![Malware Blocking](https://raw.githubusercontent.com/Rutuj-Runwal/RR-Adblocker/main/Assests/5.png)

Disable the extension and visit the same site! (Disclamer: The EICAR site is "safe" but we recommend you to keep Malware protection turned on!)


## References:
- Chrome Docs: [Extension Ref](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/)
- Ad blocking: [EasyList](https://easylist.to/)
- Trackers Blocking: [Fnb](https://secure.fanboy.co.nz/)
- Malware Blocking: [UrlHaus](https://gitlab.com/curben/urlhaus-filter)
- HTTPS upgrade: [EFF](https://github.com/EFForg/https-everywhere/tree/master/docs)
