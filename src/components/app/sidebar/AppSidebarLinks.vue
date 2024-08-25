<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

interface SidebarLink {
	id?: string;
	label: string;
	icon?: string;
	to?: string;
	badge?: string;
	children?: SidebarLink[];
	draggable?: boolean;
}

const props = defineProps({
	links: {
		type: Array as () => SidebarLink[],
		required: true,
	},
	draggable: {
		type: Boolean,
		default: false,
	},
	defaultExpanded: {
		type: Array as () => string[], // Массив id ссылок, которые должны быть открыты по умолчанию
		default: () => [],
	},
});

const router = useRouter();
const expandedLinks = ref<string[]>([]);

onServerPrefetch(() => {
	expandedLinks.value = props.defaultExpanded;
});

onMounted(() => {
	expandedLinks.value = props.defaultExpanded;
});

function isExpanded(link: SidebarLink): boolean {
	return expandedLinks.value.includes(link.id || '');
}

function toggleExpand(link: SidebarLink): void {
	if (link.children) {
		const element = document.getElementById(link.id || '');
		if (!element) return;

		const index = expandedLinks.value.indexOf(link.id || '');
		if (index >= 0) {
			const height = element.scrollHeight;
			element.style.maxHeight = `${height}px`;
			setTimeout(() => (element.style.maxHeight = '0px'), 10);
			expandedLinks.value.splice(index, 1);
		} else {
			element.style.maxHeight = '0px';
			expandedLinks.value.push(link.id || '');
			setTimeout(() => (element.style.maxHeight = `${element.scrollHeight}px`), 10);
		}
	}
}

function isActive(link: SidebarLink): boolean {
	return router.currentRoute.value.path === link.to;
}

function onLinkClick(link: SidebarLink): void {
	if (link.children) {
		toggleExpand(link);
	} else if (link.to) {
		router.push(link.to);
	}
}
</script>

<template>
	<ul class="sidebar-links">
		<li
			v-for="(link, index) in links"
			:key="link.id"
			:class="{ 'has-children': link.children }"
			:draggable="props.draggable && link.draggable"
			@dragstart="onDragStart($event, link, index)"
			@dragover="onDragOver"
			@drop="onDrop($event, index)"
		>
			<ULink
				v-if="link.to"
				:class="[{ active: isActive(link) }]"
				class="flex w-full items-center justify-start"
				:to="link.to"
				@click.prevent="onLinkClick(link)"
			>
				<UButton
					class="group flex w-full items-center justify-start text-gray-400 group-hover:text-gray-700 dark:text-gray-500 dark:group-hover:text-gray-200"
					size="sm"
					color="gray"
					variant="ghost"
					label="Button"
					:trailing="false"
				>
					<template #leading>
						<UIcon
							v-if="link.icon"
							:name="link.icon"
							class="relative h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-700 dark:text-gray-500 dark:group-hover:text-gray-200"
						></UIcon>
					</template>
					<span>{{ link.label }}</span>
					<UBadge
						v-if="link.badge"
						class="ml-auto"
						color="gray"
						size="xs"
					>
						{{ link.badge }}
					</UBadge>

					<span
						v-if="link.children"
						:class="[isExpanded(link) ? 'rotate-30 transform' : '-rotate-90']"
						class="iconify i-heroicons:chevron-down-20-solid ml-auto h-5 w-5 flex-shrink-0 transition-transform duration-200"
						aria-hidden="true"
					></span>
				</UButton>
			</ULink>
			<!-- Render children if the link is expanded -->
			<ul
				v-if="link.children"
				:id="link.id"
				:class="{ expanded: isExpanded(link) }"
				class="relative max-h-0 overflow-hidden transition-all duration-500 ease-in-out"
			>
				<li
					v-for="(item, index) in link.children || []"
					:key="index"
					tag="li"
					class="!overflow-visible"
				>
					<div
						default-open="true"
						as="div"
					>
						<div as="template">
							<div class="relative flex">
								<ULink
									class="focus-visible:before:ring-primary-500 dark:focus-visible:before:ring-primary-400 group relative flex w-full items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-500 before:absolute before:inset-px before:rounded-md hover:text-gray-900 hover:before:bg-gray-50 focus:outline-none focus-visible:outline-none focus-visible:before:ring-2 focus-visible:before:ring-inset disabled:cursor-not-allowed disabled:opacity-75 dark:text-gray-400 dark:hover:text-white dark:hover:before:bg-gray-800/50 dark:focus-visible:outline-none"
									:to="item.to"
									draggable="false"
								>
									<span
										:class="
											index === 0
												? 'relative mx-[9.5px] h-full w-px bg-gray-200 after:absolute after:inset-x-0 after:z-[1] after:h-full after:w-px after:translate-y-full after:transform after:bg-gray-200 dark:bg-gray-700 after:dark:bg-gray-700'
												: index === link.children?.length - 1
													? 'relative mx-[9.5px] h-full w-px bg-gray-200 dark:bg-gray-700'
													: 'relative mx-[9.5px] h-full w-px bg-gray-200 after:absolute after:inset-x-0 after:z-[1] after:h-full after:w-px after:translate-y-full after:transform after:bg-gray-200 dark:bg-gray-700 after:dark:bg-gray-700'
										"
									>
										<span
											class="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gray-400 group-hover:bg-gray-700 dark:bg-gray-500 dark:group-hover:bg-gray-200"
										></span>
									</span>
									<span class="relative truncate text-sm">{{ item.label }}</span>
								</ULink>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</li>
	</ul>
</template>

<style scoped>
.sidebar-links {
	@apply flex flex-col gap-y-1;
}

.sidebar-link {
	display: flex;
	align-items: center;
	text-decoration: none;
	transition: background-color 0.2s ease-in-out;
	cursor: pointer;
}

.active button {
	@apply bg-gray-800 text-white;
}

.active .iconify {
	@apply text-white;
}

.sidebar-link i {
	margin-right: 8px;
}

.sidebar-link .badge {
	background-color: #ef4444;
	color: white;
	border-radius: 9999px;
	padding: 2px 8px;
	font-size: 0.75rem;
	margin-left: auto;
}

.sidebar-link .expand-icon {
	margin-left: auto;
	transition: transform 0.2s ease-in-out;
}

.sidebar-link .expand-icon.expanded {
	transform: rotate(90deg);
}

.sidebar-sub-links {
	list-style: none;
	margin: 0;
	position: relative;
}

.dot-line-container {
	position: relative;
	width: 16px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 8px; /* adjust to align the dot properly */
}

.dot-line-container::before {
	content: '';
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 1px;
	height: 100%;
	background-color: red; /* Gray line color */
}

.dot {
	width: 6px;
	height: 6px;
	background-color: #9ca3af; /* Dot color */
	border-radius: 50%;
	position: relative;
	transition: background-color 0.2s ease-in-out;
}

.UButton:hover .dot {
	background-color: #ffffff; /* Change dot color on hover */
}

.has-children > .sidebar-link {
	position: relative;
}

.has-children > .sidebar-link::after {
	content: '';
	position: absolute;
	right: 16px;
	top: 50%;
	transform: translateY(-50%);
	border: solid transparent;
	border-width: 0 4px 4px 4px;
	border-bottom-color: currentColor;
}

/* New animation styles */
.transition-max-height {
	transition-property: max-height;
}

ul[id] {
	transition: max-height 0.2s ease-in-out;
	max-height: 0;
	overflow: hidden;
}

ul[id].expanded {
	max-height: 1000px; /* Ожидаемая высота; нужно отрегулировать по необходимости */
}
</style>
