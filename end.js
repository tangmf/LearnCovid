
var storedScore = JSON.parse(localStorage.getItem("mostRecentScore"));
$("#score").text(`Score: ${storedScore}`);