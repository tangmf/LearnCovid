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

/* Map settings some code is obtained from youtube tutorial https://www.youtube.com/watch?v=OySigNMXOZU*/
mapboxgl.accessToken = 'pk.eyJ1IjoidGFuZ21pbmdmZW5nIiwiYSI6ImNrajQyazEwYzBpeWkyemxseDB6MXk2d24ifQ.I36uKUemWbTsCzrKk_SmHQ';


  // Document Ready
  $(document).ready(function (){
    // hide icons and loading lotties
      $(".global_stats_icon").hide();
      $(".search_loading").hide();
      $("#search_multiple").hide();
      $("#search_output").hide();
      $(".map_container").hide();
      // load apis
      loadAPI(); //load covid19 api
      setupMap(); // load mapbox api
      // if user searches for specific country
      $("#search_btn").click(function () {
        // reset output
        $("#search_output").text("");
        // show loading lotties
        $(".search_loading").show();
        // search for input
        search();
      });
      // apply changes to map settings
      $("#apply_btn").click(function(){
        event.preventDefault();
        setupMap();
      });
  });

  // function that loads api and outputs data to the page
  function loadAPI(){
    $.ajax(settings).done(function (response) {
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
        // finished loading
        $(".global_stats_loading").hide();
        $(".global_stats_icon").show();
        // save data to local storage for mapbox api
        var countryList = [];
        for (i=0;i<response.Countries.length;i++){
          countryList.push(response.Countries[i]);
        }

        localStorage.setItem("Countries", JSON.stringify(countryList));
      });
  }
  function search(){
    // clear search_multiple
    $("#search_multiple").empty();
    $("#search_multiple").hide();
    let inputCountry = $("#search_input").val(); // target country
    // validation for when there is no input
    if(inputCountry === ""){
      $("#search_output").show();
      $("#search_output").html(`<p>Enter something!</p>`); // input is empty
      $(".search_loading").hide();
    }
    // when there is input
    else{
      $.ajax(settings).done(function (response) {
        var i;
        let outputList = []; // list for all outputs
        let outputCount = 0;
        // search trhough the api
        for (i=0;i<response.Countries.length;i++){
          if((response.Countries[i].Country).toLowerCase().includes($("#search_input").val().toLowerCase()) && inputCountry.length > 3){ // non case-sensitive feature
            outputCount ++;
            console.log("found");
            let countryName = response.Countries[i].Country;
            let countryTotalConfirmed = response.Countries[i].TotalConfirmed;
            let countryTotalDeaths = response.Countries[i].TotalDeaths;
            let countryTotalRecovered = response.Countries[i].TotalRecovered;
            outputList.push(countryName); // add all outputs to output list
            // display search output
            $("#search_output").show();
            $("#search_output").html(`<p><b>${countryName}</b></p><p>Cases: ${countryTotalConfirmed}</p><p>Total Deaths: ${countryTotalDeaths}</p><p>Total Recovered: ${countryTotalRecovered}</p>`);
          }
        }
        // multiple outputs
        if (outputCount > 1){
          $("#search_output").show();
          $("#search_multiple").show();
          $("#search_multiple").append("Other results: ");
          for (i=0;i<outputList.length;i++){
            $("#search_multiple").append(outputList[i] + " , ");
          }
        }
        // no outputs (nothing found)
        else if(outputCount === 0){
          $("#search_output").show();
            console.log("Country not found");
            $("#search_output").html(`<p>"${inputCountry}" not found</p>`);
        }
        // finish loading
        $(".search_loading").hide();
      });
    }
  }

// Map functions
  
  function setupMap(){
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11'
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
                      // Total Confirmed: 10k:green, 100k:yellow, 1000k:orange, higher:red
                      //green
                      if (storedCountries[i].TotalConfirmed <= 10000 && document.getElementById("green").checked){
                          var marker = new mapboxgl.Marker({color: 'green'})
                          .setLngLat([data.ref_country_codes[j].longitude, data.ref_country_codes[j].latitude])
                          .addTo(map);
                          if(document.getElementById("popup_chkbx").checked){
                            // popup for the coordiante
                           var popup = new mapboxgl.Popup()
                           .setLngLat([data.ref_country_codes[j].longitude, data.ref_country_codes[j].latitude])
                           .setHTML(`<div id = "popup"><p>${data.ref_country_codes[j].country}</p>Total Confirmed: ${storedCountries[i].TotalConfirmed}</div>`)
                           .addTo(map);
                         
                         }
                      }
                      //yellow
                      else if (storedCountries[i].TotalConfirmed <= 100000 && storedCountries[i].TotalConfirmed > 10000 && document.getElementById("yellow").checked){
                          var marker = new mapboxgl.Marker({color: 'yellow'})
                          .setLngLat([data.ref_country_codes[j].longitude, data.ref_country_codes[j].latitude])
                          .addTo(map);
                          if(document.getElementById("popup_chkbx").checked){
                            // popup for the coordiante
                           var popup = new mapboxgl.Popup()
                           .setLngLat([data.ref_country_codes[j].longitude, data.ref_country_codes[j].latitude])
                           .setHTML(`<div id = "popup"><p>${data.ref_country_codes[j].country}</p>Total Confirmed: ${storedCountries[i].TotalConfirmed}</div>`)
                           .addTo(map);
                         
                         }
                      }
                      //orange
                      else if (storedCountries[i].TotalConfirmed <= 1000000 && storedCountries[i].TotalConfirmed > 100000 && document.getElementById("orange").checked){
                          var marker = new mapboxgl.Marker({color: 'orange'})
                          .setLngLat([data.ref_country_codes[j].longitude, data.ref_country_codes[j].latitude])
                          .addTo(map);
                          if(document.getElementById("popup_chkbx").checked){
                            // popup for the coordiante
                           var popup = new mapboxgl.Popup()
                           .setLngLat([data.ref_country_codes[j].longitude, data.ref_country_codes[j].latitude])
                           .setHTML(`<div id = "popup"><p>${data.ref_country_codes[j].country}</p>Total Confirmed: ${storedCountries[i].TotalConfirmed}</div>`)
                           .addTo(map);
                         
                         }
                      }
                      //red
                      else if (storedCountries[i].TotalConfirmed > 1000000 && document.getElementById("red").checked){
                          var marker = new mapboxgl.Marker({color: 'red'})
                          .setLngLat([data.ref_country_codes[j].longitude, data.ref_country_codes[j].latitude])
                          .addTo(map);
                          if(document.getElementById("popup_chkbx").checked){
                            // popup for the coordiante
                           var popup = new mapboxgl.Popup()
                           .setLngLat([data.ref_country_codes[j].longitude, data.ref_country_codes[j].latitude])
                           .setHTML(`<div id = "popup"><p>${data.ref_country_codes[j].country}</p>Total Confirmed: ${storedCountries[i].TotalConfirmed}</div>`)
                           .addTo(map);
                         
                         }
                      }


                  }
                  
              }
              
          }
          //finish loading
          $(".map_container").show();
          $(".map_loading").hide();
  
      });
  }

