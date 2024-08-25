<script setup lang="ts">
import { type Duration, format, isSameDay, sub } from 'date-fns';
import DatePicker from '../DatePicker.vue';

export interface Range {
	start: Date;
	end: Date;
}

const ranges = [
	{ label: 'Last 7 days', duration: { days: 7 } },
	{ label: 'Last 14 days', duration: { days: 14 } },
	{ label: 'Last 30 days', duration: { days: 30 } },
	{ label: 'Last 3 months', duration: { months: 3 } },
	{ label: 'Last 6 months', duration: { months: 6 } },
	{ label: 'Last year', duration: { years: 1 } },
];

const selected = defineModel({
	type: Object as PropType<Range>,
	required: true,
});

function isRangeSelected(duration: Duration): boolean {
	return isSameDay(selected.value.start, sub(new Date(), duration)) && isSameDay(selected.value.end, new Date());
}

function selectRange(duration: Duration): void {
	selected.value = { start: sub(new Date(), duration), end: new Date() };
}
</script>

<template>
	<UPopover :popper="{ placement: 'bottom-start' }">
		<template #default="{ open }">
			<UButton
				color="gray"
				variant="ghost"
				:class="[open && 'bg-gray-50 dark:bg-gray-800']"
				trailing-icon="i-heroicons-chevron-down-20-solid"
			>
				{{ format(selected.start, 'd MMM, yyy') }} - {{ format(selected.end, 'd MMM, yyy') }}
			</UButton>
		</template>

		<template #panel="{ close }">
			<div class="flex items-center divide-gray-200 sm:divide-x dark:divide-gray-800">
				<div class="hidden flex-col py-4 sm:flex">
					<UButton
						v-for="(range, index) in ranges"
						:key="index"
						:label="range.label"
						color="gray"
						variant="ghost"
						class="rounded-none px-6"
						:class="[
							isRangeSelected(range.duration)
								? 'bg-gray-100 dark:bg-gray-800'
								: 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
						]"
						truncate
						@click="selectRange(range.duration)"
					/>
				</div>

				<DatePicker
					v-model="selected"
					@close="close"
				/>
			</div>
		</template>
	</UPopover>
</template>
