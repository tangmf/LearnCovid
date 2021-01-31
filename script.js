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
    let totalConfirmed = response.Global.TotalConfirmed;
    let newDeaths = response.Global.NewDeaths;
    let totalDeaths = response.Global.TotalDeaths;
    let newRecovered = response.Global.NewRecovered;
    let totalRecovered = response.Global.TotalRecovered;
  
  
    var i;
    for (i=0;i<response.Countries.length;i++){
      if(response.Countries[i].Country == "Singapore"){
        console.log("Singapore");
        console.log(response.Countries[i]);
      }
    }
  });