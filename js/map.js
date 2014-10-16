/**
 * Created by anders on 16.10.14.
 */
var mapLat = 58.825;
var mapLon = 5.72;

var map = L.map('map').setView([mapLat, mapLon], 13);

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
    [mapLat + 0.01, mapLon + 0.012],
    [mapLat + 0.002, mapLon + 0.002],
    [mapLat - 0.005, mapLon + 0.015]
]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");
