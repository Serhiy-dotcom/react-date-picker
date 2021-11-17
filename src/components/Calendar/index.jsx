import React, { useState, useEffect } from "react";
import * as Styled from "./styles.js";
import PropTypes from "prop-types";
import { getDateISO } from "../../helpers/calendar";
import Datepicker from "../Datepicker/index.jsx";
import DatesList from "../DatesList/index.jsx";

function Calendar({ type }) {
	const [date, setDate] = useState(
		type === "single"
			? new Date()
			: [{ id: 1, startDate: new Date(), endDate: new Date() }]
	);
	const [showDatepicker, setShowDatepicker] = useState(false);

	const changeCurrentDate = newDate => {
		type === "single"
			? setDate(new Date(+newDate.year, +newDate.month - 1, +newDate.day))
			: setDate([
					...date,
					{
						id: date[date.length - 1].id + 1,
						startDate: new Date(
							+newDate.startDate.year,
							+newDate.startDate.month - 1,
							+newDate.startDate.day
						),
						endDate: new Date(
							+newDate.endDate.year,
							+newDate.endDate.month - 1,
							+newDate.endDate.day
						),
					},
			  ]);

		if (type === "single" || type === "range") {
			setShowDatepicker(false);
		}
	};

	const deleteDate = id => {
		if (date.length > 1) {
			setDate(date.filter(elem => elem.id !== id));
		}
	};

	return (
		<>
			{type === "multiRange" && (
				<DatesList date={date} deleteDate={deleteDate} />
			)}
			<Styled.CalendarContainer>
				<Styled.CalendarHeader>
					<Styled.CalendarDate>
						{date
							? type === "single"
								? getDateISO(date)
								: getDateISO(date[date.length - 1].startDate)
							: getDateISO(new Date())}
					</Styled.CalendarDate>

					{type !== "single" && (
						<>
							<Styled.CalendarDash />

							<Styled.CalendarDate>
								{date
									? getDateISO(date[date.length - 1].endDate)
									: getDateISO(new Date())}
							</Styled.CalendarDate>
						</>
					)}

					<Styled.CalendarArrow
						onClick={() => setShowDatepicker(!showDatepicker)}
						showDatepicker={showDatepicker}
						moveAway={type === "single"}
					/>
				</Styled.CalendarHeader>

				<Styled.Calendarhr />

				{showDatepicker && (
					<Datepicker
						_date={date}
						changeCurrentDate={changeCurrentDate}
						type={type}
					/>
				)}
			</Styled.CalendarContainer>
		</>
	);
}

Calendar.propTypes = {
	type: PropTypes.string,
};

export default Calendar;
