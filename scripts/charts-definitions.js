window.addEventListener('load', onload);

function onload(event){
  chartT = createTemperatureChart();
  chartPH = createPhChart();
}

// Create Temperature Chart
function createTemperatureChart() {
  var chart = new Highcharts.Chart({
    chart:{ 
      renderTo:'chart-temperature',
      type: 'spline' 
    },
    series: [
      {
        name: 'Sensor temperatura'
      }
    ],
    title: { 
      text: undefined
    },
    plotOptions: {
      line: { 
        animation: false,
        dataLabels: { 
          enabled: true 
        }
      }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { second: '%H:%M:%S' }
    },
    yAxis: {
      title: { 
        text: 'Temperatura' 
      }
    },
    credits: { 
      enabled: false 
    }
  });
  return chart;
}
// Create Temperature Chart
function createPhChart() {
  var chart = new Highcharts.Chart({
    chart:{ 
      renderTo:'chart-ph',
      type: 'spline' 
    },
    series: [
      {
        name: 'Sensor ph'
      }
    ],
    title: { 
      text: undefined
    },
    plotOptions: {
      line: { 
        animation: false,
        dataLabels: { 
          enabled: true 
        }
      }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { second: '%H:%M:%S' }
    },
    yAxis: {
      title: { 
        text: 'Nivel Ph' 
      }
    },
    credits: { 
      enabled: false 
    }
  });
  return chart;
}
