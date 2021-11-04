import styled from "styled-components";

export const CalendarContainer = styled.section`
	display: flex;
	flex-direction: column;
`;

export const CalendarHeader = styled.article`
	display: flex;
	justify-content: space-between;
	margin: 12px 15px;
	align-items: center;
`;

export const CalendarDate = styled.span`
	padding: 7px 20px 7px 10px;
	border-radius: 5px;
	border: 1px solid #a1cdff;
	font-size: 20px;
	color: #77808a;
`;

export const CalendarArrow = styled.i`
	border: solid #9ea9b3;
	height: fit-content;
	width: auto;
	margin-right: 20px;
	border-width: 0 3px 3px 0;
	display: inline-block;
	padding: 4px;
	cursor: pointer;
`;

export const Calendarhr = styled.hr`
	background-color: #e6eaed;
	height: 1px;
	border: none;
	width: 100%;
	margin: 0;
`;

export const CalendarDash = styled.hr`
	height: 2px;
	width: 20px;
	background-color: #a1acb5;
	border: none;
	margin: 0 10px;
`;
