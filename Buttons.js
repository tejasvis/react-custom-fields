import styled from 'styled-components'
import {css} from 'styled-components'
import iconClose from 'images/icon-close.svg'
import { primaryYellow, primaryBlue, secondaryMediumBlue, darkGray, darkGold, borderGray } from 'css/Colors'


/**
 * -----------------------------------------------------------------------------
 * HOW TO USE THIS FILE
 * -----------------------------------------------------------------------------
 * Scroll to the bottom and look for the "offical" variant components
 * ONLY use those
 * UNLESS you want to customize a button that isn't in the styleguide
 * THEN use the "builder" styled-component StyledButton
 *
 * The "official" variants can be used as examples of how to customize a component,
 * or just override the styles yourself with styled-components
 *
 * Basic usage of these styles assumes you want a <button />
 * To create an anchor or Link (react router), use the "as" polymorphic prop:
 * https://www.styled-components.com/docs/api#as-polymorphic-prop
 * -----------------------------------------------------------------------------
 */
const defaultFontSize = 16;

// some numbers used for calculating sizes
// create a ThemeProvider already
const largeDefaults = {
  buttonHeight: 50,
  fontSize: 16,
  lineHeight: (19/16),
  paddingHorizontal:30,
  paddingVertical: 0
}

const smallDefaults = {
  buttonHeight: 40,
  fontSize:14,
  lineHeight:(19/14),
  paddingHorizontal:20,
  paddingVertical: 0
}

const mobileDefaults = {
  buttonHeight: 40,
  fontSize:14,
  lineHeight:(19/14),
  paddingHorizontal:14,
  paddingVertical: 0
}

export const StyledButton = styled.button`
  display:inline-flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  box-sizing:border-box;
  font-weight:600;
  text-transform:uppercase;
  text-decoration:none;
  white-space:nowrap;
  vertical-align:middle;
  cursor:pointer;

  border: 1px solid ${ props => props.borderColor || "#000000" };
  color: ${ props => props.fontColor || "#000000" };
  background-color: ${ props => props.bgColor || "transparent" };
  border-radius:3px;

  &[disabled] {
    background-color: ${ borderGray };
    color: #FFFFFF;
    border-color: ${ borderGray};
    cursor:default;

    &:hover {
      background-color: ${ borderGray };
      color: #FFFFFF;
      border-color: ${ borderGray};
    }
  }

  > * {
    display:inline-block;
    vertical-align:middle;
    margin:0 0.15rem;
  }

  /* hover, focus state */
  &:hover, &:focus {
    border-color:${ props => props.borderColorHover || props.borderColor || "#000000" };
    color: ${ props => props.fontColorHover || props.fontColor || "#FFFFFF" };
    background-color: ${ props => props.bgColorHover || props.bgColor || "#000000" };
  }



  ${props => {
    // these are the values that change between small and large variants
    let useDefaults = largeDefaults
    if (props.isSmall) {
      useDefaults = smallDefaults
    }
    let sizing = props.isSquare?
      `width:${ useDefaults.buttonHeight/defaultFontSize }rem;`
      : `padding:${ useDefaults.paddingVertical/defaultFontSize }rem ${ useDefaults.paddingHorizontal/defaultFontSize }rem ${ useDefaults.paddingVertical/defaultFontSize }rem;`

    return `
  font-size:${ useDefaults.fontSize/defaultFontSize }rem;
  line-height:${ useDefaults.lineHeight };

  height:${ useDefaults.buttonHeight/defaultFontSize }rem;
  ${ sizing }
  `
  }}

  

${props =>  (props.icon || props.glyph) && css`
  &:${props => props.order && props.order === 'after' ? "after" : "before"} {
    display:inline-block;
    vertical-align:middle;
    height:1.0625rem;
    width:1.0625rem;
    margin:0 0.15rem;
    background-size:contain;
    background-repeat:no-repeat;
    background-position:50% 50%;

    content:${props => props.glyph ? props.glyph : '\'\''};
    background-image:${ props => props.icon ? `url("${props.icon}")` : "''"};

}`
}
`

/* These are the "official" variants used in the styleguide */
export const FilledYellow = styled( StyledButton )`
  border-color: ${ primaryYellow };
  color: ${ secondaryMediumBlue };
  background-color: ${ primaryYellow };

  /* hover, focus state */
  &:hover, &:focus {
    border-color:${ darkGold };
    color:${ secondaryMediumBlue };
    background-color: ${ darkGold };
  }
`

export const FilledBlue = styled( StyledButton )`
  border-color: ${ props=>props.bordercolor||primaryBlue };
  color: ${ "#FFFFFF" };
  background-color: ${ primaryBlue };

  /* hover, focus state */
  &:hover, &:focus {
    border-color: ${ props=>props.bordercolor|| secondaryMediumBlue };
    background-color: ${ secondaryMediumBlue };
  }
`

export const StrokeYellow = styled( StyledButton )`
  border-color: ${ primaryYellow };
  color: ${ darkGold };

  /* hover, focus state */
  &:hover, &:focus {
    border-color:${ primaryYellow };
    color: ${ secondaryMediumBlue };
    background-color: ${ primaryYellow };
  }
`

export const StrokeBlue = styled( StyledButton )`
  border-color: ${ primaryBlue };
  color: ${ primaryBlue };

  /* hover, focus state */
  &:hover, &:focus {
    border-color:${ primaryBlue };
    color: ${ "#FFFFFF" };
    background-color: ${ primaryBlue };
  }
`


// close button used in alerts
export const CloseButton = styled.button`
  display:block;
  padding:${ 10/defaultFontSize }rem;
  border:none;
  background:url(${ iconClose }) no-repeat;
  background-size:contain;
  color:${ darkGray };
`
