import React from 'react';
import ReactDOM from 'react-dom';
import AutofillSelect from './AutofillSelect';
import registerServiceWorker from './registerServiceWorker';
import Countries from './countries.json'
import mainCss from './main.css'
import AutofillSelectCss from './AutofillSelect.css'

class Main extends React.Component {
  
  constructor(props) {
    super(props)
    this.handleValueSetted = this.handleValueSetted.bind(this)
    this.state = {
      value: {}
    }
  }
  
  
  handleValueSetted(value) {
    this.setState({
      value: value
    })
  }
  
  
  renderValue() {
    if (Object.keys(this.state.value).length) {
      return (
        <div>
          <strong>Selected option</strong><br />
          text:  {this.state.value.text}<br />
          value: {this.state.value.value}
        </div>
      )
    } else {
      return <div>No option selected</div>
    }
  }
  
  
  render() {
    return (
      <div>
      
        <div className="select-state">
          {this.renderValue()}
        </div>
      
        <AutofillSelect
          options={Countries}
          onValueSetted={this.handleValueSetted} />
        
      </div>
    )
  }
  
}


ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
