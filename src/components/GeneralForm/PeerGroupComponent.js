import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import bn from '../../utils/bemnames';
import IWidget from '../GeneralForm/IWidget';
import CollapseComponent from '../GeneralForm/CollapseComponent';
import { history } from '../../utils/navigation-util';
import numConst from '../../constants/NumberConstants';
import propTypes from '../../utils/propTypes';
import {
  ACTIVISM_OVERVIEW,
  ACTIVISTSHORTS_OVERVIEW,
  ACTIVIST_VULNERABILITY,
  COMPANY_OVERVIEW,
  GOVERNANCE_OVERVIEW,
  QUERY_MEETING,
  QUERY_PID,
  VOTING_OVERVIEW,
} from '../../constants/PathsConstant';
import ErrorBoundary from './ErrorBoundary';

const bem = bn.create('companysearch');

const PeerGroupComponent = (props) => {
  const query = qs.parse(history.location.search, { ignoreQueryPrefix: true });

  const handleNext = (e) => {
    if (props.indexID < props.lstPeerGroup.length - 1) {
      let index = props.indexID;
      index += 1;
      props.setIndex(index);
    }
  };
  const handlePrev = (e) => {
    if (props.indexID > 0) {
      let index = props.indexID;
      index -= 1;
      props.setIndex(index);
    }
  };
  const handleFirst = (e) => {
    props.setIndex(0);
  };
  const handleLast = (e) => {
    const index = props.lstPeerGroup.length - 1;
    props.setIndex(index);
  };

  return (
    <>
      <div className={bem.b('row pdfpagebreakinsideavoid')}>
        <div className='col-12 mb-0'>
          <CollapseComponent
            Heading={props.title}
            index='1'
            isOpen={props.isOpen}
            withoutCollapseComponent={query.print}
            withoutCollapseWithCard={query.print}
          >
            {props.lstPeerGroup.length > 0 ? (
              <ErrorBoundary>
                <div className='cr-advisorsearch'>
                  <table className='table mt-3 searchtable'>
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Country</th>
                        <th>Module</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.lstPeerGroup.length > 0 &&
                        props.lstPeerGroup[props.indexID].map(
                          (listValue, index) => (
                            <tr
                              className='searchtableresults'
                              key={`Recordset${index + 1}`}
                            >
                              <td>
                                <span
                                  className='btn btn-link'
                                  aria-hidden='true'
                                  onClick={(e) => {
                                    e.preventDefault();
                                    props.handleResetCompanyTitle();
                                    props.handleResetBreadcrumbs(
                                      COMPANY_OVERVIEW
                                    );
                                    props.handleResetCompanyPath(
                                      COMPANY_OVERVIEW
                                    );
                                    history.push(
                                      `${COMPANY_OVERVIEW}${QUERY_PID}${listValue.PID}`
                                    );
                                    window.scrollTo({
                                      top: 0,
                                      behavior: 'smooth',
                                    });
                                  }}
                                >
                                  {listValue.prev_names && (
                                    <IWidget
                                      tooltipOverrideString={
                                        listValue.prev_names
                                      }
                                    />
                                  )}{' '}
                                  {listValue.Company_name}
                                </span>
                              </td>
                              <td>{listValue.Country_name}</td>
                              {/* new modules */}
                              <td>
                                {listValue.activism === numConst.NUMBER_ONE ? (
                                  <button
                                    type='button'
                                    className='btn btn-primary m-1'
                                    onClick={(e) => {
                                      e.preventDefault();
                                      props.handleResetCompanyTitle();
                                      history.push(
                                        `${ACTIVISM_OVERVIEW}${QUERY_PID}${listValue.PID}`
                                      );
                                    }}
                                  >
                                    Activism
                                  </button>
                                ) : (
                                  ''
                                )}
                                {listValue.activist_shorts ===
                                numConst.NUMBER_ONE ? (
                                  <button
                                    type='button'
                                    className='btn btn-primary m-1'
                                    onClick={(e) => {
                                      e.preventDefault();
                                      props.handleResetCompanyTitle();
                                      history.push(
                                        `${ACTIVISTSHORTS_OVERVIEW}${QUERY_PID}${listValue.PID}`
                                      );
                                    }}
                                  >
                                    Activist Shorts
                                  </button>
                                ) : (
                                  ''
                                )}
                                {listValue.governance ===
                                numConst.NUMBER_ONE ? (
                                  <button
                                    type='button'
                                    className='btn btn-primary m-1'
                                    onClick={(e) => {
                                      e.preventDefault();
                                      props.handleResetCompanyTitle();
                                      history.push(
                                        `${GOVERNANCE_OVERVIEW}${QUERY_PID}${listValue.PID}`
                                      );
                                    }}
                                  >
                                    Governance
                                  </button>
                                ) : (
                                  ''
                                )}
                                {listValue.vulnerability ===
                                numConst.NUMBER_ONE ? (
                                  <button
                                    type='button'
                                    className='btn btn-primary m-1'
                                    onClick={(e) => {
                                      e.preventDefault();
                                      props.handleResetCompanyTitle();
                                      history.push(
                                        `${ACTIVIST_VULNERABILITY}${QUERY_PID}${listValue.PID}`
                                      );
                                    }}
                                  >
                                    Vulnerability
                                  </button>
                                ) : (
                                  ''
                                )}
                                {listValue.voting === numConst.NUMBER_ONE ? (
                                  <button
                                    type='button'
                                    className='btn btn-primary m-1'
                                    onClick={(e) => {
                                      e.preventDefault();
                                      props.handleResetCompanyTitle();
                                      history.push(
                                        `${VOTING_OVERVIEW}${QUERY_MEETING}${listValue.meeting_id}`
                                      );
                                    }}
                                  >
                                    Voting
                                  </button>
                                ) : (
                                  ''
                                )}
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
                <div className='pagination_peer'>
                  <span> {props.indexID * 10 + 1} </span> to{' '}
                  <span>
                    {props.indexID + 1 === props.lstPeerGroup.length
                      ? props.lstOriginalData.length
                      : props.lstPeerGroup[props.indexID].length *
                        (props.indexID + 1)}{' '}
                  </span>
                  of
                  <span> {props.lstOriginalData.length} </span>&ensp;
                  <button
                    id='btnFirst'
                    type='button'
                    className='btnToLink'
                    disabled={props.indexID === 0}
                    onClick={(e) => {
                      e.preventDefault();
                      handleFirst(e);
                    }}
                  >
                    &laquo;
                  </button>
                  <button
                    id='btnPrev'
                    type='button'
                    className='btnToLink'
                    disabled={props.indexID === 0}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePrev(e);
                    }}
                  >
                    &lt;
                  </button>
                  Page <span> {props.indexID + 1} </span> of{' '}
                  <span> {props.lstPeerGroup.length} </span>
                  <button
                    id='btnNext'
                    type='button'
                    className='btnToLink'
                    disabled={props.indexID === props.lstPeerGroup.length - 1}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNext(e);
                    }}
                  >
                    &gt;
                  </button>
                  <button
                    id='btnLast'
                    type='button'
                    className='btnToLink'
                    disabled={props.indexID === props.lstPeerGroup.length - 1}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLast(e);
                    }}
                  >
                    &raquo;
                  </button>
                </div>
              </ErrorBoundary>
            ) : (
              <div>
                <p>
                  No companies in peer group selected are available in the Vulnerability universe. Using default values
                </p>
              </div>
            )}
          </CollapseComponent>
        </div>
      </div>
    </>
  );
};

PeerGroupComponent.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleResetCompanyTitle: PropTypes.func,
};

PeerGroupComponent.defaultProps = {
  title: '',
  isOpen: false,
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleResetCompanyTitle: () => {},
};

export default React.memo(PeerGroupComponent);
