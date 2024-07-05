import React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import config from '../config/server-config';
import { history } from './navigation-util';
import products from '../constants/ProductConstants';
import productsType from '../constants/ProductTypeConstant';
import {
  TOKEN,
  TOKEN_MODULE_STATUS_TWO,
  TOKEN_MODULE_STATUS_FOUR,
  MOBILE_TOKEN_UPDATE_AFTER_MINUTE,
  MOBILE_TOKEN_UPDATE_MAX_MINUTE,
} from '../constants/GeneralConstant';
import { USER_DEVICE_MOBILE } from '../constants/ScreenSizeConstant';
import PathsConstant, { ICON_IMAGE_PATH } from '../constants/PathsConstant';
import {
  API_CALL_SUCCESSFULL,
  NUMBER_ZERO,
  NUMBER_TWO,
  NUMBER_ONE,
  NUMBER_THREE,
  NUMBER_FOUR,
  NUMBER_FIVE,
  NUMBER_SIX,
  NUMBER_SEVEN,
  NUMBER_NEGATIVE_ONE,
  NUMBER_EIGHT,
  NUMBER_NINE,
  NUMBER_HUNDRED,
  OWNERSHIP_PRODUCT_COUNT,
  ARRAY_START_VALUE,
  FULL_USER,
  NUMBER_ADJUST_ONE,
  ARRAY_POSITION_ONE,
} from '../constants/NumberConstants';
import TrialTypeConstants, {
  TRIAL_USER,
} from '../constants/TrialTypeConstants';

const dateFormat = require('dateformat');

