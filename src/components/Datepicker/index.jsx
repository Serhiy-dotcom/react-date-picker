import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import calendar, {
	WEEK_DAYS,
	isSameDate,
	isDateValid,
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
			? {
					year: _date.getFullYear(),
					month: _date.getMonth() + 1,
					day: _date.getDate(),
			  }
			: [
					{
						year: _date[0].getFullYear(),
						month: _date[0].getMonth() + 1,
						day: _date[0].getDate(),
					},
					{
						year: _date[1].getFullYear(),
						month: _date[1].getMonth() + 1,
						day: _date[1].getDate(),
					},
			  ]
	);

	useEffect(() => {
		setMonthYear(
			type === "single"
				? {
						year: _date.getFullYear(),
						month: _date.getMonth() + 1,
				  }
				: {
						year: _date[0].getFullYear(),
						month: _date[0].getMonth() + 1,
				  }
		);
	}, [_date, type]);

	useEffect(() => {
		setDays(
			[...calendar(monthYear.month, monthYear.year)].map((item) => {
				return type === "single"
					? {
							...item,
							current: isSameDate(item, date) ? true : false,
					  }
					: {
							...item,
							current:
								isSameDate(item, date[0]) ||
								isSameDate(item, date[1])
									? true
									: false,
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
		} else if (
			isDateValid(date[1]) ||
			(+day.year <= +date[0].year &&
				+day.month <= +date[0].month &&
				+day.day < +date[0].day)
		) {
			setDate([
				{
					year: day.year,
					month: day.month,
					day: day.day,
				},
				{
					year: "",
					month: "",
					day: "",
				},
			]);
		} else {
			setDate([
				date[0],
				{
					year: day.year,
					month: day.month,
					day: day.day,
				},
			]);
		}

		setDays(
			days.map((item) => {
				if (item.month === day.month && item.day === day.day) {
					item.current = true;
				} else {
					if (type === "single") {
						item.current = false;
					} else {
						if (
							!isSameDate(item, date[0]) &&
							!isSameDate(item, date[1])
						) {
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

	useEffect(() => {
		console.log(days);
		console.log(date);
	});

	return (
		<>
			<MonthSwitcher
				changeMonthYear={changeMonthYear}
				monthYear={monthYear}
			/>

			<Styled.DatepickerDates>
				{Object.values(WEEK_DAYS).map((weekDay) => (
					<Styled.DatepickerDay key={weekDay}>
						{weekDay}
					</Styled.DatepickerDay>
				))}

				{days.map((day) => (
					<Date
						key={day.year + day.month + day.day}
						day={day}
						monthYear={monthYear}
						date={date}
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
