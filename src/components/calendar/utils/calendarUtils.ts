const cachedAcademicYearRange = (() => {
    const now = new Date();
    const year = now.getFullYear();

    const septThisYear = new Date(year, 8, 1);
    const septLastYear = new Date(year - 1, 8, 1);
    const juneMidThisYear = new Date(year, 7, 15);
    const juneMidNextYear = new Date(year + 1, 7, 15);

    const academicYearStart = now >= septThisYear ? septThisYear : septLastYear;
    const juneMid = now <= juneMidThisYear ? juneMidThisYear : juneMidNextYear;

    const getMonday = (date: Date): Date => {
        const d = new Date(date);
        const day = d.getDay() || 7;
        if (day !== 1) {
            d.setDate(d.getDate() - (day - 1));
        }
        return d;
    };

    const getSunday = (date: Date): Date => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = day === 0 ? 7 : 7 - day; // Перемещаем к следующему воскресенью
        d.setDate(d.getDate() + diff);
        return d;
    };

    return {
        start: getMonday(academicYearStart),
        end: getSunday(juneMid),
    };
})();

export const getAcademicYearRange = () => cachedAcademicYearRange;

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
    let current = new Date(start);
    while (current <= end) {
        days.push(new Date(current));
        current = new Date(current.setDate(current.getDate() + 1));
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