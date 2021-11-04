import styled from "styled-components";

export const DatepickerDates = styled.article`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
	margin: 12px 15px;
`;

const DatepickerCell = styled.span`
	text-transform: uppercase;
	text-align: center;
	height: 40px;
	align-items: center;
	display: flex;
	justify-content: center;
`;

export const DatepickerDay = styled(DatepickerCell)`
	color: #adb6be;
	font-weight: 500;
	font-size: 13px;
`;
