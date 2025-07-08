export const formatDate = (date: Date) =>
	date.toLocaleDateString('ru-RU', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

export function parseDate(value: string | Date): Date {
    return new Date(value)
}