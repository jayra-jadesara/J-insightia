export const TABLE_FILTER_BUTTONS_APPLY_RESET = ['apply', 'reset'];
export const TABLE_FILTER_OPTIONS_TEXT = [
  'equals', // Text, Number, Date
  'notEqual', // Text, Number, Date
  'contains', // Text
  'notContains', // Text
  'startsWith', // Text
  'endsWith', // Text
  {
    displayKey: 'exists',
    displayName: 'Exists',
    hideFilterInput: true,
    test: (filterValue, cellValue) => cellValue !== null
  }
];
export const TABLE_FILTER_OPTIONS_DATE = [
  'equals', // Text, Number, Date
  'notEqual', // Text, Number, Date
  'lessThan', // Number, Date
  'greaterThan', // Number, Date
  'inRange', // Number, Date
  {
    displayKey: 'exists',
    displayName: 'Exists',
    hideFilterInput: true,
    test: (filterValue, cellValue) => cellValue !== null
  }
];
export const TABLE_FILTER_OPTIONS_NUMBER = [
  'equals', // Text, Number, Date
  'notEqual', // Text, Number, Date
  'lessThan', // Number, Date
  'lessThanOrEqual', // Number
  'greaterThan', // Number, Date
  'greaterThanOrEqual', // Number
  'inRange', // Number, Date
  {
    displayKey: 'exists',
    displayName: 'Exists',
    hideFilterInput: true,
    test: (filterValue, cellValue) => cellValue !== null
  }
];
export const TABLE_FILTER_VALUE_FORMATTER_UNKNOWN = (params) => {
  const { value } = params;
  if (value === null) {
    return 'Unknown';
  }
};

export const TABLE_FILTER_VALUE_FORMATTER_SET = (params) => {
  const { value } = params;
  if (value === '1') {
    return 'Yes';
  }
  if (value === '0') {
    return 'No';
  }
  if (value === null) {
    return 'Unknown';
  }
};

export const TABLE_FILTER_HEALTHY_FORMATTER_SET = (params) => {
  const { value } = params;
  if (value === '1') {
    return 'Healthy';
  }
  if (value === '0') {
    return 'Unhealthy';
  }
  if (value === null) {
    return 'Unknown';
  }
};

export const TABLE_FILTER_MARKET_CAP_FORMATTER_SET = (params) => {
  const { value } = params;
  if (value === 'Nano') {
    return 'Nano Cap (<$50M)';
  }
  if (value === 'Micro') {
    return 'Micro Cap ($50M-$250M)';
  }
  if (value === 'Small') {
    return 'Small Cap ($250M-$2B)';
  }
  if (value === 'Mid') {
    return 'Mid Cap ($2B-$10B)';
  }
  if (value === 'Large') {
    return 'Large Cap (>$10B)';
  }
  if (value === null) {
    return 'Unknown';
  }
};

