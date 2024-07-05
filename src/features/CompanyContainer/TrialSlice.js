import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addTriallog } from '../../utils/company-util';
import TypeConstants from '../../constants/TrialTypeConstants';
import productsConst from '../../constants/ProductConstants';
import PathsConstant from '../../constants/PathsConstant';
import { TokenDecode } from '../../utils/general-util';

function getProductId(locationpathname, dToken) {
  let prod_id = null;
  let productStatusNo = null;

  if (
    locationpathname.includes('/activism') ||
    locationpathname.includes('/tools/activism')
  ) {
    prod_id = productsConst.ACTIVISM;
  }
  if (
    locationpathname.includes('/voting') ||
    locationpathname.includes('/tools/voting')
  ) {
    prod_id = productsConst.VOTING;
  }
  if (
    locationpathname.includes('/activistvulnerability') ||
    locationpathname.includes('/tools/vulnerability')
  ) {
    prod_id = productsConst.ACTIVIST_VULNERABILITY;
  }
  if (
    locationpathname.includes('/activistshorts') ||
    locationpathname.includes('/tools/shortactivism')
  ) {
    prod_id = productsConst.ACTIVIST_SHORTS;
  }
  if (
    locationpathname.includes('/governance') ||
    locationpathname.includes('/directorshipandexecutive') ||
    locationpathname.includes('/tools/governance')
  ) {
    prod_id = productsConst.GOVERNANCE;
  }
  if (
    locationpathname.includes('/compensation') ||
    locationpathname.includes('/tools/compensation')
  ) {
    prod_id = productsConst.COMPENSATION;
    // productStatusNo = 2; // test yellow
  }
  if (prod_id !== null && dToken !== null) {
    productStatusNo = dToken.MemberShip.filter(
      (m) => m.product_id === prod_id
    )[0].status;
  }

  // test for yellow nav for compensation
// if (prod_id !== null && prod_id !== productsConst.COMPENSATION && dToken !== null) {
//   productStatusNo = dToken.MemberShip.filter(
//     (m) => m.product_id === prod_id
//   )[0].status;
// }
  return { prod_id: prod_id, productStatusNo: productStatusNo };
}

function getMaxLimitIds(module) {
  let maxlimit_id = 0;
  if (module === TypeConstants.MODULE_COMPANY) {
    maxlimit_id = TypeConstants.MAX_LIMIT_COMPANY_IDS;
  }
  if (module === TypeConstants.MODULE_INVESTOR) {
    maxlimit_id = TypeConstants.MAX_LIMIT_INVESTOR_IDS;
  }
  if (module === TypeConstants.MODULE_ADVISERS) {
    maxlimit_id = TypeConstants.MAX_LIMIT_ADVISOR_IDS;
  }
  if (module === TypeConstants.MODULE_PEOPLE) {
    maxlimit_id = TypeConstants.MAX_LIMIT_PEOPLE_IDS;
  }
  return maxlimit_id;
}

