import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import { INVESTOR_SEARCH } from '../../../../constants/PathsConstant';
import bn from '../../../../utils/bemnames';
import Card from '../../../GeneralForm/Card';
import { NORECORDS } from '../../../../constants/MessageConstans';
import numConst from '../../../../constants/NumberConstants';

const VotingProfileCommittes = ({ location, tableCommittes, TrialStatus }) => {
  const bem = bn.create('investorVotingProfile');
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!query.investor) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  if (Object.keys(tableCommittes).length === numConst.EMPTY_TABLE_LENGTH) {
    return (
      <div className='pb-2'>
        <Card title='Committees & Reporting Policy'>{NORECORDS}</Card>
      </div>
    );
  }

  return (
    <div className='pt-2'>
      <Card IsShowCard title='Committees & Reporting Policy' smalltitle=''>
        <div className={bem.b('row pdfpagebreak ')}>
          <div className={TrialStatus ? 'blurrytext row pt-4' : 'row pt-4'}>
            <div className='col-6 col-md-2 mb-2 text-primary'>Non Audit Work</div>
            <div className='col-6 col-md-2 mb-2'>
              {tableCommittes.non_audit_work !== '' ? tableCommittes.non_audit_work : 'n/a'}
            </div>
            <div className='col-6 col-md-2 mb-2 text-primary'>Auditor Rotation</div>
            <div className='col-6 col-md-2 mb-2'>
              {tableCommittes.auditor_rotation !== '' ? tableCommittes.auditor_rotation : 'n/a'}
            </div>
            <div className='col-6 col-md-2 mb-2 text-primary'>Auditor Indemnification</div>
            <div className='col-6 col-md-2 mb-2'>
              {tableCommittes.auditor_indemnification !== '' ? tableCommittes.auditor_indemnification : 'n/a'}
            </div>
          </div>

          {tableCommittes.commitees_general !== '' && (
            <div className='row pt-4'>
              <div className='headerTitle'>Committees General</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableCommittes.commitees_general
                }}
              />
            </div>
          )}
          {(tableCommittes.audit_structure !== '' || tableCommittes.audit_reporting !== '') && (
            <div className='row pt-4'>
              <div className='headerTitle'>Audit Committee</div>
              {tableCommittes.audit_structure !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Structure</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableCommittes.audit_structure
                    }}
                  />
                </>
              )}
              {tableCommittes.audit_reporting !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Reporting</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableCommittes.audit_reporting
                    }}
                  />
                </>
              )}
            </div>
          )}
          {tableCommittes.nomination_structure !== '' && (
            <div className='row pt-4'>
              <div className='headerTitle'>Nomination Committee</div>
              <div className='subHeaderTitle pt-4'>Structure</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableCommittes.nomination_structure
                }}
              />
            </div>
          )}
          {tableCommittes.remuneration_structure !== '' && (
            <div className='row pt-4'>
              <div className='headerTitle'>Remuneration Committee</div>
              <div className='subHeaderTitle pt-4'>Structure</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableCommittes.remuneration_structure
                }}
              />
            </div>
          )}
          {tableCommittes.risk_risk_committee !== '' && (
            <div className='row pt-4'>
              <div className='headerTitle'>Risk Committee</div>
              <div className='subHeaderTitle pt-4'>Risk</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableCommittes.risk_risk_committee
                }}
              />
            </div>
          )}
          {(tableCommittes.audit_external_rotation !== '' || tableCommittes.audit_external_ratification !== '') && (
            <div className='row pt-4'>
              <div className='headerTitle'>Auditor</div>
              {tableCommittes.audit_external_rotation !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>External Auditor Rotation</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableCommittes.audit_external_rotation
                    }}
                  />
                </>
              )}
              {tableCommittes.audit_external_indemnification !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>External Auditor Indemnification</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableCommittes.audit_external_indemnification
                    }}
                  />
                </>
              )}
              {tableCommittes.audit_external_ratification !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>External Auditor ratification</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableCommittes.audit_external_ratification
                    }}
                  />
                </>
              )}
              {tableCommittes.audit_non_audit !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Non Audit Work by Auditor</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableCommittes.audit_non_audit
                    }}
                  />
                </>
              )}
            </div>
          )}
          {tableCommittes.remuneration_report !== '' && (
            <div className='row pt-4'>
              <div className='headerTitle'>Financial Statements</div>
              <span
                className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                dangerouslySetInnerHTML={{
                  __html: tableCommittes.remuneration_report
                }}
              />
            </div>
          )}

          {tableCommittes.regional_investor !== '' && (
            <div className='row ps-3 pt-4'>
              <div className={TrialStatus ? 'blurrytext' : ''}>
                <span>* - Indicates regional policy for parent investor </span>
                <span style={{ fontWeight: '400', fontStyle: 'italic' }}>({tableCommittes.regional_investor})</span>
              </div>
            </div>
          )}
          {tableCommittes.global_investor !== '' && (
            <div className='row ps-3 pt-4'>
              <div className={TrialStatus ? 'blurrytext' : ''}>
                <span>** - Indicates regional policy for global investor </span>
                <span style={{ fontWeight: '400', fontStyle: 'italic' }}>({tableCommittes.global_investor})</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

VotingProfileCommittes.propTypes = {
  location: PropTypes.object.isRequired,
  loadingData: PropTypes.bool.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  TrialStatus: PropTypes.bool.isRequired,
  tableCommittes: PropTypes.object
};
VotingProfileCommittes.defaultProps = {
  tableCommittes: {}
};

export default withRouter(VotingProfileCommittes);
