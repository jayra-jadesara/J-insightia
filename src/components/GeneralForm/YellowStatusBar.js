import React from 'react';
import TypeConstants from '../../constants/TrialTypeConstants';
import productsConst from '../../constants/ProductConstants';
import { sendMailToTeam } from '../../utils/company-util';
import Modal from '../GeneralForm/Modal';
import PathsConstant from '../../constants/PathsConstant';
import { getOwnershipStatus } from '../../utils/general-util';

class YellowStatusBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mailObj: {},
      isModalPopupVisible: false,
      searchID: ''
    };
  }

  sendMail = (subject) => {
    this.state.mailObj = {
      user_id: this.props.userid,
      email: this.props.UserEmail,
      url: this.props.url.pathname,
      subject: subject,
      number_profile: this.props.profileCount,
      trialUser: this.props.ProductStatusNo === TypeConstants.TRIAL_USER
    };
    sendMailToTeam(this.state.mailObj);
    // modal
    this.setState({ isModalPopupVisible: true });
  };

  statusIdNotHit = () => (
    <span>
      If you&apos;d like a demo to view the full features, click{' '}
      <a onClick={() => this.sendMail('Trialist Demo Requested')}>
        <u>here</u>{' '}
      </a>
      and a member of the team will get in contact
    </span>
  );

  statusIdHit = () => (
    <span>
      Module trial page limit met. If you&apos;d like a demo to view the full
      features, click{' '}
      <a onClick={() => this.sendMail('Trialist Demo Requested')}>
        <u>here</u>{' '}
      </a>
      and a member of the team will get in contact
    </span>
  );

  statusIdNotTrialUser = () => (
    <span>
      This module is not available in your package. If you&apos;d like to see a
      sample of the data available, please click{' '}
      <a onClick={this.getSearchID}>
        <u>here</u>{' '}
      </a>
      . If you&apos;d like to unlock this data, or view the full features, click{' '}
      <a onClick={() => this.sendMail('Non-Trialist Demo Requested')}>
        <u>here</u> and a member of the team will get in contact
      </a>
    </span>
  );

  statusSampleId = () => (
    <span>
      This is a sample {this.props.module} profile. If you&apos;d like to unlock
      this data for other companies, or view the full features, click{' '}
      <a
        onClick={() =>
          this.sendMail(`Sample ${this.props.module} Demo Requested`)
        }
      >
        <u>here</u>{' '}
      </a>
      and a member of the team will get in contact
    </span>
  );

  handleOKModelPopup = () => {
    this.setState({ isModalPopupVisible: false });
  };

  //Get link to redirect to trial page
  getSearchID = () => {
    if (this.props.module === TypeConstants.MODULE_COMPANY) {
      const searchId =
        this.props.url &&
        this.props.url.search.substring(
          this.props.url.search.indexOf('?') + 1,
          this.props.url.search.indexOf('=')
        );
      if (this.props.url && searchId === 'pid') {
        location.href = `${this.props.url.pathname}?${searchId}=${TypeConstants.TRIAL_PID}`;
      }
      if (this.props.url && searchId === 'meetingid') {
        location.href = `${this.props.url.pathname}?${searchId}=${TypeConstants.TRIAL_MEETINGID}`;
      }
    }
    if (this.props.module === TypeConstants.MODULE_ADVISERS) {
      const searchId =
        this.props.url &&
        this.props.url.search.substring(
          this.props.url.search.indexOf('?') + 1,
          this.props.url.search.indexOf('=')
        );
      if (this.props.url && searchId === 'company_id') {
        location.href = `${this.props.url.pathname}?${searchId}=${TypeConstants.TRIAL_ADVISERS_COMPANYID}`;
      }
    }
    if (this.props.module === TypeConstants.MODULE_INVESTOR) {
      let searchQuery = '';
      if (
        Number(this.props.module_product_id) === productsConst.VOTING ||
        Number(this.props.module_product_id) === productsConst.ACTIVISM
      ) {
        searchQuery = `?investor=${TypeConstants.TRIAL_INVESTORID_VOTING_AND_ACTIVISM}`;
      }
      if (
        Number(this.props.module_product_id) === productsConst.ACTIVIST_SHORTS
      ) {
        searchQuery = `?investor=${TypeConstants.TRIAL_INVESTORID_ACTIVIST_SHORTS}`;
      }
      const mpercentInclude = this.props.url.search.includes('&');
      if (mpercentInclude) {
        searchQuery += this.props.url.search.substring(
          this.props.url.search.split('&')[0].length,
          this.props.url.search.length
        );
      }
      location.href = `${this.props.url.pathname}${searchQuery}`;
    }
    if (this.props.module === TypeConstants.MODULE_PEOPLE) {
      const searchId =
        this.props.url &&
        this.props.url.search.substring(
          this.props.url.search.indexOf('?') + 1,
          this.props.url.search.indexOf('=')
        );
      if (this.props.url && searchId === 'director_id') {
        location.href = `${this.props.url.pathname}?${searchId}=${TypeConstants.TRIAL_DIRECTOR_ID}`;
      }
    }
  };

  //function Status text on yellow bar
  getStatus = () => {
    //#region Company
    if (this.props.module === TypeConstants.MODULE_COMPANY) {
      if (
        !this.props.distinctProfile &&
        (this.props.ProductStatusNo === TypeConstants.TRIAL_USER ||
          this.props.isOwnershipTrial
        )
      ) {
        return this.statusIdNotHit();
      }
      if (
        this.props.distinctProfile &&
        (this.props.ProductStatusNo === TypeConstants.TRIAL_USER || this.props.isOwnershipTrial) &&
        this.props.uniqueId !== TypeConstants.TRIAL_PID
      ) {
        return this.statusIdHit();
      }
      if (
        this.props.ProductStatusNo !== TypeConstants.TRIAL_USER &&
        (this.props.uniqueId !== TypeConstants.TRIAL_PID || this.props.isOwnershipTrial)
      ) {
        return this.statusIdNotTrialUser();
      }
      if (
        this.props.distinctProfile &&
        this.props.uniqueId === TypeConstants.TRIAL_PID
      ) {
        return this.statusSampleId();
      }
    }
    //#endregion

    //#region Investor
    if (this.props.module === TypeConstants.MODULE_INVESTOR) {
      if (
        !this.props.distinctProfile &&
        (this.props.ProductStatusNo === TypeConstants.TRIAL_USER ||
        this.props.isOwnershipTrial)
      ) {
        return this.statusIdNotHit();
      }
      if (
        Number(this.props.module_product_id) === productsConst.VOTING ||
        Number(this.props.module_product_id) === productsConst.ACTIVISM
      ) {
        if (
          this.props.distinctProfile &&
          (this.props.ProductStatusNo === TypeConstants.TRIAL_USER ||
            this.props.isOwnershipTrial) &&
          Number(this.props.queryUniqueId) !==
            TypeConstants.TRIAL_INVESTORID_VOTING_AND_ACTIVISM
        ) {
          return this.statusIdHit();
        }
        if (
          (this.props.ProductStatusNo !== TypeConstants.TRIAL_USER ||
            !this.props.isOwnershipTrial) &&
          Number(this.props.queryUniqueId) !==
            TypeConstants.TRIAL_INVESTORID_VOTING_AND_ACTIVISM
        ) {
          return this.statusIdNotTrialUser();
        }
        if (
          this.props.distinctProfile &&
          Number(this.props.queryUniqueId) ===
            TypeConstants.TRIAL_INVESTORID_VOTING_AND_ACTIVISM
        ) {
          return this.statusSampleId();
        }
      }
      if (
        Number(this.props.module_product_id) === productsConst.ACTIVIST_SHORTS
      ) {
        if (
          this.props.distinctProfile &&
          (this.props.ProductStatusNo === TypeConstants.TRIAL_USER ||
            this.props.isOwnershipTrial) &&
          Number(this.props.queryUniqueId) !==
            TypeConstants.TRIAL_INVESTORID_ACTIVIST_SHORTS
        ) {
          return this.statusIdHit();
        }
        if (
          (this.props.ProductStatusNo !== TypeConstants.TRIAL_USER ||
            !this.props.isOwnershipTrial) &&
          Number(this.props.queryUniqueId) !==
            TypeConstants.TRIAL_INVESTORID_ACTIVIST_SHORTS
        ) {
          return this.statusIdNotTrialUser();
        }
        if (
          this.props.distinctProfile &&
          Number(this.props.queryUniqueId) ===
            TypeConstants.TRIAL_INVESTORID_ACTIVIST_SHORTS
        ) {
          return this.statusSampleId();
        }
      }
    }
    //#endregion

    //#region People
    if (this.props.module === TypeConstants.MODULE_PEOPLE) {
      if (
        !this.props.distinctProfile &&
        this.props.ProductStatusNo === TypeConstants.TRIAL_USER
      ) {
        return this.statusIdNotHit();
      }
      if (
        this.props.distinctProfile &&
        this.props.ProductStatusNo === TypeConstants.TRIAL_USER &&
        Number(this.props.queryUniqueId) !== TypeConstants.TRIAL_DIRECTOR_ID
      ) {
        return this.statusIdHit();
      }
      if (
        this.props.ProductStatusNo !== TypeConstants.TRIAL_USER &&
        Number(this.props.queryUniqueId) !== TypeConstants.TRIAL_DIRECTOR_ID
      ) {
        return this.statusIdNotTrialUser();
      }
      if (
        this.props.distinctProfile &&
        Number(this.props.queryUniqueId) === TypeConstants.TRIAL_DIRECTOR_ID
      ) {
        return this.statusSampleId();
      }
    }
    //#endregion

    //#region Advisers
    if (this.props.module === TypeConstants.MODULE_ADVISERS) {
      if (
        !this.props.distinctProfile &&
        this.props.ProductStatusNo === TypeConstants.TRIAL_USER
      ) {
        return this.statusIdNotHit();
      }
      if (
        this.props.distinctProfile &&
        this.props.ProductStatusNo === TypeConstants.TRIAL_USER &&
        Number(this.props.queryUniqueId) !==
          TypeConstants.TRIAL_ADVISERS_COMPANYID
      ) {
        return this.statusIdHit();
      }
      if (
        this.props.ProductStatusNo !== TypeConstants.TRIAL_USER &&
        Number(this.props.queryUniqueId) !==
          TypeConstants.TRIAL_ADVISERS_COMPANYID
      ) {
        return this.statusIdNotTrialUser();
      }
      if (
        this.props.distinctProfile &&
        Number(this.props.queryUniqueId) ===
          TypeConstants.TRIAL_ADVISERS_COMPANYID
      ) {
        return this.statusSampleId();
      }
    }
    //#endregion
  };

  render() {
    if (
      (this.props.trialProductStatus !== null &&
      this.props.trialProductStatus !== TypeConstants.NOT_TRIAL_USER &&
      this.props.uniqueId !== null) || this.props.isOwnershipTrial
    ) {
      return (
        <>
          <div className='yellowBar'>
            <i className='bi bi-exclamation-circle' /> {this.getStatus()}
          </div>
          {this.state.isModalPopupVisible && (
            <Modal show isShowFooter handleClose={this.handleOKModelPopup}>
              Thank you, a member of the team will be in touch shortly.
            </Modal>
          )}
        </>
      );
    }
    return null;
  }
}

export default React.memo(YellowStatusBar);
