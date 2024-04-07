import moment from 'moment'
export const convertToMilliseconds = (value: number, format: string) => {
    switch (format) {
        case 'd':
            return value * 24 * 3600 * 1000
        case 'h':
            return value * 3600 * 1000
        case 'min':
            return value * 60 * 1000
        case 'sec':
            return value * 1000
    }
}


/**
 * Определяет, пересекаются ли диапазоны времени
 * @param range1
 * @param range2
 */
export function rangesIntersect(range1: any, range2: any) {
    const [start1, end1] = range1.map((value: string) => moment(value, 'YYYY-MM-DD HH:mm'));
    const [start2, end2] = range2.map((value: string) => moment(value, 'YYYY-MM-DD HH:mm'));
    
    // Проверяем пересечение по времени и дате
    return (
        (end1.isSameOrBefore(start2)) ||
        (start1.isSameOrAfter(end2))
    );
}

/**
 * Форматирует дату и диапазон времени в формат [date time_from, date time_to]
 * @param date
 * @param time_from
 * @param time_to
 */
export function formatDateTime(date: Date, time_from: string, time_to: string) {
    const format_date = date.toISOString().split('T')[0];
    
    const formattedTo = `${format_date} ${time_to}`;
    const formattedFrom = `${format_date} ${time_from}`;
    
    return [formattedFrom, formattedTo];
}