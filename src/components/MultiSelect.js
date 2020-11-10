import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

export default class CreatableInputOnly extends Component {
  state = {
    inputValue: '',
    value: this.props.value ?  this.props.value.map((v) => createOption(v)) : [],
  };


  handleChange = (value) => {
    this.setState({ value }, () => {
      this.props.onChange(null, true, this.props.name, this.state.value)
    });
  };
  handleInputChange = (inputValue) => {
    this.setState({ inputValue });
  };
  handleKeyDown = (event) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        this.setState({
          inputValue: '',
          value: [...value, createOption(inputValue)],
        }, () => {
            this.props.onChange(null, true, this.props.name, this.state.value)
        });
        event.preventDefault();
        
        break;
        default: console.log('Remove this log')
    }
  };

  componentDidUpdate(oldProps) {
    if (oldProps.value.length !== this.props.value.length) {
        this.setState({
            value: this.props.value.map((v) => createOption(v))
        })
    }
  }

  render() {
    const { inputValue, value } = this.state;
    return (
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        placeholder="Type something and press enter..."
        value={value}
      />
    );
  }
}