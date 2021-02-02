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
    console.log("error location");
}

function setupMap(){
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

        /* get stats for each country from local storage */
        var storedCountries = JSON.parse(localStorage.getItem("Countries"));
        /* loop through country stats and country coordinates. if country code is the same, means there are covid cases, and show it on the map. */
        for (i=0;i<storedCountries.length;i++){
            for (j=0;j<data.ref_country_codes.length;j++){
                if(data.ref_country_codes[j].alpha2 == storedCountries[i].CountryCode){
                    // popup for the coordiante
                    /*
                    var popup = new mapboxgl.Popup()
                    .setLngLat([data.ref_country_codes[j].longitude, data.ref_country_codes[j].latitude])
                    .setHTML(`<div id = "popup"><p>${data.ref_country_codes[j].country}</p><u>Total Confirmed: ${storedCountries[i].TotalConfirmed}</u></div>`)
                    .addTo(map);
                    */
                    // Total Confirmed: 10k:green, 100k:yellow, 1000k:orange, higher:red
                    if (storedCountries[i].TotalConfirmed <= 10000){
                        var marker = new mapboxgl.Marker({color: 'green'})
                        .setLngLat([data.ref_country_codes[j].longitude, data.ref_country_codes[j].latitude])
                        .addTo(map);
                    }
                    else if (storedCountries[i].TotalConfirmed <= 100000){
                        var marker = new mapboxgl.Marker({color: 'yellow'})
                        .setLngLat([data.ref_country_codes[j].longitude, data.ref_country_codes[j].latitude])
                        .addTo(map);
                    }
                    else if (storedCountries[i].TotalConfirmed <= 1000000){
                        var marker = new mapboxgl.Marker({color: 'orange'})
                        .setLngLat([data.ref_country_codes[j].longitude, data.ref_country_codes[j].latitude])
                        .addTo(map);
                    }
                    else{
                        var marker = new mapboxgl.Marker({color: 'red'})
                        .setLngLat([data.ref_country_codes[j].longitude, data.ref_country_codes[j].latitude])
                        .addTo(map);
                    }
                }
            }
            
        }
        /*
        for (i=0;i<data.ref_country_codes.length;i++){
            console.log(data.ref_country_codes[i].country);
            
            var marker = new mapboxgl.Marker()
            .setLngLat([data.ref_country_codes[i].longitude, data.ref_country_codes[i].latitude])
            .addTo(map);
            
            var popup = new mapboxgl.Popup()
            .setLngLat([data.ref_country_codes[i].longitude, data.ref_country_codes[i].latitude])
            .setHTML(`<div id = "popup">${data.ref_country_codes[i].country}</div>`)
            .addTo(map);
        }
        */

    });
  


}