function getType(module, dToken, locationpathname) {
  let type = '';
  const typePath =
    locationpathname.length > 0
      ? locationpathname.split('/').slice(0, 3).join('/')
      : '';
  if (dToken !== null) {
    for (const p of dToken.MemberShip) {
      if (module === TypeConstants.MODULE_COMPANY) {
        if (
          typePath === PathsConstant.ACTIVISM &&
          p.product_id === productsConst.ACTIVISM &&
          p.status !== TypeConstants.NOT_TRIAL_USER
        ) {
          type = TypeConstants.ACTIVISM;
        }
        if (
          typePath === PathsConstant.VOTING &&
          p.product_id === productsConst.VOTING &&
          p.status !== TypeConstants.NOT_TRIAL_USER
        ) {
          type = TypeConstants.VOTING;
        }
        if (
          locationpathname === PathsConstant.ACTIVIST_VULNERABILITY &&
          p.product_id === productsConst.ACTIVIST_VULNERABILITY &&
          p.status !== TypeConstants.NOT_TRIAL_USER
        ) {
          type = TypeConstants.VULNERABILITY;
        }
        if (
          typePath === PathsConstant.ACTIVISTSHORTS &&
          p.product_id === productsConst.ACTIVIST_SHORTS &&
          p.status !== TypeConstants.NOT_TRIAL_USER
        ) {
          type = TypeConstants.ACTIVIST_SHORTS;
        }
        if (
          typePath === PathsConstant.GOVERNANCE &&
          p.product_id === productsConst.GOVERNANCE &&
          p.status !== TypeConstants.NOT_TRIAL_USER
        ) {
          type = TypeConstants.GOVERNANCE;
        }
        if (
          typePath === PathsConstant.COMPANY_COMPENSATION &&
          p.product_id === productsConst.COMPENSATION &&
          p.status !== TypeConstants.NOT_TRIAL_USER
        ) {
          type = TypeConstants.COMPANY_COMPENSATION;
        }
      }
      if (module === TypeConstants.MODULE_INVESTOR) {
        if (
          PathsConstant.INVESTOR_ACTIVISM === typePath &&
          p.product_id === productsConst.ACTIVISM &&
          p.status !== TypeConstants.NOT_TRIAL_USER
        ) {
          type = TypeConstants.INVESTOR_ACTIVISM;
        }
        if (
          PathsConstant.INVESTOR_VOTING === typePath &&
          p.product_id === productsConst.VOTING &&
          p.status !== TypeConstants.NOT_TRIAL_USER
        ) {
          type = TypeConstants.INVESTOR_VOTING;
        }
        if (
          PathsConstant.INVESTOR_ACTIVIST_SHORT === typePath &&
          p.product_id === productsConst.ACTIVIST_SHORTS &&
          p.status !== TypeConstants.NOT_TRIAL_USER
        ) {
          type = TypeConstants.INVESTOR_ACTIVIST_SHORTS;
        }
      }
      if (module === TypeConstants.MODULE_ADVISERS) {
        if (
          PathsConstant.ADVISOR_ACTIVISM === typePath &&
          p.product_id === productsConst.ACTIVISM &&
          p.status !== TypeConstants.NOT_TRIAL_USER
        ) {
          type = TypeConstants.ADVISERS_ACTIVISM;
        }
        if (
          PathsConstant.ADVISOR_VOTING === typePath &&
          p.product_id === productsConst.VOTING &&
          p.status !== TypeConstants.NOT_TRIAL_USER
        ) {
          type = TypeConstants.ADVISERS_VOTING;
        }
        if (
          PathsConstant.ADVISOR_ACTIVISTSHORT === typePath &&
          p.product_id === productsConst.ACTIVIST_SHORTS &&
          p.status !== TypeConstants.NOT_TRIAL_USER
        ) {
          type = TypeConstants.ADVISERS_ACTIVIST_SHORTS;
        }
      }
      if (module === TypeConstants.MODULE_PEOPLE) {
        if (
          PathsConstant.DIRECTORSHIP_AND_EXECUTIVE === typePath &&
          p.product_id === productsConst.GOVERNANCE &&
          p.status !== TypeConstants.NOT_TRIAL_USER
        ) {
          type = TypeConstants.PEOPLE_GOVERNANCE;
        }
        if (
          PathsConstant.COMPENSATION === typePath &&
          p.product_id === productsConst.COMPENSATION &&
          p.status !== TypeConstants.NOT_TRIAL_USER
        ) {
          type = TypeConstants.PEOPLE_COMPENSATION;
        }
      }
    }
  }
  return type;
}

export const addTriallogReq = createAsyncThunk(
  'addTriallogReq',
  async (res) => {
    const { locationpathname, id, module } = res;
    const dToken = await TokenDecode();
    let profileCount = null;
    let status = false;

    if (id) {
      const type = await getType(module, dToken, locationpathname);
      const { prod_id, productStatusNo } = await getProductId(
        locationpathname,
        dToken
      );
      if (type && dToken !== null) {
        const response = await addTriallog({
          user_id: dToken.User_Id,
          type: type,
          id: id,
        });
        profileCount =
          response !== undefined ? response[0].distinct_profiles : null;
        const maxLimitIds = await getMaxLimitIds(module);

        if (
          productStatusNo === TypeConstants.TRIAL_USER &&
          profileCount &&
          profileCount > maxLimitIds
        ) {
          status = true;
        }
        if (
          productStatusNo === TypeConstants.TRIAL_USER &&
          profileCount &&
          profileCount < maxLimitIds
        ) {
          status = false;
        }
        if (
          productStatusNo !== TypeConstants.TRIAL_USER &&
          productStatusNo !== TypeConstants.NOT_TRIAL_USER
        ) {
          status = true;
        }
      }
      return {
        status: status,
        profileCount: profileCount,
        productStatus: !productStatusNo ? productStatusNo.toString() : productStatusNo,
        id: id,
        module: module,
        prod_id: prod_id,
      };
    }
  }
);

