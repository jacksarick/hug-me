var usersettings = require("./user-settings.js");
var plushes = [];
var presses = [];
function contains(a, obj) {
  var i = a.length;
  while (i--) {
   if (a[i]["plush_id"] === obj) {
     return true;
   }
  }
  return false;
}
function countPresses(presses){
  daily = 0;
  monthly = 0;
  yearly = 0;
  lifetime = 0;
  for (i = 0; i < presses.length; i++) {
    current = new Date();
    lifetime += 1;
    if (current - presses[i]["date"] <= 365*24*60*60){
      yearly += 1;
    }
    if (current - presses[i]["date"] <= 30*24*60*60){
      monthly += 1;
    }
    if (current - presses[i]["date"] <= 24*60*60){
      daily += 1;
    }
  }
  return {
    daily: daily,
    monthly: monthly,
    yearly: yearly,
    lifetime: lifetime
  }
}
var postData = {function: "get-data", user: usersettings.user, pass: usersettings.pass};
$.post("https://sarick.tech:3000", postData, function(data) {
    data = JSON.parse(data);
    for (i = 0; i < data.length; i++){
      temp = {
        id: i,
        plush_id :data[i]["plush_id"],
        date: Number(data[i]["date"])
      }
      presses.push(temp);
      if (contains(plushes, data[i]["plush_id"]) === false){
        temp = {
          uid:i,
          plush_id: data[i]["plush_id"],
          name: data[i]["plush_name"]
        };
        plushes.push(temp);
      }
    }
    totalPresses = countPresses(presses);
    $("#total-today").html(totalPresses["daily"]);
    $("#total-month").html(totalPresses["monthly"]);
    $("#total-year").html(totalPresses["yearly"]);
    $("#total-total").html(totalPresses["lifetime"]);

    graph();

    for (i = 0; i < plushes.length; i++){
      plushName = plushes[i]["name"];
      plushPresses = [];
      for (j = 0; j < presses.length; j++){
        if (presses[j]["plush_id"] = plushes[i]["plush_id"]){
          plushPresses.push(presses[j]);
        }
      }
      console.log(plushPresses);
      temp = countPresses(plushPresses);
      htmlString = '<div class="card card-block card-outline-primary"><div class="row"><div class="col-sm-3"><img class="img-fluid" src="img/android.jpg" alt="Android" /></div><div class="col-sm-9"><h2><b>' + plushName + '</b> the Android</h2><ul class="list-unstyled"><li>' + temp["daily"] + ' hugs today</li><li>' + temp["monthly"] + ' hugs this month</li><li>' + temp["yearly"] + ' hugs this year</li><li>' + temp["lifetime"] + ' hugs since the beginning of time</li></ul></div></div></div>';
      $("#plushes").append(htmlString);
    }
});

function graph(){
  var ctx = $("#homeChart");

  var data = {
    labels: ["Beginning of Time", "This Year", "This Month", "Today"],
    datasets: [
      {
        label: "Total Plush Hugs",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#7039A0",
        borderColor: "#7039A0",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "#7039A0",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#7039A0",
        pointHoverBorderColor: "#7039A0",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [0, totalPresses.lifetime-totalPresses.yearly, totalPresses.lifetime-totalPresses.monthly, totalPresses.lifetime-totalPresses.daily, totalPresses.lifetime],
        spanGaps: false,
      }
    ]
  };

  var options = {
    options: {
      scales: {
        xAxes: [{
          position: 'bottom'
        }]
      }
    }
  };

  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  });
}
