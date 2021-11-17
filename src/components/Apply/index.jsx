import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./styles.js";

function Apply({ changeCurrentDate, date, type }) {
	const handleApply = () => {
		type === "single"
			? changeCurrentDate(date)
			: +date.endDate.day.length !== 0 &&
			  +date.endDate.month.length !== 0 &&
			  +date.endDate.year.length !== 0 &&
			  changeCurrentDate(date);
	};

	return (
		<Styled.ApplyBtn onClick={() => handleApply()}>Apply</Styled.ApplyBtn>
	);
}

Apply.propTypes = {
	changeCurrentDate: PropTypes.func,
	date: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	type: PropTypes.string,
};

export default Apply;
