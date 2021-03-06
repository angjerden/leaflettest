/**
 * Created by anders on 16.10.14.
 */
var mapLat = 58.825;
var mapLon = 5.72;

var map = L.map('map').setView([mapLat, mapLon], 12);

var geonorge_wms = "http://wms.geonorge.no/skwms1/wms.topo2.graatone?"

// Selected ambient Layers from GeoNorge Topografisk Norgeskart Gråtone
var hoydelag = 'N5000Hoydelag,N2000Hoydelag,N1000Hoydelag,N500Hoydelag,N250Hoydelag';
var arealdekkeflate = "N5000Arealdekkeflate,N2000Arealdekkeflate,N1000Arealdekkeflate,N500Arealdekkeflate,N250Arealdekkeflate,N50Arealdekkeflate,fkb_ar5,fkb_arealbruk";
//var administrative_grenser = "N5000AdministrativeGrenser,N2000AdministrativeGrenser,N1000AdministrativeGrenser,N500AdministrativeGrenser,N250AdministrativeGrenser,N50AdministrativeGrenser";
var administrative_grenser = "AdministrativeGrenser";

var geonorge_layer = L.tileLayer.wms(geonorge_wms, {
    layers: "topo2_graatone_WMS",
    format: 'image/png',
    transparent: true,
    attribution: "Copyright Statens kartverk 2007"
});

map.addLayer(geonorge_layer);

var marker = L.marker([mapLat, mapLon]).addTo(map);

var circle = L.circle([mapLat, mapLon - 0.02], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2
}).addTo(map);

var polygon = L.polygon([
    [mapLat + 0.01, mapLon + 0.022],
    [mapLat + 0.002, mapLon + 0.012],
    [mapLat - 0.005, mapLon + 0.025]
]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup()
    .setLatLng([mapLat + 0.03, mapLon - 0.06])
    .setContent("I am a standalone popup.")
    .openOn(map);

map.on('click', onMapClick);

var clickPopup = L.popup();

function onMapClick(e) {
    clickPopup.setLatLng(e.latlng)
        .setContent("You clicked at " + e.latlng.toString())
        .openOn(map);
}

/*
var greenIcon = L.icon({
    iconUrl: 'img/leaf-green.png',
    shadowUrl: 'img/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([mapLat + 0.011, mapLon + 0.014], {icon: greenIcon}).addTo(map);
*/

var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: 'img/leaf-shadow.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});

var greenIcon = new LeafIcon({iconUrl: 'img/leaf-green.png'}),
    redIcon = new LeafIcon({iconUrl: 'img/leaf-red.png'}),
    orangeIcon = new LeafIcon({iconUrl: 'img/leaf-orange.png'});

L.icon = function (options) {
    return new L.Icon(options);
};

L.marker([mapLat + 0.021, mapLon + 0.024], {icon: greenIcon}).addTo(map).bindPopup("I am a green leaf.");
L.marker([mapLat + 0.021, mapLon - 0.024], {icon: redIcon}).addTo(map).bindPopup("I am a red leaf.");
L.marker([mapLat - 0.021, mapLon - 0.024], {icon: orangeIcon}).addTo(map).bindPopup("I am an orange leaf.");

var homeFeature = {
    "type": "Feature",
    "properties": {
        "name": "Home",
        "popupContent": "And at that moment, I knew what I wanted to be when I grew up!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [5.74218, 58.82747]
    }
};

var geoJsonStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

var myLines = [{
    "type": "LineString",
    "coordinates": [[5.72, 58.825], [5.74, 58.827], [5.70, 58.820]]
}, {
    "type": "LineString",
    "coordinates": [[5.72, 58.830], [5.73, 58.830], [5.72, 58.820]]
}];

var geoJsonLayer = L.geoJson().addTo(map);
geoJsonLayer.addData(homeFeature);

geoJsonLayer.addData(myLines);

geoJsonLayer.setStyle(geoJsonStyle);

geoJsonLayer.bindPopup(homeFeature.properties.popupContent); //bind the popup content to the layer