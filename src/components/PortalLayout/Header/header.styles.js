import styled  from 'styled-components';

const HeaderContainer = styled.div`
  background: #f8f8f8;
  height: 4em;
  display: flex;
  flex-direction: row;
  align-items: center;
  & .title-header {
  	padding-left: 1em;
  	font-weight: bold;
  	font-size: 26px;
  	color: green;
  	white-space: nowrap;
  	cursor: pointer;
  }
  & .wrap-account {
  	display: flex;
  	justify-content: flex-end;
  	width: 100%;
  	position: relative;
  	margin-right: 1em;
  	& .name-account {
  		font-size: 18px;
  		cursor: pointer;
  	}
  	& .wrap-setting {
			position: absolute;
			background: white;
			border-radius: 10px;
			border: 1px solid gray;
			cursor: pointer;
			top: 25px;
			div {
				padding: 0.5em 1em;
				border-bottom: 1px solid gray;
			}
			div:last-child {
				border-bottom: 0;
			}
			div:hover {
				color: green
			}
		}
  }
`;
const UpdateProfile = styled.div`
	margin-right: 1em;
	cursor: pointer;
	&:hover {
		color: yellow
	}
	
`
export {
	HeaderContainer,
	UpdateProfile
}