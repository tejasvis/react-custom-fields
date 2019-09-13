import React from 'react'
import styled from 'styled-components'
//import { throttle } from 'throttle-debounce'

import Zindex from 'css/z-indexLayers.js';
import iconInfoBlue from 'images/icon-info-blue.svg'
import { primaryBlue } from 'css/Colors'

const defaultFontSize = 16

const MoreInfoStyles = styled.div`
  position: relative;
  box-sizing:border-box;
  z-index:${ props => props.isOpen && "100" };
  background:url(${ iconInfoBlue }) no-repeat;
  background-size:contain;
  background-position:center;
`

// props.socialmedia is for My Information/Contact tab Social media
const InfoButton = styled.input`
  display:block;
  height:1rem;
  width:1rem;
  margin:0;
  border:none;
  cursor:pointer;
  opacity:0;


  & ~ label {
    display:none;
    position:absolute;
    top:${props => props.socialmedia?`${-300/defaultFontSize}rem`:"100%"};
    left:${props => props.socialmedia?`${20/defaultFontSize}rem`:""};
    margin-top:${ 12/defaultFontSize }rem;
    z-index:100;
    min-width:${props => props.socialmedia?`${ 454/defaultFontSize }rem`:`${ 250/defaultFontSize }rem`};
    transform:${props => !props.socialmedia && "translate(calc(-50% + .5rem), 0 )"};

    border:1px solid ${ primaryBlue };
    background-color:#FFFFFF;
    padding:${ 11/defaultFontSize }rem ${ 14/defaultFontSize }rem ${ 11/defaultFontSize }rem ${ 20/defaultFontSize }rem;
    box-shadow: ${ 3/defaultFontSize }rem ${ 3/defaultFontSize }rem ${ 10/defaultFontSize }rem 0 rgba(0,0,0,0.2);

    font-size:${ 14/defaultFontSize }rem;
    line-height:${ 20/14 };
    text-align:left;

    & img{
      width:100%;
    }

    &:before {
      content:'';
      display:block;
      position:absolute;
      top:${props => props.socialmedia? `calc(50% - ${(5/defaultFontSize)}rem - 1px)`:`calc(-1px - ${(5/defaultFontSize)}rem )`};
      left:${props => props.socialmedia? `calc(-1px - ${(5/defaultFontSize)}rem )`:`calc(50% - ${(5/defaultFontSize)}rem - 1px)`};
      transform:rotate(45deg);
      background:#FFFFFF;
      height:${(10/defaultFontSize)}rem;
      width:${(10/defaultFontSize)}rem;
      border-top:1px solid ${props => !props.socialmedia?primaryBlue:"#FFFFFF" };
      border-left:1px solid ${ primaryBlue };
      border-right:1px solid #FFFFFF;
      border-bottom:1px solid ${props => props.socialmedia?primaryBlue:"#FFFFFF" };
    }
  }

   &:focus ~ label {
    display:block;
  }`

export default class MoreInfo extends React.Component {
  constructor( props ) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.timeOutId = null
    this.inputRef = React.createRef();

  }


  togglePopover = (e) => {

    if (this.state.isOpen) {
      this.inputRef.current.blur()
    } else {
      this.inputRef.current.focus()
    }
  }

  hidePopopver = (e) => {

    this.setState({
      isOpen: false
    })
    this.inputRef.current.blur()
    clearTimeout(this.timeOutId)
  }

  focusHandler = (e) => {

    if (this.state.isOpen) {
      clearTimeout(this.timeOutId)

    } else {
      this.timeOutId = setTimeout(() => {
        this.setState( cs => ({ isOpen: !cs.isOpen }) )
        this.inputRef.current.focus()
      })
    }

  }
  render() {
    return (
       /* className allows us to override style defaults */
       <MoreInfoStyles className="more-info-container" isOpen={ this.state.isOpen }>
       <InfoButton
         aria-haspopup="true"
         aria-expanded={ this.state.isOpen }
         name={ this.props.htmlName }
         id={ this.props.htmlId }
         type={ "radio" }
         ref={ this.inputRef }
         onClick={ this.togglePopover }
         onBlur={ this.hidePopopver }
         onFocus={ this.focusHandler }
         onMouseEnter={ this.focusHandler }
         onMouseLeave={ this.hidePopopver }
         socialmedia={ this.props.socialmedia }
       />

       <label
         htmlFor={ this.props.htmlId }
       >
         { this.props.children }
       </label>
       <span className="sr-only">{ this.props.srText }</span>
     </MoreInfoStyles>
    )
  }
}
