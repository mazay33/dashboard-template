<script setup lang="ts">
import { sub } from 'date-fns';
import AppPanelContent from '~/components/app/AppPanelContent.vue';
import HomeCountries from '~/components/home/HomeCountries.vue';
import type { Range } from '~/components/home/HomeDateRangePicker.vue';
import HomeSales from '~/components/home/HomeSales.vue';
import type { Period } from '~/types';

const { isNotificationsSlideoverOpen } = useDashboard();

const items = [
	[
		{
			label: 'New mail',
			icon: 'i-heroicons-paper-airplane',
			to: '/inbox',
		},
		{
			label: 'New user',
			icon: 'i-heroicons-user-plus',
			to: '/users',
		},
	],
];

const range = ref<Range>({ start: sub(new Date(), { days: 14 }), end: new Date() });
const period = ref<Period>('daily');
</script>

<template>
	<AppPage>
		<AppPanel grow>
			<AppNavbar title="Home">
				<template #right>
					<UTooltip
						text="Notifications"
						:shortcuts="['N']"
					>
						<UButton
							color="gray"
							variant="ghost"
							square
							@click="isNotificationsSlideoverOpen = true"
						>
							<UChip
								color="red"
								inset
							>
								<UIcon
									name="i-heroicons-bell"
									class="h-5 w-5"
								/>
							</UChip>
						</UButton>
					</UTooltip>

					<UDropdown :items="items">
						<UButton
							icon="i-heroicons-plus"
							size="md"
							class="ml-1.5 rounded-full"
						/>
					</UDropdown>
				</template>
			</AppNavbar>

			<AppToolbar>
				<template #left>
					<HomeDateRangePicker
						v-model="range"
						class="-ml-2.5"
					/>
				</template>
			</AppToolbar>

			<AppPanelContent>
				<HomeChart
					:period="period"
					:range="range"
				/>
				<div class="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
					<HomeSales />
					<HomeCountries />
				</div>
			</AppPanelContent>
		</AppPanel>
	</AppPage>
</template>

<style scoped></style>
