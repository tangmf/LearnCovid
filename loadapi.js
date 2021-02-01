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

  // Document Ready
  $(document).ready(function (){
      $("#global_stats_loading").hide(); // hide loading text
      loadAPI();
      $("#search_btn").click(function () {
        search();
      });
  });

  // function that loads api and outputs data to the page
  function loadAPI(){
    $.ajax(settings).done(function (response) {
        console.log(response);
        $("#global_stats_loading").show(); // loading starts
        
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
        $("#global_stats_loading").hide(); // loading has finished  

        var countryList = [];
        for (i=0;i<response.Countries.length;i++){
          countryList.push(response.Countries[i]);
        }

        localStorage.setItem("Countries", JSON.stringify(countryList));
      });
  }
  function search(){
    $.ajax(settings).done(function (response) {
      let foundCountry = false;
      var i;
      for (i=0;i<response.Countries.length;i++){
        if(response.Countries[i].Country == $("#search_input").val()){
          foundCountry = true;
          console.log("found");
          let countryName = response.Countries[i].Country;
          let countryTotalConfirmed = response.Countries[i].TotalConfirmed;
          let countryTotalDeaths = response.Countries[i].TotalDeaths;
          let countryTotalRecovered = response.Countries[i].TotalRecovered;
          $("#search_output").html(`<p>Country: ${countryName}</p><p>Cases: ${countryTotalConfirmed}</p><p>Total Deaths: ${countryTotalDeaths}</p><p>Total Recovered: ${countryTotalRecovered}</p>`)
        }
      }
      if(foundCountry == false){
        console.log("Country not found");
        $("#search_output").html(`<p>Country not found</p>`)
      }
    });
  }
