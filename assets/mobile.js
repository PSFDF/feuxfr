// Mobile only
document.querySelector("body > div.right-pan > div.rp-top").onclick = function() {
    if(window.outerWidth < 1462){
        if(document.querySelector("body > div.right-pan").style.bottom != '0px'){
            document.querySelector("body > div.right-pan").style.bottom = "0";
            document.querySelector("body > div.right-pan > div.rp-top > img").style.transform = "rotate(180deg)";
        } else{
            document.querySelector("body > div.right-pan").style.bottom = "-68vh";
            document.querySelector("body > div.right-pan > div.rp-top > img").style.transform = "rotate(359deg)";
        }
    }
};