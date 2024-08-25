<script setup lang="ts">
const links = [
	{
		id: 'home',
		label: 'Home',
		icon: 'i-heroicons-home',
		to: '/',
		tooltip: {
			text: 'Home',
			shortcuts: ['G', 'H'],
		},
	},
	{
		id: 'inbox',
		label: 'Inbox',
		icon: 'i-heroicons-inbox',
		to: '/inbox',
		badge: '4',
		tooltip: {
			text: 'Inbox',
			shortcuts: ['G', 'I'],
		},
	},
	{
		id: 'users',
		label: 'Users',
		icon: 'i-heroicons-user-group',
		to: '/users',
		tooltip: {
			text: 'Users',
			shortcuts: ['G', 'U'],
		},
	},
	{
		id: 'settings',
		label: 'Settings',
		to: '/settings',
		icon: 'i-heroicons-cog-8-tooth',
		children: [
			{
				label: 'General',
				to: '/settings',
				exact: true,
			},
			{
				label: 'Members',
				to: '/settings/members',
			},
			{
				label: 'Notifications',
				to: '/settings/notifications',
			},
		],
		tooltip: {
			text: 'Settings',
			shortcuts: ['G', 'S'],
		},
	},
];
</script>

<template>
	<AppLayout>
		<AppPanel
			:width="250"
			:resizable="{ min: 200, max: 300 }"
		>
			<AppNavbar class="!border-transparent">
				<template #left>
					<UButton
						color="gray"
						variant="ghost"
						class="w-full"
					>
						<UAvatar
							src="https://avatars.githubusercontent.com/u/23360933?s=200&v=4"
							size="2xs"
						/>

						<span class="truncate font-semibold text-gray-900 dark:text-white">Finance Managment</span>
					</UButton>
				</template>
			</AppNavbar>

			<AppSidebar>
				<template #header>
					<UInput
						icon="i-heroicons-magnifying-glass-20-solid"
						size="sm"
						color="white"
						:trailing="false"
						placeholder="Search..."
					/>
				</template>

				<AppSidebarLinks
					:default-expanded="['settings']"
					:links="links"
					draggable
				/>

				<!-- <UDivider /> -->

				<div class="flex-1" />

				<UDivider class="sticky bottom-0" />

				<template #footer>
					<AppSidebarFooter />
				</template>
			</AppSidebar>
		</AppPanel>

		<slot />

		<!-- <HelpSlideover /> -->
		<NotificationsSlideover />
	</AppLayout>
</template>

<style scoped></style>
