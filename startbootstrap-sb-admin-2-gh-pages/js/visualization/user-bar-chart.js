// Variable for relevant endpoint.
var userDataLimitEndpoint = "/users?retweet=false&minimum="

/**
 * Method to get user data from REST-API.
 * 
 * @param {*} minimum 
 */
function getUsers(minimum = 10) {
  // Ajax to get the data from the TTLab-API.
  $.ajax({
    url: baseURL + userDataLimitEndpoint + minimum,
    method: 'GET',
    dataType: 'json',
    success: function (responseData) {
      // Create variables with empty arrays.
      let labels = [];
      let values = [];

      // Fill the created arrays with the data from api response data.
      responseData.result.forEach(entry => {
        labels.push(entry.user);
        values.push(entry.tweets);
      });

      // Update Chart basis with data.
      userBarChart.data.labels = labels;
      userBarChart.data.datasets[0].data = values;
      userBarChart.update();
    }
  });
}


// Bar Chart Example
var users = document.getElementById("userBarChart");

var userBarChart = new Chart(users, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: "User",
      backgroundColor: gradientBackgroundOne,
      hoverBackgroundColor: "#2e59d9",
      borderColor: "#4e73df",
      data: [],
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false,
          drawBorder: true
        },
        //ticks: {
          //maxTicksLimit: 10
        //},
        //maxBarThickness: 55,
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          display: true,
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
      }
    },
  }
});

getUsers();