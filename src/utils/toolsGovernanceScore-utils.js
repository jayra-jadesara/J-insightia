import axios from 'axios';
import { getGovernanceScores } from '../config/server-config';
import { GOVERNANCR_SCORE_TOOLTIP_SECTION_ID } from '../constants/sectionTooltipsIdConstamt';
import { API_CALL_SUCCESSFULL } from '../constants/NumberConstants';
import { GOVERNANCE } from '../constants/ProductConstants';

export const GetGovernanceScores = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      getGovernanceScores,
      {
        tooltip_section_id: GOVERNANCR_SCORE_TOOLTIP_SECTION_ID,
        product_id: GOVERNANCE,
        token,
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
  return false;
};

export default { GetGovernanceScores };
