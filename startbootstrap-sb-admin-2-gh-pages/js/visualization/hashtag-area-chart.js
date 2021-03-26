//###

// Select HTML-Element for hashtag visualization.
var hashtags = document.getElementById("hashtagAreaChart").getContext("2d");

// Colors for for Line chart.
//const hashtagChartColors = ["rgba(128, 182, 244)", "rgba(148, 217, 115)", "rgba(250, 216, 116)", "rgba(244, 144, 128)", "rgba(179, 35, 4)"];
const hashtagChartColors = ["blue", "orange", "green", "red"];
const hashtagChartColorsLessOpacity = ["rgba(128, 182, 244, 0.1)", "rgba(148, 217, 115, 0.1)", "rgba(250, 216, 116, 0.1)", "rgba(244, 144, 128, 0.1)", "rgba(179, 35, 4, 0.1)"]

// Create color gradient backgrounds with gradient function from "js/color-gradient-function.js" custom script.
var gradientBackgroundOne = createColorGradient(hashtags, hashtagChartColors);
var gradientBackgroundOneLessOpacity = createColorGradient(hashtags, hashtagChartColorsLessOpacity);

//----------------------------------------------------------------------------------------------------------------------------------

// Create 'empty' Line Chart.
var hashtagChart = createLineChart(hashtags);

/**
 * This function creates an Line Chart. 
 * 
 * @returns Line Chart basis.
 */
function createLineChart(referencedElement) {
    return new Chart(referencedElement, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: "Count",
                lineTension: 0.4,
                backgroundColor: gradientBackgroundOneLessOpacity,
                borderColor: gradientBackgroundOne,
                pointRadius: 3,
                pointBackgroundColor: gradientBackgroundOne,
                pointBorderColor: gradientBackgroundOne,
                pointHoverRadius: 4,
                pointHoverBackgroundColor: "blue",
                pointHoverBorderColor: "black",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: []
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
                        unit: 'date'
                    },
                    gridLines: {
                        display: true,
                        drawBorder: true
                    },
                }],
                yAxes: [{
                    ticks: {
                        maxTicksLimit: 5,
                        padding: 10,
                        // Include a dollar sign in the ticks if needed.
                        callback: function (value, index, values) {
                            return '' + number_format(value);
                        }
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: true,
                    }
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                mode: 'index',
                caretPadding: 10,
                callbacks: {
                    label: function (tooltipItem, chart) {
                        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
                    }
                }
            }
        }
    });
}

//----------------------------------------------------------------------------------------------------------------------------------

// URL variable for the ajax call to get data from REST-API. 
var hashtagMinimumQueryEndpoint = "hashtags?minimum=";

/**
 *  Method to query the hashtags and their quantity, without a parameter 20 is used as miniumum.
 * 
 * @param minimum Minimum number of hashtags which should be visualized at once.
 */
function getHashtagChartWithData(minimum = 20) {
    // Ajax to get the hashtag data from the API.
    $.ajax({
        url: baseURL + hashtagMinimumQueryEndpoint + minimum,
        method: 'GET',
        dataType: 'json',
        success: function (responseData) {
            // Create variables with empty arrays.
            let labels = [];
            let values = [];

            // Fill the created arrays with the data from api response data.
            responseData.result.forEach(entry => {
                labels.push(entry.hashtag);
                values.push(entry.count);
            });

            // Update Chart basis with data.
            hashtagChart.data.labels = labels;
            hashtagChart.data.datasets[0].data = values;
            hashtagChart.update();
        }
    });
}

// Call of function to update Chart with data from REST-API. Function order important here.
getHashtagChartWithData();




