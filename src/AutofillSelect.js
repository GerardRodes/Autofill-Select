import React from 'react'

export default class AutofillSelect extends React.Component {
  
  constructor(props) {
    super(props)
    
    let sortedOptions = Object.keys(this.props.options)
      .map(value => ({value: value, text: this.props.options[value]}))
      .sort((first, second) => first.text.localeCompare(second.text))
    
    this.state = {
      options: sortedOptions,
      text: '',
      value: {},
      isOpen: false
    }
  }
  
  handleInputChange(event) {
    let nextState = {
      text: event.target.value,
      isOpen: true
    }
    
    if (this.state.value.text !== nextState.text) {
      nextState.value = {}
    }
    
    this.props.onValueSetted(nextState.value)
    this.setState(nextState)
  }
  
  handleOptionClick(option) {
    this.props.onValueSetted(option)
    this.setState({
      text: option.text,
      value: option,
      isOpen: false
    })
  }
  
  renderOptions() {
    const filteredOptions = this.state.options
      .filter(option => option.text.toLowerCase().startsWith( this.state.text.toLowerCase() ))
      
    if (filteredOptions.length) {
      return filteredOptions
      .map(option => (
        <li key={option.value} 
            className="autofill-select-option"
            data-value={option.value}
            onClick={event => this.handleOptionClick(option)} >
          {option.text}
        </li>
      ))
    } else {
      return <li className="no-matches" >No matches</li>
    }
  }
  
  render() {
    return (
      <div className="autofill-select" data-state={this.state.isOpen ? 'open' : 'closed'}>
        <div className="wrapper-input">
          <input type="text"
            className="autofill-select-input"
            value={this.state.text}
            placeholder={this.state.text ? null : 'Choose your country'}
            onChange={event => this.handleInputChange(event)}
            onClick={event => this.setState({isOpen: true})}
            onFocus={event => this.setState({isOpen: true})}  
          />
          <span className="arrow" role="button"
            onClick={(event) => this.setState({isOpen: !this.state.isOpen})} >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" enableBackground="new 0 0 129 129">
              <g>
                <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/>
              </g>
            </svg>
          </span>
        </div>
        <ul className="autofill-select-options" >
          { this.renderOptions() }
        </ul>
      </div>
    )
  }
  
}