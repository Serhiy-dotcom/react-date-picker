import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./styles.js";

function Apply({ changeCurrentDate, date }) {
	return (
		<Styled.ApplyBtn onClick={() => changeCurrentDate(date)}>
			Apply
		</Styled.ApplyBtn>
	);
}

Apply.propTypes = {
	changeCurrentDate: PropTypes.func,
	date: PropTypes.object,
};

export default Apply;
