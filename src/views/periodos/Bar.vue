
<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    data: {
      type: Array
    },
    label:{
      type: Array
    }
  },
  data: function () {
		return {
			datacollection: {
				labels: this.label,
				datasets: [
					{
						label: 'Data One',
						backgroundColor: '#487FFA',
						pointBackgroundColor: '#DFDFDF',
						borderWidth: 1,
						pointBorderColor: '#249EBF',
						data: this.data
					}
			]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: true
						}
					}],
					xAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: false
						}
					}]
				},
				legend: {
					display: false
				},
				tooltips: {
					enabled: true,
					mode: 'single',
					callbacks: {
						label: function(tooltipItems, data) {
							return tooltipItems.yLabel + '%';
						}
					}
				},
				responsive: true,
				maintainAspectRatio: false,
				height: 200
	}
		}
	},
	mounted () {
		// this.chartData is created in the mixin
		this.renderChart(this.datacollection, this.options)
	}
};
</script>


