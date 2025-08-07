export interface ISidebarItem {
	title: string
	route?: string
	type?: 'link' | 'button'
	icon: string
	activeIcon?: string
}

export interface SidebarGroup {
	title: string
	items: ISidebarItem[]
}

export const sidebarConfig: SidebarGroup[] = [
	{
		title: 'Личная информация',
		items: [
			{
				title: 'Главная',
				route: '/profile',
				icon: '/icons/sidebar/home_gray.svg',
				activeIcon: '/icons/sidebar/home_white.svg',
				type: 'link',
			},
			{
				title: 'Баланс средств',
				route: '/balance',
				icon: '/icons/sidebar/balance_gray.svg',
				activeIcon: '/icons/sidebar/balance_white.svg',
				type: 'link',
			},
		],
	},
	{
		title: 'Покупки',
		items: [
			{
				title: 'Мои заказы',
				route: '/Orders',
				icon: '/icons/sidebar/orders-inactive.svg',
				type: 'link',
			},
			{
				title: 'Мои возвраты',
				route: '/returns',
				icon: '/icons/sidebar/returns-inactive.svg',
				type: 'link',
			},
			{
				title: 'Корзина',
				route: '/basket',
				icon: '/icons/sidebar/basket-inactive.svg',
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
				icon: '/icons/sidebar/reviews-inactive.svg',
				activeIcon: '/icons/sidebar/reviews-active.svg',
				type: 'link',
			},
		],
	},
	{
		title: 'Для продавца',
		items: [
			{
				title: 'Стать продавцом',
				route: '/aboutBecSeller',
				icon: '/icons/sidebar/seller_home.svg',
				activeIcon: '/icons/sidebar/seller_home_white.svg',
				type: 'button',
			},
			{
				title: 'Мои продажи',
				route: '/sales',
				icon: '/icons/sidebar/arrow-left-top.svg',
				activeIcon: '/icons/sidebar/arrow-left-top_white.svg',
				type: 'link',
			},
			{
				title: 'Мой счёт',
				route: '/sellerAccount',
				icon: '/icons/sidebar/dollar1svg.svg',
				activeIcon: '/icons/sidebar/dollar_white.svg',
				type: 'link',
			},
			{
				title: 'Добавить товар',
				route: '/addNewProduct',
				icon: '/icons/sidebar/plus.svg',
				activeIcon: '/icons/sidebar/plus_white.svg',
				type: 'link',
			},
		],
	},
]
