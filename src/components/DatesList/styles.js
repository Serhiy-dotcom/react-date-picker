import styled from "styled-components";

export const DatesListContainer = styled.section`
	width: inherit;
	padding: 12px 15px;
	max-height: 112px;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const DatesListItem = styled.article`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	border-radius: 5px;
	border: 1px solid #a1cdff;
	padding: 5px;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const DatesListDash = styled.hr`
	height: 1.7px;
	width: 20px;
	background-color: #a1acb5;
	border: none;
	margin: 0 10px;
`;

export const DatesListDelete = styled.span`
	margin: 0 12px 0 auto;
	display: block;
	position: relative;
	cursor: pointer;
	width: 15px;
	height: 15px;

	&:before,
	&:after {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 2px;
		height: 15px;
		background-color: #333;
		transform: rotate(45deg) translate(-50%, -50%);
		transform-origin: top left;
		content: "";
	}

	&:after {
		transform: rotate(-45deg) translate(-50%, -50%);
	}
`;
