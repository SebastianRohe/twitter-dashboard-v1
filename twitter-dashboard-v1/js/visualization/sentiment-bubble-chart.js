// create chart without any modification option
// run on startup
$.ajax({
    url: baseURL + "/sentiment?minimum=0",
    method: 'GET',
    dataType: 'json',
    success: function (responseData) {
        let labels = [];
        let values = [];

        let dataNegative = [];
        let dataPositive = [];
        let dataNeutral = [];

        responseData.result.forEach(function (entry) {
            labels.push(entry.sentiment);
            values.push(entry.count);

            // Initiate data value with 'empty' value
            let data = null;

            var entryValue = entry.sentiment;

            // Data variable is 'filled' according to cases.
            switch (entryValue) {
                case (entryValue < 0):
                    data = dataNegative;
                    break;
                case (entryValue > 0):
                    data = dataPositive;
                    break;
                default:
                    data = dataNeutral;
            }
            
            data.push({
                // Logarithm to get better y axis representation.
                x: Math.log(entry.count),
                // y axis values.
                y: entry.sentiment,
                v: entry.count
            })
        });

        // sentiment-visualisation
        var sentiments = document.getElementById("sentimentBubbleChart");

        var options = {
            aspectRatio: 1,
            legend: false,
            tooltips: false,
            elements: {
                point: {
                    backgroundColor: function (context) {
                        var value = context.dataset.data[context.dataIndex];

                        if (value.y < -2) {
                            return "rgba(179, 35, 4)";
                        }

                        else if (value.y <= -1 && value.y >= -2) {
                            return "rgba(244, 144, 128)";
                        }

                        else if (value.y < 0 && value.y > -1) {
                            return "rgba(250, 216, 116)";
                        }

                        else if (value.y == 0) {
                            return "#FFFBC9";
                        }

                        else if (value.y > 0 && value.y < 1) {
                            return "#D9F3BB";
                        }

                        else if (value.y >= 1 && value.y <= 2) {
                            return "rgba(148, 217, 115)";
                        }

                        else {
                            return "green";
                        }
                    },

                    // borderColor: function(context){
                    // 	return "black";
                    // },

                    // borderWidth: function(context) {
                    // 	return 0.2;
                    // },

                    hoverBackgroundColor: 'blue',

                    radius: function (context) {
                        var value = context.dataset.data[context.dataIndex];
                        var size = context.chart.width;
                        var base = value.v;
                        return Math.log((size / 24) * base);
                    }
                }
            }
        };
        new Chart(sentiments, {
            type: 'bubble',
            data: {
                datasets: [
                    {
                        data: dataNegative
                    },
                    {
                        data: dataNeutral
                    },
                    {
                        data: dataPositive
                    }
                ]
            },
            options: options
        });
    }
});