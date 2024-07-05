import React from 'react';
import { NavLink } from 'react-router-dom';
import bn from '../utils/bemnames';
import { history } from '../utils/navigation-util';
import pathConst from '../constants/PathsConstant';

const bem = bn.create('sidebar');

const navItems = [
  {
    to: pathConst.DASHBOARD,
    name: 'Dashboard',
    exact: true,
    // svgPath: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
    svgPath: pathConst.DASHBOARD_ICON_SVG
  },
  {
    to: pathConst.NEWS_OVERVIEW,
    exact: false,
    name: 'News',
    // svgPath: 'M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z',
    svgPath: pathConst.NEWS_ICON_SVG
  },
  {
    to: '/company',
    exact: false,
    name: 'Companies',
    // svgPath: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z',
    svgPath: pathConst.COMPANIES_ICON_SVG
  },
  {
    to: '/investor',
    exact: false,
    name: 'Investors',
    // svgPath: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z',
    svgPath: pathConst.INVESTORS_ICON_SVG
  },
  {
    to: pathConst.PEOPLE_SEARCH,
    exact: false,
    name: 'People',
    // svgPath:
    //   'M3 5v6h5L7 7l4 1V3H5c-1.1 0-2 .9-2 2zm5 8H3v6c0 1.1.9 2 2 2h6v-5l-4 1 1-4zm9 4l-4-1v5h6c1.1 0 2-.9 2-2v-6h-5l1 4zm2-14h-6v5l4-1-1 4h5V5c0-1.1-.9-2-2-2z',
    svgPath: pathConst.PEOPLE_ICON_SVG
  },
  {
    to: '/advisor',
    exact: false,
    name: 'Advisers',
    // svgPath: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z',
    svgPath: pathConst.ADVISOR_ICON_SVG
  },
  // {
  //   to: '/statistics',
  //   exact: false,
  //   name: 'Statistics',
  //   // svgPath:
  //   //   'M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99
  // 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7
  // 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z',
  //   svgPath: '/images/elements/statistics.svg',
  // },
  {
    to: pathConst.LATEST_REPORTS,
    exact: false,
    name: 'Publications',
    // svgPath:
    //   'M3 5v6h5L7 7l4 1V3H5c-1.1 0-2 .9-2 2zm5 8H3v6c0 1.1.9 2 2 2h6v-5l-4 1 1-4zm9 4l-4-1v5h6c1.1 0 2-.9 2-2v-6h-5l1 4zm2-14h-6v5l4-1-1 4h5V5c0-1.1-.9-2-2-2z',
    svgPath: pathConst.MAGAZINES_ICON_SVG
  },
  {
    to: pathConst.TOOLMENU,
    exact: false,
    name: 'Tools',
    // svgPath:
    //   'M0 1l1-1 3.081 2.2a1 1 0 0 1 .419.815v.07a1 1 0 0 0 .293.708L10.5 9.5l.914-.305a1
    // 1 0 0 1 1.023.242l3.356 3.356a1 1 0 0 1 0 1.414l-1.586 1.586a1 1 0 0 1-1.414 0l-3.356-3.356a1
    // 1 0 0 1-.242-1.023L9.5 10.5 3.793 4.793a1 1 0 0 0-.707-.293h-.071a1 1 0 0 1-.814-.419L0 1zm11.354
    // 9.646a.5.5 0 0 0-.708.708l3 3a.5.5 0 0 0 .708-.708l-3-3z',
    // svgPath2:
    //   'M15.898 2.223a3.003 3.003 0 0 1-3.679 3.674L5.878 12.15a3 3 0 1
    // 1-2.027-2.027l6.252-6.341A3 3 0 0 1 13.778.1l-2.142 2.142L12 4l1.757.364 2.141-2.141zm-13.37
    // 9.019L3.001 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.
    // 445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1
    // 13l.242-.471.026-.529.445-.287.287-.445.529-.026z',
    svgPath: pathConst.TOOLS_ICON_SVG
  }
  // { to: "/tableexample", exact: false, name: "Table Example", svgPath: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2
  // 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5
  // 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" },
  // { to: "/multitable", exact: false, name: "Multi Table Example", svgPath: "M20 4H4c-1.1 0-1.99.
  // 9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5
  // 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" },
  // { to: "/d3Piechartexample", exact: false, name: "D3 Pie Chart Example", svgPath: "M20 4H4c-1.1
  // 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9
  // 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" },
  // { to: "/d3stackbarchartexample", exact: false, name: "Stack bar Chart Example", svgPath: "M20 4H4c-1.1
  //  0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9
  //  2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5
  //  5h-4V9h4v9z" },
  // { to: "/d3interlockingexample", exact: false, name: "Interlocking Director Example", svgPath: "M20 4H4c-1.1
  // 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9
  // 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" },
  // { to: "/d3map", exact: false, name: "Map Example", svgPath: "M20 4H4c-1.1 0-1.99.9-1.99
  // 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.
  // 9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" },
];

