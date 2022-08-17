// Mobile values
if(window.outerWidth < 1462){
var zoombar = 4.3;
var minzoom = 4;
} else {
var zoombar = 5;
var minzoom = 5;
}

//Initalizing risk
const fondCarteDep = {
  "risque-06": './assets/fondcartedep/alpesmaritimes.geojson',
  "risque-83": './assets/fondcartedep/var.geojson',
  "risque-04": './assets/fondcartedep/alpeshautesprovence.geojson',
  "risque-84": './assets/fondcartedep/vaucluse.geojson',
  "risque-2AB": './assets/fondcartedep/corse.geojson',
  "risque-34": './assets/fondcartedep/herault.geojson',
  "risque-30": './assets/fondcartedep/gard.geojson',
  "risque-13": './assets/fondcartedep/bouchesdurhone.geojson',
  "risque-aq": './assets/fondcartedep/aquitaine.geojson',
  "risque-11": './assets/fondcartedep/aude.geojson'
};

const RiskLayers = {
  'risque-06-layer': [{source: 'risque-06'}, {property: 'level'}, {stops: [[1, '#22b14c'], [2, '#ffff80'], [3, '#ff854a'], [4, '#ff3e3e']]}],
  'risque-83-layer': [{source: 'risque-83'}, {property: 'level'}, {stops: [[1, '#22b14c'], [2, '#ffff80'], [3, '#ff854a'], [4, '#ff3e3e']]}],
  'risque-04-layer': [{source: 'risque-04'}, {property: 'level'}, {stops: [[2, '#22b14c'], [3, '#ffff80'], [4, '#ff854a'], [5, '#ff3e3e']]}],
  'risque-84-layer': [{source: 'risque-84'}, {property: 'level'}, {stops: [[0, '#c8da6e'], [1, '#ffff80'], [2, '#ff3e3e'], [3, '#ff3e3e']]}],
  'risque-2AB-layer': [{source: 'risque-2AB'}, {property: 'level'}, {stops: [[1, '#ffff80'], [2, '#ff854a'], [3, '#ff3e3e']]}],
  'risque-34-layer': [{source: 'risque-34'}, {property: 'level'}, {stops: [[1, '#22b14c'], [2, '#ffff80'], [3, '#ff854a'], [4, '#ff3e3e']]}],
  'risque-30-layer': [{source: 'risque-30'}, {property: 'level'}, {stops: [[1, '#22b14c'], [2, '#ffff80'], [3, '#ff854a'], [4, '#ff3e3e']]}],
  'risque-13-layer': [{source: 'risque-13'}, {property: 'Niveau'}, {stops: [[0, '#22b14c'], [1, '#ffff80'], [2, '#ff3e3e']]}],
  'risque-aq-layer': [{source: 'risque-aq'}, {property: 'level'}, {stops: [[0, '#22b14c'], [1, '#ffff80'], [2, '#ff854a'], [3, '#ff3e3e'], [4, '#000000']]}],
  'risque-11-layer': [{source: 'risque-11'}, {property: 'level'}, {stops: [[1, '#22b14c'], [2, '#ffff80'], [3, '#ff854a'], [4, '#ff3e3e']]}]
};


// Initializing the map
mapboxgl.accessToken = '';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [2.8222, 46.7379825],
  attributionControl: false,
  zoom: zoombar,
  maxZoom: 10,
  minZoom: minzoom
});

map.loadImage(
  './img/marker_red.png',
  (error, image) => {
  if (error) throw error;
     map.addImage('icon-red', image);
});

map.loadImage(
  './img/marker_orange.png',
  (error, image) => {
  if (error) throw error;
     map.addImage('icon-orange', image);
});

map.loadImage(
  './img/marker_green.png',
  (error, image) => {
  if (error) throw error;
     map.addImage('icon-green', image);
});

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: 'https://docs.google.com/spreadsheets/d/1JnJOxYN6d55uoKXfFKBAbqNegqHXYkI8sERVcZAOgqI/gviz/tq?tqx=out:csv&sheet=FeuxDB',
    dataType: "text",
    success: function (csvData) { makeGeoJSON(csvData); },
    error: function(err){console.log(err)}
  })});

  function makeGeoJSON(csvData) {
    csv2geojson.csv2geojson(csvData, {
      latfield: 'latitude',
      lonfield: 'longitude',
      delimiter: ','
    }, function (err, data) {
      map.on('load', function () {

      for (const [key, value] of Object.entries(fondCarteDep)) {
          map.addSource(key, {
              type: 'geojson',
              data: value
            });
      }

      for (const [key, value] of Object.entries(RiskLayers)) {
        map.addLayer({
          'id': key,
          'type': 'fill',
          'source': value[0].source,
          'paint': {
              'fill-color': {
              property: value[1].property.toString(),
              stops: Array.from(value[2].stops),
              },
              'fill-opacity': 0.3
          }         
          });  
      }
   
        map.addLayer({
          "id": "windlayer",
          "type": "raster",
          "layout" : {"visibility": 'none'},
          "source": {
            "type": "raster",
            "tiles": ["https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid="],
            "tileSize": 256
          },
          "minzoom": 0,
          "maxzoom": 22
        });

        map.addLayer({
          "id": "templayer",
          "type": "raster",
          "layout" : {"visibility": 'none'},
          "source": {
            "type": "raster",
            "tiles": ["https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid="],
            "tileSize": 256
          },
          "minzoom": 0,
          "maxzoom": 22
        });  

        map.addLayer({
          'id': 'csvData',
          'type': 'symbol',
          'source': {
            'type': 'geojson',
            'data': data
          },
          'layout': {
            'icon-image': [
              'match',
              ['get', 'type'],
              'Feu en cours',
              'icon-red',
              'Feu fixé',
              'icon-orange',
              'Feu circonscrit',
              'icon-green',
              'icon-red'
              ],
            'icon-size': 0.85,
            "icon-allow-overlap": true
            },
        });

        var bbox = turf.bbox(data);
        map.fitBounds(bbox, { padding: 110 });

      });

    });
  };

