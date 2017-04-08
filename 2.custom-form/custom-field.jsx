import React from 'react';

class CustomField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formGroups: [],
      label: '',
      placeholder: ''
    };
    this.singleTextClick = this.singleTextClick.bind(this);
    this.numberClick = this.numberClick.bind(this);
    this.activeField = this.activeField.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handlePlaceholderChange = this.handlePlaceholderChange.bind(this);
  }

  addField(type) {
    this.setState({
      status: this.state.formGroups.push({
        label: '未命名',
        type: type
      })
    })
  }

  singleTextClick() {
    this.addField('text');
  }

  numberClick() {
    this.addField('number');
  }

  handleLabelChange(event) {
    let currentIndex = this.refs.editor.getAttribute('data');
    this.state.formGroups.map((formGroup, index)=> {
      if (index == currentIndex) {
        formGroup.label = event.target.value
      }
    });
    this.setState({
      label: event.target.value,
      formGroups: this.state.formGroups
    });
  }

  handlePlaceholderChange(event) {
    let currentIndex = this.refs.editor.getAttribute('data');
    this.state.formGroups.map((formGroup, index)=> {
      if (index == currentIndex) {
        formGroup.placeholder = event.target.value
      }
    });
    this.setState({
      placeholder: event.target.value,
      formGroups: this.state.formGroups
    });
  }

  activeField(index) {
    this.setState({
      currentIndex: index
    });
  }

  renderEditField() {
    let currentIndex = this.state.currentIndex;
    if (typeof currentIndex === 'number') {
      return (
        <div className="field-editor" ref="editor" data={currentIndex}>
          <input type="text" value={this.state.label} placeholder={this.state.formGroups[currentIndex].label}
                 onChange={this.handleLabelChange}/>
          <input type="text" value={this.state.placeholder} onChange={this.handlePlaceholderChange}/>
        </div>
      )
    } else {
      return (
        <div className="field-editor">无</div>
      )
    }
  }

  renderFields() {
    const listFields = this.state.formGroups.map((formGroup, index) =>
      <div className="form-group" key={index} onClick={this.activeField.bind(null, index)}>
        <label>{formGroup.label}</label>
        <input type={formGroup.type} placeholder={formGroup.placeholder}/>
      </div>
    );
    return (
      <div className="form-view">
        {listFields}
      </div>
    )
  }

  render() {
    return (
      <div className="custom-field">
        <div className="common-field">
          <div onClick={this.singleTextClick}>单行文本</div>
          <div onClick={this.numberClick}>数字</div>
        </div>
        {this.renderFields()}
        {this.renderEditField()}
      </div>
    )
  }
}

export default CustomField