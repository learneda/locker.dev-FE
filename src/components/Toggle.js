import React, { Component } from 'react';
import AddLinkPortal from './AddLinkPortal';
import axios from 'axios'
class Toggle extends Component {
  constructor (props) {
    super(props)
    this.state = { on: false, inputValue: '' }
  }

  handleChange = (event) => {
    this.setState({inputValue: event.target.value});
  }
  
  toggle = () => {
    this.setState({
      on: !this.state.on
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/posts', {post_url: this.state.inputValue})
  }
  render() {
    return (
      <div className='toggle'>
          <button onClick={() => this.toggle()}>Add Link</button>
          {this.state.on && <AddLinkPortal>
            <div className="modal_">
            <div className="top">
              <div className="modal_name">Add a link</div>
              <div className="modal_close" onClick={() => this.toggle()}>x</div>
              </div>
              <div className="modal_group">
                <form onSubmit={(e) => this.handleSubmit(e)} className="add_link_form">
                  <input id="form-key" value={this.state.inputValue} onChange={this.handleChange} placeholder="www.example.com/article.html" type="input" />
                  <button className='add-btn'>add</button>
                 </form>
               </div>
              </div>
      </AddLinkPortal>}
      </div>
    )
  }
};

export default Toggle