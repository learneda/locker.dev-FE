import React, { Component } from 'react';
import axios from 'axios';
import AddLinkPortal from './AddLinkPortal';
import {post as URL} from '../../services/baseURL';


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

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('exisit ?', this.props.comment_id)
    axios.delete(`${URL}/api/comments/${this.props.comment_id}`).then((res) => {
      console.log(res)
      this.toggle()
    })
  }

  render() {
    console.log('comment_id in model',this.props.comment_id)
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
              <button onClick={(e) => this.handleSubmit(e)}>Delete</button>
              <button onClick={this.toggle}>Cancel</button>
            </div>
          </AddLinkPortal>
        )}
      </div>
    );
  }
}
export default MoreBtn;
