import CustomField from './custom-field.jsx';
import ReactDOM from 'react-dom';
import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main">
        <CustomField />
      </div>
    )
  }
}

ReactDOM.render(<Main/>, document.getElementById('container'));