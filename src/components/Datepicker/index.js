import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import calendar, { WEEK_DAYS } from "../../helpers/calendar.js";
import * as Styled from "./styles.js";
import { Calendarhr } from "../Calendar/styles.js";
import MonthSwitcher from "../MonthSwitcher/index.js";
import Apply from "../Apply/index.js";

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
	}, [_date]);

	useEffect(() => {
		setDays(
			[...calendar(monthYear.month, monthYear.year)].map((item) => {
				return type === "single"
					? {
							...item,
							current:
								+item.year === +date.year
									? +item.month === +date.month
										? +item.day === +date.day && true
										: false
									: false,
					  }
					: {
							...item,
							current:
								+item.year === +date[0].year ||
								+item.year === +date[1].year
									? +item.month === +date[0].month ||
									  +item.month === +date[1].month
										? (+item.day === +date[0].day ||
												+item.day === +date[1].day) &&
										  true
										: false
									: false,
					  };
			})
		);
	}, [monthYear, date, type]);

	const handleDatePick = (day, e) => {
		if (!e.target.classList.contains("active")) return;
		for (const item of days) {
			if (item.month === day.month && item.day === day.day) {
				setDate(
					type === "single"
						? {
								year: item.year,
								month: item.month,
								day: item.day,
						  }
						: (date[1].year !== "" &&
								date[1].month !== "" &&
								date[1].day !== "") ||
						  (+item.year <= +date[0].year &&
								+item.month <= +date[0].month &&
								+item.day < +date[0].day)
						? [
								{
									year: item.year,
									month: item.month,
									day: item.day,
								},
								{
									year: "",
									month: "",
									day: "",
								},
						  ]
						: +item.month === +date[0].month
						? [
								date[0],
								{
									year: item.year,
									month: item.month,
									day: item.day,
								},
						  ]
						: [
								{
									year: item.year,
									month: item.month,
									day: item.day,
								},
								{
									year: "",
									month: "",
									day: "",
								},
						  ]
				);
			}
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
							+item.year !== +date[0].year &&
							+item.year !== +date[1].year &&
							+item.month !== +date[0].month &&
							+item.month !== +date[1].month &&
							+item.day !== +date[0].day &&
							+item.day !== +date[1].day
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
					<Styled.DatepickerDate
						key={day.year + day.month + day.day}
						className={
							type === "single"
								? +day.month === +monthYear.month
									? day.current === true
										? "active current"
										: "active"
									: ""
								: +day.month === +monthYear.month
								? day.current === true
									? "active current"
									: +day.day > +date[0].day &&
									  +day.day < +date[1].day &&
									  +day.month >= +date[0].month &&
									  +day.month <= +date[1].month &&
									  +day.year >= +date[0].year &&
									  +day.year <= +date[1].year
									? "active in-between"
									: "active"
								: ""
						}
						onClick={(e) => handleDatePick(day, e)}
					>
						{day.day}
					</Styled.DatepickerDate>
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
