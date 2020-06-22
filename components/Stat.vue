<template>
  <div class="w-1/3 mx-2">
	<h1 class="text-xl bg-blue-200 rounded-t ">{{title}}</h1>
	<div class="bg-blue-100 text-4xl rounded-b font-hairline">{{value}}</div>
  </div>
</template>

<script>
export default {
	name: 'Stat',
	props: ['title', 'value']
}
</script>

<style>

</style>