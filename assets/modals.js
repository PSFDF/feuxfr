// Report modal

var repmodal = document.getElementById("reportModal");
var repbtn = document.getElementById("openReport");
var repspan = document.getElementById("closeRepBtn");
repbtn.onclick = function() {
  repmodal.style.display = "block";
}
repspan.onclick = function() {
  repmodal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == repmodal) {
    repmodal.style.display = "none";
    console.log("ouais");
  }
}

// About modal

var abmodal = document.getElementById("aboutModal");
var abbtn = document.getElementById("openAbout");
var abspan = document.getElementById("closeBtn");
abbtn.onclick = function() {
  abmodal.style.display = "block";
}
abspan.onclick = function() {
  abmodal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == abmodal) {
    abmodal.style.display = "none";
  }
}