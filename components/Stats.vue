<template>
<div class="flex my-4">
	<Stat title="Positive Tests" :value="positiveTests" info="Cumulative count"/>
	<Stat title="Deaths" :value="deaths" info="Cumulative deaths" />
	<Stat title="Percent Infected" :value="percentInfected" info="Positive tests per 100 residents"/>
	<Stat title="Last Count" :value="lastReportedNumber" info="Could be today or yesterday or 🤷" />
</div>
</template>

<script>
import Stat from './Stat.vue'
export default {
	name: 'Stats',
	props: {sums: {type: Object, required: true}},
	components: {Stat},
	computed:{
		positiveTests(){
			return this.sums.positiveTests;
		},
		deaths(){
			return this.sums.deaths;
		},
		percentInfected(){
			return Math.round(this.sums.percentInfected * 100 * 100) / 100 + '%';
		},
		percentPositive(){
			let {percentPositive} = this.sums;
			if(isNaN(percentPositive)) return '-';
			return Math.round(this.sums.percentPositive * 100) / 100 + '%';
		},
		lastReportedNumber(){
			return this.sums.lastReportedNumber;
		}
	}
}
</script>

<style>

</style>