export const VisitorLog = (
  userid,
  pagename,
  querystr,
  sessionid,
  currentproduct
) => {
  try {
    axios.post(
      config.addVisitorLog,
      {
        user_id: userid,
        page_name: pagename,
        query_string: querystr,
        session_id: sessionid,
        current_product: currentproduct,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
  } catch (e) {
    return false;
  }
};

async function CleatHistory() {
  window.localStorage.clear();
  history.push(PathsConstant.CREDENTIAL_FORM);
}

export const GetUserMembership = async (userid) => {
  try {
    const response = await axios.post(config.getUserMembership, {
      User_Id: userid,
    });
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return {};
  }
};

export const ValidTokenReq = async (userdevice) => {
  try {
    const token = localStorage.getItem(TOKEN);
    if (token === null) return false;
    jwt.verify(token, config.tokenSecrectKey, (err) => {
      if (err) {
        CleatHistory();
      }
    });
    const dToken = await jwt.decode(token);
    const ageInMinute = Math.round(
      ((new Date() - (new Date(dToken.iat * 1000) % 86400000)) % 3600000) /
        60000
    );
    const updateAfter = MOBILE_TOKEN_UPDATE_AFTER_MINUTE; // 15 minute
    const maxUpdateLimit = MOBILE_TOKEN_UPDATE_MAX_MINUTE; // 12 hours

    if (ageInMinute < updateAfter) {
      return;
    }
    if (ageInMinute > maxUpdateLimit && userdevice !== USER_DEVICE_MOBILE) {
      CleatHistory();
    }
    if (ageInMinute < maxUpdateLimit || USER_DEVICE_MOBILE) {
      if (
        dToken.Status === TOKEN_MODULE_STATUS_TWO ||
        dToken.Status === TOKEN_MODULE_STATUS_FOUR
      ) {
        async function UpdateTokenMembership(dToken) {
          await GetUserMembership(dToken.User_Id)
            .then((res) => {
              const updateMenbership = { ...dToken, MemberShip: res };
              const newToken = jwt.sign(
                updateMenbership,
                config.tokenSecrectKey
              );
              window.localStorage.setItem(TOKEN, newToken);
            })
            .catch((e) => console.log(e));
        }
        UpdateTokenMembership(dToken);
        return;
      }
      CleatHistory();
    }
  } catch (e) {
    CleatHistory();
  }
};

export const TokenDecode = async () => {
  try {
    const token = localStorage.getItem('token');
    jwt.verify(token, config.tokenSecrectKey, (err) => {
      if (err) {
        history.push(PathsConstant.CREDENTIAL_FORM);
      }
    });
    return await jwt.decode(token);
  } catch (e) {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');

    history.push(PathsConstant.CREDENTIAL_FORM);
  }
};

export const TokenDecodeForProductStatus = async (product_id) => {
  try {
    const dToken = await TokenDecode();
    const product = dToken.MemberShip.filter(
      (x) => x.product_id === product_id
    )[0];
    return await product.status;
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');

    history.push(PathsConstant.CREDENTIAL_FORM);
  }
};

export const UpdateVisitorLog = async (page_name, query_string) => {
  const dToken = await TokenDecode();
  if (dToken) {
    await VisitorLog(
      dToken.User_Id,
      page_name,
      query_string,
      dToken.Session_Id,
      null
    );
    return true;
  }
  return false;
};

export const BarChartDummyData = async () => {
  try {
    const response = await axios.post(
      config.d3BarChartDummyData,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data.data;
    }
  } catch (e) {
    return false;
  }
};

export const GetProcedureRunningEstimateTime = async (procedureName) => {
  try {
    const response = await axios.post(
      config.getProcedureRunningEstimateTime,
      {
        procName: procedureName,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const StackBarChartDummyData = async () => {
  try {
    const response = await axios.post(
      config.d3StackBarChartDummyData,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data.data;
    }
  } catch (e) {
    return false;
  }
};

export const SharPriceChartDummyData = async () => {
  try {
    const response = await axios.post(
      config.d3SharePriceChartDummyData,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data.data;
    }
  } catch (e) {
    return false;
  }
};

export const PieChartDummyData = async () => {
  try {
    const response = await axios.post(
      config.d3PieChartDummyData,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data.data;
    }
  } catch (e) {
    return false;
  }
};

export const DoughnutChartDummyData = async () => {
  try {
    const response = await axios.post(
      config.d3DoughnutChartData,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data.data;
    }
  } catch (e) {
    return false;
  }
};

export const InterLockingDummyData = async () => {
  try {
    const response = await axios.post(
      config.d3InterlockingChartDummydata,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data.data;
    }
  } catch (e) {
    return false;
  }
};

export const GetVotingOverviewPageTrialList = async () => {
  try {
    const response = await axios.post(
      config.votingOverviewPageTrialList,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data.data;
    }
  } catch (e) {
    return false;
  }
};
export const GetVotingQuickviewPageTrialList = async () => {
  try {
    const response = await axios.post(
      config.votingQuickviewPageTrialList,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data.data;
    }
  } catch (e) {
    return false;
  }
};
export const GetVotingResultsPageTrialList = async () => {
  try {
    const response = await axios.post(
      config.votingResultsPageTrialList,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data.data;
    }
  } catch (e) {
    return false;
  }
};
export const GetVotingDetailPageTrialList = async () => {
  try {
    const response = await axios.post(
      config.votingDetailPageTrialList,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data.data;
    }
  } catch (e) {
    return false;
  }
};
export const GetVotingAgainstMgmtPageTrialList = async () => {
  try {
    const response = await axios.post(
      config.votingAgainstMgmtPageTrialList,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data.data;
    }
  } catch (e) {
    return false;
  }
};
export const GetVotingPolicyCheckerPageTrialList = async () => {
  try {
    const response = await axios.post(
      config.votingPolicyCheckerPageTrialList,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data.data;
    }
  } catch (e) {
    return false;
  }
};

export const TrialLog = async (userid, type, pid) => {
  try {
    const distinct_issuer = await axios.post(
      config.addTrialLog,
      {
        user_id: userid,
        type,
        pid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (distinct_issuer.status === API_CALL_SUCCESSFULL) {
      return await distinct_issuer.data.result.recordset[0];
    }
  } catch (e) {
    return false;
  }
};
export const UpdateTrialLog = async (product_id, product_type) => {
  const dToken = await TokenDecode();
  for (let i = 0; i < dToken.MemberShip.length; i += 1) {
    if (
      dToken.MemberShip[i].product_id === product_id &&
      dToken.MemberShip[i].status === NUMBER_TWO
    ) {
      const res = await TrialLog(dToken.User_Id, product_type, null);
      return res;
    }
  }
  return false;
};
export const HandleTrialLog = async (productId) => {
  let product_type = null;
  if (productId === products.ACTIVISM) {
    product_type = productsType.PRODUCT_TYPE_ISSUER_ACTIVISM;
  }
  if (productId === products.VOTING) {
    product_type = productsType.PRODUCT_TYPE_ISSUER_VOTING;
  }
  if (productId === products.ACTIVIST_VULNERABILITY) {
    product_type = productsType.PRODUCT_TYPE_ISSUER_ACTIVIST_VULNERABILITY;
  }
  if (productId === products.ACTIVIST_SHORTS) {
    product_type = productsType.PRODUCT_TYPE_ISSUER_ACTIVIST_SHORTS;
  }
  if (productId === products.GOVERNANCE) {
    product_type = productsType.PRODUCT_TYPE_ISSUER_GOVERNANCE;
  }
  if (productId === products.PEOPLE) {
    product_type = productsType.PRODUCT_TYPE_ISSUER_PEOPLE;
  }

  const responseLog = await UpdateTrialLog(productId, product_type);
  const distinct_issuer =
    responseLog !== undefined ? responseLog.distinct_issuer : null;

  const dToken = await TokenDecode();
  for (let i = 0; i < dToken.MemberShip.length; i += 1) {
    const prodId = dToken.MemberShip[i].product_id;
    const { status } = dToken.MemberShip[i];

    if (
      prodId === productId &&
      status === NUMBER_TWO &&
      distinct_issuer === NUMBER_ZERO
    ) {
      return { response: true, productId };
    }
    if (prodId === productId && status === NUMBER_TWO && distinct_issuer > 0) {
      return { response: false, productId };
    }
    if (prodId === productId && status !== 4 && status !== NUMBER_TWO) {
      return { response: true, productId };
    }
    if (prodId === productId && status === NUMBER_FOUR) {
      return { response: false, productId };
    }
    if (prodId === productId && status === NUMBER_TWO) {
      return { response: true, productId };
    }
    // else{
    //   return await true;
    // }
  }
};

// Because PEOPLE and GOVERNANCE BOTH SHARE PRODUCT ID's
export const HandleTrialLogPeople = async (productId) => {
  let product_type = null;
  if (productId === products.PEOPLE) {
    product_type = productsType.PRODUCT_TYPE_ISSUER_PEOPLE;
  }

  const responseLog = await UpdateTrialLog(productId, product_type);
  const distinct_issuer =
    responseLog !== undefined ? responseLog.distinct_issuer : null;

  const dToken = await TokenDecode();
  for (let i = 0; i < dToken.MemberShip.length; i += 1) {
    const prodId = dToken.MemberShip[i].product_id;
    const { status } = dToken.MemberShip[i];
    if (
      prodId === productId &&
      status === NUMBER_TWO &&
      distinct_issuer === NUMBER_ZERO
    ) {
      return { response: true, productId };
    }
    if (prodId === productId && status === NUMBER_TWO && distinct_issuer > 0) {
      return { response: false, productId };
    }
    if (prodId === productId && status !== 4 && status !== NUMBER_TWO) {
      return { response: true, productId };
    }
    if (prodId === productId && status === NUMBER_FOUR) {
      return { response: false, productId };
    }
    // else{
    //   return await true;
    // }
  }
};

export const AllowDownload = async (productId) => {
  try {
    const dToken = await TokenDecode();
    if (dToken !== null && dToken !== undefined) {
      const arr = dToken.MemberShip;
      return (
        arr.findIndex(
          (p) => p.product_id === productId && p.status === NUMBER_FOUR
        ) >= 0
      );
    }
    return false;
  } catch (e) {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');

    history.push(PathsConstant.CREDENTIAL_FORM);
  }
};

export const GetToolTip = async (tooltipID) => {
  try {
    const response = await axios.post(
      config.getToolTip,
      {
        tooltip_id: tooltipID,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const AllowActivismTimelines = async (productId) => {
  try {
    const dToken = await TokenDecode();
    if (dToken !== null) {
      const membership = dToken.MemberShip;
      if (
        membership.findIndex(
          (p) =>
            p.product_id === productId &&
            (p.status === NUMBER_FOUR || p.status === NUMBER_TWO)
        ) >= 0
      ) {
        return true;
      }
    } else {
      return false;
    }
  } catch (e) {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');

    history.push(PathsConstant.CREDENTIAL_FORM);
  }
};

// AiG header checks
export const GetGovShowPoisonPillTab = async (pid) => {
  try {
    const response = await axios.post(
      config.getGovShowPoisonPillTab,
      {
        pid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data[0].count_recs > 0;
    }
  } catch (e) {
    return false;
  }
};

export const GetGovShowLatestFilingsTab = async (pid) => {
  try {
    const response = await axios.post(
      config.getGovShowLatestFilingsTab,
      {
        pid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data[0].count_recs > 0;
    }
  } catch (e) {
    return false;
  }
};

export const GetGovShowShareholderProposalsTab = async (pid) => {
  try {
    const response = await axios.post(
      config.getGovShowShareholderProposalsTab,
      {
        pid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data[0].count_recs > 0;
    }
  } catch (e) {
    return false;
  }
};

export const GetGovShowComplianceTab = async (pid) => {
  try {
    const response = await axios.post(
      config.getGovShowComplianceTab,
      {
        pid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data[0].count_recs > 0;
    }
  } catch (e) {
    return false;
  }
};

export const Get_Bylaws_Charter_GovGuidelines = async (pid) => {
  try {
    const response = await axios.post(
      config.get_Bylaws_Charter_GovGuidelines,
      {
        pid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data[0].has_bylaws > 0;
    }
  } catch (e) {
    return false;
  }
};

////Feedback
export const SendFeedbackMail = async (req) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));
    const response = await axios.post(
      config.sendFeedbackMail,
      {
        userid: uid,
        feedbackPage: req.feedbackPage,
        feedbacktext: req.feedbacktext,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return false;
  }
};
////
// #region TreeView DDL

export const oneChildtreeView = (oldJson, action) => {
  const myJson = [];
  const parentid = action.payload.currentNode._id.split('-')[1];
  const { selectedNodes } = action.payload;

  oldJson.forEach((element, parentIndex) => {
    if (action.payload.currentNode._depth === NUMBER_ZERO) {
      if (
        selectedNodes.findIndex((item) => item.value === element.value) ===
        NUMBER_NEGATIVE_ONE
      ) {
        const myJsonChilds = [];
        element.children.forEach((e) => {
          if (
            action.payload.currentNode.value === element.value &&
            action.payload.currentNode.checked === false
          ) {
            myJsonChilds.push({ ...e, checked: false, expanded: false });
          } else if (e.checked) {
            myJsonChilds.push({ ...e, checked: true, expanded: true });
          } else {
            // const bool = myJsonChilds.some((item) => item.checked  );
            // myJsonChilds.push({ ...e, checked: false, expanded: !!bool });
            myJsonChilds.push({ ...e, checked: false });
          }
        });
        myJson.push({
          ...element,
          children: myJsonChilds,
          checked: false,
          expanded: false,
        });
      } else {
        const myJsonChilds = [];
        let childrenCount = 0;

        element.children.forEach((e) => {
          if (parentIndex.toString() === parentid) {
            childrenCount += 1;
            myJsonChilds.push({ ...e, checked: true, expanded: false });
          } else {
            myJsonChilds.push({ ...e, checked: false, expanded: false });
          }
        });

        if (parentIndex.toString() === parentid) {
          if (childrenCount === element.children.length) {
            myJson.push({ ...element, children: myJsonChilds, checked: true });
          } else if (childrenCount === NUMBER_ZERO) {
            for (let i = 0; i < myJsonChilds.length; i += 1) {
              myJsonChilds[i].expanded = false;
            }
            myJson.push({ ...element, children: myJsonChilds, checked: false });
          } else {
            myJson.push({ ...element, children: myJsonChilds, checked: false });
          }
        } else {
          myJson.push({ ...element });
        }
      }
    } else {
      const myJsonChild = [];
      let totalActiveChieldElements = 0;

      element.children.forEach((e) => {
        if (parentIndex.toString() === parentid) {
          if (
            selectedNodes.findIndex((item) => item.value === e.value) ===
            NUMBER_NEGATIVE_ONE
          ) {
            myJsonChild.push({ ...e, checked: false, expanded: true });
          } else {
            totalActiveChieldElements += 1;
            myJsonChild.push({ ...e, checked: true, expanded: true });
          }
        } else if (
          action.payload.currentNode.value === e.value &&
          !action.payload.currentNode.checked
        ) {
          myJsonChild.push({ ...e, checked: false, expanded: false });
        } else {
          myJsonChild.push({ ...e });
        }
      });
      if (parentIndex.toString() === parentid) {
        if (totalActiveChieldElements === element.children.length) {
          myJson.push({
            ...element,
            children: myJsonChild,
            checked: true,
            expanded: true,
          });
        } else if (totalActiveChieldElements === NUMBER_ZERO) {
          for (let j = 0; j < myJsonChild.length; j += 1) {
            myJsonChild[j].expanded = false;
          }
          myJson.push({
            ...element,
            children: myJsonChild,
            checked: false,
            expanded: false,
          });
        } else {
          myJson.push({
            ...element,
            children: myJsonChild,
            checked: false,
            expanded: false,
          });
        }
      } else {
        myJson.push({ ...element, children: myJsonChild });
      }
    }
  });
  return myJson;
};

export const twoLayerTreeView = (oldJson, action) => {
  const myJson = [];
  let myDepth2JsonChilds = [];
  let myDepth2JsonChildsCopy = [];
  const myDepth1JsonChilds = [];

  const parentid = action.payload.currentNode._id.split('-')[1];
  const { selectedNodes } = action.payload;

  function commonDepth0(depth, element, parentIndex) {
    let myJsonChilds = [];
    let jsonDepth1Childs = [];
    let childrenCount = 0;

    if (
      selectedNodes.findIndex((item) => item.value === element.value) ===
      NUMBER_NEGATIVE_ONE
    ) {
      myJsonChilds = [];
      jsonDepth1Childs = [];

      element.children.forEach((e) => {
        jsonDepth1Childs = [];
        if (
          action.payload.currentNode.value === element.value &&
          !action.payload.currentNode.checked
        ) {
          e.children.forEach((ec) => {
            jsonDepth1Childs.push({ ...ec, checked: false, expanded: false }); // all children checked false
          });
          myJsonChilds.push({
            ...e,
            children: jsonDepth1Childs,
            checked: false,
            expanded: false,
          });
          jsonDepth1Childs = [];
        } else if (e.checked) {
          myJsonChilds.push({ ...e, checked: true, expanded: true });
        } else {
          const bool = myJsonChilds.some((item) => item.checked);
          myJsonChilds.push({ ...e, checked: false, expanded: !!bool });
        }
      });
      myJson.push({
        ...element,
        children: myJsonChilds,
        checked: false,
        expanded: false,
      });
    } else {
      myJsonChilds = [];
      jsonDepth1Childs = [];
      childrenCount = 0;

      element.children.forEach((e) => {
        if (parentIndex.toString() === parentid) {
          childrenCount += 1;
          e.children.forEach((ec) => {
            jsonDepth1Childs.push({ ...ec, checked: true, expanded: true }); // all children checked true
          });
          myJsonChilds.push({
            ...e,
            children: jsonDepth1Childs,
            checked: true,
            expanded: true,
          });
          jsonDepth1Childs = [];
        } else {
          myJsonChilds.push({ ...e, checked: false, expanded: false });
        }
      });

      if (parentIndex.toString() === parentid) {
        if (childrenCount === element.children.length) {
          myJson.push({
            ...element,
            children: myJsonChilds,
            checked: true,
            expanded: true,
          });
        } else if (childrenCount === NUMBER_ZERO) {
          for (let i = 0; i < myJsonChilds.length; i += 1) {
            myJsonChilds[i].expanded = false;
          }
          myJson.push({ ...element, children: myJsonChilds, checked: false });
        } else {
          myJson.push({ ...element, children: myJsonChilds, checked: false });
        }
      } else {
        myJson.push({ ...element });
      }
    }
  }
  function commonDepth1(depth, element) {
    depth = action.payload.currentNode._depth;
    element.children.forEach((e) => {
      myDepth2JsonChilds = [];

      e.children.forEach((ec) => {
        myDepth2JsonChildsCopy = myDepth2JsonChilds;
        if (
          e.label === action.payload.currentNode.label &&
          action.payload.currentNode.value === e.value &&
          action.payload.currentNode.checked &&
          action.payload.currentNode._depth === depth
        ) {
          myDepth2JsonChilds.push({ ...ec, checked: true, expanded: true });
        } else if (
          e.label === action.payload.currentNode.label &&
          action.payload.currentNode.value === e.value &&
          !action.payload.currentNode.checked &&
          action.payload.currentNode._depth === depth
        ) {
          myDepth2JsonChilds.push({ ...ec, checked: false, expanded: false });
        } else if (ec.checked && action.payload.currentNode._depth === depth) {
          myDepth2JsonChilds.push({
            ...ec,
            checked:
              ec.label === action.payload.currentNode.label &&
              action.payload.currentNode.value === ec.value
                ? action.payload.currentNode.checked
                : ec.checked,
            expanded: true,
          });
        } else if (e.checked && action.payload.currentNode._depth === depth) {
          myDepth2JsonChilds.push({
            ...ec,
            checked:
              e.label === action.payload.currentNode.label &&
              action.payload.currentNode.value === e.value
                ? action.payload.currentNode.checked
                : e.checked,
            expanded: false,
          });
        } else {
          myDepth2JsonChilds.push({
            ...ec,
            checked:
              ec.label === action.payload.currentNode.label &&
              ec.value === action.payload.currentNode.value
                ? action.payload.currentNode.checked
                : false,
            expanded: false,
          });
        }
      });
      myDepth2JsonChildsCopy = myDepth2JsonChilds;
      if (
        myDepth2JsonChildsCopy.filter((item) => item.checked).length ===
        e.children.length
      ) {
        myDepth1JsonChilds.push({
          ...e,
          children: myDepth2JsonChilds,
          checked: true,
          expanded: false,
        });
      } else if (
        myDepth2JsonChildsCopy.filter((item) => !item.checked).length ===
        e.children.length
      ) {
        myDepth1JsonChilds.push({
          ...e,
          children: myDepth2JsonChilds,
          checked: false,
          expanded: false,
        });
      } else {
        myDepth1JsonChilds.push({
          ...e,
          children: myDepth2JsonChilds,
          checked: false,
          expanded: !myDepth2JsonChilds.some((item) => item.checked === false),
        });
      }
      myDepth2JsonChilds = [];
    });
    myJson.push({
      ...element,
      checked: myDepth1JsonChilds.every((item) => item.checked),
      children: myDepth1JsonChilds,
      expanded: true,
    });
  }
  function commonDepth2(depth, element) {
    depth = action.payload.currentNode._depth;
    element.children.forEach((e) => {
      myDepth2JsonChilds = [];

      e.children.forEach((ec) => {
        myDepth2JsonChildsCopy = myDepth2JsonChilds;
        if (
          e.label === action.payload.currentNode.label &&
          action.payload.currentNode.value === e.value &&
          action.payload.currentNode.checked &&
          action.payload.currentNode._depth === depth
        ) {
          myDepth2JsonChilds.push({ ...ec, checked: true, expanded: false });
        } else if (
          e.label === action.payload.currentNode.label &&
          action.payload.currentNode.value === e.value &&
          !action.payload.currentNode.checked &&
          action.payload.currentNode._depth === depth
        ) {
          myDepth2JsonChilds.push({ ...ec, checked: false, expanded: false });
        } else if (ec.checked && action.payload.currentNode._depth === depth) {
          myDepth2JsonChilds.push({
            ...ec,
            checked:
              action.payload.currentNode.value === ec.value
                ? action.payload.currentNode.checked
                : ec.checked,
            expanded: false,
          });
        } else {
          myDepth2JsonChilds.push({
            ...ec,
            checked:
              ec.label === action.payload.currentNode.label &&
              ec.value === action.payload.currentNode.value
                ? action.payload.currentNode.checked
                : false,
            expanded: false,
          });
        }
      });
      myDepth2JsonChildsCopy = myDepth2JsonChilds;
      if (
        myDepth2JsonChildsCopy.filter((item) => item.checked).length ===
        e.children.length
      ) {
        myDepth1JsonChilds.push({
          ...e,
          children: myDepth2JsonChilds,
          checked: true,
          expanded: true,
        });
      } else if (
        myDepth2JsonChildsCopy.filter((item) => !item.checked).length ===
        e.children.length
      ) {
        const bool = myDepth2JsonChilds.some((item) => item.checked);
        myDepth1JsonChilds.push({
          ...e,
          children: myDepth2JsonChilds,
          checked: false,
          expanded: !!bool,
        });
      } else {
        const bool = myDepth2JsonChilds.some((item) => item.checked);
        myDepth1JsonChilds.push({
          ...e,
          children: myDepth2JsonChilds,
          checked: false,
          expanded: !!bool,
        });
      }
      myDepth2JsonChilds = [];
    });
    myJson.push({
      ...element,
      checked: myDepth1JsonChilds.every((item) => item.checked),
      children: myDepth1JsonChilds,
      expanded: true,
    });
  }

  oldJson.forEach((element, parentIndex) => {
    if (action.payload.currentNode._depth === NUMBER_ZERO) {
      commonDepth0(action.payload.currentNode._depth, element, parentIndex); // depth = 0
    } else if (action.payload.currentNode._depth === NUMBER_TWO) {
      commonDepth2(action.payload.currentNode._depth, element); // depth = 2
    } else {
      commonDepth1(action.payload.currentNode._depth, element); // depth = 1
    }
  });
  return myJson;
};

export const threeLayerTreeView = (oldJson, action) => {
  const myJson = [];
  const myDepth1JsonChilds = [];
  let myDepth2JsonChilds = [];
  let myDepth3JsonChilds = [];
  let myDepth3JsonChildsCopy = [];

  const parentid = action.payload.currentNode._id.split('-')[1];
  const { selectedNodes } = action.payload;

  function commonDepth0(depth, element, parentIndex) {
    let myJsonChilds = [];
    let jsonDepth1Childs = [];
    let childrenCount = 0;

    if (
      selectedNodes.findIndex((item) => item.value === element.value) ===
      NUMBER_NEGATIVE_ONE
    ) {
      myJsonChilds = [];
      jsonDepth1Childs = [];

      element.children.forEach((e) => {
        jsonDepth1Childs = [];
        if (
          action.payload.currentNode.value === element.value &&
          !action.payload.currentNode.checked
        ) {
          e.children.forEach((ec) => {
            jsonDepth1Childs.push({ ...ec, checked: false, expanded: false }); // all children checked false
          });
          myJsonChilds.push({
            ...e,
            children: jsonDepth1Childs,
            checked: false,
            expanded: false,
          });
          jsonDepth1Childs = [];
        } else if (e.checked) {
          myJsonChilds.push({ ...e, checked: true, expanded: true });
        } else {
          const bool = myJsonChilds.some((item) => item.checked);
          myJsonChilds.push({ ...e, checked: false, expanded: !!bool });
        }
      });

      let thirdChildJson = [];
      let fourthChildJson = [];
      myJsonChilds.forEach((ejson) => {
        ejson.children.forEach((ec2) => {
          ec2.children.forEach((ec3) => {
            if (ejson.checked) {
              fourthChildJson.push({ ...ec3, checked: true, expanded: true });
            } else if (!ejson.checked) {
              fourthChildJson.push({ ...ec3, checked: false, expanded: false });
            }
          });
          thirdChildJson.push({
            ...ec2,
            children: fourthChildJson,
          });
          fourthChildJson = [];
        });

        myDepth3JsonChilds.push({
          ...ejson,
          children: thirdChildJson,
        });
        thirdChildJson = [];
      });
      myDepth3JsonChildsCopy = myDepth3JsonChilds;

      myJson.push({
        ...element,
        children: myDepth3JsonChildsCopy,
        checked: false,
        expanded: false,
      });
    } else {
      myJsonChilds = [];
      jsonDepth1Childs = [];
      childrenCount = 0;

      element.children.forEach((e) => {
        if (parentIndex.toString() === parentid) {
          childrenCount += 1;
          e.children.forEach((ec) => {
            jsonDepth1Childs.push({ ...ec, checked: true, expanded: true }); // all children checked true
          });
          myJsonChilds.push({
            ...e,
            children: jsonDepth1Childs,
            checked: true,
            expanded: true,
          });
          jsonDepth1Childs = [];
        } else {
          myJsonChilds.push({ ...e, checked: false, expanded: false });
        }
      });

      let thirdChildJson = [];
      let fourthChildJson = [];
      myJsonChilds.forEach((ejson) => {
        ejson.children.forEach((ec2) => {
          ec2.children.forEach((ec3) => {
            if (ejson.checked) {
              fourthChildJson.push({ ...ec3, checked: true, expanded: true });
            } else if (!ejson.checked) {
              fourthChildJson.push({ ...ec3, checked: false, expanded: false });
            }
          });
          thirdChildJson.push({
            ...ec2,
            children: fourthChildJson,
          });
          fourthChildJson = [];
        });

        myDepth3JsonChilds.push({
          ...ejson,
          children: thirdChildJson,
        });
        thirdChildJson = [];
      });
      myDepth3JsonChildsCopy = myDepth3JsonChilds;

      if (parentIndex.toString() === parentid) {
        if (childrenCount === element.children.length) {
          myJson.push({
            ...element,
            children: myDepth3JsonChildsCopy,
            checked: true,
            expanded: true,
          });
        } else if (childrenCount === NUMBER_ZERO) {
          for (let i = 0; i < myDepth3JsonChildsCopy.length; i += 1) {
            myDepth3JsonChildsCopy[i].expanded = false;
          }
          myJson.push({
            ...element,
            children: myDepth3JsonChildsCopy,
            checked: false,
          });
        } else {
          myJson.push({
            ...element,
            children: myDepth3JsonChildsCopy,
            checked: false,
          });
        }
      } else {
        myJson.push({ ...element });
      }
    }
  }
  function commonDepth1(depth, element) {
    depth = action.payload.currentNode._depth;
    element.children.forEach((e) => {
      myDepth2JsonChilds = [];
      e.children.forEach((ec) => {
        if (
          e.label === action.payload.currentNode.label &&
          action.payload.currentNode.value === e.value &&
          action.payload.currentNode.checked &&
          action.payload.currentNode._depth === depth
        ) {
          myDepth2JsonChilds.push({ ...ec, checked: true, expanded: true });
        } else if (
          e.label === action.payload.currentNode.label &&
          action.payload.currentNode.value === e.value &&
          !action.payload.currentNode.checked &&
          action.payload.currentNode._depth === depth
        ) {
          myDepth2JsonChilds.push({ ...ec, checked: false, expanded: false });
        } else if (ec.checked && action.payload.currentNode._depth === depth) {
          myDepth2JsonChilds.push({
            ...ec,
            checked:
              ec.label === action.payload.currentNode.label &&
              action.payload.currentNode.value === ec.value
                ? action.payload.currentNode.checked
                : ec.checked,
            expanded: true,
          });
        } else if (e.checked && action.payload.currentNode._depth === depth) {
          myDepth2JsonChilds.push({
            ...ec,
            checked:
              e.label === action.payload.currentNode.label &&
              action.payload.currentNode.value === e.value
                ? action.payload.currentNode.checked
                : e.checked,
            expanded: false,
          });
        } else {
          myDepth2JsonChilds.push({
            ...ec,
            checked:
              ec.label === action.payload.currentNode.label &&
              ec.value === action.payload.currentNode.value
                ? action.payload.currentNode.checked
                : false,
            expanded: false,
          });
        }
      });

      const thirdChildJson = [];
      myDepth2JsonChilds.forEach((ejson) => {
        ejson.children.forEach((ec2) => {
          if (ejson.checked) {
            myDepth3JsonChilds.push({ ...ec2, checked: true, expanded: true });
          } else if (!ejson.checked) {
            myDepth3JsonChilds.push({
              ...ec2,
              checked: false,
              expanded: false,
            });
          }
        });
        thirdChildJson.push({
          ...ejson,
          children: myDepth3JsonChilds,
        });
        myDepth3JsonChilds = [];
      });
      myDepth3JsonChildsCopy = thirdChildJson;

      if (
        myDepth3JsonChildsCopy.filter((item) => item.checked).length ===
        e.children.length
      ) {
        myDepth1JsonChilds.push({
          ...e,
          children: myDepth3JsonChildsCopy,
          checked: true,
          expanded: false,
        });
      } else if (
        myDepth3JsonChildsCopy.filter((item) => !item.checked).length ===
        e.children.length
      ) {
        myDepth1JsonChilds.push({
          ...e,
          children: myDepth3JsonChildsCopy,
          checked: false,
          expanded: false,
        });
      } else {
        myDepth1JsonChilds.push({
          ...e,
          children: myDepth3JsonChildsCopy,
          checked:
            myDepth3JsonChildsCopy.filter((item) => !item.checked).length ===
            e.children.length,
          expanded: !(
            myDepth3JsonChildsCopy.filter((item) => !item.checked).length ===
            e.children.length
          ),
        });
      }
      myDepth3JsonChildsCopy = [];
    });
    myJson.push({
      ...element,
      checked: myDepth1JsonChilds.every((item) => item.checked),
      children: myDepth1JsonChilds,
      expanded: true,
    });
  }
  function commonDepth2(depth, element) {
    depth = action.payload.currentNode._depth;
    element.children.forEach((e) => {
      myDepth2JsonChilds = [];

      e.children.forEach((ec) => {
        if (
          ec.label === action.payload.currentNode.label &&
          action.payload.currentNode.value === ec.value &&
          action.payload.currentNode.checked &&
          action.payload.currentNode._depth === depth
        ) {
          myDepth2JsonChilds.push({ ...ec, checked: true, expanded: true });
        } else if (
          ec.label === action.payload.currentNode.label &&
          action.payload.currentNode.value === ec.value &&
          !action.payload.currentNode.checked &&
          action.payload.currentNode._depth === depth
        ) {
          myDepth2JsonChilds.push({ ...ec, checked: false, expanded: false });
        } else if (ec.checked && action.payload.currentNode._depth === depth) {
          myDepth2JsonChilds.push({
            ...ec,
            checked:
              action.payload.currentNode.value === ec.value
                ? action.payload.currentNode.checked
                : ec.checked,
            expanded:
              action.payload.currentNode.value === ec.value
                ? action.payload.currentNode.checked
                : ec.checked,
          });
        } else if (!ec.checked && action.payload.currentNode._depth === depth) {
          myDepth2JsonChilds.push({
            ...ec,
            checked:
              action.payload.currentNode.value === ec.value
                ? action.payload.currentNode.checked
                : ec.checked,
            expanded:
              !action.payload.currentNode.value === ec.value
                ? action.payload.currentNode.checked
                : ec.checked,
          });
        } else {
          myDepth2JsonChilds.push({
            ...ec,
            checked:
              ec.label === action.payload.currentNode.label &&
              ec.value === action.payload.currentNode.value
                ? action.payload.currentNode.checked
                : false,
            expanded: false,
          });
        }
      });

      const thirdChildJson = [];
      myDepth2JsonChilds.forEach((ejson) => {
        ejson.children.forEach((ec2) => {
          if (ejson.checked) {
            myDepth3JsonChilds.push({ ...ec2, checked: true, expanded: true });
          } else if (!ejson.checked) {
            myDepth3JsonChilds.push({
              ...ec2,
              checked: false,
              expanded: false,
            });
          }
        });
        thirdChildJson.push({
          ...ejson,
          children: myDepth3JsonChilds,
        });
        myDepth3JsonChilds = [];
      });
      myDepth3JsonChildsCopy = thirdChildJson;

      if (
        myDepth3JsonChildsCopy.filter((item) => item.checked).length ===
        e.children.length
      ) {
        myDepth1JsonChilds.push({
          ...e,
          children: myDepth3JsonChildsCopy,
          checked: true,
          expanded: true,
        });
      } else if (
        myDepth3JsonChildsCopy.filter((item) => !item.checked).length ===
        e.children.length
      ) {
        myDepth1JsonChilds.push({
          ...e,
          children: myDepth3JsonChildsCopy,
          checked: false,
          expanded: false,
        });
      } else {
        myDepth1JsonChilds.push({
          ...e,
          children: myDepth3JsonChildsCopy,
          checked:
            myDepth3JsonChildsCopy.filter((item) => !item.checked).length ===
            e.children.length,
          expanded: !(
            myDepth3JsonChildsCopy.filter((item) => !item.checked).length ===
            e.children.length
          ),
        });
      }
      myDepth3JsonChildsCopy = [];
    });
    myJson.push({
      ...element,
      checked: myDepth1JsonChilds.every((item) => item.checked),
      children: myDepth1JsonChilds,
      expanded: true,
    });
  }
  function commonDepth3(depth, element) {
    depth = action.payload.currentNode._depth;
    element.children.forEach((e) => {
      myDepth2JsonChilds = [];

      e.children.forEach((ec) => {
        if (
          e.label === action.payload.currentNode.label &&
          action.payload.currentNode.value === e.value &&
          action.payload.currentNode.checked &&
          action.payload.currentNode._depth === depth
        ) {
          myDepth2JsonChilds.push({ ...ec, checked: true, expanded: true });
        } else if (
          e.label === action.payload.currentNode.label &&
          action.payload.currentNode.value === e.value &&
          !action.payload.currentNode.checked &&
          action.payload.currentNode._depth === depth
        ) {
          myDepth2JsonChilds.push({ ...ec, checked: false, expanded: true });
        } else if (ec.checked && action.payload.currentNode._depth === depth) {
          myDepth2JsonChilds.push({
            ...ec,
            checked:
              action.payload.currentNode.value === ec.value
                ? action.payload.currentNode.checked
                : ec.checked,
            expanded: false,
          });
        } else {
          myDepth2JsonChilds.push({
            ...ec,
            checked:
              ec.label === action.payload.currentNode.label &&
              ec.value === action.payload.currentNode.value
                ? action.payload.currentNode.checked
                : false,
            expanded: false,
          });
        }
      });

      const thirdChildJson = [];
      myDepth2JsonChilds.forEach((ejson) => {
        ejson.children.forEach((ec2) => {
          if (
            ec2.label === action.payload.currentNode.label &&
            action.payload.currentNode.value === ec2.value &&
            action.payload.currentNode.checked &&
            action.payload.currentNode._depth === depth
          ) {
            myDepth3JsonChilds.push({ ...ec2, checked: true, expanded: true });
          } else if (
            ec2.label === action.payload.currentNode.label &&
            action.payload.currentNode.value === ec2.value &&
            !action.payload.currentNode.checked &&
            action.payload.currentNode._depth === depth
          ) {
            myDepth3JsonChilds.push({
              ...ec2,
              checked: false,
              expanded: false,
            });
          } else if (
            ec2.checked &&
            action.payload.currentNode._depth === depth
          ) {
            myDepth3JsonChilds.push({
              ...ec2,
              checked:
                action.payload.currentNode.value === ec2.value
                  ? action.payload.currentNode.checked
                  : ec2.checked,
              expanded:
                action.payload.currentNode.value === ec2.value
                  ? action.payload.currentNode.checked
                  : ec2.checked,
            });
          } else {
            myDepth3JsonChilds.push({
              ...ec2,
              checked:
                ec2.label === action.payload.currentNode.label &&
                ec2.value === action.payload.currentNode.value
                  ? action.payload.currentNode.checked
                  : false,
              expanded: false,
            });
          }
        });
        thirdChildJson.push({
          ...ejson,
          checked:
            myDepth3JsonChilds.filter((item) => item.checked).length ===
            ejson.children.length,
          expanded: !(
            myDepth3JsonChilds.filter((item) => item.checked).length ===
              ejson.children.length ||
            myDepth3JsonChilds.filter((item) => !item.checked).length ===
              ejson.children.length
          ),
          children: myDepth3JsonChilds,
        });
        myDepth3JsonChilds = [];
      });
      myDepth3JsonChildsCopy = thirdChildJson;

      if (
        myDepth3JsonChildsCopy.filter((item) => item.checked).length ===
        e.children.length
      ) {
        myDepth1JsonChilds.push({
          ...e,
          children: myDepth3JsonChildsCopy,
          checked: true,
          expanded: true,
        });
      } else if (
        myDepth3JsonChildsCopy.filter((item) => !item.checked).length ===
        e.children.length
      ) {
        myDepth1JsonChilds.push({
          ...e,
          children: myDepth3JsonChildsCopy,
          checked: false,
          expanded: false,
        });
      } else {
        myDepth1JsonChilds.push({
          ...e,
          children: myDepth3JsonChildsCopy,
          checked:
            myDepth3JsonChildsCopy.filter((item) => !item.checked).length ===
            e.children.length,
          expanded: !(
            myDepth3JsonChildsCopy.filter((item) => !item.checked).length ===
            e.children.length
          ),
        });
      }
      myDepth3JsonChildsCopy = [];
    });
    myJson.push({
      ...element,
      checked: myDepth1JsonChilds.every((item) => item.checked),
      children: myDepth1JsonChilds,
      expanded: true,
    });
  }

  oldJson.forEach((element, parentIndex) => {
    if (action.payload.currentNode._depth === NUMBER_ZERO) {
      commonDepth0(action.payload.currentNode._depth, element, parentIndex); // depth = 0
    } else if (action.payload.currentNode._depth === NUMBER_TWO) {
      commonDepth2(action.payload.currentNode._depth, element); // depth = 2
    } else if (action.payload.currentNode._depth === NUMBER_THREE) {
      commonDepth3(action.payload.currentNode._depth, element); // depth = 3
    } else {
      commonDepth1(action.payload.currentNode._depth, element); // depth = 1
    }
  });
  return myJson;
};

export const GetProfiles_insightia = async (userid, pid) => {
  try {
    const response = await axios.post(
      config.getProfiles_insightia,
      {
        userid,
        pid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data[0];
    }
  } catch (e) {
    return false;
  }
};

export const getTreeViewDDLSelection = (selectionDDL, mainDDLArr) => {
  const depth0 = selectionDDL.filter((x) => x._depth === 0);
  const depth1 = selectionDDL.filter((x) => x._depth === 1);
  const depth2 = selectionDDL.filter((x) => x._depth === 2);
  const depth3 = selectionDDL.filter((x) => x._depth === 3);

  const depth0_Arr = [];
  if (
    depth0.length === 0 &&
    depth1.length === 0 &&
    depth2.length === 0 &&
    depth3.length === 0
  ) {
    mainDDLArr.map((x0) => {
      depth0_Arr.push({
        ...x0,
        checked: true,
        expanded: true,
        children: x0.children.map((x) => {
          const a = '';
          if (x.children) {
            return {
              ...x,
              children: x.children.map((y) => ({
                ...y,
                checked: true,
                expanded: false,
              })),
              checked: true,
              expanded: false,
            };
          }
          return {
            ...x,
            checked: true,
            expanded: false,
          };
        }),
      });
    });
  } else {
    if (depth0.length > 0) {
      mainDDLArr.map((x0) => {
        const data = depth0.filter((c) => c.label.trim() === x0.label.trim());
        if (data.length > 0) {
          depth0_Arr.push({
            ...x0,
            checked: true,
            children: x0.children.map((x) => {
              if (x.children) {
                return {
                  ...x,
                  children: x.children.map((y) => ({
                    ...y,
                    checked: true,
                    expanded: false,
                  })),
                  checked: true,
                  expanded: false,
                };
              }
              return {
                ...x,
                checked: true,
                expanded: false,
              };
            }),
          });
        } else {
          depth0_Arr.push({
            ...x0,
            checked: false,
            expanded: false,
          });
        }
      });
    } else {
      mainDDLArr.map((x0) => {
        const depth0_child = [];
        // if (depth1.length > 0) {
        x0.children.map((x1) => {
          const data = depth1.filter((c) => c.label.trim() === x1.label.trim());
          let resdata = [];
          const depth1_Arr = [];
          if (data.length > 0) {
            if (x1.children !== undefined) {
              resdata = {
                ...x1,
                checked: true,
                expanded: false,
                children: x1.children.map((x) => {
                  if (x.children) {
                    return {
                      ...x,
                      children: x.children.map((x) => ({
                        ...x,
                        checked: true,
                        expanded: false,
                      })),
                      checked: true,
                      expanded: false,
                    };
                  }
                  return {
                    ...x,
                    checked: true,
                    expanded: false,
                  };
                }),
              };
            } else {
              resdata = {
                ...x1,
                checked: true,
                expanded: true,
              };
            }
            depth0_child.push({
              ...resdata,
            });
          } else {
            if (x1.children !== undefined) {
              resdata = {
                ...x1,
                checked: false,
                expanded: false,
              };
            } else {
              resdata = {
                ...x1,
                checked: false,
                expanded: true,
              };
            }

            /////////////////

            if (!resdata.checked) {
              x1.children !== undefined &&
                x1.children.map((x2) => {
                  let data_depth2 = depth2.filter(
                    (c) => c.label.trim() === x2.label.trim()
                  );
                  if (data_depth2.length > 0) {
                    data_depth2 = {
                      checked: true,
                      expanded: false,
                    };
                  } else {
                    data_depth2 = {
                      ...x2,
                      checked: false,
                      expanded: false,
                    };
                  }

                  /////////////
                  if (depth3.length > 0) {
                    if (!data_depth2.checked) {
                      const depth3_Arr = [];
                      x2.children.map((x3) => {
                        let data_depth3 = depth3.filter(
                          (c) => c.label === x3.label
                        );
                        if (data_depth3.length > 0) {
                          data_depth3 = {
                            checked: true,
                            expanded: false,
                          };
                        } else {
                          data_depth3 = {
                            ...x3,
                            checked: false,
                            expanded: false,
                          };
                        }
                        depth3_Arr.push({ ...x3, ...data_depth3 });
                      });
                      depth1_Arr.push({
                        ...x2,
                        ...data_depth2,
                        children: depth3_Arr,
                      });
                    } else {
                      depth1_Arr.push({
                        ...x2,
                        ...data_depth2,
                        children: x2.children.map((x) => ({
                          ...x,
                          checked: true,
                          expanded: false,
                        })),
                      });
                    }
                  } else {
                    if (x2.children) {
                      depth1_Arr.push({
                        ...x2,
                        ...data_depth2,
                        children: x2.children.map((x) => ({
                          ...x,
                          checked: data_depth2.checked,
                        })),
                      });
                    } else {
                      depth1_Arr.push({
                        ...x2,
                        ...data_depth2,
                      });
                    }
                  }
                });
            }

            /////////////////
            if (resdata.children) {
              depth0_child.push({
                ...resdata,
                children: depth1_Arr,
              });
            } else {
              depth0_child.push({
                ...resdata,
              });
            }
          }
        });
        // }
        depth0_Arr.push({
          ...x0,
          checked: false,
          expanded: true,
          children: depth0_child,
        });
      });
    }
  }

  const valueArr = [];
  depth0_Arr.map((x) => {
    if (depth1.length > 0) {
      x.children.map((y) => {
        if (y.checked) {
          valueArr.push(y.value);
        } else {
          if (depth2.length > 0) {
            y.children.map((z) => {
              if (z.checked) {
                valueArr.push(z.value);
              } else {
                if (depth3.length > 0) {
                  z.children.map((z1) => {
                    if (z1.checked) {
                      valueArr.push(z1.value);
                    }
                  });
                }
              }
            });
          }
        }
      });
    } else {
      if (x.label === 'All') {
        valueArr.push([]);
      } else {
        valueArr.push(x.value);
      }
    }
  });
  const depthValue = valueArr.toString();

  return { depth0_Arr, depthValue, valueArr };
};

// #endregion

export const GetDefaultStartAndEndDate = () => {
  try {
    const Now = new Date();
    let startDate = new Date();
    let endDate = new Date();

    const setDate = new Date(Now.getFullYear(), 9, 30);

    if (Now > setDate) {
      startDate = new Date(startDate.getFullYear() - 1, 6, 1);
      endDate = new Date(endDate.getFullYear(), 5, 30);
    } else {
      startDate = new Date(startDate.getFullYear() - 2, 6, 1);
      endDate = new Date(endDate.getFullYear() - 1, 5, 30);
    }
    return {
      startDate: startDate,
      endDate: endDate,
    };
  } catch (e) {
    return new Date();
  }
};

export const GetVotingPortalStartAndEndDate = () => {
  try {
    const Now = new Date();
    let startDate = new Date();
    let endDate = new Date();

    const setDate = new Date(Now.getFullYear(), 10, 30);

    if (Now < setDate) {
      startDate = new Date(startDate.getFullYear() - 2, 6, 1);
      endDate = new Date(endDate.getFullYear() - 1, 5, 30);
    } else {
      startDate = new Date(startDate.getFullYear() - 1, 6, 1);
      endDate = new Date(endDate.getFullYear(), 5, 30);
    }
    return { startDate: startDate, endDate: endDate };
  } catch (e) {
    return new Date();
  }
};

// Email Validation for Internal User or client

export const IsInternalUser = async () => {
  try {
    const dToken = await TokenDecode();
    let { UserEmail } = dToken;
    UserEmail = UserEmail.slice(UserEmail.indexOf('@'), UserEmail.length);
    if (
      UserEmail === '@insightia.com' ||
      UserEmail === '@aegisisc.com' ||
      UserEmail === '@proxyinsight.com' ||
      UserEmail === '@diligent.com' ||
      UserEmail === '@activistinsight.com'
    ) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const getColorArr = (numberOfColums) => {
  const colorArr = [
    '#090A16',
    '#112D3C',
    '#005A7F',
    '#4BADCF',
    '#2B6C70',
    '#299A76',
    '#575756',
    '#526168',
    '#839DA9',
  ];
  let mySelection = [];

  if (numberOfColums < 10) {
    colorArr.forEach((e, i) => {
      const currentIndex = i + 1;
      if (numberOfColums === NUMBER_ONE) {
        mySelection.push(e);
      }
      if (
        numberOfColums === NUMBER_TWO &&
        (currentIndex === NUMBER_TWO || currentIndex === NUMBER_FOUR)
      ) {
        mySelection.push(e);
      }
      if (
        numberOfColums === NUMBER_THREE &&
        (currentIndex === NUMBER_TWO ||
          currentIndex === NUMBER_FOUR ||
          currentIndex === NUMBER_SEVEN)
      ) {
        mySelection.push(e);
      }

      if (
        numberOfColums === NUMBER_FOUR &&
        (currentIndex === NUMBER_TWO ||
          currentIndex === NUMBER_FOUR ||
          currentIndex === NUMBER_FIVE ||
          currentIndex === NUMBER_SEVEN)
      ) {
        mySelection.push(e);
      }

      if (
        numberOfColums === NUMBER_FIVE &&
        (currentIndex === NUMBER_TWO ||
          currentIndex === NUMBER_THREE ||
          currentIndex === NUMBER_FOUR ||
          currentIndex === NUMBER_FIVE ||
          currentIndex === NUMBER_SEVEN)
      ) {
        mySelection.push(e);
      }

      if (
        numberOfColums === NUMBER_SIX &&
        (currentIndex === NUMBER_ONE ||
          currentIndex === NUMBER_TWO ||
          currentIndex === NUMBER_THREE ||
          currentIndex === NUMBER_FOUR ||
          currentIndex === NUMBER_FIVE ||
          currentIndex === NUMBER_SEVEN)
      ) {
        mySelection.push(e);
      }

      if (
        numberOfColums === NUMBER_SEVEN &&
        (currentIndex === NUMBER_ONE ||
          currentIndex === NUMBER_TWO ||
          currentIndex === NUMBER_THREE ||
          currentIndex === NUMBER_FOUR ||
          currentIndex === NUMBER_FIVE ||
          currentIndex === NUMBER_SEVEN ||
          currentIndex === NUMBER_NINE)
      ) {
        mySelection.push(e);
      }
      if (
        numberOfColums === NUMBER_EIGHT &&
        (currentIndex === NUMBER_ONE ||
          currentIndex === NUMBER_TWO ||
          currentIndex === NUMBER_THREE ||
          currentIndex === NUMBER_FOUR ||
          currentIndex === NUMBER_FIVE ||
          currentIndex === NUMBER_SIX ||
          currentIndex === NUMBER_SEVEN ||
          currentIndex === NUMBER_NINE)
      ) {
        mySelection.push(e);
      }
      if (
        numberOfColums === NUMBER_NINE &&
        (currentIndex === NUMBER_ONE ||
          currentIndex === NUMBER_TWO ||
          currentIndex === NUMBER_THREE ||
          currentIndex === NUMBER_FOUR ||
          currentIndex === NUMBER_FIVE ||
          currentIndex === NUMBER_SIX ||
          currentIndex === NUMBER_SEVEN ||
          currentIndex === NUMBER_EIGHT ||
          currentIndex === NUMBER_NINE)
      ) {
        mySelection.push(e);
      }
    });
  } else {
    mySelection = colorArr;
  }

  return mySelection;
};

// #region For Company & Investor Campaigns Page
function getimageDescNLocation(key) {
  let imageDescription = '';
  let imageLocation = '';
  switch (key) {
    case 'No Objectives':
      //0
      imageDescription = key;
      break;
    case 'Objectives Ongoing':
      //1
      imageDescription = key;
      imageLocation = 'BlueDot.png';
      break;
    case 'Objectives Successful':
      //6
      imageDescription = key;
      imageLocation = 'BlueDotSolidGreen.png';
      break;
    case 'Objectives Unsuccessful':
      //3
      imageDescription = key;
      imageLocation = 'BlueDotSolidRed.png';
      break;
    case 'Objectives Partially Successful':
      //2
      imageDescription = key;
      imageLocation = 'BlueDotDottedGreen.png';
      break;
    case 'Objectives Withdrawn':
      //4
      imageDescription = key;
      imageLocation = 'BlueDotSolidGrey.png';
      break;
    case 'Yes':
      //   //5
      imageDescription = '';
      imageLocation = 'BlueDot.png';
      break;
    case 'Public Demands Made':
      //5
      imageDescription = key;
      imageLocation = 'BlueDot.png';
      break;
    default:
      imageDescription = '-';
      break;
  }
  return { imageDescription, imageLocation };
}
export const getCampaignsImageHandlerCellRendererFramework = (key) => {
  if (key === '-' || key === '' || typeof key === 'undefined' || key === null) {
    return (
      <div className='text-center'>
        <span>-</span>
      </div>
    );
  }
  const { imageDescription, imageLocation } = getimageDescNLocation(key);
  if (key === '-' || key === '' || typeof key === 'undefined' || key === null) {
    return (
      <div className='text-center'>
        <span>-</span>
      </div>
    );
  }
  return (
    <div className='text-center'>
      <img
        className='smallIcon'
        src={`${window.location.origin}${ICON_IMAGE_PATH}${imageLocation}`}
        alt={imageDescription}
        title={imageDescription}
      />
    </div>
  );
};
export const getCampaignsImageHandler_CellRenderer = (key) => {
  const { imageDescription, imageLocation } = getimageDescNLocation(key);
  if (key === '-' || key === '' || typeof key === 'undefined' || key === null) {
    const div = document.createElement('div');
    div.classList.add('text-center');
    const text = document.createElement('span');
    text.textContent = '-';
    div.appendChild(text);
    return div;
  }

  const div = document.createElement('div');
  div.classList.add('text-center');
  const img = document.createElement('img');
  img.classList.add('smallIcon');
  img.src = `${window.location.origin}${ICON_IMAGE_PATH}${imageLocation}`;
  img.alt = imageDescription;
  img.title = imageDescription;
  div.appendChild(img);
  return div;
};
export const getCampaignsExcelDownloadNumberToText = (key) => {
  let imageDescription = '';
  switch (key) {
    case 0:
      imageDescription = 'No Objectives';
      break;
    case 1:
      imageDescription = 'Objectives Ongoing';
      break;
    case 2:
      imageDescription = 'Objectives Partially Successful';
      break;
    case 3:
      imageDescription = 'Objectives Unsuccessful';
      break;
    case 4:
      imageDescription = 'Objectives Withdrawn';
      break;
    case 5:
      imageDescription = 'Yes';
      break;
    case 6:
      imageDescription = 'Objectives Successful';
      break;
    default:
      break;
  }
  if (key === '' || key === undefined || key === '-') {
    return '-';
  }
  return imageDescription;
};
// #endregion

// #region For ActivistCampaignTool Page
export const getActivistCampaignToolImageHandlerCellRenderer = (key) => {
  if (
    key === '-' ||
    key === '' ||
    typeof key === 'undefined' ||
    key === null ||
    key === 'No Public Demands Made' ||
    key === 'No Objectives'
  ) {
    const div = document.createElement('div');
    div.classList.add('text-center');
    const text = document.createElement('span');
    text.textContent = '-';
    div.appendChild(text);
    return div;
  }
  const { imageDescription, imageLocation } = getimageDescNLocation(key);
  if (
    key === '-' ||
    key === '' ||
    typeof key === 'undefined' ||
    key === null ||
    key === 'No Public Demands Made' ||
    key === 'No Objectives'
  ) {
    const div = document.createElement('div');
    div.classList.add('text-center');
    const text = document.createElement('span');
    text.textContent = '-';
    div.appendChild(text);
    return div;
  }

  const div = document.createElement('div');
  div.classList.add('text-center');
  const img = document.createElement('img');
  img.classList.add('smallIcon');
  img.src = `${window.location.origin}${ICON_IMAGE_PATH}${imageLocation}`;
  img.alt = imageDescription;
  img.title = imageDescription;
  div.appendChild(img);
  return div;
};
// #endregion

export const getActivistCampaignToolExcelDownloadNumberToText = (key) => {
  let imageDescription = '';
  switch (key) {
    case null:
      imageDescription = 'No Public Demands Made';
      break;
    case 0:
      imageDescription = 'No Public Demands Made';
      break;
    case 1:
      imageDescription = 'Objectives Ongoing';
      break;
    case 2:
      imageDescription = 'Objectives Partially Successful';
      break;
    case 3:
      imageDescription = 'Objectives Unsuccessful';
      break;
    case 4:
      imageDescription = 'Objectives Withdrawn';
      break;
    case 5:
      imageDescription = 'Public Demands Made';
      break;
    case 6:
      imageDescription = 'Objectives Successful';
      break;
    default:
      break;
  }
  if (key === '' || key === undefined || key === '-') {
    return '-';
  }
  return imageDescription;
};

// Portal & companyInvestorFilter
export const demandsImageHandler = (objectiveValue) => {
  let imageDescription = '';
  let imageLocation = '';
  switch (objectiveValue) {
    case 0:
      imageDescription = 'No Objectives';
      break;
    case 1:
      imageDescription = 'Objectives Ongoing';
      imageLocation = 'BlueDot.png';
      break;
    case 2:
      imageDescription = 'Objectives Partially Successful';
      imageLocation = 'BlueDotDottedGreen.png';
      break;
    case 3:
      //3
      imageDescription = 'Objectives Unsuccessful';
      imageLocation = 'BlueDotSolidRed.png';
      break;
    case 4:
      //4
      imageDescription = 'Objectives Withdrawn';
      imageLocation = 'BlueDotSolidGrey.png';
      break;
    case 5:
      //5
      imageDescription = 'Objectives Ongoing';
      imageLocation = 'BlueDot.png';
      break;
    case 6:
      //6
      imageDescription = 'Objectives Successful';
      imageLocation = 'BlueDotSolidGreen.png';
      break;
    default:
      break;
  }
  if (
    objectiveValue === '' ||
    objectiveValue === undefined ||
    objectiveValue === '-'
  ) {
    return (
      <div className='text-center'>
        <span>-</span>
      </div>
    );
  }
  return (
    <div className='text-center'>
      <img
        className='smallIcon'
        src={`${window.location.origin}${ICON_IMAGE_PATH}${imageLocation}`}
        alt={imageDescription}
        title={imageDescription}
      />
    </div>
  );
};

export const demandsImageHandlerHTML = (key) => {
  const newkey = key;
  let imageDescription = '';
  let imageLocation = '';
  if (
    newkey === NUMBER_ZERO ||
    newkey === '' ||
    typeof newkey === 'undefined' ||
    newkey === null
  ) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('text-center');
    const text = document.createElement('span');
    text.textContent = '-';
    wrapper.appendChild(text);
    return wrapper;
  }

  switch (newkey) {
    case 0:
      imageDescription = 'No Objectives';
      break;
    case 1:
      imageDescription = 'Objectives Ongoing';
      imageLocation = 'BlueDot.png';
      break;
    case 2:
      imageDescription = 'Objectives Successful';
      imageLocation = 'BlueDotSolidGreen.png';
      break;
    case 3:
      imageDescription = 'Objectives Unsuccessful';
      imageLocation = 'BlueDotSolidRed.png';
      break;
    case 4:
      imageDescription = 'Objectives Partially Successful';
      imageLocation = 'BlueDotDottedGreen.png';
      break;
    default:
      break;
  }

  // use createElement and appendchild as its faster than innerhtml
  const wrapper = document.createElement('div');
  wrapper.classList.add('text-center');
  const img = document.createElement('img');
  img.classList.add('smallIcon');
  img.src = `${window.location.origin}${ICON_IMAGE_PATH}${imageLocation}`;
  img.alt = imageDescription;
  img.title = imageDescription;
  wrapper.appendChild(img);
  // when returning do not put in brackets (NOT JSX)
  return wrapper;
};

export const dateToNull = (date, format, isTrue) => {
  if (!date || (date !== null && date.toString().trim() === '')) {
    return null;
  }
  const nDate = !isFinite(date.toString()) ? new Date(date) : null;
  if (
    nDate !== null &&
    nDate !== undefined &&
    nDate !== '' &&
    nDate instanceof Date &&
    !isNaN(nDate) &&
    nDate.toString() !== 'Invalid Date'
  ) {
    return dateFormat(
      nDate,
      format,
      isTrue !== null && isTrue !== undefined ? isTrue : true
    );
  }
  return nDate;
};

export function toCapitaliseFirstCase(string) {
  if (!string) return null;
  return string.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1)
  );
}

export function toProperCase(string) {
  if (!string) return null;
  return string.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export const dateToISOString = (date) => {
  if (date !== null && date !== undefined && date !== '') {
    return new Date(
      date.getTime() - date.getTimezoneOffset() * 60 * 1000
    ).toISOString();
  }
  return null;
};

export const filterFunctions = (props) => {
  const inv_local = localStorage.getItem('investorFilterData');
  const cmp_local = localStorage.getItem('companyFilterData');
  async function get_filterData() {
    if (inv_local !== null && inv_local !== undefined) {
      const data = JSON.parse(inv_local);
      if (data !== null) {
        if (props.GetInvestorSearchSelection) {
          const inv_data = await props.GetInvestorSearchSelection(data.value);
          const obj = {
            label: inv_data.payload.investor_search[0].Name,
            value: inv_data.payload.investor_search[0].investor_search_id,
          };
          props.handleInvestorSearchSelectionInvComp(obj);
        }
      } else {
        props.handleClearPeerGroupInvestorSelection();
        props.handleResetInvestorSelections();
        props.ResetInvestorSearchOptionSelection();
      }
    } else {
      props.handleClearPeerGroupInvestorSelection();
      props.handleResetInvestorSelections();
      props.ResetInvestorSearchOptionSelection();
      localStorage.removeItem('investorFilterData');
    }
    if (cmp_local !== null && cmp_local !== undefined) {
      const cmdData = JSON.parse(cmp_local);
      if (cmdData !== null && !props.isActivistVulnerability) {
        const cmp_data = await props.getAllCompanySearchSelection(
          cmdData.value
        );
        if (cmp_data.payload.company_search.length > 0) {
          const obj = {
            label: cmp_data.payload.company_search[0].Name,
            value: cmp_data.payload.company_search[0].company_search_id,
            isSaved: cmp_data.payload.company_search[0].is_saved,
          };
          props.handleComapnySearchSelectionInvComp(obj);
        }
      } else {
        props.ResetCompanySearchOptionSelection();
        props.handleClearPeerGroupCompanySelection();
        props.handleResetCompnaySelections();
      }
    } else {
      props.handleClearPeerGroupCompanySelection();
      props.handleResetCompnaySelections();
      props.ResetCompanySearchOptionSelection();
      localStorage.removeItem('companyFilterData');
    }
  }
  get_filterData();
};

export function isNull(obj, key) {
  return obj[key] === null || obj[key] === undefined || obj[key] === 'null';
}

export function validateNulltoEmptyString(obj) {
  const objKeys = Object.keys(obj);
  objKeys.forEach((key) => {
    if (isNull(obj, key)) {
      obj[key] = '';
    }
  });
}

export function validateRangeValues(
  val,
  min = NUMBER_ZERO,
  max = NUMBER_HUNDRED
) {
  let newVal = val;
  //Cannot be over or under range
  if (newVal < min) {
    newVal = min;
  }
  if (newVal > max) {
    newVal = max;
  }
  //Cleans up values so they remove opening with 0s
  if (String(newVal)[0] === 0) {
    newVal = String(newVal).replace(/^0+/, '');
  }
  return Number(newVal);
}

export function isIdNotNullOrUndefined(id) {
  if (
    id !== null &&
    id !== undefined &&
    id !== '' &&
    id !== 'undefined' &&
    !isNaN(id)
  ) {
    return true;
  }
  return false;
}

export const GetHistoricalGovernanceTab = async (pid) => {
  try {
    const response = await axios.post(
      config.getHistoricalGovernanceTab,
      {
        pid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data[0]['Historical Governance'] > 0;
    }
  } catch (e) {
    return false;
  }
};

// a function to retry loading a chunk to avoid chunk load error for out of date code
export const lazyRetry = function (componentImport) {
  return new Promise((resolve, reject) => {
    // check if the window has already been refreshed
    const hasRefreshed = JSON.parse(
      window.sessionStorage.getItem('retry-lazy-refreshed') || 'false'
    );
    // try to import the component
    componentImport()
      .then((component) => {
        window.sessionStorage.setItem('retry-lazy-refreshed', 'false'); // success so reset the refresh
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefreshed) {
          // not been refreshed yet
          window.sessionStorage.setItem('retry-lazy-refreshed', 'true'); // we are now going to refresh
          return window.location.reload(); // refresh the page
        }
        reject(error); // Default error behaviour as already tried refresh
      });
  });
};

export const getOwnershipStatus = async () => {
  let TrialStatus = false;
  let resAllowDownload = false;
  let filter = false;
  const dToken = await TokenDecode();

  const trialMemberCheck =
    dToken !== null &&
    dToken.MemberShip.filter(
      (p) =>
        (p.product_id === products.ACTIVISM ||
          p.product_id === products.VOTING ||
          p.product_id === products.ACTIVIST_VULNERABILITY ||
          p.product_id === products.GOVERNANCE) &&
        p.status === TrialTypeConstants.TRIAL_USER
    ).length;

  const nonMemberCheck =
    dToken !== null &&
    dToken.MemberShip.filter(
      (p) =>
        (p.product_id === products.ACTIVISM ||
          p.product_id === products.VOTING ||
          p.product_id === products.ACTIVIST_VULNERABILITY ||
          p.product_id === products.GOVERNANCE) &&
        p.status !== TrialTypeConstants.TRIAL_USER &&
        p.status !== TrialTypeConstants.NOT_TRIAL_USER
    ).length;
  if (trialMemberCheck === OWNERSHIP_PRODUCT_COUNT) {
    // TOP 5 & status = 2
    filter = true;
    TrialStatus = false;
    resAllowDownload = false;
  } else if (nonMemberCheck === OWNERSHIP_PRODUCT_COUNT) {
    filter = true;
    TrialStatus = true;
    resAllowDownload = false;
  } else if (trialMemberCheck + nonMemberCheck === OWNERSHIP_PRODUCT_COUNT) {
    // If the user has a mix of nonproduct and trials equal to the number of products required then show trial
    filter = true;
    TrialStatus = false;
    resAllowDownload = false;
  } else {
    filter = false;
    TrialStatus = false;
    resAllowDownload = true;
  }

  return { filter, TrialStatus, resAllowDownload };
};

export const getOwnershipStatusShort = async (access) => {
  const dToken = await TokenDecode();

  const shortAccess =
    dToken !== null &&
    dToken.MemberShip.filter((p) => p.product_id === products.ACTIVIST_SHORTS);
  const res =
    (shortAccess[ARRAY_START_VALUE].status === FULL_USER ||
      shortAccess[ARRAY_START_VALUE].status === TRIAL_USER) &&
    access === NUMBER_ONE
      ? NUMBER_ONE
      : NUMBER_ZERO;
  return res;
};

export const getOwnershipStatusLong = async (access) => {
  const dToken = await TokenDecode();

  const longAccess =
    dToken !== null &&
    dToken.MemberShip.filter(
      (p) =>
        p.product_id === products.ACTIVISM || p.product_id === products.VOTING
    );
  const res =
    (longAccess[ARRAY_START_VALUE].status === FULL_USER ||
      longAccess[ARRAY_START_VALUE].status === TRIAL_USER ||
      longAccess[ARRAY_POSITION_ONE].status === FULL_USER ||
      longAccess[ARRAY_POSITION_ONE].status === TRIAL_USER) &&
    access === NUMBER_ONE
      ? NUMBER_ONE
      : NUMBER_ZERO;
  return res;
};

export const GetForeignSecurityKey = async function (req) {
  try {
    const response = await axios.post(
      config.getForeignSecurityKey,
      {
        userid: req.userid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};
export const agGridSrickyHeader = () => {
  const root = document.getElementsByClassName('ag-root-wrapper');
  if (root !== undefined && root.length > 0) {
    for (let i = 0; i < root.length; i++) {
      const header = root[i].querySelectorAll('.ag-header')[0];
      const bodyDiv = root[i].querySelectorAll('.ag-body-viewport')[0];
      if (header !== undefined && bodyDiv !== undefined) {
        const bodyPositions = root[i].getBoundingClientRect();
        const headerPositions = header.getBoundingClientRect();
        const tableDiv = bodyDiv.getBoundingClientRect();
        if (
          Number(bodyPositions.top) < -headerPositions.height &&
          headerPositions.height * 3 < tableDiv.height &&
          tableDiv.bottom > headerPositions.height + headerPositions.height
        ) {
          header.style.position = 'fixed';
          header.style.top = '0';
          header.style.width = `${bodyPositions.width}px`;
          header.style.zIndex = '99';
          header.style.visibility = 'visible';
        } else if (Number(bodyPositions.top) > window.screenTop) {
          header.style.visibility = 'visible';
          header.style.removeProperty('position');
          header.style.removeProperty('top');
          header.style.removeProperty('width');
          header.style.removeProperty('z-index');
        } else if (tableDiv.bottom < headerPositions.height) {
          header.style.removeProperty('position');
          header.style.removeProperty('top');
          header.style.removeProperty('width');
          header.style.removeProperty('z-index');
        }
      }
    }
  }
};

export const replaceKeyInObjectArray = (arr, replaceMap) => {
  const arrData = arr;
  return arrData.map((o) =>
    Object.keys(o)
      .map((key) => {
        const a = { [`${replaceMap[key] || key}`]: o[key] };
        return a;
      })
      .reduce((a, b) => ({ ...a, ...b }))
  );
};
export const getCurrentDate = (separator = '') => {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${date}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${year}`;
};
