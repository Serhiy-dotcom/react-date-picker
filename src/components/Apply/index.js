import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./styles.js";

function Apply({ changeCurrentDate, date, type }) {
	const handleApply = () => {
		type === "single"
			? changeCurrentDate(date)
			: +date[1].day.length !== 0 &&
			  +date[1].month.length !== 0 &&
			  +date[1].year.length !== 0 &&
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