map.on('click', 'csvData', function (e) {
  var coordinates = e.features[0].geometry.coordinates.slice();
  document.querySelector("body > div.right-pan > div.rp-top > a.rp-title").innerHTML = e.features[0].properties.type;
  document.querySelector("#rp-sub").innerHTML = "à " + e.features[0].properties.commune;
  document.querySelector("body > div.right-pan > div.rp-content > span").innerHTML = e.features[0].properties.source;
  document.querySelector("body > div.right-pan > div.rp-content > img").src = e.features[0].properties.image;
  document.querySelector("#landinginfos").style.display = "none";

  if(e.features[0].properties.datesignalement){
    document.querySelector("#datesignalement").style.display = "revert";
    document.querySelector("#nodatayet").style.display = "none";
    document.querySelector("#datesignalement").innerHTML = "<b>Date de signalement</b><br>"+ e.features[0].properties.datesignalement + "<br><br>";
  }else
  document.querySelector("#datesignalement").innerHTML = "";
  
  if(e.features[0].properties.moyensengages){
    document.querySelector("#moyensengages").style.display = "revert";
    document.querySelector("#nodatayet").style.display = "none";
    document.querySelector("#moyensengages").innerHTML = "<b>Moyens engagés</b><br>"+ e.features[0].properties.moyensengages + "<br><br>";
  }else
  document.querySelector("#moyensengages").innerHTML = "";

  if(e.features[0].properties.surfacebrulee){
    document.querySelector("#surfacebrulee").style.display = "revert";
    document.querySelector("#nodatayet").style.display = "none";
    document.querySelector("#surfacebrulee").innerHTML = "<b>Surface brûlée</b><br>"+ e.features[0].properties.surfacebrulee + "<br><br>";
  }else
  document.querySelector("#surfacebrulee").innerHTML = "";

  if(e.features[0].properties.conditionmeteo){
    document.querySelector("#conditionmeteo").style.display = "revert";
    document.querySelector("#nodatayet").style.display = "none";
    document.querySelector("#conditionmeteo").innerHTML = "<b>Conditions météo</b><br>"+ e.features[0].properties.conditionmeteo + "<br><br>";
  }else
  document.querySelector("#conditionmeteo").innerHTML = "";

  if(e.features[0].properties.autresinfos){
    document.querySelector("#autresinfos").style.display = "revert";
    document.querySelector("#nodatayet").style.display = "none";
    document.querySelector("#autresinfos").innerHTML = "<b>Autres informations</b><br>"+ e.features[0].properties.autresinfos + "<br><br>";
  }else
  document.querySelector("#autresinfos").innerHTML = "";
  
  if(!(e.features[0].properties.datesignalement)|| !(e.features[0].properties.moyensengages) || !(e.features[0].properties.surfacebrulee) || !(e.features[0].properties.conditionmeteo) || !(e.features[0].properties.autresinfos)){
    document.querySelector("#nodatayet").style.display = "none";
  }
  if(window.outerWidth < 1462){
    document.querySelector("body > div.right-pan").style.bottom = "0";
    document.querySelector("body > div.right-pan > div.rp-top > img").style.transform = "rotate(180deg)";
  }
  //Make the pop-up visible
  if(document.querySelector("body > div.right-pan").style.visibility != "visible"){
    document.querySelector("body > div.right-pan").style.visibility = "visible";
  }
  var description = `<h3>` + e.features[0].properties.type + `</h3>` + `<h4>` + `<b>` + `Commune : ` + `</b>` + e.features[0].properties.commune + `</h4>` + `<h4>` + `<b>` + `Source : ` + `</b>` + e.features[0].properties.source + `</h4>`;
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
  new mapboxgl.Popup()
    .setLngLat(coordinates)
    //.setHTML(description)
    .addTo(map);
});

map.on('mouseenter', 'csvData', function () {
  map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'places', function () {
  map.getCanvas().style.cursor = '';
});

map.on('wheel', (e) => {
  if(document.querySelector("body > div.right-pan").style.visibility = "visible"){
    document.querySelector("body > div.right-pan").style.opacity = "0.4";
  }
});        

map.on('movestart', (e) => {
  if(document.querySelector("body > div.right-pan").style.visibility = "visible"){
    if(window.outerWidth < 1462){
      //document.querySelector("body > div.right-pan > div.rp-content > img").style.transition = "0s";
      document.querySelector("body > div.right-pan > div.rp-top > img").style.transform = "rotate(359deg)";
      document.querySelector("body > div.right-pan").style.bottom = "-68vh";
      //document.querySelector("body > div.right-pan > div.rp-buttons > a").style.transition = "0s";
    }else{
    document.querySelector("body > div.right-pan").style.opacity = "0.4";
    }
  }
});

map.on('moveend', (e) => {
  if(document.querySelector("body > div.right-pan").style.visibility){
    document.querySelector("body > div.right-pan").style.visibility = "visible";
    document.querySelector("body > div.right-pan").style.opacity = "1";
  }
});


map.on('idle', () => {
  document.querySelector("#load-scr").style.display = "none";
  console.log('Map charged');
});