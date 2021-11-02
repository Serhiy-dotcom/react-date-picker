import React, { useState, useEffect } from "react";
import * as Styled from "./styles.js";
import { getDateISO } from "../../helpers/calendar";
import Datepicker from "../Datepicker/index.js";

function Calendar() {
	const [date, setDate] = useState(new Date());
	const [showDatepicker, setShowDatepicker] = useState(false);

	useEffect(() => {
		setDate(new Date());
	}, []);

	const changeCurrentDate = ({ year, month, day }) => {
		console.log(year, month, day);
		setDate(new Date(+year, +month - 1, +day));
		setShowDatepicker(false);
	};

	return (
		<Styled.CalendarContainer>
			<Styled.CalendarHeader>
				<Styled.CalendarDate>
					{date ? getDateISO(date) : getDateISO(new Date())}
				</Styled.CalendarDate>

				<Styled.CalendarArrow
					onClick={() => setShowDatepicker(!showDatepicker)}
					style={{
						transform: `rotate(${
							showDatepicker ? "225" : "45"
						}deg)`,
					}}
				/>
			</Styled.CalendarHeader>

			<hr
				style={{
					backgroundColor: "#E6EAED",
					height: "1px",
					border: "none",
					width: "100%",
					margin: "0",
				}}
			/>

			{showDatepicker && (
				<Datepicker
					_date={date}
					changeCurrentDate={changeCurrentDate}
				/>
			)}
		</Styled.CalendarContainer>
	);
}

export default Calendar;
