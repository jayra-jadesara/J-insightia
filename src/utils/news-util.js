import React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Redirect } from 'react-router';
import config from '../config/server-config';
import productConstant from '../constants/ProductConstants';
import PathsConstant from '../constants/PathsConstant';
import { TokenDecode, isIdNotNullOrUndefined } from './general-util';
import { API_CALL_SUCCESSFULL, NUMBER_TWO, NUMBER_FOUR } from '../constants/NumberConstants';

export const CheckIsValidNewsPageUrl = async (path) => {
  try {
    const token = localStorage.getItem('token');
    jwt.verify(token, config.tokenSecrectKey, (err) => {
      if (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');

        return <Redirect to={PathsConstant.CREDENTIAL_FORM} />;
      }
    });

    const dToken = jwt.decode(token);
    if (dToken !== null) {
      const membership = dToken.MemberShip;
      if (
        path === PathsConstant.NEWS_ACTIVISM ||
        path === PathsConstant.NEWS_ACTIVISM_LATEST ||
        path === PathsConstant.NEWS_ACTIVISM_COVID19 ||
        path === PathsConstant.NEWS_ACTIVISM_THIS_WEEK ||
        path === PathsConstant.NEWS_ACTIVISM_WEEKLY_WRAP ||
        path === PathsConstant.NEWS_ACTIVISM_IN_DEPTH_ARTICLES
      ) {
        if (
          membership.findIndex(
            (p) => p.product_id === productConstant.ACTIVISM && (p.status === NUMBER_TWO || p.status === NUMBER_FOUR)
          ) >= 0
        ) {
          return true;
        }
      }

      if (path === PathsConstant.NEWS_ACTIVIST_SHORT || path === PathsConstant.NEWS_ACTIVIST_SHORT_IN_DEPTH_ARTICLES) {
        if (
          membership.findIndex(
            (p) =>
              p.product_id === productConstant.ACTIVIST_SHORTS && (p.status === NUMBER_TWO || p.status === NUMBER_FOUR)
          ) >= 0
        ) {
          return true;
        }
      }

      if (
        path === PathsConstant.NEWS_ACTIVIST_VULNERABILITY ||
        path === PathsConstant.NEWS_ACTIVIST_VULNERABILITY_LATEST ||
        path === PathsConstant.NEWS_ACTIVIST_VULNERABILITY_REPORT
      ) {
        if (
          membership.findIndex(
            (p) =>
              p.product_id === productConstant.ACTIVIST_VULNERABILITY &&
              (p.status === NUMBER_TWO || p.status === NUMBER_FOUR)
          ) >= 0
        ) {
          return true;
        }
      }

      if (path === PathsConstant.NEWS_GOVERNANCE) {
        if (
          membership.findIndex(
            (p) => p.product_id === productConstant.GOVERNANCE && (p.status === NUMBER_TWO || p.status === NUMBER_FOUR)
          ) >= 0
        ) {
          return true;
        }
      }

      if (path === PathsConstant.NEWS_VOTING || path === PathsConstant.NEWS_VOTING_IN_DEPTH_ARTICLES) {
        if (
          membership.findIndex(
            (p) => p.product_id === productConstant.VOTING && (p.status === NUMBER_TWO || p.status === NUMBER_FOUR)
          ) >= 0
        ) {
          return true;
        }
      }
    }

    return false;
  } catch (e) {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');

    return <Redirect to={PathsConstant.CREDENTIAL_FORM} />;
  }
};