const TrialSlice = createSlice({
  name: 'trial',
  initialState: {
    distinctProfile: null,
    trialProductStatus: null,
    trialUserDisableDownload: false,
    trialUserBlur: false,
    profileCount: 0,
    module: '',
    queryUniqueId: null,
  },
  reducers: {
    handleResetTrialStatus: {
      reducer(state) {
        state.distinctProfile = null;
        state.trialProductStatus = null;
        state.trialUserDisableDownload = false;
        state.trialUserBlur = false;
        state.profileCount = 0;
        state.module = '';
        state.queryUniqueId = null;
      },
      prepare(e) {
        return {
          payload: { e },
        };
      },
    },
  },
  extraReducers: {
    [addTriallogReq.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload !== null) {
        state.distinctProfile = action.payload.status;
        state.trialProductStatus = action.payload.productStatus;
        state.profileCount = action.payload.profileCount; // count of profile visit
        state.trialUserDisableDownload =
          action.payload.productStatus !== TypeConstants.NOT_TRIAL_USER;
        state.module = action.payload.module;
        state.module_product_id = action.payload.prod_id;
        state.queryUniqueId = action.payload.id;

        if (action.payload.module === TypeConstants.MODULE_COMPANY) {
          state.trialUserBlur =
            action.payload.status &&
            Number(action.payload.id) !== TypeConstants.TRIAL_PID &&
            action.payload.productStatus !== TypeConstants.NOT_TRIAL_USER;
            // uncomment below to mannually test blur for compensation
            // if (action.payload.prod_id === 7 && action.payload.productStatus === 2) {
            //   state.trialUserBlur =
            //     action.payload.status &&
            //     Number(action.payload.id) !== TypeConstants.TRIAL_PID &&
            //     action.payload.productStatus !== TypeConstants.NOT_TRIAL_USER;
            //     console.log('action.payload', action.payload);
            //     state.trialUserBlur = true;
            // }
        }
        if (action.payload.module === TypeConstants.MODULE_ADVISERS) {
          state.trialUserBlur =
            action.payload.status &&
            Number(action.payload.id) !==
              TypeConstants.TRIAL_ADVISERS_COMPANYID &&
            action.payload.productStatus !== TypeConstants.NOT_TRIAL_USER;
        }
        if (action.payload.module === TypeConstants.MODULE_INVESTOR) {
          if (
            Number(action.payload.prod_id) === productsConst.VOTING ||
            Number(action.payload.prod_id) === productsConst.ACTIVISM
          ) {
            state.trialUserBlur =
              action.payload.status &&
              action.payload.productStatus !== TypeConstants.NOT_TRIAL_USER &&
              Number(action.payload.id) !==
                TypeConstants.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
          }
          if (
            Number(action.payload.prod_id) === productsConst.ACTIVIST_SHORTS
          ) {
            state.trialUserBlur =
              action.payload.status &&
              action.payload.productStatus !== TypeConstants.NOT_TRIAL_USER &&
              Number(action.payload.id) !==
                TypeConstants.TRIAL_INVESTORID_ACTIVIST_SHORTS;
          }
        }
        if (action.payload.module === TypeConstants.MODULE_PEOPLE) {
          state.trialUserBlur =
            action.payload.status &&
            Number(action.payload.id) !== TypeConstants.TRIAL_DIRECTOR_ID &&
            action.payload.productStatus !== TypeConstants.NOT_TRIAL_USER;
        }
      }
    },
  },
});

export const { handleResetTrialStatus } = TrialSlice.actions;

export default TrialSlice.reducer;
