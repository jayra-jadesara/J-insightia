import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';
import PropTypes from 'prop-types';
import Page from '../../Page';
import { QUERY_AND_ID } from '../../../constants/PathsConstant';
import { LOADING } from '../../../constants/MessageConstans';
import bn from '../../../utils/bemnames';
import ActivistShortCampaignsComponent from '../ActivistShorts/ActivistShortCampaignsComponent';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const bem = bn.create('activistShortsCampaigns');

const ActivistShortCampaigns = ({
  location,
  TrialLog,
  aiSInvestorForCompanyrowData,
  aiSActivismSummaryrowData,
  ddlForCampaingData,
  ddlShortSellerCampaignData,
  handleShortSellerCampaign,
  ddlShortSellertSelectedVal,
  handleIsLoading,
  isLoading,
  table_Advisors,
  tbl_avdviser_activist_short,
  investor_data,
  TrialUser,
  TrialUserDisableDownload,
  ...props
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [isData, setIsData] = useState([]);

  // For PDF
  useEffect(() => {
    const array = [];
    let index = 0;
    if (query.print) {
      for (const i of ddlShortSellerCampaignData) {
        index += 1;
        array.push(
          <ActivistShortCampaignsComponent
            key={index}
            location={location}
            TrialLog={TrialLog}
            sectionNo={`${index}. `}
            ddlShortSellertSelectedVal={i}
            //
            aiSInvestorForCompanyrowData={aiSInvestorForCompanyrowData}
            aiSActivismSummaryrowData={aiSActivismSummaryrowData}
            table_Advisors={table_Advisors}
            ddlForCampaingData={ddlForCampaingData}
            ddlShortSellerCampaignData={ddlShortSellerCampaignData}
            handleShortSellerCampaign={handleShortSellerCampaign}
            TrialStatus={props.TrialStatus}
            TrialUserDisableDownload={props.TrialUserDisableDownload}
            TrialUser={TrialUser}
            tbl_avdviser_activist_short={tbl_avdviser_activist_short}
            investor_data={investor_data}
          />
        );
      }
      setIsData(array);
    }
  }, [ddlShortSellerCampaignData, ddlShortSellertSelectedVal, tbl_avdviser_activist_short, investor_data]);
  // For Actual Page
  useEffect(() => {
    const array = [];
    if (!query.print) {
      array.push(
        <ErrorBoundary>
          <ActivistShortCampaignsComponent
            key={0}
            location={location}
            TrialLog={TrialLog}
            aiSInvestorForCompanyrowData={aiSInvestorForCompanyrowData}
            aiSActivismSummaryrowData={aiSActivismSummaryrowData}
            table_Advisors={table_Advisors}
            ddlForCampaingData={ddlForCampaingData}
            ddlShortSellerCampaignData={ddlShortSellerCampaignData}
            handleShortSellerCampaign={handleShortSellerCampaign}
            ddlShortSellertSelectedVal={ddlShortSellertSelectedVal}
            ddlSelection={
              ddlShortSellertSelectedVal !== undefined
                ? ddlShortSellertSelectedVal
                : ddlShortSellerCampaignData[0]
            }
            sectionNo=''
            TrialStatus={props.TrialStatus}
            TrialUser={TrialUser}
            TrialUserDisableDownload={TrialUserDisableDownload}
            tbl_avdviser_activist_short={tbl_avdviser_activist_short}
            investor_data={investor_data}
          />
        </ErrorBoundary>
      );
      setIsData(array);
      if (array.length) {
        handleIsLoading(false);
      }
    }
  }, [ddlShortSellerCampaignData, ddlShortSellertSelectedVal, tbl_avdviser_activist_short, investor_data]);
  return (
    <Page
      {...{
        location,
        TrialLog,
        aiSInvestorForCompanyrowData,
        aiSActivismSummaryrowData,
        isLoading
      }}
      key={1}
      className={bem.b('pt-3')}
    >
      {isLoading ? LOADING : isData}
    </Page>
  );
};

ActivistShortCampaigns.propTypes = {
  location: PropTypes.object,
  TrialLog: PropTypes.bool,
  isLoading: PropTypes.bool,
  aiSInvestorForCompanyrowData: PropTypes.array.isRequired,
  aiSActivismSummaryrowData: PropTypes.array.isRequired
};

ActivistShortCampaigns.defaultProps = {
  location: { search: QUERY_AND_ID },
  TrialLog: false
};

export default withRouter(React.memo(ActivistShortCampaigns));
