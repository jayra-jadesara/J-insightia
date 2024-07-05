import axios from 'axios';
import config from '../config/server-config';
import { TokenDecode } from './general-util';
import pathConst from '../constants/PathsConstant';
import numConst from '../constants/NumberConstants';

// PDF Download
export const getPDF = async (res) => {
  try {
    const tokenJSON = await TokenDecode();
    console.log('response_start');
    const response = await axios.post(
      config.getPDF, // URL
      {
        pdfListItems: res.pdfListItems,
        pdfTitle: res.pdfTitle,
        loginUrl: `${window.location.origin}${pathConst.CREDENTIAL_FORM}/`,
        token: localStorage.getItem('token'),
        User_Id: tokenJSON.User_Id !== undefined ? tokenJSON.User_Id : 0
      }, // Data
      {
        cancelToken: res.cancelToken, // For POST request, pass cancelToken as 3rd argument
        // responseType: 'arraybuffer',
        signal: res.signal,
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    console.log('response_status', response.status);
    console.log('response_data', response.data);

    if (response.status === numConst.API_CALL_SUCCESSFULL) {
      if (response.data !== undefined && response.data.FilePath !== '') {
        // const blob = new Blob([response.data], {
        //   type: 'application/pdf;base64'
        // });
        // const fileURL = URL.createObjectURL(blob);
        res.setConfirmPDFTitle(res.pdfTitle);
        return {
          pdfstatus: true,
          pdffileURL: response.data.FilePath,
          error: response.data.errorMsg
        };
      }
      return {
        pdfstatus: false,
        pdffileURL: response.data.FilePath,
        error: response.data.errorMsg
      };
    }
    return { pdfstatus: false, pdffileURL: '', error: '' };
  } catch (err) {
    if (axios.isCancel(err)) {
      return { pdfstatus: false, pdffileURL: '', error: '' };
    }
    console.log('response_err', err);
    return { pdfstatus: false, pdffileURL: '', error: '' };
  }
};
export const getPDFClose = async () => {
  try {
    const response = await axios.post(
      config.getPDFClose,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === numConst.API_CALL_SUCCESSFULL) {
      return {
        pdfstatus: false,
        pdffileURL: response.data.data,
        error: response.data.errorMsg
      };
    }
  } catch (err) {
    if (axios.isCancel(err)) {
      return { pdfstatus: false, pdffileURL: '', error: '' };
    }
  }
};

// Recent Downloads
export const getDataRecentDownloadList = async () => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.getRecentDownloadList,
      {
        user_id: uid
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    if (response.status === numConst.API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (e) {
    return false;
  }
};
