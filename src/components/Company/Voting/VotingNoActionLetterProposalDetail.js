import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Card from '../../GeneralForm/Card';
import { dateToNull } from '../../../utils/general-util';

const VotingNoActionLetterProposalDetail = (props) => (
  <div className='pb-3'>
    <Card title='No Action Letter Proposal Detail' smalltitle=''>
      <>
        <div className='row'>
          <div className='col-sm-12 col-md-12 col-lg-4'>
            <div className='row'>
              <div className='row'>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    {' '}
                    <b>Decision Date:</b>
                  </div>
                </div>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    {dateToNull(props.noActionLetterProposalDetailList.decision_date, 'dd-mmm-yy', true)}
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    <b>Ruled By:</b>
                  </div>
                </div>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    {' '}
                    {props.noActionLetterProposalDetailList.RuledBy !== ''
                      ? props.noActionLetterProposalDetailList.RuledBy
                      : '-'}
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    <b>Full Ruling:</b>
                  </div>
                </div>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    <a
                      aria-hidden
                      target='_blank'
                      href={props.noActionLetterProposalDetailList.FullRuling}
                      className='text-secondary btn-link'
                      rel='noopener noreferrer'
                    >
                      Link
                    </a>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    {' '}
                    <b>Outcome:</b>
                  </div>
                </div>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    {' '}
                    {props.noActionLetterProposalDetailList.outcome !== ''
                      ? props.noActionLetterProposalDetailList.outcome
                      : '-'}
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    <b>SEC Rule:</b>
                  </div>
                </div>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    {props.noActionLetterProposalDetailList.SEC_Rule_1 !== ''
                      ? props.noActionLetterProposalDetailList.SEC_Rule_1
                      : '-'}
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    <b>SEC Rule 2:</b>
                  </div>
                </div>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    {props.noActionLetterProposalDetailList.SEC_Rule_2 !== ''
                      ? props.noActionLetterProposalDetailList.SEC_Rule_2
                      : '-'}
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    <b>Company Legal Representation:</b>
                  </div>
                </div>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    {props.noActionLetterProposalDetailList.issuer_legal_rep !== ''
                      ? props.noActionLetterProposalDetailList.issuer_legal_rep
                      : '-'}
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    <b>Law Firm Contact:</b>
                  </div>
                </div>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    {props.noActionLetterProposalDetailList.LawFirmContact !== ''
                      ? props.noActionLetterProposalDetailList.LawFirmContact
                      : '-'}
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    <b>Company Contact:</b>
                  </div>
                </div>
                <div className='col-6 mb-1'>
                  <div className='text-primary'>
                    {props.noActionLetterProposalDetailList.IssuerContact !== ''
                      ? props.noActionLetterProposalDetailList.IssuerContact
                      : '-'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-12 col-lg-8'>
            <div className='row pt-3'>
              <div className='col-12'>
                <div className='text-primary'>
                  <b>Proposal Detail:</b>
                </div>
              </div>
              <div className='col-12'>
                <div className='text-primary'>
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        props.noActionLetterProposalDetailList.proposal_detail !== ''
                          ? props.noActionLetterProposalDetailList.proposal_detail
                          : '-'
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <div className='text-primary'>
                  <b>Ruling Text:</b>
                </div>
              </div>
              <div className='col-12'>
                <div className='text-primary'>
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        props.noActionLetterProposalDetailList.Rulingtxt !== ''
                          ? props.noActionLetterProposalDetailList.Rulingtxt
                          : '-'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Card>
  </div>
);

VotingNoActionLetterProposalDetail.propTypes = {
  noActionLetterProposalDetailList: PropTypes.object.isRequired
};

export default withRouter(React.memo(VotingNoActionLetterProposalDetail));
