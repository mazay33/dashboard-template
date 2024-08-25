<script setup lang="ts"></script>

<template>
	<div class="flex min-h-0 flex-grow flex-col gap-y-2 py-2">
		<div class="flex w-full flex-col px-4">
			<slot name="header" />
		</div>

		<div class="flex flex-1 flex-col gap-y-2 overflow-y-auto px-4">
			<slot />
		</div>

		<div class="flex flex-shrink-0 items-center justify-between gap-x-1.5 px-4">
			<slot name="footer" />
		</div>
	</div>
</template>

<style scoped></style>
