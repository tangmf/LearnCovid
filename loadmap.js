/* Map settings most code is obtained from youtube tutorial https://www.youtube.com/watch?v=OySigNMXOZU*/
mapboxgl.accessToken = 'pk.eyJ1IjoidGFuZ21pbmdmZW5nIiwiYSI6ImNrajQyazEwYzBpeWkyemxseDB6MXk2d24ifQ.I36uKUemWbTsCzrKk_SmHQ';

/* get current position, setup map when successful */
navigator.geolocation.getCurrentPosition(successLocation, errorLocation,
  {
    enableHighAccuracy: true
  });

function successLocation(position) {
  /* Hide notice when location is found */
  setupMap();
  
}

function errorLocation() { }{
    setupMap();
}

function setupMap() {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 0
  });
  const nav = new mapboxgl.NavigationControl();
  
  /* Add navigation */
  map.addControl(nav);
  

  // read data from json file
  let url = "country-codes-lat-long-alpha3.json";
    fetch(url)
    .then(response => response.json())
    .then(function(data){
        for (i=0;i<data.ref_country_codes.length;i++){
            console.log(data.ref_country_codes[i].country);
            /*
            var marker = new mapboxgl.Marker()
            .setLngLat([data.ref_country_codes[i].longitude, data.ref_country_codes[i].latitude])
            .addTo(map);
            */
            var popup = new mapboxgl.Popup()
            .setLngLat([data.ref_country_codes[i].longitude, data.ref_country_codes[i].latitude])
            .setHTML(`<div id = "popup">${data.ref_country_codes[i].country}</div>`)
            .addTo(map);
        }

    });
    
  var storedCountries = JSON.parse(localStorage.getItem("Countries"));
  for (i=0;i<storedCountries.length;i++){
      console.log(storedCountries[i].CountryCode);
      /*
      var marker = new mapboxgl.Marker()
        .setLngLat()
        .addTo(map);
        */
  }
  


}

