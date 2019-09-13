import React, { Component } from 'react'

import { allowedPhoneRegex } from "lib/helper.js"
import { Input } from 'css/ComponentStyles/FormFields/fields'
import { Label } from 'routes/Authenticate'
import * as logon from 'css/ComponentStyles/AuthenticateStyles'
import { ErrorSpan } from 'css/CommonStyle'

import EmailIcon from 'images/EmailShape.svg'
import PhoneIcon from 'images/PhoneIcon.svg'
import EmailArrowDownIcon from 'images/EmailAroowDown.svg'
import ArrowUp from 'images/ArrowUp.svg'

import Zindex from 'css/z-indexLayers.js'
import styled from 'styled-components'



const PhoneLink = styled(logon.ImgLink)`
  height:100%;
  & img{
    padding:18px;
  }
`;

const FormContent = styled.div`
position:relative;

`
const ImgLinkDiv = styled.div`
position:absolute;
//top:${props => props.signIn ? "20%" : "0"};
top:0;
right:0;
cursor:pointer;

& img{
  padding:20px 15px;
  }

 /*  & +.toggle-login-list{
    display:none;
  }
 &:focus {
      outline:none;
      + .toggle-login-list{
      display:block;
    }
  } */
`;

const Phonediv = styled.div`
  position:absolute;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.2);
  z-index:${Zindex.zindexStackOnMainContentOrder1};
  height: 50px;
  width: ${props => props.width || "100%"};
  font-size: 16px;
  border-top-color: #dedede;
   border-top-width: thin;
  border-top: 1px solid #dedede;

  label {
    text-align:left;
    padding-left: 72px;
    display: block;
    color:#2774AE;
    line-height:50px;
  }`


class EmailPhoneToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleEmailPhone: true,
      usernameIsEmail: true,
      active: false,
      usernameError: props.usernameError,
      usernameEntry: this.props.savedUsername || ''
    };
    this.emailContainerRef = React.createRef()
  }

  async componentDidMount() {
    if (allowedPhoneRegex.test(this.props.savedUsername)) this.setState({ usernameIsEmail: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.usernameError !== this.props.usernameError)
      this.setState({ usernameError: this.props.usernameError });

      setTimeout(() => {
        if (this.state.active) {
          window.addEventListener('click', this.close)
        }
        else {
          window.removeEventListener('click', this.close)
        }
      }, 0)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.close)
  }

  close = (e) => {
    if (this.state.active) {

      this.setState({
        active: false
      })
    }
  }

  doPhoneDetect = async (username) => {
    const cleanName = username.replace(/[(\-)]/g, '');
    if (allowedPhoneRegex.test(cleanName) || allowedPhoneRegex.test('1' + cleanName) || allowedPhoneRegex.test('+1' + cleanName))
      await this.setState({ usernameIsEmail: false });
  }

  handleChange = async e => {
    const { value } = e.target
    e.preventDefault()

    if ( this.state.usernameIsEmail ) {
      await this.doPhoneDetect( value )
    }

    this.setState({ usernameEntry: this.state.usernameIsEmail? value.toLowerCase() : this.unMaskEntry( value ) })
  }

  unMaskEntry( value ) {
    // can't use lookback regex here bummer dude
    let unmasked = []

    for ( let i=0; i<value.length; i++) {
      if (/[0-9]/.test(value.charAt(i)) && ( i>0? value.charAt(i-1) !== '+' : true)) {
        unmasked.push( value.charAt(i) )
      }
    }

    return unmasked.length? unmasked.join('') : value
  }

  maskEntry( value ) {
    const mask = [...'+1(999)-999-9999']
    let displayValue = ''
    let i = 0

    while (i < value.length && mask.length) {
      const code = mask.shift()
      displayValue += /9/.test( code )? value.charAt(i++) : code
    }

    return displayValue
  }

  showToggleSelect = () => {
    this.setState({
      active: true
    })
  };

  hideToggleSelect = () => {
      this.setState({
      active: false
    })
  }

  handleMousedown = (e) => {
    this.setState({
      usernameIsEmail: !this.state.usernameIsEmail,
      usernameEntry: '',
    })
    this.hideToggleSelect();
  }

  render() {
    const displayValue = this.state.usernameIsEmail? this.state.usernameEntry : this.maskEntry( this.state.usernameEntry )
    return (
      <div>
        <logon.SignInRegisterInnerDiv>
          {this.props.signIn && <label>Email / Cell Phone</label>}
          <FormContent>

            <logon.ImgLink >
              <img src={this.state.usernameIsEmail ? EmailIcon : PhoneIcon} alt="phone/email toggle" />
            </logon.ImgLink>

            {/* Toggle Between Email and phone user name for Signin/register */}
            {/* */}

            <Input ExtraPaddingInput
              bgColor={this.props.bgColor}
              name="username"
              autocomplete="off"
              id={this.state.usernameIsEmail ? "emailInput" : "phoneInput"}
              onChange={this.handleChange}
              className={this.state.usernameError ? "error" : ""}
              placeholder={this.state.usernameIsEmail ? "e.g. joe@ucla.edu" : "1(_ _ _)-_ _ _ - _ _ _ _"}
              value={ displayValue }
            />

            <Input name="usernameType" type="hidden" value={this.state.usernameIsEmail ? "email" : "phone"} />

            {this.state.usernameError &&
              <ErrorSpan textAlign="right">
                <label>{this.state.usernameError}</label>
              </ErrorSpan>}

            <ImgLinkDiv
             ref={this.emailContainerRef}
              signIn={this.props.signIn}
              id="dropdown-toggle"
              onClick={e=>{
                e.preventDefault()
                if (this.state.active) {
                  this.hideToggleSelect(e)
                } else {
                  this.showToggleSelect(e)
                }
              }}
            >
              {!this.state.active ? <img src={EmailArrowDownIcon} alt="hide phone/email toggle" /> : <img src={ArrowUp} alt='Arrow up toggle' />}
            </ImgLinkDiv>
        {this.state.active&&
            <Phonediv width={this.props.width}
              className="toggle-login-list"
              id="phone-email-toggle"
             onClick={this.handleMousedown}
            >
              <PhoneLink>
                <img src={this.state.usernameIsEmail ? PhoneIcon : EmailIcon} alt="email/phone select" />
              </PhoneLink>
              <label> {this.state.usernameIsEmail ? "Phone Number" : "Email"}</label>
            </Phonediv>}
          </FormContent>
        </logon.SignInRegisterInnerDiv>
      </div>

    )
  }
}

export default EmailPhoneToggle;
