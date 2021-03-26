// Select HTML-Element for user data visualization. 2d context for color gradient.
var users = document.getElementById("userBarChart").getContext("2d");

// Colors for for Bar chart.
const userChartColors = ["blue", "green", "orange", "red"];

// Create color gradient backgrounds with gradient function from "js/color-gradient-function.js" custom script.
var gradientBackgroundTwo = createColorGradient(users, userChartColors);

//----------------------------------------------------------------------------------------------------------------------------------

var userChart = createBarChart(users);

/**
 * Function to create a Bar Chart.
 *  
 * @returns Bar Chart basis.
 */
function createBarChart(referencedElement) {
    return new Chart(referencedElement, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: "User",
                backgroundColor: gradientBackgroundTwo,
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
}

//----------------------------------------------------------------------------------------------------------------------------------

// Variable for relevant user data endpoint.
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

            // Fill the created arrays with the data from API response.
            responseData.result.forEach(entry => {
                labels.push(entry.user);
                values.push(entry.tweets);
            });

            // Update Chart basis with data.
            userChart.data.labels = labels;
            userChart.data.datasets[0].data = values;
            userChart.update();
        }
    });
}

// Run function to get user data and update Chart.
getUsers();