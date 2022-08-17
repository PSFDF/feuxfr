const risklayers = ["risque-11-layer", "risque-06-layer", "risque-83-layer", "risque-04-layer", "risque-84-layer", "risque-2AB-layer", "risque-34-layer", "risque-30-layer", "risque-13-layer", "risque-aq-layer"];
const [windswitch, riskswitch, tempswitch] = [document.querySelector("#windswitch"), document.querySelector("#riskswitch"), document.querySelector("#tempswitch")];
const switchbtns = [windswitch, tempswitch, riskswitch];
const [temprule,windrule] = [document.querySelector("#tempbar"), document.querySelector("#windbar")];

windswitch.onchange = function() {
    if(windswitch.checked){
        map.setLayoutProperty('windlayer', 'visibility', 'visible');
        map.setLayoutProperty('templayer', 'visibility', 'none');
        tempswitch.checked = false;
        windrule.style.display = "flex";
    }
    else{
        map.setLayoutProperty('windlayer', 'visibility', 'none');
        windrule.style.display = "none";
        temprule.style.display = "none";
    }
}

tempswitch.onchange = function() {
    if(tempswitch.checked){
        map.setLayoutProperty('templayer', 'visibility', 'visible');
        map.setLayoutProperty('windlayer', 'visibility', 'none');
        windswitch.checked = false;
        temprule.style.display = "flex";
        windrule.style.display = "none";
    }
    else{
        map.setLayoutProperty('templayer', 'visibility', 'none');
        temprule.style.display = "none";
        windrule.style.display = "none";
    }
}

riskswitch.onchange = function() {
    if(riskswitch.checked){
        for(const i of risklayers){
            map.setLayoutProperty(i, 'visibility', 'visible');
        }
    }
    else{
        for(const i of risklayers){
            map.setLayoutProperty(i, 'visibility', 'none');
        }
    }
}