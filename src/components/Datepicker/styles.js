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

export const DatepickerDate = styled(DatepickerCell)`
	font-size: 17px;
	font-weight: normal;
	color: #adb6be;
	font-weight: 500;
	cursor: pointer;

	&.active {
		color: #333;
		border-radius: 3px;

		&.current {
			background-color: #0f5099;
			color: #fff;
		}

		&.in-between {
			background-color: #e5f1ff;
			color: #346caa;
		}
	}
`;
