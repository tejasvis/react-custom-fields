import { primaryBlue } from 'css/Colors'

import styled from 'styled-components'


const CustomizedRadio=styled.label`
margin-left: 10px;
cursor:pointer;

& input{
    position: absolute;
    opacity:0;
  }

/*custom radio button on span class*/
.checked-circle{
  position:relative;
  display:inline-block;
  float:left;
  height: 25px;
  width: 25px;
  background-color: #FFFFFF;
  border-radius:50%;
  border: 1px solid  ${primaryBlue};
}

&  input:hover + span  {
  background-color: #FFFFFF;
}

& input:checked + span{
  background-color: #FFFFFF;
}

/* the indicator  inside(the circle - hidden when not checked) */
.checked-circle::after {
  content: "";
  display: none;
}

/* Shows the inner circle when checked */
input:checked + span::after  {
  display: block;
}

/* inner circle style when checked */
 .checked-circle::after {
  position: absolute;
  top: 7px;
  left: 7px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background:${primaryBlue};
}`

export default CustomizedRadio