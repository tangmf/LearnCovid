/* Map settings most code is obtained from youtube tutorial https://www.youtube.com/watch?v=OySigNMXOZU*/
mapboxgl.accessToken = 'pk.eyJ1IjoidGFuZ21pbmdmZW5nIiwiYSI6ImNrajQyazEwYzBpeWkyemxseDB6MXk2d24ifQ.I36uKUemWbTsCzrKk_SmHQ';

/* get current position, setup map when successful */
navigator.geolocation.getCurrentPosition(successLocation, errorLocation,
  {
    enableHighAccuracy: true
  });

function successLocation(position) {
  /* Hide notice when location is found */
  $("#notice").hide();
  setupMap([position.coords.longitude, position.coords.latitude]);
  

}

function errorLocation() { }

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom: 0
  });
  const nav = new mapboxgl.NavigationControl();
  
  /* Add navigation */
  map.addControl(nav);
  

  var storedCountries = JSON.parse(localStorage.getItem("Countries"));
  for (i=0;i<storedCountries.length;i++){
      console.log(storedCountries[i].Country);
  }


}