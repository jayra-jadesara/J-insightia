import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import { INVESTOR_SEARCH } from '../../../../constants/PathsConstant';
import bn from '../../../../utils/bemnames';
import Card from '../../../GeneralForm/Card';
import { NORECORDS } from '../../../../constants/MessageConstans';
import numConst from '../../../../constants/NumberConstants';

const VotingProfileStructure = ({ location, tableStructure, TrialStatus }) => {
  const bem = bn.create('investorVotingProfile');
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!query.investor) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  if (Object.keys(tableStructure).length === numConst.EMPTY_TABLE_LENGTH) {
    return (
      <div className='pb-2'>
        <Card title='Corporate Structure Policy'>{NORECORDS}</Card>
      </div>
    );
  }

  return (
    <div className='pt-2'>
      <Card IsShowCard title='Corporate Structure Policy' smalltitle='' addedClass=''>
        <div className={bem.b('row')}>
          <div className='col-12 col-md-4 pt-2'>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Authorize Share Re-Purchase</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableStructure.authorise_repurchase !== '' ? tableStructure.authorise_repurchase : 'n/a'}
              </div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Preferred Stock (Blank Check)</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableStructure.preferred_stock !== '' ? tableStructure.preferred_stock : 'n/a'}
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 pt-2'>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Issuance w/o Preemptive Rights</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableStructure.issuance_preemptive !== '' ? tableStructure.issuance_preemptive : 'n/a'}
              </div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Related Party Transaction</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableStructure.related_party !== '' ? tableStructure.related_party : 'n/a'}
              </div>
            </div>
          </div>
          <div className='col-12 col-md-4 pt-2'>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>Dual Stock Structure</div>
              <div className='col-6 col-md-4 mb-2'>
                {tableStructure.dual_stock !== '' ? tableStructure.dual_stock : 'n/a'}
              </div>
            </div>
            <div className={TrialStatus ? 'blurrytext row' : 'row'}>
              <div className='col-6 col-md-8 mb-2 text-primary'>M&A</div>
              <div className='col-6 col-md-4 mb-2'>{tableStructure.manda !== '' ? tableStructure.manda : 'n/a'}</div>
            </div>
          </div>

          {(tableStructure.manda_text !== '' || tableStructure.memorandum_articles !== '') && (
            <div className='row pt-4'>
              <div className='headerTitle'>Business Transactions</div>
              {tableStructure.manda_text !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Mergers & Acquisitions</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableStructure.manda_text
                    }}
                  />
                </>
              )}
              {tableStructure.memorandum_articles !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Memorandum/Articles of Association/Bylaws</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableStructure.memorandum_articles
                    }}
                  />
                </>
              )}
              {tableStructure.transactions_general !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>General</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableStructure.transactions_general
                    }}
                  />
                </>
              )}
            </div>
          )}

          {(tableStructure.share_issuance_text !== '' ||
            tableStructure.share_issuance_preemptive !== '' ||
            tableStructure.dual_stock_structure !== '' ||
            tableStructure.blank_cheque !== '' ||
            tableStructure.stock_splits_text !== '' ||
            tableStructure.reverse_splits !== '') && (
            <div className='row pt-4'>
              <div className='headerTitle'>Capital Structure</div>
              {tableStructure.share_issuance_text !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Share Issuance</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableStructure.share_issuance_text
                    }}
                  />
                </>
              )}
              {tableStructure.share_issuance_preemptive !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Share Issuance: Pre-emptive Rights</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableStructure.share_issuance_preemptive
                    }}
                  />
                </>
              )}
              {tableStructure.dual_stock_structure !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Dual Stock Structure</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableStructure.dual_stock_structure
                    }}
                  />
                </>
              )}
              {tableStructure.blank_cheque !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>&apos;Blank Check&apos; - Preferred Stock</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableStructure.blank_cheque
                    }}
                  />
                </>
              )}
              {tableStructure.stock_splits_text !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Stock Splits</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableStructure.stock_splits_text
                    }}
                  />
                </>
              )}
              {tableStructure.reverse_splits !== '' && (
                <>
                  <div className='subHeaderTitle pt-4'>Reverse Stock Splits</div>
                  <span
                    className={TrialStatus ? 'blurrytext pt-2' : 'pt-2'}
                    dangerouslySetInnerHTML={{
                      __html: tableStructure.reverse_splits
                    }}
                  />
                </>
              )}
            </div>
          )}

          {tableStructure.regional_investor !== '' && (
            <div className='row ps-3 pt-4'>
              <div className={TrialStatus ? 'blurrytext' : ''}>
                <span>* - Indicates regional policy for parent investor </span>
                <span style={{ fontWeight: '400', fontStyle: 'italic' }}>({tableStructure.regional_investor})</span>
              </div>
            </div>
          )}
          {tableStructure.global_investor !== '' && (
            <div className='row ps-3 pt-4'>
              <div className={TrialStatus ? 'blurrytext' : ''}>
                <span>** - Indicates regional policy for global investor </span>
                <span style={{ fontWeight: '400', fontStyle: 'italic' }}>({tableStructure.global_investor})</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

VotingProfileStructure.propTypes = {
  location: PropTypes.object.isRequired,
  loadingData: PropTypes.bool.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  TrialStatus: PropTypes.bool.isRequired,
  tableRemuneration: PropTypes.object
};
VotingProfileStructure.defaultProps = {
  tableRemuneration: {}
};

export default withRouter(VotingProfileStructure);
