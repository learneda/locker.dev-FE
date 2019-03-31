import React, { Component } from 'react';
import AddLinkPortal from './AddLinkPortal';
import axios from 'axios';
import { connect } from 'react-redux';
import addSvg from '../assets/svg/add-link.svg';
import { getPosts } from '../actions';

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
    this.setState({
      on: !this.state.on
    });
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
      console.log('in handle submit');
      axios
        .post('http://localhost:8000/api/posts', {
          post_url: this.state.inputValue,
          id: this.props.auth.id
        })
        .then(res => {
          this.props.getPosts();
          console.log(res.data);
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
      <div className="toggle">
        <img src={addSvg} alt="" onClick={() => this.toggle()} />
        {this.state.on && (
          <AddLinkPortal>
            <div className="modal-wrapper">
              <div className="modal_">
                <div className="top">
                  <div className="modal_name">Add a link</div>
                  <div className="modal_close" onClick={() => this.toggle()}>
                    x
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
                    <button className="add-btn">add</button>
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
