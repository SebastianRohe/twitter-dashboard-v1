//###

// Select HTML-Element
var namedEntities = document.getElementById("namedentities");

//----------------------------------------------------------------------------------------------------------------------------------

// create chart
var namedEntitiesChart = createDoughnutChart(namedEntities);

/**
 * Function to create Doughnut Chart.
 * 
 * @returns Doughnut Chart basis.
 */
function createDoughnutChart(referencedElement) {
    return new Chart(referencedElement, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                label: "Named Entities",
                backgroundColor: [],
                borderWidth: 8,
                hoverBackgroundColor: "#5B2C6F",
                hoverBorderWidth: 0,
                borderColor: "rgba(255, 255, 255)",
                data: []
            }],
        },
        options: {
            // Use of doughnutlabel plugin js.
            plugins: {
                doughnutlabel: {
                    labels: [{
                        text: "21246",
                        // Settings only for font. Color not included here.
                        font: {
                            size: 20,
                            //weight: 'bold',
                            fontFamily: "Helvetica, Arial, sans-serif",
                            horizontalCenter: "middle",
                            verticalCenter: "middle"
                        },
                        //color: '#224abe',
                    }, {
                        text: "Total",
                        //color: '#224abe',
                    }]
                }
            },
            responsive: true,
            // events: ['click'],
            legend: {
                display: true,
                align: "center",
                position: 'bottom',
                labels: {
                    fontSize: 15,
                    padding: 35,
                    boxWidth: 100,
                    usePointStyle: true
                }

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
}

//----------------------------------------------------------------------------------------------------------------------------------

/**
 * Function to query all Named Entities and their amount.
 */
function getNamedEntities() {
    $.ajax({
        url: baseURL + "/namedEntities",
        method: 'GET',
        dataType: 'json',
        success: function (reponseData) {

            // we need labels, values and colors
            let labels = [];
            let values = [];
            let colors = [];

            // using i for the selection of the content
            var count = 0;

            reponseData.result.forEach(entry => {
                var results = null;

                switch (count) {
                    case 0:
                        results = entry.persons;
                        labels.push("Persons");
                        colors.push("blue");
                        break;

                    case 1:
                        results = entry.organisations;
                        labels.push("Organisations");
                        colors.push("orange");
                        break;

                    case 2:
                        results = entry.locations;
                        labels.push("Locations");
                        colors.push("red");
                        break;
                }

                // Add up the sum of the occurrences.
                values.push(results.reduce(function (a, b) {
                    return (a + b.count);
                }, 0));
                count++;
            });

            // update chart
            namedEntitiesChart.data.datasets[0].data = values;
            namedEntitiesChart.data.datasets[0].backgroundColor = colors;
            namedEntitiesChart.data.labels = labels;
            namedEntitiesChart.update();
        }
    });
}

// Run function to get Named Entities and update Chart.
getNamedEntities();

