import styled from "styled-components";

export const Date = styled.span`
	text-transform: uppercase;
	text-align: center;
	height: 40px;
	align-items: center;
	display: flex;
	justify-content: center;
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
