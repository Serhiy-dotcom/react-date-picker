import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./styles.js";
import {
	CALENDAR_MONTHS,
	getPreviousMonth,
	getNextMonth,
} from "../../helpers/calendar.js";

function MonthSwitcher({ changeMonthYear, monthYear }) {
	const handlePrevMonth = () => {
		changeMonthYear(getPreviousMonth(+monthYear.month, +monthYear.year));
	};

	const handleNextMonth = () => {
		changeMonthYear(getNextMonth(+monthYear.month, +monthYear.year));
	};

	return (
		<Styled.MonthSwitcher>
			<Styled.MonthSwitcherHeader>
				<Styled.MonthSwitcherLeft onClick={() => handlePrevMonth()} />

				<Styled.MonthSwitcherMonth>
					{CALENDAR_MONTHS[monthYear.month]} {monthYear.year}
				</Styled.MonthSwitcherMonth>

				<Styled.MonthSwitcherRight onClick={() => handleNextMonth()} />
			</Styled.MonthSwitcherHeader>
		</Styled.MonthSwitcher>
	);
}

MonthSwitcher.propTypes = {
	changeMonthYear: PropTypes.func,
	monthYear: PropTypes.object,
};

export default MonthSwitcher;
