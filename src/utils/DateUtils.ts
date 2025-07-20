export class DateUtils {
    static formatDate(date: Date): string {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }).format(date).toUpperCase()
    }

    static displayDate(date: string): string {
        const startDate = new Date(date)
        const endDate = new Date(new Date().setDate(startDate.getDate() + 1))
        return `${DateUtils.formatDate(startDate)} → ${DateUtils.formatDate(endDate)}`
    }
}