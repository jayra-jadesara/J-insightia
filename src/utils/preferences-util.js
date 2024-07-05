import axios from 'axios';
import config from '../config/server-config';
import { TokenDecode } from './general-util';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';

// Defaults Preferences
export const GetCompanyPeerGroup = async () => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.GetCompanyPeerGroup,
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
export const GetInvestorPeerGroup = async () => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.GetInvestorPeerGroup,
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
export const GetPeerGroupsData = async () => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.GetPeerGroupsData,
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

export const AddSelectionInvestorPeerGroup = async (inv_peergroup_id) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.AddSelectionInvestorPeerGroup,
      {
        user_id: uid,
        inv_peergroup_id: inv_peergroup_id
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
export const AddSelectionCompanyPeerGroup = async (cmp_peergroup_id) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.AddSelectionCompanyPeerGroup,
      {
        user_id: uid,
        cmp_peergroup_id: cmp_peergroup_id
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

// User Preferences
export const ValidateOldPasswordHash = async (txt_oldpassword) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.ValidateOldPasswordHash,
      {
        user_id: uid,
        txt_oldpassword: txt_oldpassword
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
export const HandleChangePassword = async (password) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.HandleChangePassword,
      {
        user_id: uid,
        password: password
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

// Email Preferences
export const SavePreferencesV3 = async (res) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const myJson = {
      Email1MonthlyNewsLetter: false,
      Email2EmailUpdates: false,
      Email33rdParty: false,
      daily_activim_newsletter: false,
      NAEmailUpdates: false,
      AAEmailUpdates: false,
      ais_weekly_newsletter: false
    };
    res.map((item) => {
      if (item.children !== undefined && item.children.length > 0) {
        item.children.map((itemChildren) => {
          if (itemChildren.id === 'NAEmailUpdates') {
            myJson[itemChildren.id] = itemChildren.checked;
            return myJson[itemChildren.id];
          }
          if (itemChildren.id === 'AAEmailUpdates') {
            myJson[itemChildren.id] = itemChildren.checked;
            return myJson[itemChildren.id];
          }
          return '';
        });
      }
      if (item.id === 'Email1MonthlyNewsLetter') {
        myJson[item.id] = item.checked;
        return myJson[item.id];
      }
      if (item.id === 'Email2EmailUpdates') {
        myJson[item.id] = item.checked;
        return myJson[item.id];
      }
      if (item.id === 'Email33rdParty') {
        myJson[item.id] = item.checked;
        return myJson[item.id];
      }
      if (item.id === 'daily_activim_newsletter') {
        myJson[item.id] = item.checked;
        return myJson[item.id];
      }
      if (item.id === 'ais_weekly_newsletter') {
        myJson[item.id] = item.checked;
        return myJson[item.id];
      }
      return '';
    });

    const response = await axios.post(
      config.SavePreferencesV3,
      {
        user_id: uid,
        Email1MonthlyNewsLetter: myJson.Email1MonthlyNewsLetter,
        Email2EmailUpdates: myJson.Email2EmailUpdates,
        Email33rdParty: myJson.Email33rdParty,
        NAEmailUpdates: myJson.NAEmailUpdates,
        AAEmailUpdates: myJson.AAEmailUpdates,
        daily_newsletter: myJson.daily_activim_newsletter,
        ais_weekly_newsletter: myJson.ais_weekly_newsletter
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
export const GetEmailPreferences = async () => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.GetEmailPreferences,
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
