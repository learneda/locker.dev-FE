import React, { Component } from 'react';
import axios from 'axios';
import AddLinkPortal from './AddLinkPortal';


class MoreBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false,
      inputValue: ''
    };
  }

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  toggle = () => {
    this.setState({on: !this.state.on});
    document.querySelector('#root').classList.toggle('root-modal-open');
  };

  render() {
    return (
      <div onKeyDown={e => e.which === 27 && this.toggle()}>
        <span className='more_btn' onClick={() => this.toggle()}>...</span>
        {this.state.on && (
          <AddLinkPortal>
            <div
              className="modal-wrapper"
              onClick={e =>
                e.target.className === 'modal-wrapper' && this.toggle()
              }
            >
              <button>Delete</button>
              <button onClick={this.toggle}>Cancel</button>
            </div>
          </AddLinkPortal>
        )}
      </div>
    );
  }
}
export default MoreBtn;
