import axios from 'axios';
import {
  getActivismNewsAlerts,
  getActivismEventNewsAlerts,
  listFilingGroups,
  getAlertOptionsAndSubOptions,
  getDirectorType,
  govAmendemntCategories,
  updateTblalert,
  inserttblAlertOptionLink,
  inserttblAlertSubOptionLink,
  getExistingAlerts,
  getAlertDetails,
  deleteTblAlertOptionLink,
  getAlertModuleAccess,
  getInboxAlertName,
  getAlertFilingDetails,
  getSampleData,
  getAlertInboxType,
  getInboxAlertByUser,
  GetElementDetails,
  DeleteAlert,
  UpdateAlertStatus,
  GetAlertNotificationData,
  GetInboxAlertDetails,
  GetTop20AlertResult
} from '../config/server-config';
import { TokenDecode } from './general-util';
import { API_CALL_SUCCESSFULL, NUMBER_TWO, NUMBER_FOUR } from '../constants/NumberConstants';

export const GetActivismNewsAlerts = async () => {
  try {
    const response = await axios.post(
      getActivismNewsAlerts,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const GetActivismEventNewsAlerts = async () => {
  try {
    const response = await axios.post(
      getActivismEventNewsAlerts,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const ListFilingGroups = async () => {
  try {
    const response = await axios.post(
      listFilingGroups,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const GetAlertOptionsAndSubOptions = async () => {
  try {
    const response = await axios.post(
      getAlertOptionsAndSubOptions,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const GetDirectorType = async () => {
  try {
    const response = await axios.post(
      getDirectorType,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const GetGovAmendemntCategories = async () => {
  try {
    const response = await axios.post(
      govAmendemntCategories,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const UpdateTblalert = async (res) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      updateTblalert,
      {
        alertid: res.AlertId,
        userid: uid,
        alertname: res.AlertName,
        companySearchId: res.CompanySearchId,
        investorSearchId: res.InvestorSearchId,
        receivedEmail: res.ReceivedEmail,
        receivedAlertInboxOnline: res.ReceivedAlertInboxOnline,
        notyfy_me_instant_alert: res.notyfy_me_instant_alert
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const InserttblAlertOptionLink = async (alertid, alertOptionId) => {
  try {
    const response = await axios.post(
      inserttblAlertOptionLink,
      {
        alertid,
        alertOptionId
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const InsertTblAlertSubOptionLink = async (optionLinkId, alertSubOptionId, value) => {
  try {
    const response = await axios.post(
      inserttblAlertSubOptionLink,
      {
        optionLinkId,
        alertSubOptionId,
        value
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const GetExistingAlerts = async () => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      getExistingAlerts,
      {
        userid: uid
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const GetAlertDetails = async (alertid) => {
  try {
    const response = await axios.post(
      getAlertDetails,
      {
        alertid
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const DeleteTblAlertOptionLink = async (alert_id) => {
  try {
    const response = await axios.post(
      deleteTblAlertOptionLink,
      {
        alert_id
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const IsProductAvaibleForCurrentUser = async (productId) => {
  const resToken = await TokenDecode();
  if (resToken !== undefined && resToken !== null) {
    const productDetails = resToken.MemberShip.find((c) => c.product_id === productId);
    if (productDetails.status === NUMBER_FOUR || productDetails.status === NUMBER_TWO) {
      return true;
    }
    return false;
  }
};

export const GetAlertModuleAccess = async () => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      getAlertModuleAccess,
      {
        user_id: uid
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

//Alert inbox
export const GetAlertinboxName = async (element_type_id) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        if (res.User_Id !== null) {
          uid = res.User_Id;
        }
      })
      .catch((e) => console.log(e));
    const response = await axios.post(
      getInboxAlertName,
      {
        userid: uid,
        element_type_id: element_type_id
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const GetFilingDetailsAlert = async () => {
  try {
    const response = await axios.post(
      getAlertFilingDetails,
      {
        alert_inbox_id: 32
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const GetSampleData = async () => {
  try {
    const response = await axios.post(
      getSampleData,
      {
        alert_inbox_id: 32
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

//Alret inbox type
export const GetAlertInboxType = async (alert_id) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        if (res.User_Id !== null) {
          uid = res.User_Id;
        }
      })
      .catch((e) => console.log(e));
    const response = await axios.post(
      getAlertInboxType,
      {
        userid: uid,
        alert_id: alert_id
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

//Get Inbox Alert By User
export const GetInboxAlertByUser = async (alert_id, element_type_id, cancelToken) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        if (res.User_Id !== null) {
          uid = res.User_Id;
        }
      })
      .catch((e) => console.log(e));
    const response = await axios.post(
      getInboxAlertByUser,
      {
        userid: uid,
        alert_id: alert_id,
        element_type_id: element_type_id
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
        cancelToken: cancelToken
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};

export const getElementDetails = async (element_type_id, alert_inbox_id, alert_data) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        if (res.User_Id !== null) {
          uid = res.User_Id;
        }
      })
      .catch((e) => console.log(e));
    const response = await axios.post(
      GetElementDetails,
      {
        user_id: uid,
        element_type_id: element_type_id,
        alert_inbox_id: alert_inbox_id,
        alert_data: alert_data
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return false;
  }
};

export const deleteAlert = async (alert_id) => {
  try {
    const response = await axios.post(
      DeleteAlert,
      {
        alert_id: alert_id
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return false;
  }
};

export const updateAlertStatus = async (alert_inbox_id) => {
  try {
    const response = await axios.post(
      UpdateAlertStatus,
      {
        alert_inbox_id: alert_inbox_id
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return false;
  }
};

export const getAlertNotificationData = async () => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        if (res.User_Id !== null) {
          uid = res.User_Id;
        }
      })
      .catch((e) => console.log(e));
    const response = await axios.post(
      GetAlertNotificationData,
      {
        userid: uid
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return false;
  }
};
export const getInboxAlertDetails = async (arg) => {
  try {
    const response = await axios.post(
      GetInboxAlertDetails,
      {
        alert_option_id: arg.alert_option_id,
        alert_inbox_id: arg.alert_inbox_id,
        element_type_id: arg.element_type_id,
        alert_read: arg.alert_read
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return false;
  }
};
export const getTop20AlertResult = async () => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        if (res.User_Id !== null) {
          uid = res.User_Id;
        }
      })
      .catch((e) => console.log(e));
    const response = await axios.post(
      GetTop20AlertResult,
      {
        userid: uid
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
