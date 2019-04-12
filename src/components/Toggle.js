import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import AddLinkPortal from './AddLinkPortal';
import { getPosts } from '../actions';
import { post as URL } from '../services/baseURL';
import { ReactComponent as X } from '../assets/svg/x.svg';

class Toggle extends Component {
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
    this.setState(
      {
        on: !this.state.on
      },
      () => {
        if (this.state.on) {
          document.getElementById('form-key').focus();
        }
      }
    );
    document.querySelector('#root').classList.toggle('root-modal-open');
  };
  handleSubmit = e => {
    // axios.post('http://localhost:8000/api/posts',
    //     {
    //       post_url: this.state.inputValue,
    //       id: this.props.auth.id,
    //     }
    //   )
    //   .then(res => {
    //     console.log(res)
    //   })
    // }
    e.preventDefault();

    if (this.props.auth) {
      axios
        .post(`${URL}/api/posts`, {
          post_url: this.state.inputValue,
          id: this.props.auth.id
        })
        .then(res => {
          this.props.getPosts();
          this.setState({
            inputValue: '',
            on: false
          });
          document.querySelector('#root').classList.remove('root-modal-open');
        });
    }
  };
  render() {
    return (
      <div onKeyDown={e => e.which === 27 && this.toggle()}>
        <span onClick={() => this.toggle()}>Add Link</span>
        {/* <img src={addSvg} alt="" onClick={() => this.toggle()} /> */}
        {this.state.on && (
          <AddLinkPortal>
            <div
              className="modal-wrapper"
              onClick={e =>
                e.target.className === 'modal-wrapper' && this.toggle()
              }
            >
              <div className="modal_">
                <div className="top">
                  <div className="modal_name">Add a link</div>
                  <div className="modal_close" onClick={() => this.toggle()}>
                    <X />
                  </div>
                </div>
                <div className="modal_group">
                  <form onSubmit={this.handleSubmit} className="add_link_form">
                    <input
                      id="form-key"
                      value={this.state.inputValue}
                      onChange={this.handleChange}
                      placeholder="www.example.com/article.html"
                      type="input"
                    />
                    <button className="add-btn">Add</button>
                  </form>
                </div>
              </div>
            </div>
          </AddLinkPortal>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth: auth
  };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(Toggle);
