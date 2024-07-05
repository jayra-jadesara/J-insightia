// #region Company OwnershipLongInvestor
export const OWNERSHIP_LONG_INVESTOR_VOTING_SOLE_TOOLTIP = 'When an investment manager has sole voting authority.';
export const OWNERSHIP_LONG_INVESTOR_VOTING_SHARED_TOOLTIP =
  "If voting authority is shared only in a manner similar to a sharing of investment discretion which would call for a response of 'shared-defined' (DEFINED) under Column 6, voting authority should be reported as sole.";
export const OWNERSHIP_LONG_INVESTOR_VOTING_NONE_TOOLTIP =
  "A Manager exercising sole voting authority over specified 'routine' matters, and no authority to vote in 'non-routine' matters, is deemed for purposes of this Form 13F to have no voting authority. 'Non-routine' matters include a contested election of directors, a merger, a sale of substantially all the assets, a change in the articles of incorporation affecting the rights of shareholders, and a change in fundamental investment policy, 'routine' matters include selection of an accountant, uncontested election of directors, and approval of an annual report.";
// #endregion Company OwnershipLongInvestor

// #region Company voting Overvew
const VOTING_OVERVIEW_PVA_RECOMM_TOOLTIP =
  'Shows minimum % of issued shares (13F filers only) who automatically follow proxy advisers or show a high level of alignment on this proposal type.';
const VOTING_OVERVIEW_VOTERTURNOUT_TOOLTIP =
  'Turnout is calculated based on votes cast at the meeting and total issued share capital. Supervoting stock can lead to figures above 100% being displayed.';
// #endregion Company voting Overvew

export default {
  OWNERSHIP_LONG_INVESTOR_VOTING_SOLE_TOOLTIP,
  OWNERSHIP_LONG_INVESTOR_VOTING_SHARED_TOOLTIP,
  OWNERSHIP_LONG_INVESTOR_VOTING_NONE_TOOLTIP,
  VOTING_OVERVIEW_PVA_RECOMM_TOOLTIP,
  VOTING_OVERVIEW_VOTERTURNOUT_TOOLTIP,
};
