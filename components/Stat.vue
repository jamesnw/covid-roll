<template>
  <div class="w-1/4 mx-2 border-blue-900 border">
	<h1 class="text-xl bg-blue-100">{{title}}</h1>
	<div class="bg-blue-900 text-blue-100 text-4xl font-hairline">{{value}}</div>
	<div class="bg-blue-100 text-xs" v-if="info">{{info}}</div>
  </div>
</template>

<script>
export default {
	name: 'Stat',
	props: ['title', 'value', 'info']
}
</script>

<style>

</style>