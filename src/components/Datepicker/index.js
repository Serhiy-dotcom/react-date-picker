import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import calendar, { WEEK_DAYS } from "../../helpers/calendar.js";
import * as Styled from "./styles.js";
import MonthSwitcher from "../MonthSwitcher/index.js";
import Apply from "../Apply/index.js";

function Datepicker({ _date, changeCurrentDate }) {
	const [days, setDays] = useState([]);
	const [monthYear, setMonthYear] = useState({
		year: _date.getFullYear(),
		month: _date.getMonth() + 1,
	});
	const [date, setDate] = useState({
		year: _date.getFullYear(),
		month: _date.getMonth() + 1,
		day: _date.getDate(),
	});

	useEffect(() => {
		setMonthYear({
			year: _date.getFullYear(),
			month: _date.getMonth() + 1,
		});
	}, [_date]);

	useEffect(() => {
		setDays(
			[...calendar(monthYear.month, monthYear.year)].map((item) => {
				item = [
					...item,
					+item[0] === +date.year
						? +item[1] === +date.month
							? +item[2] === +date.day && true
							: false
						: false,
				];
				return item;
			})
		);
	}, [monthYear]);

	const handleDatePick = (day) => {
		setDays(
			days.map((item) => {
				if (item[1] === day[1] && item[2] === day[2]) {
					item[3] = true;
					setDate({
						year: item[0],
						month: item[1],
						day: item[2],
					});
				} else {
					item[3] = false;
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
						key={day[0] + day[1] + day[2]}
						className={
							+day[1] === +monthYear.month
								? day[3] === true
									? "active current"
									: "active"
								: ""
						}
						onClick={() => handleDatePick(day)}
					>
						{day[2]}
					</Styled.DatepickerDate>
				))}
			</Styled.DatepickerDates>

			<hr
				style={{
					backgroundColor: "#E6EAED",
					height: "1px",
					border: "none",
					width: "100%",
					margin: "0",
				}}
			/>

			<Apply changeCurrentDate={changeCurrentDate} date={date} />
		</>
	);
}

Datepicker.propTypes = {
	_date: PropTypes.instanceOf(Date),
	changeCurrentDate: PropTypes.func,
};

export default Datepicker;
