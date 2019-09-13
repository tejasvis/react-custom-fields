
import styled from 'styled-components'
import * as colors from 'css/Colors'

const defaultFontSize = 16
export const CustomizeCheckBox = styled.label`
display: block;
position: relative;
padding-left: ${35/defaultFontSize}rem;
margin-bottom: ${12/defaultFontSize}rem;
cursor: pointer;
user-select: none;

/* browser's default checkbox is to hide*/
 input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/*  custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: ${25/defaultFontSize}rem;
  width: ${25/defaultFontSize}rem;
  border:  1px solid ${colors.primaryBlue};
  background-color: #FFFFFF;
}

/*checkmark (hidden by default/when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* checkmark when checked */
 input:checked ~ .checkmark:after {
  display: block;
}

.checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid  ${colors.primaryBlue};
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
  `