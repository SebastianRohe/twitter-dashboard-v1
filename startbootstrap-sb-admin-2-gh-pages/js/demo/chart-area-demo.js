// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
// *     example: number_format(1234.56, 2, ',', ' ');
// *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
     sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
     dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
     s = '',
     toFixedFix = function(n, prec) {
       var k = Math.pow(10, prec);
       return '' + Math.round(n * k) / k;
     };
   // Fix for IE parseFloat(0.55).toFixed(0) = 0;
   s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
   if (s[0].length > 3) {
     s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
   }
   if ((s[1] || '').length < prec) {
     s[1] = s[1] || '';
     s[1] += new Array(prec - s[1].length + 1).join('0');
   }
   return s.join(dec);
 }


// Area Chart Example
var ctx = document.getElementById("myAreaChart").getContext("2d");

var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
gradientStroke.addColorStop(0, "#80b6f4");
gradientStroke.addColorStop(0.2, "#94d973");
gradientStroke.addColorStop(0.5, "#fad874");
gradientStroke.addColorStop(0.6, "#f49080");
gradientStroke.addColorStop(1, "#b32304");

var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Earnings",
      lineTension: 0.3,
      backgroundColor: gradientStroke,
      borderColor: gradientStroke,
      pointRadius: 5,
      pointBackgroundColor: "#FFFFFF",
      pointBorderColor: gradientStroke,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#032994",
      pointHoverBorderColor: gradientStroke,
      pointHitRadius: 10,
      pointBorderWidth: 1,
      data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
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
          drawBorder: true,
          borderDash: [2],
          zeroLineBorderDash: [2]
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          // callback: function(value, index, values) {
          //   return '$' + number_format(value);
          // }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: true,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: true
    },
    // tooltips: {
    //   backgroundColor: "rgb(255,255,255)",
    //   bodyFontColor: "#858796",
    //   titleMarginBottom: 10,
    //   titleFontColor: '#6e707e',
    //   titleFontSize: 14,
    //   borderColor: '#dddfeb',
    //   borderWidth: 1,
    //   xPadding: 15,
    //   yPadding: 15,
    //   displayColors: false,
    //   intersect: false,
    //   mode: 'index',
    //   caretPadding: 10,
    //   callbacks: {
    //     label: function(tooltipItem, chart) {
    //       var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
    //       return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
    //     }
    //   }
    // }
  }
});
