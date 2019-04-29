import React, { Component } from 'react';
import AddLinkPortal from '../utils/AddLinkPortal';
import { StyledAddLink } from '../utils/StyledAddLink.js';
import styled from 'styled-components';
import { ReactComponent as X } from '../../assets/svg/x.svg';
import axios from 'axios';
import { post as URL } from '../../services/baseURL';

export default class SharedButton extends Component {
	constructor(props) {
		super(props);
		const { post_url, description, title, thumbnail_url } = this.props.bookmark;
		this.state = {
			modalOn: false,
			description: description,
			post_url,
			title,
            thumbnail_url,
            userThoughts: '',
		};
	}

	toggle = () => {
		this.setState(
			{
				on: !this.state.on
			}
			//   () => {
			//     if (this.state.on) {
			//       document.getElementById('form-key').focus();
			//     }
			//   }
		);
    };
    
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('submitting ...', this.props.bookmark.id)
        const id =  this.props.bookmark.id

        const editedPost = {
            post_url: this.state.post_url,
            description: this.state.description,
            title: this.state.title,
            // userThoughts: this.state.userThoughts
        }
        axios.put(`${URL}/api/posts/${id}`, {
        post_url: this.state.post_url,
        description: this.state.description,
        title: this.state.title,
        // userThoughts: this.state.userThoughts
    })
      .then(res => {
          axios.post(`${URL}/api/posts/share`, {
            id,
            user_id: this.props.user_id
          })
      })

    }

	render() {
		console.log(this.props);
		return (
			<div>
				<span onClick={() => this.toggle()}>share?</span>
				{this.state.on && (
					<AddLinkPortal>
						<MODALWRAPPER
							className="modal-wrapper"
							onClick={(e) => e.target.className === 'modal-wrapper' && this.toggle()}
						>
							<div className="modal_">
								<div className="top">
									<div className="modal_name">Share Bookmark</div>
									<div className="modal_close" onClick={() => this.toggle()}>
										<X />
									</div>
								</div>
								<div className="modal_group">

									<form onSubmit={this.handleSubmit} className="add_link_form">
                                    
										<label htmlFor="Post Url">Post Url</label>
                                        <textarea
											name="post_url"
											id="post-description"
											cols="30"
											rows="10"
											value={this.state.post_url}
											onChange={this.handleChange}
										/>

                                        <label htmlFor="Post Url">Post Title</label>
                                        <textarea
											name="title"
											id="post-description"
											cols="30"
											rows="10"
											value={this.state.title}
											onChange={this.handleChange}
										/>

										<label htmlFor="Post Description">Post Description</label>
										<textarea
											name="description"
											id="post-description"
											cols="30"
											rows="10"
											value={this.state.description}
											onChange={this.handleChange}
										/>
                                        <label htmlFor="Post Description">your thoughts..</label>
                                        <textarea
											name="userThoughts"
											id="post-description"
											cols="30"
											rows="10"
											value={this.state.userThoughts}
											onChange={this.handleChange}
										/>

										<input type="submit" id="edit-submit" value="Update Post" />
									</form>
								</div>
							</div>
						</MODALWRAPPER>
					</AddLinkPortal>
				)}
			</div>
		);
	}
}
const MODALWRAPPER = styled.div`${StyledAddLink};`;
