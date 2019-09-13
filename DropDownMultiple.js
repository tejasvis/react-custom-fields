import React, { Component } from 'react';

import { DropDownWrapper, DropDownHeader, DropDowntitle, DropDownList, DropDownListItem, DropDownIcon } from './DropDown'

import success from 'images/TickMark.svg';
import EmailArrowDownIcon from 'images/EmailAroowDown.svg'
import ArrowUp from 'images/ArrowUp.svg'

class DropDownMultiple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listValue: false,
      open: false,
      selectedIndex: 0,
      resetThenSet: props.resetThenSet || function () { },
    }
    this.toggleItem = this.toggleItem.bind(this);
    this.dropdownRef = React.createRef();
    this.listItemref = ''
  }

  componentDidMount() {
  
    //creating a ref for each list item based on their index

    this.listItemref = this.props.list.reduce((obj, value, key) => {
      obj[key] = React.createRef();
      return obj;
    }, {});

  }

  //keybaoard support to navigate to each element in list
  handleKeyboardInput = (e) => {

    if (e.keyCode) {
      switch (e.keyCode) {
        case 32:
          // space for selection
          e.preventDefault()
          if (this.state.open) {
            this.toggleItem(this.props.list[this.state.selectedIndex], this.state.selectedIndex)
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
    this.listItemref[id].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  showList = (e) => {
    if (this.props.readOnly) return;
    this.dropdownRef.current.focus();
    this.setState({ open: true })
  }

  hideList = (e) => {
    if (this.props.readOnly) return;
    this.dropdownRef.current.blur();
    this.setState({ open: false })
  }

  toggleItem = (value, index) => {

    this.setState({
      listValue: false,
      selectedIndex: index,
      open: false
    }, this.props.resetThenSet(value, index));

  }

  render() {
    const { list } = this.props;
    return (
      <DropDownWrapper
        tabIndex="0"
        ref={this.dropdownRef}
        onFocus={this.showList}
        onBlur={this.hideList}
        onKeyDown={this.handleKeyboardInput}>
        <DropDownHeader
          onMouseDown={e => {
            e.preventDefault()
            if (this.state.open) {
              this.hideList();
            } else {
              this.showList()
            }
          }}>
          <DropDowntitle >{this.props.title}</DropDowntitle>
          <DropDownIcon>{this.state.open ?
            <img src={ArrowUp} alt='' /> :
            <img src={EmailArrowDownIcon} alt='' />
          }</DropDownIcon>
        </DropDownHeader>

        <DropDownList
          className="select-list"
          tabIndex="-1"
          onClick={e => e.stopPropagation()} >
          {list.map((item, index) => (
            <DropDownListItem
               className={`${this.props.selectedId.map((value,key) => (
                value === item && "is-selected bold"
                ))}  ${this.state.selectedIndex === index && "is-focussed-keyboard"}`} 
              key={index}
              onMouseDown={() => this.toggleItem(item, index)}
              ref={this.listItemref[index]}
              onClick={this.hideList}>
              {item}
               {this.props.selectedId.map((value,key) => (
                   value === item && <img key={key} src={success} alt='' />
              ))} 
            </DropDownListItem>
          ))}
        </DropDownList>
      </DropDownWrapper>

    )
  }

}
export default DropDownMultiple

