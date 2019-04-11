import {Component} from 'react';
import ReactDOM from 'react-dom';

const portalRoot = document.getElementById('add_link_modal')

export default class AddLinkPortal extends Component {
  constructor (props) {
    super(props)
    this.el = document.createElement('div');
  }

  componentDidMount() {
    portalRoot.appendChild(this.el);
  };

  componentWillUnmount() {
    // portalRoot.remove(this.el)
    document.getElementById('body').setAttribute('style', 'overflow: scroll');
  }
  
  render () {
    document.getElementById('body').setAttribute('style', 'overflow: hidden');
    const {children} = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}