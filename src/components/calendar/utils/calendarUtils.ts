export const getAcademicYearRange = () => {
    const now = new Date()
    const year = now.getFullYear()

    const septThisYear = new Date(year, 8, 1)
    const septLastYear = new Date(year - 1, 8, 1)

    const juneMidThisYear = new Date(year, 7, 15)
    const juneMidNextYear = new Date(year + 1, 7, 15)

    const academicYearStart = now >= septThisYear ? septThisYear : septLastYear
    const juneMid = now <= juneMidThisYear ? juneMidThisYear : juneMidNextYear

    function getMonday(date: Date) {
        const d = new Date(date)
        const day = d.getDay() || 7
        if (day !== 1) {
            d.setDate(d.getDate() - (day - 1))
        }
        return d
    }
    function getSunday(date: Date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = day === 0 ? 0 : day;
        d.setDate(d.getDate() - diff);
        return d;
    }

    const startMonday = getMonday(academicYearStart)
    const endMonday = getSunday(juneMid)

    return { start: startMonday, end: endMonday }
}

export const getDayOfWeek = (date: Date): number => {
    const jsDay = date.getDay();
    return jsDay === 0 ? 7 : jsDay;
};

export const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export const generateWeeks = (start: Date, end: Date): (Date | null)[][] => {
    const days: Date[] = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        days.push(new Date(d));
    }

    const firstDayWeek = getDayOfWeek(start);
    const emptyCellsCount = firstDayWeek - 1;
    const cells = [...Array(emptyCellsCount).fill(null), ...days];

    const weeks: (Date | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
    }
    return weeks;
};