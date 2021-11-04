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
						day: _date[1].getDate() + 2, //remove "+ 2" don't forget
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

	const handleDatePick = (day) => {
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
						: [
								date[0],
								{
									year: item.year,
									month: item.month,
									day: item.day,
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

	useEffect(() => {
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
									  +day.month <= +date[1].month
									? "active in-between"
									: "active"
								: ""
						}
						onClick={() => handleDatePick(day)}
					>
						{day.day}
					</Styled.DatepickerDate>
				))}
			</Styled.DatepickerDates>

			<Calendarhr />

			<Apply changeCurrentDate={changeCurrentDate} date={date} />
		</>
	);
}

Datepicker.propTypes = {
	_date: PropTypes.instanceOf(Date),
	changeCurrentDate: PropTypes.func,
	type: PropTypes.string,
};

export default Datepicker;
