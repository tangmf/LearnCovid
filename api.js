var settings = {
    "url": "https://api.covid19api.com/summary",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "AccountKey": "4wI0kpClSgyt5mBKBfmEIQ==",
      "accept": "application/json"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log(response.Global.NewConfirmed);
    
    /* Global stats */
    let newConfirmed = response.Global.NewConfirmed;
    $("#newConfirmed_output").append(newConfirmed);
    let totalConfirmed = response.Global.TotalConfirmed;
    $("#totalConfirmed_output").append(totalConfirmed);
    let newDeaths = response.Global.NewDeaths;
    $("#newDeaths_output").append(newDeaths);
    let totalDeaths = response.Global.TotalDeaths;
    $("#totalDeaths_output").append(totalDeaths);
    let newRecovered = response.Global.NewRecovered;
    $("#newRecovered_output").append(newRecovered);
    let totalRecovered = response.Global.TotalRecovered;
    $("#totalRecovered_output").append(totalRecovered);
    
  
  
    var i;
    for (i=0;i<response.Countries.length;i++){
      if(response.Countries[i].Country == "Singapore"){
        console.log("Singapore");
        console.log(response.Countries[i]);
      }
    }
  });