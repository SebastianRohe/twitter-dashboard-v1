// Select HTML-Element. Get 2d context for color visualization. 
var tokens = document.getElementById("tokenHorizontalBarChart").getContext("2d");


// Variable for color gradient with 5 different used colors.
// var gradientBackgroundOne = token.createLinearGradient(500, 0, 100, 0);
// gradientBackgroundOne.addColorStop(0, "#b32304");
// gradientBackgroundOne.addColorStop(0.2, "#f49080");
// gradientBackgroundOne.addColorStop(0.5, "#fad874");
// gradientBackgroundOne.addColorStop(0.6, "#94d973");
// gradientBackgroundOne.addColorStop(1, "#80b6f4");


// Create Token Chart basis.
var tokenHorizontalBarChart = new Chart(tokens, {
	type: 'horizontalBar',
	data: {
		labels: [],
		datasets: [{
			label: "Token",
			backgroundColor: gradientBackgroundOne,
			hoverBackgroundColor: "rgba(78, 115, 223, 1)", // Background color when hovering over bars
			borderColor: "rgba(78, 115, 223, 1)",
			data: [],
		}],
	},
	options: {
		maintainAspectRatio: false,
		responsive: true,
		layout: {
			padding: {
				left: 10,
				right: 25,
				top: 25,
				bottom: 0
			}
		},
		scales: {
			yAxes: [{
				// time: {
				// 	unit: 'date'
				// },
				gridLines: {
					display: true,
					drawBorder: true,
                    color: "rgb(234, 236, 244)"
				},
				ticks: {
					maxTicksLimit: 10,
					
					//fontColor: "rgb(0, 0, 0)",
					//fontSize: 16,
					
				}
			}],
			xAxes: [{
				ticks: {
					beginAtZero: true, // Force to start x axis with 0 
					maxTicksLimit: 14,  // Set maximum number of axis ticks 
					padding: 10, // Padding between x axis values und chart lines
					// Include a dollar sign in the ticks
					callback: function(value, index, values) {
						return '' + number_format(value);
					}
				},
				gridLines: {
					color: "rgb(234, 236, 244)",
					zeroLineColor: "rgb(234, 236, 244)",
					drawBorder: true,
					// borderDash: [2],
					// zeroLineBorderDash: [2]
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
		}
	}
});


/**
 * Method to query the tokens and their quantity
 * Without parameter 2000 is used as minimum.
 * @param iMinimum
 */
getTokenChart = function token(iMinimum=3000) {
	$.ajax({
		url: baseURL+"tokens?minimum="+iMinimum,
		method: 'GET',
		dataType: 'json',
		success: function (d) {
			let labels = [];//d.labels;
			let values = [];//d.values;

			d.result.forEach(t => {
				labels.push(t.token);
				values.push(t.count);
			});

			tokenHorizontalBarChart.data.labels = labels;
			tokenHorizontalBarChart.data.datasets[0].data = values;
			tokenHorizontalBarChart.update();
		}
	});
}


// run on startup
getTokenChart();
