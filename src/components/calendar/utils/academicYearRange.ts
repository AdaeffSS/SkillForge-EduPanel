const getAcademicYearRange = () => {
    const now = new Date()
    const year = now.getFullYear()

    const septThisYear = new Date(year, 8, 1)
    const septLastYear = new Date(year - 1, 8, 1)

    const juneMidThisYear = new Date(year, 5, 15)
    const juneMidNextYear = new Date(year + 1, 5, 15)

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

export default getAcademicYearRange