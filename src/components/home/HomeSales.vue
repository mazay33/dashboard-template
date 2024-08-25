<script setup lang="ts">
const sales = [
	{
		user: {
			name: 'Jordan Brown',
			email: 'jordan.brown@example.com',
			avatar: {
				src: 'https://i.pravatar.cc/128?u=0',
			},
		},
		price: 79,
	},
	{
		user: {
			name: 'Morgan Anderson',
			email: 'morgan.anderson@example.com',
			avatar: {
				src: 'https://i.pravatar.cc/128?u=4',
			},
		},
		price: 699,
	},
	{
		user: {
			name: 'Kelly Wilson',
			email: 'kelly.wilson@example.com',
			avatar: {
				src: 'https://i.pravatar.cc/128?u=1',
			},
		},
		price: 199,
	},
	{
		user: {
			name: 'Jamie Johnson',
			email: 'jamie.johnson@example.com',
			avatar: {
				src: 'https://i.pravatar.cc/128?u=5',
			},
		},
		price: 199,
	},
];

const formatNumber = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
	.format;
</script>

<template>
	<UCard
		title="Recent sales"
		description="You made 128 sales this month."
		icon="i-heroicons-chart-bar-20-solid"
	>
		<NuxtLink
			v-for="(sale, index) in sales"
			:key="index"
			class="relative -mx-2 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 last:-mb-2 hover:bg-gray-50 dark:hover:bg-gray-800/50"
		>
			<UAvatar
				v-bind="sale.user.avatar"
				:alt="sale.user.name"
				size="md"
			/>

			<div class="flex-1 text-sm">
				<div>
					<p class="font-medium text-gray-900 dark:text-white">
						{{ sale.user.name }}
					</p>
					<p class="text-gray-500 dark:text-gray-400">
						{{ sale.user.email }}
					</p>
				</div>
			</div>

			<p class="text-lg font-medium text-gray-900 dark:text-white">
				{{ formatNumber(sale.price) }}
			</p>
		</NuxtLink>
	</UCard>
</template>
