function sendMessage(nom, lieu, rapport) {
  const request = new XMLHttpRequest();
  request.open("POST", "");
  request.setRequestHeader('Content-type', 'application/json');
  const params = {
    username: "Feux.fr",
    avatar_url: "https://psfdf.org/wp-content/uploads/2022/07/273209284_625124282118585_6512330218269096924_n-removebg-preview.png",
    content: "",
    "embeds": [{
    "title": `Nouveau signalement par ${nom}`,
    "color": "14177041",
    "description": "",
    "fields": [
      {
        "name": "Lieu :",
        "value": `**${lieu}**`,
        "inline": true
      },
      {
        "name": "Rapport :",
        "value": `**${rapport}**`,
        "inline": true
      }]
    }]
}

  request.send(JSON.stringify(params));
}

var sendreport = document.getElementById("sendreport");
sendreport.onclick = function() {
  let [nom, lieu, rapport] = [document.querySelector("#name").value, document.querySelector("#location").value, document.querySelector("#desc").value];
  sendMessage(nom, lieu, rapport);
  document.querySelector("#tblinf").style.display = "none";
  document.querySelector("#greetsent").style.display = "revert";
}

function sendFeedback(lieu, etat){
  const nrequest = new XMLHttpRequest();
  nrequest.open("POST", "");
  nrequest.setRequestHeader('Content-type', 'application/json');
  const nparams = {
    username: "Feux.fr",
    avatar_url: "https://psfdf.org/wp-content/uploads/2022/07/273209284_625124282118585_6512330218269096924_n-removebg-preview.png",
    content: "",
    "embeds": [{
    "title": `Nouveau signalement`,
    "color": "14177041",
    "description": "",
    "fields": [
      {
        "name": "Lieu :",
        "value": `**${lieu}**`,
        "inline": true
      },
      {
        "name": "Etat :",
        "value": `**${etat}**`,
        "inline": true
      }]
    }]
  }
  nrequest.send(JSON.stringify(nparams));
}


var [feuxactif, feuxinact] = [document.getElementById("rp-b-act"), document.getElementById("rp-b-inact")];

feuxactif.onclick = function() {
  sendFeedback(document.querySelector("#rp-sub").innerHTML, "Actif");
  feuxactif.innerHTML = "Merci pour vos commentaires !";
  feuxactif.style.pointerEvents = "none";
  feuxinact.style.display = "none";
}

feuxinact.onclick = function() {
  sendFeedback(document.querySelector("#rp-sub").innerHTML, "Éteint");
  feuxinact.innerHTML = "Merci pour vos commentaires !";
  feuxinact.style.pointerEvents = "none";
  feuxactif.style.display = "none";
}