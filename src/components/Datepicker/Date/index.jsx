import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./styles.js";
import { isBetweenDates } from "../../../helpers/calendar.js";

function Date({ day, monthYear, date, handleDatePick, type }) {
	return (
		<Styled.Date
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
						: isBetweenDates(day, date[0], date[1])
						? "active in-between"
						: "active"
					: ""
			}
			onClick={(e) => handleDatePick(day, e)}
		>
			{day.day}
		</Styled.Date>
	);
}

Date.propTypes = {
	day: PropTypes.object,
	monthYear: PropTypes.object,
	date: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	handleDatePick: PropTypes.func,
	type: PropTypes.string,
};

export default Date;
