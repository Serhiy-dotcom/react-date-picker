import styled from "styled-components";

export const MonthSwitcher = styled.div`
	margin: 0 auto;
	margin: 20px 0px 5px;
	display: flex;
	justify-content: center;
`;

export const MonthSwitcherHeader = styled.div`
	color: #275b93;
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: center;
`;

export const MonthSwitcherMonth = styled.h2`
	padding: 0 30px;
	margin: 0;
	width: 80%;
	text-align: center;
`;

export const MonthSwitcherTriangle = styled.div`
	width: 12%;
	height: 0;
	border-top: 7px solid transparent;
	border-bottom: 7px solid transparent;
	cursor: pointer;
`;

export const MonthSwitcherRight = styled(MonthSwitcherTriangle)`
	border-left: 7px solid #66aeff;
`;

export const MonthSwitcherLeft = styled(MonthSwitcherTriangle)`
	border-right: 7px solid #66aeff;
`;
