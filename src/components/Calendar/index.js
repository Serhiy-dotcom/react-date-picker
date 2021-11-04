import React, { useState, useEffect } from "react";
import PropTypes, { nominalTypeHack } from "prop-types";
import * as Styled from "./styles.js";
import { getDateISO } from "../../helpers/calendar";
import Datepicker from "../Datepicker/index.js";

function Calendar({ type }) {
	const [date, setDate] = useState(
		type === "single" ? new Date() : [new Date(), new Date()]
	);
	const [showDatepicker, setShowDatepicker] = useState(false);

	useEffect(() => {
		setDate(type === "single" ? new Date() : [new Date(), new Date()]);
	}, []);

	const changeCurrentDate = (newDate) => {
		type === "single"
			? setDate(new Date(+newDate.year, +newDate.month - 1, +newDate.day))
			: setDate([
					new Date(
						+newDate[0].year,
						+newDate[0].month - 1,
						+newDate[0].day
					),
					new Date(
						+newDate[1].year,
						+newDate[1].month - 1,
						+newDate[1].day
					),
			  ]);
		setShowDatepicker(false);
	};

	return (
		<Styled.CalendarContainer>
			<Styled.CalendarHeader>
				<Styled.CalendarDate>
					{date
						? type === "single"
							? getDateISO(date)
							: getDateISO(date[0])
						: getDateISO(new Date())}
				</Styled.CalendarDate>

				{type !== "single" && (
					<>
						<Styled.CalendarDash />

						<Styled.CalendarDate>
							{date
								? getDateISO(date[1])
								: getDateISO(new Date())}
						</Styled.CalendarDate>
					</>
				)}

				<Styled.CalendarArrow
					onClick={() => setShowDatepicker(!showDatepicker)}
					style={{
						transform: `rotate(${
							showDatepicker ? "225" : "45"
						}deg)`,
						marginLeft: `${type !== "single" ? "20px" : "0"}`,
					}}
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
	);
}

Calendar.propTypes = {
	type: PropTypes.string,
};

export default Calendar;