export const POWERSEARCH_INDUSTRY_NAMES = [
  'Agricultural Inputs',
  'Aluminium',
  'Building Materials',
  'Chemicals',
  'Coal',
  'Copper',
  'Gold',
  'Industrial Metals & Minerals',
  'Lumber & Wood Production',
  'Paper & Paper Products',
  'Silver',
  'Speciality Chemicals',
  'Steel',
  'Pay TV',
  'Telecom Services',
  'Advertising Agencies',
  'Apparel Manufacturing',
  'Apparel Stores',
  'Auto & Truck Dealerships',
  'Auto Manufacturers',
  'Auto Parts',
  'Broadcasting - Radio',
  'Broadcasting - TV',
  'Department Stores',
  'Footwear & Accessories',
  'Gambling',
  'Home & Personal Products',
  'Home Furnishings & Fixtures',
  'Home Improvement Stores',
  'Leisure',
  'Lodging',
  'Luxury Goods',
  'Marketing Services',
  'Media - Diversified',
  'Packaging & Containers',
  'Personal Services',
  'Publishing',
  'Recreational Vehicles',
  'Residential Construction',
  'Resorts & Casinos',
  'Restaurants',
  'Rubber & Plastics',
  'Specialty Retail',
  'Textile Manufacturing',
  'Beverages - Brewers',
  'Beverages - Soft Drinks',
  'Beverages - Wineries & Distilleries',
  'Confectioners',
  'Discount Stores',
  'Education & Training Services',
  'Farm Products',
  'Food Distribution',
  'Grocery Stores',
  'Household & Personal Products',
  'Packaged Foods',
  'Pharmaceutical Retailers',
  'Tobacco',
  'Alternative Energy',
  'Oil & Gas Drilling',
  'Oil & Gas E&P',
  'Oil & Gas Equipment & Services',
  'Oil & Gas Integrated',
  'Oil & Gas Midstream',
  'Oil & Gas Refining & Marketing',
  'Asset Management',
  'Banks',
  'Banks - Global',
  'Banks - Regional - Africa',
  'Banks - Regional - Asia',
  'Banks - Regional - Australia',
  'Banks - Regional - Canada',
  'Banks - Regional - Europe',
  'Banks - Regional - Latin America',
  'Banks - Regional - US',
  'Banks - Regional Europe',
  'Capital Markets',
  'Credit Services',
  'Financial Exchanges',
  'Insurance - Diversified',
  'Insurance - Life',
  'Insurance - Property & Casualty',
  'Insurance - Reinsurance',
  'Insurance - Specialty',
  'Insurance Brokers',
  'Savings & Cooperative Banks',
  'Security & Protection Services',
  'Specialty Finance',
  'Funds',
  'Thematic Sector US Equity',
  'Biotechnology',
  'Diagnostics & Research',
  'Drug Manufacturers - Major',
  'Drug Manufacturers - Specialty & Generic',
  'Health Care Plans',
  'Long-Term Care Facilities',
  'Medical Care',
  'Medical Devices',
  'Medical Distribution',
  'Medical Instruments & Supplies',
  'Aerospace & Defense',
  'Airlines',
  'Airports & Air Services',
  'Business Equipment',
  'Business Services',
  'Conglomerates',
  'Diversified Industrials',
  'Engineering & Construction',
  'Farm & Construction Equipment',
  'Industrial Distribution',
  'Infrastructure Operations',
  'Integrated Shipping & Logistics',
  'Metal Fabrication',
  'Pollution & Treatment Controls',
  'Railroads',
  'Rental & Leasing Services',
  'Security & Protection Services',
  'Shipping & Ports',
  'Staffing & Outsourcing Services',
  'Tools & Accessories',
  'Truck Manufacturing',
  'Trucking',
  'Waste Management',
  'Real Estate - General',
  'Real Estate Services',
  'REIT - Diversified',
  'REIT - Healthcare Facilities',
  'REIT - Hotel & Motel',
  'REIT - Industrial',
  'REIT - Office',
  'REIT - Residential',
  'REIT - Retail',
  'Communication Equipment',
  'Computer Distribution',
  'Computer Systems',
  'Consumer Electronics',
  'Contract Manufacturers',
  'Data Storage',
  'Electronic Components',
  'Electronic Gaming & Multimedia',
  'Electronics Distribution',
  'Health Information Services',
  'Information Technology Services',
  'Internet Content & Information',
  'Scientific & Technical Instruments',
  'Semiconductor Equipment & Materials',
  'Semiconductor Memory',
  'Semiconductors',
  'Software - Application',
  'Software - Infrastructure',
  'Solar',
  'Independent Power Producers',
  'Utilities - Diversified',
  'Utilities - Independent Power Producers',
  'Utilities - Regulated Electric',
  'Utilities - Regulated Gas',
  'Utilities - Regulated Water',
  'Shell Companies',
  'Entertainment',
  'Electronic Gaming & Multimedia',
  'Pharmaceutical Retailers',
  null
];
export const POWERSEARCH_SECTOR_NAMES = [
  'Basic Materials',
  'Communication Services',
  'Consumer Cyclical',
  'Consumer Defensive',
  'Energy',
  'Financial Services',
  'Funds',
  'Healthcare',
  'Industrials',
  'Real Estate',
  'Technology',
  'Utilities',
  null
];
export const POWERSEARCH_MARKETCAP_NAMES = [
  'Nano',
  'Micro',
  'Small',
  'Mid',
  'Large',
  null
];
export const POWERSEARCH_VULNERABILITY_RANK = [
  'High',
  'Medium',
  'Low',
  null
];
export const POWERSEARCH_ALLEGATION_NAMES = [
  'Accounting Fraud',
  'Bubble',
  'Competitive Pressures',
  'Dividend Cut Coming',
  'Industry Issues',
  'Ineffective Roll-Up',
  'Major Business Fraud',
  'Medical Effectiveness',
  'Misleading Accounting',
  'Other Illegal',
  'Other Overvaluation',
  'Over-Levered',
  'Patent Expiration',
  'Patent Invalid',
  'Product Ineffective',
  'Pyramid Scheme',
  'Stock Promotion',
  'Upcoming Earnings Miss',
  null
];

export const POWERSEARCH_BOOLEAN_SET = ['1', '0', null];
export default {
  TABLE_FILTER_BUTTONS_APPLY_RESET,
  TABLE_FILTER_OPTIONS_TEXT,
  TABLE_FILTER_OPTIONS_NUMBER,
  TABLE_FILTER_OPTIONS_DATE,
  TABLE_FILTER_VALUE_FORMATTER_UNKNOWN,
  TABLE_FILTER_HEALTHY_FORMATTER_SET,
  TABLE_FILTER_VALUE_FORMATTER_SET,
  TABLE_FILTER_MARKET_CAP_FORMATTER_SET,
  POWERSEARCH_INDUSTRY_NAMES,
  POWERSEARCH_SECTOR_NAMES,
  POWERSEARCH_MARKETCAP_NAMES,
  POWERSEARCH_BOOLEAN_SET,
  POWERSEARCH_ALLEGATION_NAMES,
  POWERSEARCH_VULNERABILITY_RANK
};
