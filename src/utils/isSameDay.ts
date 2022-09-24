export function isSameDay(day: number, dateToCompare: Date, style: string): string {
    const liStyle = day === new Date().getDate() && dateToCompare.getMonth() === new Date().getMonth() ? style : ''
    
    return liStyle
}