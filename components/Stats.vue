<template>
<div class="flex my-4">
	<Stat title="Positive Tests" :value="positiveTests" />
	<Stat title="Deaths" :value="deaths" />
	<Stat title="Percent Infected" :value="percentInfected" />
</div>
</template>

<script>
import {sums} from '../composables/county'
import Stat from './Stat.vue'
export default {
	name: 'Stats',
	setup(){
		return {sums}
	},
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
		}
	}
}
</script>

<style>

</style>