// get nav icons

class Sidebar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  // state = {
  //   isOpenComponents: false,
  //   isOpenContents: false,
  //   isOpenPages: false,
  // };

  // className="insightialogo pe-2 mt-5 mb-5"

  render() {
    return (
      <aside className={bem.b()}>
        <div className={bem.e('background')} />
        <div className={bem.e('content')}>
          <nav className={bem.e('navbar')}>
            <span rel='noopener noreferrer' className={bem.e('navbar-brand d-flex')} onClick={() => history.push('/')}>
              <img src={pathConst.INSIGHTIA_LOGO} className='insightialogo' alt='logo' />
            </span>
          </nav>
          <ul className='nav flex-column'>
            {navItems.map(({ to, name, svgPath, exact }, index) => (
              <li className='nav-item' key={`nv_${index + 1}`}>
                <NavLink
                  to={to}
                  onClick={(e) => {
                    this.props.handleSidebarForMobileview(e);
                  }}
                  className='nav-link'
                  activeClassName='active'
                  id={`navItem-${name}-${index}`}
                  exact={exact}
                >
                  {/* <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="cr-sidebar__nav-item-icon"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={svgPath} />
                    <path d={svgPath2} />
                  </svg> */}
                  <img src={svgPath} style={{ width: '35%', height: '30px' }} alt='icon' />
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                    viewBox="0 0 50 50"
                  >
                    <polygon class="a" points="0 47.07 9.51 47.07 9.51 4.64 0 9.63 0 47.07" />
                    <polygon
                      class="a"
                      points="42.79 17.12 42.79 9.75 63 26.98 63 25.2 38.75 0 19.02 9.27 19.02 15.33 13.07 17.95
                       13.07 47.07 21.4 47.07 21.4 13.79 26.15 13.79 26.15 47.07 63 47.07 63 44.58 42.79 43.51 42.79
                        38.39 63 41.37 63 39.34 42.79 34.95 42.79 29.95 63 35.78 63 33.76 42.79 27.34 42.79 
                        20.56 63 30.91 63 28.77 42.79 17.12"
                    />
                  </svg> */}
                  {/* {getSVG(name)} */}
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div id='bottom_tweetlinkin' className='footerDetails'>
          <a href={`${pathConst.INSIGHTIA_TWITTER_URL}`} rel='noopener noreferrer' target='_blank'>
            <img src={pathConst.INSIGHTIA_TWITTER_IMG} alt='Twitter' />
          </a>
          <a href={`${pathConst.INSIGHTIA_LINKEDIN_URL}`} rel='noopener noreferrer' target='_blank'>
            <img src={pathConst.INSIGHTIA_LINKEDIN_IMG} alt='LinkedIn' />
          </a>
          <div className='footerLine'>&copy; Copyright {new Date().getFullYear()} Diligent Corporation</div>
        </div>
      </aside>
    );
  }
}

export default React.memo(Sidebar);
