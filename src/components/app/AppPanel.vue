<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

interface ResizableOptions {
	min?: number;
	max?: number;
}

const props = defineProps<{
	width: number;
	grow?: boolean;
	collapsible?: boolean;
	resizable?: ResizableOptions | boolean;
}>();

const collapsed = ref(false);
const panelWidth = ref(props.width);
const resizable = typeof props.resizable === 'boolean' ? props.resizable : !!props.resizable;
const resizableOptions = typeof props.resizable === 'object' ? props.resizable : {};

function startResizing(event: MouseEvent): void {
	event.preventDefault();
	document.body.style.userSelect = 'none';

	const startX = event.clientX;
	const startWidth = panelWidth.value;

	const resize = (moveEvent: MouseEvent): void => {
		const newWidth = startWidth + (moveEvent.clientX - startX);
		if (
			(!resizableOptions.min || newWidth >= resizableOptions.min) &&
			(!resizableOptions.max || newWidth <= resizableOptions.max)
		) {
			panelWidth.value = newWidth;
		}
	};

	const stopResizing = (): void => {
		document.body.style.userSelect = '';
		document.removeEventListener('mousemove', resize);
		document.removeEventListener('mouseup', stopResizing);
	};

	document.addEventListener('mousemove', resize);
	document.addEventListener('mouseup', stopResizing);
}

onMounted(() => {
	// Additional setup if needed
});

onBeforeUnmount(() => {
	// Clean up event listeners or other resources if needed
});
</script>

<template>
	<div
		class="dashboard-panel"
		:class="[{ collapsed }, { grow }]"
		:style="{ width: `${panelWidth}px` }"
	>
		<div class="panel-content">
			<slot></slot>
		</div>
		<div
			v-if="resizable"
			class="panel-resizer group"
			@mousedown="startResizing"
		>
			<div class="inner-resizer"></div>
		</div>
	</div>
</template>

<style scoped>
.dashboard-panel {
	@apply relative flex flex-col overflow-hidden border-r border-gray-700 duration-300;
}

.dashboard-panel .grow {
	@apply flex-1;
}

.panel-content {
	@apply flex w-full flex-1 flex-col overflow-y-auto duration-300;
}

.panel-resizer {
	width: 9px;
	position: absolute;
	right: -5px;
	top: 0;
	bottom: 0;
	cursor: col-resize;
	z-index: 50;
	background-color: transparent;
	display: flex;
	align-items: center;
	justify-content: center;
}

.panel-resizer .inner-resizer {
	width: 1px;
	height: 100%;
	background-color: transparent;
	transition: background-color 0.2s;
}

.panel-resizer:hover .inner-resizer,
.panel-resizer:active .inner-resizer {
	@apply bg-gray-700;
}
</style>
