import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./styles.js";
import {
	isBetweenDates,
	getDateObj,
	isSameDate,
} from "../../../helpers/calendar.js";

function Date({ day, monthYear, date, prevDates, handleDatePick, type }) {
	return (
		<Styled.Date
			className={
				type === "single"
					? +day.month === +monthYear.month
						? day.current === true
							? "active current"
							: "active"
						: ""
					: type === "range"
					? +day.month === +monthYear.month
						? day.current === true
							? "active current"
							: isBetweenDates(day, date.startDate, date.endDate)
							? "active in-between"
							: "active"
						: ""
					: +day.month === +monthYear.month
					? day.current === true
						? "active current"
						: isBetweenDates(day, date.startDate, date.endDate)
						? "active in-between"
						: prevDates.some(elem =>
								isBetweenDates(
									day,
									getDateObj(elem.startDate),
									getDateObj(elem.endDate)
								)
						  )
						? "active picked"
						: prevDates.some(
								elem =>
									isSameDate(
										day,
										getDateObj(elem.startDate)
									) ||
									isSameDate(day, getDateObj(elem.endDate))
						  )
						? "active currented"
						: "active"
					: ""
			}
			onClick={e => handleDatePick(day, e)}
		>
			{day.day}
		</Styled.Date>
	);
}

Date.propTypes = {
	day: PropTypes.object,
	monthYear: PropTypes.object,
	date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.array]),
	prevDates: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	handleDatePick: PropTypes.func,
	type: PropTypes.string,
};

export default Date;
