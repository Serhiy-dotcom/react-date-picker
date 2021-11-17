import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as Styled from "./styles.js";
import { getDateISO } from "../../helpers/calendar.js";

function DatesList({ date, deleteDate }) {
	return (
		<Styled.DatesListContainer>
			{date.map(elem => (
				<Styled.DatesListItem
					key={elem.id}
					onClick={() => deleteDate(elem.id)}
				>
					{getDateISO(elem.startDate)} <Styled.DatesListDash />{" "}
					{getDateISO(elem.endDate)}
					<Styled.DatesListDelete />
				</Styled.DatesListItem>
			))}
		</Styled.DatesListContainer>
	);
}

DatesList.propTypes = {
	date: PropTypes.array,
	deleteDate: PropTypes.func,
};

export default DatesList;
