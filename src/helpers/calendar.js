//(int) current year
export const THIS_YEAR = +new Date().getFullYear();

//(int) current month starting from 1 - 12
//1 = January, 12 = December
export const THIS_MONTH = +new Date().getMonth() + 1;

//Week days names and shortnames
export const WEEK_DAYS = {
	Monday: "Mon",
	Tuesday: "Tue",
	Wednesday: "Wed",
	Thursday: "Thu",
	Friday: "Fri",
	Saturday: "Sat",
	Sunday: "Sun",
};

//Calendar months names and shortnames
export const CALENDAR_MONTHS = {
	1: "January",
	2: "February",
	3: "March",
	4: "April",
	5: "May",
	6: "June",
	7: "July",
	8: "August",
	9: "September",
	10: "October",
	11: "November",
	12: "December",
};

//Weeks that will be displayed on calendar
export const CALENDAR_WEEKS = 6;

//Inserting a string value with leading zeroes(0) until lenght is reached
export const zeroPad = (value, length) => {
	return `${value}`.padStart(length, "0");
};

//(int) Number of days in a given month for a given year from 28-31
export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
	const months30 = [4, 6, 9, 11];
	const leapYear = year % 4 === 0;
	return month === 2
		? leapYear
			? 29
			: 28
		: months30.includes(month)
		? 30
		: 31;
};

//(int) First day of the month for a given year from 1 - 7
//1 = Sunday, 7 = Saturday
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
	const dayIndex = +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay();
	return dayIndex === 0 ? 7 : dayIndex;
};

//(bool) Checks if a value is a date
export const isDate = (date) => {
	const isDate = Object.prototype.toString.call(date) === "[object Date]";
	const isValidDate = date && !Number.isNaN(date.valueOf());

	return isDate && isValidDate;
};

//(bool) Checks if two date values are of the same month and year
export const isSameMonth = (date, basedate = new Date()) => {
	if (!(isDate(date) && isDate(basedate))) return false;

	const basedateMonth = +basedate.getMonth() + 1;
	const basedateYear = basedate.getFullYear();

	const dateMonth = +date.getMonth() + 1;
	const dateYear = date.getFullYear();

	return +basedateMonth === +dateMonth && +basedateYear === +dateYear;
};

//(bool) Checks if two date values are the same day
export const isSameDay = (date, basedate = new Date()) => {
	if (!(isDate(date) && isDate(basedate))) return false;

	const basedateDate = basedate.getDate();
	const basedateMonth = +basedate.getMonth() + 1;
	const basedateYear = basedate.getFullYear();

	const dateDate = date.getDate();
	const dateMonth = +date.getMonth() + 1;
	const dateYear = date.getFullYear();

	return (
		+basedateDate === +dateDate &&
		+basedateMonth === +dateMonth &&
		+basedateYear === +dateYear
	);
};

//(string) Formats the given date as YYYY-MM-DD
//and also Months and Days are zero padded
export const getDateISO = (date = new Date()) => {
	if (!isDate(date)) return null;

	return [
		date.getFullYear(),
		zeroPad(+date.getMonth() + 1, 2),
		zeroPad(+date.getDate(), 2),
	].join("-");
};

//({month, year}) Gets the month and year before the given month and year
export const getPreviousMonth = (month, year) => {
	const prevMonth = month > 1 ? month - 1 : 12;
	const prevMonthYear = month > 1 ? year : year - 1;

	return { month: prevMonth, year: prevMonthYear };
};

//({month, year}) Gets the month and year after the given month and year
export const getNextMonth = (month, year) => {
	const nextMonth = month < 12 ? month + 1 : 1;
	const nextMonthYear = month < 12 ? year : year + 1;

	return { month: nextMonth, year: nextMonthYear };
};

//[[YYYY, MM, DD], [YYYY, MM, DD], ...] return an array of the calendar dates for specified year and month
const calendayBuilder = (month = THIS_MONTH, year = THIS_YEAR) => {
	//Get number of days in the month and the month's first day
	const monthDays = getMonthDays(month, year);
	const monthFirstDay = getMonthFirstDay(month, year);

	//Get number of days to be desplayed from previous and next months (42 days/6 weeks)
	const daysFromPrevMonth = monthFirstDay - 1;
	const daysFromNextMonth =
		CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);

	//Get the previous and next months and years
	const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
		month,
		year
	);
	const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

	//Get number of days in previous month
	const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

	//Builds dates to be displayed from previous month
	const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
		const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
		return [prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
	});

	//Builds dates to be displayed from current month
	const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
		const day = index + 1;
		return [year, zeroPad(month, 2), zeroPad(day, 2)];
	});

	//Builds dates to be displayed from next month
	const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
		const day = index + 1;
		return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
	});

	//Combines all dates from previous, current and next months
	return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};

export default calendayBuilder;
