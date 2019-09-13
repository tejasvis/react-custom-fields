import React, { Component } from 'react';

import * as colors from 'css/Colors'
import Zindex from 'css/z-indexLayers';

import styled from 'styled-components'

import success from 'images/TickMark.svg';
import EmailArrowDownIcon from 'images/EmailAroowDown.svg'
import ArrowUp from 'images/ArrowUp.svg'

const defaultFontSize = 16

export const DropDownWrapper = styled.div`
user-select: none;
position: relative;
color:#000000;
cursor:default;
background-color:${props=>props.bgColor|| colors.lightGray}
.select-list {
	display:none;
}
&:focus{
	outline:none;
	.select-list {
    display:block;
  }
}
.error{
  border: 1px solid ${colors.messagingRed};
}
`


export const DropDownHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
line-height: 50px;
width:100%;
border: 1px solid #dfdfdf;
border-radius: 3px;
position: relative;
height:${54.11/defaultFontSize}rem;
`

export const DropDowntitle = styled.label`
&&&{
	color:#000000;
}
margin: 2px 20px;
`

export const DropDownList = styled.ul`
z-index: ${Zindex.zindexStackOnMainContentOrder1};
position: absolute;
width: 100%;
border: 1px solid #dfdfdf;
border-top: none;
border-radius: 0 0 3px 3px;
background-color: #fff;
box-shadow: 0 2px 5px -1px #e8e8e8;
margin:0;
padding: 0;
max-height:calc(250rem/${defaultFontSize});
overflow:auto;

.is-selected{
	color:${colors.primaryBlue};
}
.is-focussed-keyboard{
  color:${colors.primaryBlue};
	background-color: ${colors.lightGray};
}
`

export const DropDownListItem = styled.li`
line-height: 1.6rem;
cursor: default;
display: block;
list-style:none;
white-space:nowrap;
font-weight:normal;
cursor:pointer;
border-bottom: 1px solid ${colors.borderGray};
&:hover{
	color:${colors.primaryBlue};
	background-color: ${colors.lightGray};
}

&&& {
	padding: 8px 20px;
	margin:0;
	text-align:left;
}
& img {
  position: absolute;
  right: 0;
  padding: 8px;
}`

export const DropDownIcon = styled.div`
width: 30px;
height: 100%;
& >img {
    vertical-align:middle;
}` 

class DropdownMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selected: false,
      selectedIndex: 0,
      resetThenSet: this.props.resetThenSet || function () { },
    }
    this.selectItem = this.selectItem.bind(this);
    this.dropdownRef = React.createRef();
    this.listItemref = ''
  }

  componentDidMount() {
    if (this.props.title) {
      this.setState({ selected: true })
    }

    //creating a ref for each list item based on their index
   this.listItemref = this.props.list.reduce((obj, value, key) => {
      obj[key] = React.createRef();
      return obj;
    }, {});

  }

  //TODo need to de allocate the refs to avoid memory leak in componentWillUnmount()


  selectItem(selectedItem, index){
    this.setState({
      selected: true,
      selectedIndex: index,
      open: false,
    },this.state.resetThenSet(selectedItem, index,this.props.name));
  }

  showList = (e) => {
    this.dropdownRef.current.focus();
    this.setState({ open: true })
  }

  hideList = (e) => {
    this.dropdownRef.current.blur();
    this.setState({ open: false })
  }

  //keybaoard support to navigate to each element in list
  handleKeyboardInput = (e) => {

    if (e.keyCode) {
      switch (e.keyCode) {
        case 32:
            // space for selection
            e.preventDefault()
            if ( this.state.open ) {
              this.selectItem(this.props.list[this.state.selectedIndex], this.state.selectedIndex )
              this.hideList();

            } else {
              this.showList(e)
            }
          break;
        case 38:
          // uparrow
        if (this.state.selectedIndex > 0) {
            e.preventDefault();
            this.setState(prevState => ({
              selectedIndex: prevState.selectedIndex - 1
            }))
            this.scrollTo(this.state.selectedIndex)
          }

          break;

        case 40:
          // downarrow
          if (this.state.selectedIndex < this.props.list.length - 1) {
            e.preventDefault();
            this.setState(prevState => ({
              selectedIndex: ++prevState.selectedIndex
            }))
           this.scrollTo(this.state.selectedIndex)


          }
          break;
          default:break;
      }
    }
  }

  scrollTo = (id) => {
    if(!this.listItemref.current) return;
    this.listItemref[id].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
     });
  }

  render() {
    const { list } = this.props

    return (
      // class Name to customize the dropdown locally in any component
       <DropDownWrapper
        tabIndex="0"
        className="drop-down-container"
        ref={this.dropdownRef}
        onFocus={this.showList}
        onBlur={this.hideList}
        onKeyDown={this.handleKeyboardInput}
        name={this.props.name}

        >
        <DropDownHeader
         onMouseDown={e => {
            e.preventDefault()
            if (this.state.open) {
              this.hideList();
            } else {
              this.showList()
            }
          }}
        >
          <DropDowntitle >{this.props.title}</DropDowntitle>

          <DropDownIcon>{ (this.state.open ?
            <img src={ArrowUp} alt='' /> :
            <img src={EmailArrowDownIcon} alt='' />
          )}</DropDownIcon>
        </DropDownHeader>

        <DropDownList
          className="select-list"
          tabIndex="-1"
          onClick={e => e.stopPropagation()}
        >
          {this.props.list && list.map((item, index) => (
            <DropDownListItem
              key={item.key || index}
              className={`${this.props.title === item && "is-selected bold"} ${this.state.selectedIndex === index && "is-focussed-keyboard"}`}
              onMouseDown={()=>this.selectItem(item,index)}
              ref={this.listItemref[index]}
               >
              {item.displayValue || item} {this.props.title === item && <img src={success} alt='' />}
            </DropDownListItem>))}

        </DropDownList>
      </DropDownWrapper>
    )
  }
}

export default DropdownMenu
