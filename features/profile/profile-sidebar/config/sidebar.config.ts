export interface SidebarItem {
	title: string
	route?: string
	type?: 'link' | 'button'
	icon: string
	activeIcon?: string
}

export interface SidebarGroup {
	title: string
	items: SidebarItem[]
}

export const sidebarConfig: SidebarGroup[] = [
	{
		title: 'Личная информация',
		items: [
			{
				title: 'Главная',
				route: '/profile',
				icon: '/icons/profile/home_gray.png',
				activeIcon: '/icons/profile/home_white.png',
				type: 'link',
			},
			{
				title: 'Баланс средств',
				route: '/balance',
				icon: '/icons/profile/balance_gray.png',
				activeIcon: '/icons/profile/balance_green.png',
				type: 'link',
			},
		],
	},
	{
		title: 'Покупки',
		items: [
			{
				title: 'Мои покупки',
				route: '/purchases',
				icon: '/icons/profile/orders_gray.png',
				type: 'link',
			},
			{
				title: 'Мои возвраты',
				route: '/returns',
				icon: '/icons/profile/star_gray.svg',
				type: 'link',
			},
			{
				title: 'Корзина',
				route: '/basket',
				icon: '/icons/profile/shoppingBasket_gray.png',
				type: 'link',
			},
		],
	},
	{
		title: 'Отзывы',
		items: [
			{
				title: 'Мои отзывы',
				route: '/reviews',
				icon: '/icons/profile/star_gray.svg',
				type: 'link',
			},
		],
	},
	{
		title: 'Для продавца',
		items: [
			{
				title: 'Стать продавцом',
				icon: '/icons/profile/confirm_gray.png',
				type: 'button',
			},
			{
				title: 'Мои продажи',
				route: '/sales',
				icon: '/icons/profile/chart_line_gray.png',
				type: 'link',
			},
			{
				title: 'Мой счёт',
				route: '/account',
				icon: '/icons/profile/dollar_gray.png',
				type: 'link',
			},
		],
	},
]
