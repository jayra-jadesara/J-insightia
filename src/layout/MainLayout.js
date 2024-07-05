import React from 'react';
import qs from 'qs';
import { Sidebar } from '../layout';
import '../styles/reduction.scss';
import HeaderContainer from '../features/LayoutContainer/HeaderContainer';
import TitleContainer from '../features/General/TitleContainer';
import {
  XS,
  SM,
  MD,
  LG,
  XL,
  XS_MIN_WIDTH,
  SM_MIN_WIDTH,
  SM_MAX_WIDTH,
  MD_MIN_WIDTH,
  MD_MAX_WIDTH,
  LG_MIN_WIDTH,
  LG_MAX_WIDTH,
  XL_MIN_WIDTH,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  QUERY_SELECTOR_SIDEBAR,
  QUERY_SELECTOR_SIDEBAR_OPEN,
} from '../constants/ScreenSizeConstant';
import PathsConstant from '../constants/PathsConstant';
import { agGridSrickyHeader, TokenDecode } from '../utils/general-util';

class MainLayout extends React.Component {
  static isSidebarOpen() {
    return document.querySelector(QUERY_SELECTOR_SIDEBAR).classList.contains(QUERY_SELECTOR_SIDEBAR_OPEN);
  }

  constructor(props) {
    super(props);
    this.state = {
      breakpoint: this.query(window.innerWidth),
      userData: {}
    };
  }

  componentDidMount() {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    TokenDecode().then((res) => {
      this.setState({
        userData: res
      });
    });
    // console.log('data', data);
    if (!query.print) {
      this.updatebreakpoint();
      this.checkBreakpoint(this.state.breakpoint.breakpoint);
    }
    window.addEventListener('scroll', () => {
      const dashboard = document.getElementsByClassName('noStickyHeader')[0];
      if (dashboard === undefined) {
        agGridSrickyHeader();
      }
    }, false);
  }

  componentWillUnmount() {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    if (!query.print) {
      this.updatebreakpoint();
    }
  }

  updatebreakpoint = () => {
    this.setState({ breakpoint: this.query(window.innerWidth) });
  };
  getUserDetails = () => TokenDecode().then((res) => res);

  // close sidebar when
  handleContentClick = () => {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    if (!query.print) {
      // close sidebar if sidebar is open and screen size is less than `md`
      if (
        MainLayout.isSidebarOpen() &&
        (this.props.breakpoint === XS || this.props.breakpoint === SM || this.props.breakpoint === MD)
      ) {
        this.openSidebar(CLOSE_SIDEBAR);
      }
    }
  };

  query = (width) => {
    if (width < XS_MIN_WIDTH) {
      return { breakpoint: XS };
    }

    if (SM_MIN_WIDTH <= width && width < SM_MAX_WIDTH) {
      return { breakpoint: SM };
    }

    if (MD_MIN_WIDTH <= width && width < MD_MAX_WIDTH) {
      return { breakpoint: MD };
    }

    if (LG_MIN_WIDTH <= width && width < LG_MAX_WIDTH) {
      return { breakpoint: LG };
    }

    if (width > XL_MIN_WIDTH) {
      return { breakpoint: XL };
    }

    return { breakpoint: XS };
  };

  handleSidebarForMobileview = (e) => {
    e.stopPropagation();
    const screenSize = this.query(window.innerWidth);
    if (
      MainLayout.isSidebarOpen() &&
      (screenSize.breakpoint === XS || screenSize.breakpoint === SM || screenSize.breakpoint === MD)
    ) {
      document.querySelector(QUERY_SELECTOR_SIDEBAR).classList.toggle(QUERY_SELECTOR_SIDEBAR_OPEN);
    }
  };

  getContent = (children, query) => {
    // This function creates anonymous visitor IDs in Pendo unless you change the visitor id field to use your app's values
    // This function uses the placeholder 'ACCOUNT-UNIQUE-ID' value for account ID unless you change the account id field to use your app's values
    // Call this function in your authentication promise handler or callback when your visitor and account id values are available
    // Please use Strings, Numbers, or Bools for value types.
    // eslint-disable-next-line no-undef
    pendo.initialize({
      visitor: {
        id: this.state.userData.User_Id, // Required if user is logged in, default creates anonymous ID
        // email: // Recommended if using Pendo Feedback, or NPS Email
        // full_name: // Recommended if using Pendo Feedback
        // role: // Optional
        // You can add any additional visitor level key-values here,
        // as long as it's not one of the above reserved names.
      },
      account: {
        id: this.state.userData.User_Id, // Required if using Pendo Feedback, default uses the value 'ACCOUNT-UNIQUE-ID'
        // name: // Optional
        // is_paying: // Recommended if using Pendo Feedback
        // monthly_value:// Recommended if using Pendo Feedback
        // planLevel: // Optional
        // planPrice: // Optional
        // creationDate: // Optional
        // You can add any additional account level key-values here,
        // as long as it's not one of the above reserved names.
      },
    });
    const contentSection = [];
    if (!query.print) {
      contentSection.push(<HeaderContainer key='HeaderContainer' />);
    }
    contentSection.push(<TitleContainer {...children} />);
    contentSection.push(
      <div className='middleContentSection' key='middleContentSection'>
        {children}
      </div>
    );
    return contentSection;
  };

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case XS:
      case SM:
      case MD:
        return this.openSidebar(CLOSE_SIDEBAR);

      case LG:
      case XL:
      default:
        return this.openSidebar(OPEN_SIDEBAR);
    }
  }

  openSidebar(openOrClose) {
    if (openOrClose === OPEN_SIDEBAR) {
      return document.querySelector(QUERY_SELECTOR_SIDEBAR).classList.add(QUERY_SELECTOR_SIDEBAR_OPEN);
    }
    return document.querySelector(QUERY_SELECTOR_SIDEBAR).classList.remove(QUERY_SELECTOR_SIDEBAR_OPEN);
  }

  render() {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });

    if (window.location.pathname !== PathsConstant.CREDENTIAL_FORM && window.location.pathname !== '/') {
      window.sessionStorage.setItem('lastPage', window.location.pathname + window.location.search);
    }

    return (
      <div className='cr-app bg-light'>
        {!query.print && <Sidebar handleSidebarForMobileview={this.handleSidebarForMobileview} />}
        <div className='cr-content container-fluid' onClick={this.handleContentClick}>
          {this.getContent(this.props.children, query)}
        </div>
      </div>
    );
  }
}

export default React.memo(MainLayout);
