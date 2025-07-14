export function useShowToast(message: string, title: string = 'Отлично!') {
	const toast = useToast()

	toast.settings({
		color: '#000000',
		titleColor: '#000000',
		messageColor: '#000000',
		backgroundColor: '#9AE600',
	})

	toast.success({
		title: title,
		message: message,
	})
}
