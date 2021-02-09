// API Settings
var settings = {
    "url": "https://api.covid19api.com/summary",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "AccountKey": "4wI0kpClSgyt5mBKBfmEIQ==",
      "accept": "application/json"
    },
  };

/* Map settings most code is obtained from youtube tutorial https://www.youtube.com/watch?v=OySigNMXOZU*/
mapboxgl.accessToken = 'pk.eyJ1IjoidGFuZ21pbmdmZW5nIiwiYSI6ImNrajQyazEwYzBpeWkyemxseDB6MXk2d24ifQ.I36uKUemWbTsCzrKk_SmHQ';


  // Document Ready
  $(document).ready(function (){
      $(".global_stats_loading").hide(); // hide loading text
      $(".global_stats_icon").hide();
      $(".search_loading").hide();
      $("#search_multiple").hide();
      $("#search_output").hide();
      loadAPI();
      /* get current position, setup map when successful */
      navigator.geolocation.getCurrentPosition(successLocation, errorLocation,
        {
          enableHighAccuracy: true
        });
      $("#search_btn").click(function () {
        $("#search_output").text("");
        $(".search_loading").show();
        search();
      });
      $("#popup_btn").click(function (){
        preventDefault()
        toggle_popup();
      });
  });

  // function that loads api and outputs data to the page
  function loadAPI(){
    $.ajax(settings).done(function (response) {
        console.log(response);
        $(".global_stats_loading").show(); // loading starts
        
        /* Global stats */
        let newConfirmed = response.Global.NewConfirmed;
        $("#newConfirmed_output").text("New Confirmed: " + newConfirmed);
        let totalConfirmed = response.Global.TotalConfirmed;
        $("#totalConfirmed_output").text("Total Confirmed: " + totalConfirmed);
        let newDeaths = response.Global.NewDeaths;
        $("#newDeaths_output").text("New Deaths: " + newDeaths);
        let totalDeaths = response.Global.TotalDeaths;
        $("#totalDeaths_output").text("Total Deaths: " + totalDeaths);
        let newRecovered = response.Global.NewRecovered;
        $("#newRecovered_output").text("New Recovered: " + newRecovered);
        let totalRecovered = response.Global.TotalRecovered;
        $("#totalRecovered_output").text("Total Recovered: " + totalRecovered);
        $(".global_stats_loading").hide(); // loading has finished  
        $(".global_stats_icon").show();
        var countryList = [];
        for (i=0;i<response.Countries.length;i++){
          countryList.push(response.Countries[i]);
        }

        localStorage.setItem("Countries", JSON.stringify(countryList));
      });
  }
  function search(){
    $("#search_multiple").empty();
    $("#search_multiple").hide();
    let inputCountry = $("#search_input").val();
    if(inputCountry == ""){
      $("#search_output").show();
      $("#search_output").html(`<p>Enter something!</p>`) // input is empty
      $(".search_loading").hide();
    }
    else{
      $.ajax(settings).done(function (response) {
        var i;
        let outputList = [];
        let outputCount = 0;
        for (i=0;i<response.Countries.length;i++){
          if((response.Countries[i].Country).toLowerCase().includes($("#search_input").val().toLowerCase()) && inputCountry.length > 3){ // non case-sensitive feature
            outputCount ++;
            // missing validation for when multiple records meet the requirements
            console.log("found");
            let countryName = response.Countries[i].Country;
            let countryTotalConfirmed = response.Countries[i].TotalConfirmed;
            let countryTotalDeaths = response.Countries[i].TotalDeaths;
            let countryTotalRecovered = response.Countries[i].TotalRecovered;
            outputList.push(countryName);
            $("#search_output").show();
            $("#search_output").html(`<p><b>${countryName}</b></p><p>Cases: ${countryTotalConfirmed}</p><p>Total Deaths: ${countryTotalDeaths}</p><p>Total Recovered: ${countryTotalRecovered}</p>`)
          }
        }
        if (outputCount > 1){
          $("#search_output").show();
          $("#search_multiple").show();
          $("#search_multiple").append("Other results: ");
          for (i=0;i<outputList.length;i++){
            $("#search_multiple").append(outputList[i] + " , ");
          }
        }
        else if(outputCount == 0){
          $("#search_output").show();
            console.log("Country not found");
            $("#search_output").html(`<p>"${inputCountry}" not found</p>`);
        }
        
        $(".search_loading").hide();
      });
    }
  }

// Map functions

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
          $(".map_loading").hide();
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

function toggle_popup(){
    /* get stats for each country from local storage */
    var storedCountries = JSON.parse(localStorage.getItem("Countries"));
    for (i=0;i<data.ref_country_codes.length;i++){
        console.log(data.ref_country_codes[i].country);
        
        var popup = new mapboxgl.Popup()
        .setLngLat([data.ref_country_codes[i].longitude, data.ref_country_codes[i].latitude])
        .setHTML(`<div id = "popup">${data.ref_country_codes[i].country}</div>`)
        .addTo(map);
    }
  }
