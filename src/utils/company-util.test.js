import {
  Adm_Check_PID,
  GetAiSCompTotalShortPositions,
  GetAiSCompDisclosedShortPositions,
  GetHistoricShortPositions,
  ListActivistInvestorsForCompany_NEW_ais,
  ListActivistInvestorsForCompanyAiS,
  GetActivismSummary_AiS
} from './company-util';

const axios = require('axios');

describe('Company Utils Axios Calls', () => {
  let mock;
  beforeEach(() => {
    mock = jest.spyOn(axios, 'post');
  });
  afterEach(() => {
    mock.mockRestore();
  });

  function testApiCall(callName, callFunction, mockData) {
    describe(callName, () => {
      it('should post succesfully with return', async () => {
        const resp = {
          data: mockData,
          status: 200
        };
        mock.mockResolvedValue(resp)(
          await callFunction(1).then((data) => {
            expect(data).toEqual(mockData);
          })
        );
      });

      it('should fail to Post, no return', async () => {
        const resp = {
          data: undefined,
          status: 401
        };
        mock.mockResolvedValue(resp)(
          await callFunction(1).then((data) => {
            expect(data).toEqual(undefined);
          })
        );
      });
    });
  }

  testApiCall('Adm_Check_PID', Adm_Check_PID, [{ cmpid: 16689 }]);

  describe('Activist Shorts Overview', () => {
    testApiCall('GetAiSCompDisclosedShortPositions', GetAiSCompDisclosedShortPositions, [{ value: true }]);
    testApiCall('GetHistoricShortPositions', GetHistoricShortPositions, [{ value: true }]);
    testApiCall('ListActivistInvestorsForCompany_NEW_ais', ListActivistInvestorsForCompany_NEW_ais, [{ value: true }]);
    testApiCall('GetAiSCompTotalShortPositions', GetAiSCompTotalShortPositions, [{ value: true }]);
  });

  describe('Activist Shorts Campaign', () => {
    testApiCall('ListActivistInvestorsForCompanyAiS', ListActivistInvestorsForCompanyAiS, [{ cmpid: 16689 }]);
    testApiCall('GetActivismSummary_AiS', GetActivismSummary_AiS, [{ cmpid: 16689 }]);
  });
});
