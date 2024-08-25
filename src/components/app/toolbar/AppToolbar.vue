<script setup lang="ts"></script>

<template>
	<div class="flex items-center gap-x-4 border-b border-gray-200 px-4 py-2 dark:border-gray-800">
		<!-- Left Slot: Content like filters, date pickers, etc. -->
		<div class="flex items-center gap-2.5">
			<slot name="left"></slot>
		</div>

		<!-- Right Slot: Content like action buttons -->
		<div class="ml-auto flex items-center gap-2.5">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
