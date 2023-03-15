<h1 align="center">
    <sub>
      <img  src="https://github.com/Rutuj-Runwal/RR-Adblocker/blob/main/RR_logo.png?raw=true" height="45" width="45" style="border-raduis:20%">
    </sub>
    RR Adblocker
  </h1>
  <p align="center">
    An efficient blocker add-on for various browsers! Fast, Robust and Open-Source.
  </p>

<p align="center">
<a href="https://bit.ly/rradb_chrome"><img src="https://raw.githubusercontent.com/Rutuj-Runwal/RR-Adblocker/main/assets/chrome.png" alt="RR Adblocker for Chrome"></a>
<a href="https://bit.ly/rr-adblocker_microsoft-edge"><img src="https://raw.githubusercontent.com/Rutuj-Runwal/RR-Adblocker/main/assets/edge.png" alt="Get RR Adblocker for Microsoft Edge"></a>
<a href="https://mzl.la/3BhY6C9"><img src="https://raw.githubusercontent.com/Rutuj-Runwal/RR-Adblocker/main/assets/firefox.png" alt="Get RR Adblocker for Firefox"></a> 
</p>

## FAQ

### What is RR Adblocker?
RR Adblocker is the world's first free and open-source browser extension based on Manifest V3 that blocks ads and trackers to make your web surfing faster and safer. 

### What are Advanced Filters?
Advanced filters are advanced tracking protection mechanisms that employ new technologies such as regular expression based filtering and will soon apply deeplearning based classification to enhance privacy by blocking and limiting modern tracking methods
These filters provide a higher level of privacy but are experimental and should be disabled if you are having issues with any website.

### What is Page Load Speed(PGL/PGS)?
Page load time is the time it takes for a page to load, measured from navigation start to the start of the load event.
<br>
We use the new [Navigation Timing Level 2](https://w3c.github.io/navigation-timing/) interface to measure the page loading speeds and deploy several techniques to optimize the page loading speeds for fast browsing experience.

### Why is page load speed value different for the same website?
RR Adblocker(when enabled) optimizes page loading speeds and there is a measurable difference between RR Adblocker off vs on speeds.Users will experience a faster browser experience with quick load times. According to MDN, page loading speeds can vary greatly between users depending on device capabilities, network conditions, and, to a lesser extent, distance from the server. [[Reference]](https://w3c.github.io/navigation-timing/)
<br>
Regardless of the conditions RR Adblocker provides an optimized experience

### On X website, why is the PGL value better when the extension is off?
On some dynamically loading websites the on vs off speeds may be similar due to their dynamic loading nature and caching of resources.This is optimal as RR Adblocker perofrms additional processing to block trackers and ads.

### What is Adult Content Blocking(ACB)?
ACB is aimed towards blocking NSFW content including but not limited to Images,Videos,iframe embeds,GIF's using regular expression and will soon apply Natural Language Processing(NLP) based detection and blocking.

### What is Suspicious Domain Blocker?
Suspicious Domain Blocker blocks suspicious Top-Level Domains that are suspected of malicious activity.

### How Suspicious Domain Blocking works?
The current implementation of Suspicious domain blocking blocks TLD's based on inferences from a dataset with over 10,000+ malicious urls gathered from across the globe sorted on the basis of highest occurence of malware.
<br>
[Inference 1](https://unit42.paloaltonetworks.com/top-level-domains-cybercrime/)
<br>
[Inference 2](https://www.spamhaus.org/statistics/tlds/)
<br>
Suspicious domain blocking will soon employ tensorflow based classification for detecting and blocking suspicious urls.
<br>
[Deeplearning Based Classification](https://www.kaggle.com/code/kawiswara/malicious-web-detection-with-1d-cnn)
<br>
[Reference](https://www.kaggle.com/code/siddharthkumar25/detect-malicious-url-using-ml/notebook)
  
### How does quick fix works?
RR Adblocker applies dynamic quick fix rules fetched directly from host on a click of a button. These dynamic rules can provide easy and quick fixes for any sites breakage.
If you are stiil facing issues with a website please create a github issue or report here via chrome webstore: [Click Here](https://chrome.google.com/webstore/detail/rr-adblocker/chnhdkklhnokmmcklomnlcmcdbdiaemp/support)
