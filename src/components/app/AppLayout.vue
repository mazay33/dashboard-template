<script setup lang="ts"></script>

<template>
	<div class="app-wrapper">
		<slot />
	</div>
</template>

<style scoped>
.app-wrapper {
	@apply fixed inset-0 flex overflow-hidden;
}
</style>
