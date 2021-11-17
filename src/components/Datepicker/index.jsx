import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import calendar, {
	WEEK_DAYS,
	isSameDate,
	isDateValid,
	getDateObj,
} from "../../helpers/calendar.js";
import * as Styled from "./styles.js";
import { Calendarhr } from "../Calendar/styles.js";
import MonthSwitcher from "../MonthSwitcher/index.jsx";
import Apply from "../Apply/index.jsx";
import Date from "./Date/index.jsx";

function Datepicker({ _date, changeCurrentDate, type }) {
	const [days, setDays] = useState([]);
	const [monthYear, setMonthYear] = useState({});
	const [date, setDate] = useState(
		type === "single"
			? getDateObj(_date)
			: {
					id: _date[_date.length - 1].id,
					startDate: getDateObj(_date[_date.length - 1].startDate),
					endDate: getDateObj(_date[_date.length - 1].endDate),
			  }
	);

	useEffect(() => {
		setMonthYear(
			type === "single"
				? {
						year: _date.getFullYear(),
						month: _date.getMonth() + 1,
				  }
				: {
						year: _date[_date.length - 1].startDate.getFullYear(),
						month: _date[_date.length - 1].startDate.getMonth() + 1,
				  }
		);
	}, [_date, type]);

	useEffect(() => {
		setDays(
			[...calendar(monthYear.month, monthYear.year)].map(item => {
				return type === "single"
					? {
							...item,
							current: isSameDate(item, date) ? true : false,
					  }
					: {
							...item,
							current:
								isSameDate(item, date.startDate) ||
								isSameDate(item, date.endDate),
					  };
			})
		);
	}, [monthYear, date, type]);

	const handleDatePick = (day, e) => {
		if (!e.target.classList.contains("active")) return;
		if (type === "single") {
			setDate({
				year: day.year,
				month: day.month,
				day: day.day,
			});
		} else {
			if (
				isDateValid(date.endDate) ||
				(+day.year <= +date.startDate.year &&
					+day.month <= +date.startDate.month &&
					+day.day < +date.startDate.day) ||
				(+day.year <= +date.startDate.year &&
					+day.month < +date.startDate.month)
			) {
				setDate({
					id: date.id + 1,
					startDate: {
						year: day.year,
						month: day.month,
						day: day.day,
					},
					endDate: {
						year: "",
						month: "",
						day: "",
					},
				});
			} else {
				let local = date;
				local.endDate = {
					year: day.year,
					month: day.month,
					day: day.day,
				};

				setDate(local);
			}
		}

		setDays(
			days.map(item => {
				if (item.month === day.month && item.day === day.day) {
					item.current = true;
				} else {
					if (type === "single") {
						item.current = false;
					} else {
						if (
							isSameDate(item, date.startDate) ||
							isSameDate(item, date.endDate)
						) {
							item.current = true;
						} else {
							item.current = false;
						}
					}
				}

				return item;
			})
		);
	};

	const changeMonthYear = ({ month, year }) => {
		setMonthYear({ year, month });
	};

	return (
		<>
			<MonthSwitcher
				changeMonthYear={changeMonthYear}
				monthYear={monthYear}
			/>

			<Styled.DatepickerDates>
				{Object.values(WEEK_DAYS).map(weekDay => (
					<Styled.DatepickerDay key={weekDay}>
						{weekDay}
					</Styled.DatepickerDay>
				))}

				{days.map(day => (
					<Date
						key={day.year + day.month + day.day}
						day={day}
						monthYear={monthYear}
						date={date}
						prevDates={_date}
						handleDatePick={handleDatePick}
						type={type}
					/>
				))}
			</Styled.DatepickerDates>

			<Calendarhr />

			<Apply
				changeCurrentDate={changeCurrentDate}
				date={date}
				type={type}
			/>
		</>
	);
}

Datepicker.propTypes = {
	_date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.array]),
	changeCurrentDate: PropTypes.func,
	type: PropTypes.string,
};

export default Datepicker;