export const AddNewsVisitorLog = async (page, mode, newsid) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.addNewsVisitorLog,
      {
        userid: uid,
        page,
        mode,
        newsid,
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

export const GetAllMostReadNews = async () => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.getMostReadNews,
      {
        userid: uid,
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

export const GetAllLatestReadNews = async () => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));

    const response = await axios.post(
      config.getLatestReadNews,
      {
        userid: uid,
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

export const GetAllProductLatestNews = async (productid, companyid, investorid, isVulnerabilityReport) => {
  try {
    const response = await axios.post(
      config.getAllProductLatestNews,
      {
        ProductId: productid,
        CompanySearchId: companyid,
        InvestorSearchId: investorid,
        isVulnerabilityReport,
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

export const ListnewswithTag = async (tag) => {
  try {
    const response = await axios.post(
      config.listnewswithTag,
      {
        tag,
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

export const ListForViewNewsTimelineTop5 = async (newsid) => {
  try {
    const response = await axios.post(
      config.listForViewNewsTimelineTop5,
      {
        newsid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return [];
  }
};

export const DummyActivismTimeline = async () => {
  try {
    const response = await axios.post(
      config.dummyActivismTimeline,
      {},
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return [];
  }
};

export const GetLatestNewsFiltered = async () => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));
    const response = await axios.post(
      config.getLatestNewsFiltered,
      { userid: uid },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return [];
  }
};

export const GetNewsMoreInformationLinks = async (newsid) => {
  try {
    const response = await axios.post(
      config.getNewsMoreInformationLinks,
      {
        newsid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return [];
  }
};

export const GetNewsDetails = async (newsid) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));
    if (isIdNotNullOrUndefined(newsid)) {
      const response = await axios.post(
        config.getNewsDetails,
        {
          newsid,
          userid: uid,
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      if (response.status === API_CALL_SUCCESSFULL) {
        return response.data;
      }
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
};

export const GetCompanyNewsIds = async (pid) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));
    const response = await axios.post(
      config.getCompanyNewsIds,
      {
        pid,
        userid: uid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return {};
  }
};

export const GetInvestorNewsIds = async (investorid) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));
    const response = await axios.post(
      config.getInvestorNewsIds,
      {
        investorid,
        userid: uid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return {};
  }
};

export const GetNewsEvents = async (activismCategoryId, longShort, isAdmin) => {
  try {
    const response = await axios.post(
      config.getNewsEvents,
      {
        ActivismCategoryId: activismCategoryId,
        LongShort: longShort,
        admin: isAdmin,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return [];
  }
};

export const GetStakeholding = async (activismCategoryId, longShort, isAdmin) => {
  try {
    const response = await axios.post(
      config.getStakeholding,
      {
        ActivismCategoryId: activismCategoryId,
        admin: isAdmin,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return [];
  }
};

export const GetActivistObjective = async (activismCategoryId) => {
  try {
    const response = await axios.post(
      config.getActivistObjective,
      {
        activismCategoryId,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return [];
  }
};

export const NewsFilter = async (
  CompanySearchId,
  InvestorSearchId,
  ActivistObjectiveGroupId,
  ActivistObjectiveTypeId,
  Stakeholding,
  Event,
  Freesearch,
  periodStart,
  periodEnd,
  product_id
) => {
  try {
    let user_id;
    await TokenDecode()
      .then((res) => {
        user_id = res.User_Id;
      })
      .catch((e) => console.log(e));
    const response = await axios.post(
      config.newsFilter,
      {
        CompanySearchId,
        InvestorSearchId,
        ActivistObjectiveGroupId,
        ActivistObjectiveTypeId,
        Stakeholding,
        Event,
        Freesearch,
        periodStart,
        periodEnd,
        user_id,
        product_id,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );

    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return [];
  }
};

export const getNewsNextPrevious = async (newsid) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));
    if (isIdNotNullOrUndefined(newsid)) {
      const response = await axios.post(
        config.getNewsNextPrevious,
        {
          newsid,
          userid: uid,
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      if (response.status === API_CALL_SUCCESSFULL) {
        return response.data[0];
      }
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
};

export const getProductMemberships = async (newsid) => {
  try {
    let uid;
    await TokenDecode()
      .then((res) => {
        uid = res.User_Id;
      })
      .catch((e) => console.log(e));
    const response = await axios.post(
      config.getProductMemberships,
      {
        userid: uid,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (response.status === API_CALL_SUCCESSFULL) {
      return response.data;
    }
  } catch (error) {
    return {};
  }
};
