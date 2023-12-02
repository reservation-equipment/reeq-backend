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