import React from 'react';
import './style.css';
import Sortable from 'sortablejs';

class CustomField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formGroups: [],
      label: '',
      placeholder: '',
      value: '',
      currentIndex: null,
      commonFields: [{
        name: '单行文本',
        type: 'text'
      }, {
        name: '数字',
        type: 'number'
      }]
    };
    this.singleTextClick = this.singleTextClick.bind(this);
    this.numberClick = this.numberClick.bind(this);
    this.activeField = this.activeField.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handlePlaceholderChange = this.handlePlaceholderChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  addField(type) {
    this.setState({
      status: this.state.formGroups.push({
        label: '未命名',
        placeholder: '',
        value: '',
        type: type,
        isActive: false
      })
    })
  }

  singleTextClick() {
    this.addField('text');
  }

  numberClick() {
    this.addField('number');
  }

  handelClick(index) {
    switch (index){
      case 0:
        this.singleTextClick();
        break;
      case 1:
        this.numberClick();
        break;
    }
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

  handleValueChange(event) {
    let currentIndex = this.refs.editor.getAttribute('data');
    this.state.formGroups.map((formGroup, index)=> {
      if (index == currentIndex) {
        formGroup.value = event.target.value
      }
    });
    this.setState({
      value: event.target.value,
      formGroups: this.state.formGroups
    });
  }

  activeField(currentIndex) {
    this.state.formGroups.map((formGroup, index)=> {
      if (index == currentIndex) {
        formGroup.isActive = true;
      } else {
        formGroup.isActive = false;
      }
    });
    this.setState({
      currentIndex: currentIndex,
      label: this.state.formGroups[currentIndex].label,
      placeholder: this.state.formGroups[currentIndex].placeholder,
      value: this.state.formGroups[currentIndex].value,
      formGroups: this.state.formGroups
    });
  }

  renderEditField() {
    let currentIndex = this.state.currentIndex;
    if (typeof currentIndex === 'number') {
      return (
        <div className="field-editor column" ref="editor" data={currentIndex}>
          <div className="field">
            <label className="label">标题</label>
            <p className="control">
              <input className="input" type="text" value={this.state.label}
                     placeholder={this.state.formGroups[currentIndex].label}
                     onChange={this.handleLabelChange}/>
            </p>
          </div>
          <div className="field">
            <label className="label">提示</label>
            <p className="control">
              <input className="input" type="text" value={this.state.placeholder}
                     onChange={this.handlePlaceholderChange}/>
            </p>
          </div>
          <div className="field">
            <label className="label">默认值</label>
            <p className="control">
              <input className="input" type={this.state.formGroups[currentIndex].type} value={this.state.value}
                     onChange={this.handleValueChange}/>
            </p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="field-editor column">暂无字段</div>
      )
    }
  }

  renderFields() {
    const listFields = this.state.formGroups.map((formGroup, index) =>
      <div className={formGroup.isActive?"panel-block active":"panel-block"} key={index}>
        <div className="field" onClick={this.activeField.bind(null, index)}>
          <label className="label">{formGroup.label}</label>
          <p className="control">
            <input className="input" type={formGroup.type} placeholder={formGroup.placeholder} value={formGroup.value}
                   readOnly="true"/>
          </p>
        </div>
      </div>
    );
    return (
      <div className="form-view column is-half panel" ref={this.sortableCustomFieldDecorator}>
        <p className="panel-heading">
          自定义表单
        </p>
        {listFields}
      </div>
    )
  }

  sortableContainersDecorator(componentBackingInstance) {
    if (componentBackingInstance) {
      let options = {
        handle: ".group-title"
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  sortableCommonFieldDecorator(componentBackingInstance) {
    if (componentBackingInstance) {
      let options = {
        draggable: "a",
        group: {
          name: 'advanced',
          pull: 'clone',
          put: false
        },
        sort: false,
        onEnd: (evt)=> {
          evt.item.style.display = 'none';
          this.state.formGroups.splice(evt.newIndex, 0, {
            label: '未命名',
            placeholder: '',
            value: '',
            type: this.state.commonFields[evt.oldIndex].type,
            isActive: false
          });
          this.setState({
            formGroups: this.state.formGroups
          });
        }
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  sortableCustomFieldDecorator(componentBackingInstance) {
    // check if backing instance not null
    if (componentBackingInstance) {
      let options = {
        draggable: ".panel-block", // Specifies which items inside the element should be sortable
        group: {
          name: 'advanced',
          pull: 'clone',
          put: true
        },
        fallbackOnBody: false,
        sort: true
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  renderCommonFields(){
    let commonFields = this.state.commonFields.map((commonField, index)=>
      <a key={index} onClick={this.handelClick.bind(this, index)} className="column is-half">{commonField.name}</a>
    );
    return (
      <div className="common-field column">
        <div className="columns is-multiline group-title" ref={this.sortableCommonFieldDecorator.bind(this)}>
        {commonFields}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="custom-field columns" ref={this.sortableContainersDecorator}>
        {this.renderCommonFields()}
        {this.renderFields()}
        {this.renderEditField()}
      </div>
    )
  }
}

export default CustomField