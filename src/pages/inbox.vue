<script setup lang="ts">
const tabItems = [
	{
		label: 'All',
	},
	{
		label: 'Unread',
	},
];
const selectedTab = ref(0);

const dropdownItems = [
	[
		{
			label: 'Mark as unread',
			icon: 'i-heroicons-check-circle',
		},
		{
			label: 'Mark as important',
			icon: 'i-heroicons-exclamation-circle',
		},
	],
	[
		{
			label: 'Star thread',
			icon: 'i-heroicons-star',
		},
		{
			label: 'Mute thread',
			icon: 'i-heroicons-pause-circle',
		},
	],
];
</script>

<template>
	<AppPage>
		<AppPanel
			id="inbox"
			:width="400"
			:resizable="{ min: 300, max: 500 }"
		>
			<AppNavbar
				title="Inbox"
				badge="1"
			>
				<template #right>
					<UTabs
						v-model="selectedTab"
						:items="tabItems"
						:ui="{ wrapper: '', list: { height: 'h-9', tab: { height: 'h-7', size: 'text-[13px]' } } }"
					/>
				</template>
			</AppNavbar>

			<!-- ~/components/inbox/InboxList.vue -->
		</AppPanel>
	</AppPage>
</template>

<style scoped></style>
