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
    .setLatLng([mapLat + 0.01, mapLon])
    .setContent("I am a standalone popup.")
    .openOn(map);

map.on('click', onMapClick);

var clickPopup = L.popup();

function onMapClick(e) {
    clickPopup.setLatLng(e.latlng)
        .setContent("You clicked at " + e.latlng.toString())
        .openOn(map);
}

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