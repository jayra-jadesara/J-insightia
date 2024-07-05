import React, { Component } from 'react';
import bn from '../../utils/bemnames';

const bem = bn.create('scrollToTop');

export default class ScrollToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_visible: false
    };
  }

  componentDidMount() {
    const scrollComponent = this;
    document.addEventListener('scroll', () => {
      scrollComponent.toggleVisibility();
    });
  }

  toggleVisibility() {
    if (window.pageYOffset > 300) {
      this.setState({
        is_visible: true
      });
    } else {
      this.setState({
        is_visible: false
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  render() {
    const { is_visible } = this.state;
    return (
      <div className={bem.b('scroll-to-top')}>
        {is_visible && (
          <div className='arrow-container animated fadeInDown' onClick={() => this.scrollToTop()}>
            <div className='arrow-2'>
              <i className='bi bi-chevron-up' />
            </div>
            <div className='arrow-1 animated hinge infinite zoomIn' />
          </div>
        )}
      </div>
    );
  }
}
