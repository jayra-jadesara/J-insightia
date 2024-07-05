export const COLUMNS_DEF_POWERSEARCH_DEFAULT = [
    {
        headerName: 'Company Information',
        headerTooltip: 'Company Information',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        children: [
            {
                headerName: 'PID',
                field: 'pid',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'enableValue'
                ],
                aggFunc: 'count(Dist)',
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'PID'
            },
            {
                headerName: 'Company name',
                field: 'Company_Name',
                filter: 'agTextColumnFilter',
                type: [
                    'enableRowGroup',
                    'enableValue'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                chartDataType: 'category',
                minWidth: 290,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Company name'
            },
            {
                headerName: 'Company HQ',
                field: 'Company_HQ',
                filter: 'agSetColumnFilter',
                type: [
                    'setColumn',
                    'enableRowGroup',
                    'enableValue'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        'Afghanistan',
                        'Albania',
                        'Algeria',
                        'Andorra',
                        'Angola',
                        'Anguilla',
                        'Antigua and Barbuda',
                        'Argentina',
                        'Armenia',
                        'Aruba',
                        'Australia',
                        'Austria',
                        'Azerbaijan',
                        'Bahamas',
                        'Bahrain',
                        'Bangladesh',
                        'Barbados',
                        'Belarus',
                        'Belgium',
                        'Belize',
                        'Benin',
                        'Bermuda',
                        'Bhutan',
                        'Bolivia',
                        'Bosnia and Herzegovina',
                        'Botswana',
                        'Brazil',
                        'British Virgin Islands',
                        'Brunei Darussalam',
                        'Bulgaria',
                        'Burkina Faso',
                        'Burundi',
                        'Cambodia',
                        'Cameroon',
                        'Canada',
                        'Cape Verde',
                        'Cayman Islands',
                        'Central African Republic',
                        'Chad',
                        'Chile',
                        'China',
                        'Colombia',
                        'Comoros',
                        'Costa Rica',
                        'Croatia',
                        'Cuba',
                        'Cyprus',
                        'Czech Republic',
                        'Democratic Republic of Congo',
                        'Denmark',
                        'Djibouti',
                        'Dominica',
                        'Dominican Republic',
                        'Ecuador',
                        'Egypt',
                        'El Salvador',
                        'Equatorial Guinea',
                        'Eritrea',
                        'Estonia',
                        'Ethiopia',
                        'Finland',
                        'France',
                        'French Guiana',
                        'Gabon',
                        'Georgia',
                        'Germany',
                        'Ghana',
                        'Gibraltar',
                        'Greece',
                        'Greenland',
                        'Grenada',
                        'Guadeloupe',
                        'Guatemala',
                        'Guernsey',
                        'Guinea',
                        'Guinea-Bissau',
                        'Guyana',
                        'Haiti',
                        'Honduras',
                        'Hong Kong',
                        'Hungary',
                        'Iceland',
                        'India',
                        'Indonesia',
                        'Iran',
                        'Iraq',
                        'Ireland',
                        'Isle of Man',
                        'Israel',
                        'Italy',
                        'Ivory Coast',
                        'Jamaica',
                        'Japan',
                        'Jersey',
                        'Jordan',
                        'Kazakhstan',
                        'Kenya',
                        "Korea, Democratic People's Republic",
                        'Korea, Republic of',
                        'Kuwait',
                        'Kyrgyzstan',
                        'Lao PDR',
                        'Latvia',
                        'Lebanon',
                        'Lesotho',
                        'Liberia',
                        'Libya',
                        'Liechtenstein',
                        'Lithuania',
                        'Luxembourg',
                        'Macedonia',
                        'Madagascar',
                        'Malawi',
                        'Malawi',
                        'Malaysia',
                        'Maldives',
                        'Mali',
                        'Malta',
                        'Marshall Islands',
                        'Martinique',
                        'Mauritania',
                        'Mauritius',
                        'Mexico',
                        'Moldova',
                        'Monaco',
                        'Mongolia',
                        'Montenegro',
                        'Montserrat',
                        'Morocco',
                        'Mozambique',
                        'Myanmar',
                        'Namibia',
                        'Nepal',
                        'Netherlands',
                        'Netherlands Antilles',
                        'New Caledonia',
                        'New Zealand',
                        'Nicaragua',
                        'Niger',
                        'Nigeria',
                        'Norway',
                        'Oman',
                        'Pakistan',
                        'Panama',
                        'Papua New Guinea',
                        'Paraguay',
                        'Peru',
                        'Philippines',
                        'Poland',
                        'Portugal',
                        'Puerto Rico',
                        'Qatar',
                        'Republic of the Congo',
                        'Réunion',
                        'Romania',
                        'Russian Federation',
                        'Rwanda',
                        'Saint Kitts and Nevis',
                        'Saint Lucia',
                        'Samoa',
                        'San Marino',
                        'Saudi Arabia',
                        'Senegal',
                        'Serbia',
                        'Seychelles',
                        'Sierra Leone',
                        'Singapore',
                        'Slovakia',
                        'Slovenia',
                        'Somalia',
                        'South Africa',
                        'South Sudan',
                        'Spain',
                        'Sri Lanka',
                        'Sudan',
                        'Suriname',
                        'Swaziland',
                        'Sweden',
                        'Switzerland',
                        'Syria',
                        'Taiwan',
                        'Tajikistan',
                        'Tanzania',
                        'Thailand',
                        'Togo',
                        'Trinidad and Tobago',
                        'Tunisia',
                        'Turkey',
                        'Turkmenistan',
                        'Uganda',
                        'UK',
                        'Ukraine',
                        'United Arab Emirates',
                        'Unknown',
                        'Uruguay',
                        'US',
                        'US Virgin Islands',
                        'Uzbekistan',
                        'Venezuela (Bolivarian Republic of)',
                        'Vietnam',
                        'Western Sahara',
                        'Yemen',
                        'Zambia',
                        'Zimbabwe'
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Company HQ'
            },
            {
                headerName: 'Industry',
                field: 'Industry',
                filter: 'agSetColumnFilter',
                type: [
                    'setColumn',
                    'enableRowGroup',
                    'enableValue'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                chartDataType: 'category',
                minWidth: 290,
                maxWidth: 400,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
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
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Industry'
            },
            {
                headerName: 'Sector',
                field: 'Sector',
                filter: 'agSetColumnFilter',
                type: [
                    'setColumn',
                    'enableRowGroup',
                    'enableValue'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                chartDataType: 'category',
                minWidth: 290,
                maxWidth: 400,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
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
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Sector'
            },
            {
                headerName: 'Index List',
                field: 'IndexList',
                filter: 'agTextColumnFilter',
                type: [
                    'setColumn',
                    'enableRowGroup',
                    'enableValue',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                chartDataType: 'category',
                minWidth: 325,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'contains',
                        'notContains',
                        'startsWith',
                        'endsWith',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Index List'
            },
            {
                headerName: 'Market Cap ($M)',
                field: 'Market_Cap',
                filter: 'agNumberColumnFilter',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'enableValue',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Market Cap ($M)'
            },
            {
                headerName: 'Market Cap Category',
                field: 'Market_Cap_Category',
                filter: 'agSetColumnFilter',
                type: [
                    'setColumn',
                    'enableRowGroup',
                    'enableValue'
                ],
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                aggFunc: 'count(Dist)',
                chartDataType: 'category',
                minWidth: 180,
                maxWidth: 200,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        'Nano Cap (<$50M)',
                        'Micro Cap ($50M-$250M)',
                        'Small Cap ($250M-$2B)',
                        'Mid Cap ($2B-$10B)',
                        'Large Cap (>$10B)',
                        null
                    ],
                    suppressSorting: true
                },
                headerClass: 'text-center',
                headerTooltip: 'Market Cap Category'
            },
            {
                headerName: 'IPO',
                field: 'IPO',
                filter: 'agNumberColumnFilter',
                type: [
                    'dateColumn',
                    'enableRowGroup',
                    'enableValue',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'greaterThan',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'IPO'
            },
            {
                headerName: 'Active',
                field: 'Active',
                filter: 'agSetColumnFilter',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Active'
            }
        ]
    },
    {
        headerName: 'Company Governance',
        headerTooltip: 'Company Governance',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        children: [
            {
                headerName: 'Controlled Company',
                field: 'Controlled_Company',
                filter: 'agSetColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Controlled Company'
            },
            {
                headerName: 'Staggered Board',
                field: 'Staggered_Board',
                filter: 'agSetColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 75,
                maxWidth: 110,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Staggered Board'
            },
            {
                headerName: 'Active Poison Pill',
                field: 'Active_PoisonPill',
                filter: 'agSetColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Active Poison Pill'
            },
            {
                headerName: 'Number of Directors',
                field: 'Number_of_Directors',
                filter: 'agNumberColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Number of Directors'
            },
            {
                headerName: 'CEO Tenure',
                field: 'CEO_Tenure',
                filter: 'agNumberColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'CEO Tenure'
            },
            {
                headerName: 'Chairman Tenure',
                field: 'Chairman_Tenure',
                filter: 'agNumberColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Chairman Tenure'
            },
            {
                headerName: 'Separate CEO and Chairman',
                field: 'Separate_CEO_and_Chairman',
                filter: 'agSetColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 150,
                maxWidth: 160,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Separate CEO and Chairman'
            },
            {
                headerName: 'Females on Board',
                field: 'Females_on_Board',
                filter: 'agNumberColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                sortable: true,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Females on Board'
            },
            {
                headerName: 'Overboarded Directors',
                field: 'Overboarded_Directors',
                filter: 'agSetColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Overboarded Directors'
            },
            {
                headerName: 'Governance Score',
                field: 'Governance_score',
                filter: 'agNumberColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Governance Score'
            }
        ]
    },
    {
        headerName: 'Company Voting',
        headerTooltip: 'Company Voting',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        children: [
            {
                headerName: 'Latest Minimum Support for Director',
                field: 'Latest_Minimum_Support_for_Director',
                filter: 'agNumberColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 170,
                maxWidth: 170,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Latest Minimum Support for Director'
            },
            {
                headerName: 'Latest Average Support for Director',
                field: 'Latest_Average_Support_for_Director',
                filter: 'agNumberColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Latest Average Support for Director'
            },
            {
                headerName: 'Latest Support for Remuneration',
                field: 'Latest_Support_for_Remuneration',
                filter: 'agNumberColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 170,
                maxWidth: 170,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Latest Support for Remuneration'
            },
            {
                headerName: 'Latest Annual Meeting Date',
                field: 'Latest_Annual_Meeting_Date',
                filter: 'agDateColumnFilter',
                toolPanelClass: '',
                type: [
                    'dateColumn',
                    'enableRowGroup',
                    'enableValue',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                chartDataType: 'category',
                minWidth: 170,
                maxWidth: 170,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'greaterThan',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Latest Annual Meeting Date'
            }
        ]
    },
    {
        headerName: 'Company Short Campaigns',
        headerTooltip: 'Company Short Campaigns',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        children: [
            {
                headerName: 'Latest Activist Short Campaign Start Date',
                field: 'Latest_Activist_Short_Campaign_Start_Date',
                filter: 'agDateColumnFilter',
                toolPanelClass: '',
                type: [
                    'dateColumn',
                    'enableRowGroup',
                    'enableValue',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'greaterThan',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Latest Activist Short Campaign Start Date'
            },
            {
                headerName: 'Latest Activist Short Campaign Activist',
                field: 'Latest_Activist_Short_Campaign_Activist',
                filter: 'agTextColumnFilter',
                toolPanelClass: '',
                type: [
                    'setColumn',
                    'enableRowGroup',
                    'enableValue',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                chartDataType: 'category',
                minWidth: 290,
                maxWidth: 400,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'contains',
                        'notContains',
                        'startsWith',
                        'endsWith',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Latest Activist Short Campaign Activist'
            },
            {
                headerName: 'Latest Activist Short Campaign Allegations',
                field: 'Latest_Activist_Short_Campaign_Allegations',
                filter: 'agSetColumnFilter',
                toolPanelClass: '',
                type: [
                    'setColumn',
                    'enableRowGroup',
                    'enableValue',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                chartDataType: 'category',
                minWidth: 290,
                maxWidth: 400,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
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
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Latest Activist Short Campaign Allegations'
            }
        ]
    },
    {
        headerName: 'Company Activism Vulnerability Fundamentals',
        headerTooltip: 'Company Activism Vulnerability Fundamentals',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        children: [
            {
                headerName: 'TSR 1 Year',
                field: 'TSR_1_Year',
                filter: 'agNumberColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'TSR 1 Year'
            },
            {
                headerName: 'TSR 3 Year',
                field: 'TSR_3_Year',
                filter: 'agNumberColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'TSR 3 Year'
            },
            {
                headerName: 'TSR 5 Year',
                field: 'TSR_5_Year',
                filter: 'agNumberColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'TSR 5 Year'
            },
            {
                headerName: 'Total Institutional Ownership',
                field: 'Total_Institutional_Ownership',
                filter: 'agNumberColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 170,
                maxWidth: 170,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Total Institutional Ownership'
            },
            {
                headerName: 'AiV score',
                field: 'AiV_score',
                filter: 'agNumberColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'AiV score'
            }
        ]
    },
    {
        headerName: 'Company Activism',
        headerTooltip: 'Company Activism',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        children: [
            {
                headerName: 'Presence of Active Activist Campaign',
                field: 'Presence_of_active_activist_campaign',
                filter: 'agSetColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Presence of Active Activist Campaign'
            },
            {
                headerName: 'Activist Nominee Currently on Board',
                field: 'Activist_Nominee_Currently_on_Board',
                filter: 'agNumberColumnFilter',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Activist Nominee Currently on Board'
            },
            {
                headerName: 'Active Activist Campaign Activist',
                field: 'Active_Activist_Campaign_Activist',
                filter: 'agTextColumnFilter',
                toolPanelClass: '',
                type: [
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                minWidth: 200,
                headerClass: 'text-center',
                headerTooltip: 'Active Activist Campaign Activist'
            }
        ]
    }
];

export const COLUMNS_DEF_ADVANCEDVULNERABILITYSEARCH_DEFAULT = [
    {
        headerName: 'Company Information',
        headerTooltip: 'Company Information',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        groupId: '0',
        children: [
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClassRules: {},
                enableRowGroup: true,
                enableValue: true,
                headerName: 'PID',
                field: 'v_vuln_search.pid',
                filter: 'agTextColumnFilter',
                type: [
                    'enableRowGroup',
                    'enableValue'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                chartDataType: 'category',
                minWidth: 65,
                maxWidth: 80,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'PID',
                colId: 'v_vuln_search.pid',
                width: 80,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClassRules: {},
                enableRowGroup: true,
                enableValue: true,
                headerName: 'Company name',
                field: 'Company_Name',
                filter: 'agTextColumnFilter',
                type: [
                    'enableRowGroup',
                    'enableValue'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                chartDataType: 'category',
                minWidth: 290,
                filterParams: {
                    buttons: [
                        'apply',
                        'reset'
                    ]
                },
                headerClass: 'text-center',
                headerTooltip: 'Company name',
                colId: 'Company_Name',
                width: 1280,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    debounceMs: 200,
                    values: [
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
                    ]
                },
                enableRowGroup: true,
                enableValue: true,
                headerName: 'Sector',
                field: 'industry_sector_name',
                type: [
                    'setColumn',
                    'enableRowGroup',
                    'enableValue'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                chartDataType: 'category',
                minWidth: 290,
                maxWidth: 400,
                headerClass: 'text-center',
                headerTooltip: 'Sector',
                colId: 'industry_sector_name',
                width: 400,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    debounceMs: 200,
                    values: [
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
                    ]
                },
                enableRowGroup: true,
                enableValue: true,
                headerName: 'Industry',
                field: 'industry_name',
                type: [
                    'setColumn',
                    'enableRowGroup',
                    'enableValue'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                chartDataType: 'category',
                minWidth: 290,
                maxWidth: 400,
                headerClass: 'text-center',
                headerTooltip: 'Industry',
                colId: 'industry_name',
                width: 400,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agNumberColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                enableValue: true,
                hide: true,
                headerName: 'Market Cap ($M)',
                field: 'market_cap_usd',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'enableValue',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'Market Cap ($M)',
                colId: 'market_cap_usd',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    debounceMs: 200,
                    values: [
                        'Nano',
                        'Micro',
                        'Small',
                        'Mid',
                        'Large',
                        null
                    ],
                    suppressSorting: true
                },
                enableRowGroup: true,
                enableValue: true,
                headerName: 'Market Cap Category',
                field: 'marketcap',
                type: [
                    'setColumn',
                    'enableRowGroup',
                    'enableValue'
                ],
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                aggFunc: 'count(Dist)',
                chartDataType: 'category',
                minWidth: 180,
                maxWidth: 200,
                headerClass: 'text-center',
                headerTooltip: 'Market Cap Category',
                colId: 'marketcap',
                width: 200,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agNumberColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    filterOptions: [
                        'equals',
                        'notEqual',
                        'lessThan',
                        'lessThanOrEqual',
                        'greaterThan',
                        'greaterThanOrEqual',
                        'inRange',
                        {
                            displayKey: 'exists',
                            displayName: 'Exists',
                            hideFilterInput: true
                        }
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'Current Vulnerability Score',
                field: 'current_score',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'Current Vulnerability Score',
                colId: 'current_score',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    debounceMs: 200,
                    values: [
                        'High',
                        'Medium',
                        'Low',
                        null
                    ],
                    suppressSorting: true
                },
                enableRowGroup: true,
                enableValue: true,
                headerName: 'Current Vulnerability Rank',
                field: 'vulnerability_score',
                type: [
                    'setColumn',
                    'enableRowGroup',
                    'enableValue'
                ],
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                aggFunc: 'count(Dist)',
                chartDataType: 'category',
                minWidth: 180,
                maxWidth: 200,
                headerClass: 'text-center',
                headerTooltip: 'Current Vulnerability Rank',
                colId: 'vulnerability_score',
                width: 200,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            }
        ]
    },
    {
        headerName: 'Valuation',
        headerTooltip: 'Valuation',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        groupId: '1',
        children: [
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'Peer Valuation',
                field: 'peer_Valuation',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'Peer Valuation',
                colId: 'peer_Valuation',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'All Valuation',
                field: 'all_Valuation',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'All Valuation',
                colId: 'all_Valuation',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            }
        ]
    },
    {
        headerName: 'Performance',
        headerTooltip: 'Performance',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        groupId: '2',
        children: [
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'Peer Performance',
                field: 'peer_Performance',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'Peer Performance',
                colId: 'peer_Performance',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'All Performance',
                field: 'all_Performance',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'All Performance',
                colId: 'all_Performance',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            }
        ]
    },
    {
        headerName: 'Profitability',
        headerTooltip: 'Profitability',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        groupId: '3',
        children: [
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'Peer Profitability',
                field: 'peer_Profitability',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'Peer Profitability',
                colId: 'peer_Profitability',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'All Profitability',
                field: 'all_Profitability',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'All Profitability',
                colId: 'all_Profitability',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            }
        ]
    },
    {
        headerName: 'Growth',
        headerTooltip: 'Growth',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        groupId: '4',
        children: [
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'Peer Growth',
                field: 'peer_Growth',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'Peer Growth',
                colId: 'peer_Growth',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'All Growth',
                field: 'all_Growth',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'All Growth',
                colId: 'all_Growth',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            }
        ]
    },
    {
        headerName: 'Balance Sheet',
        headerTooltip: 'Balance Sheet',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        groupId: '5',
        children: [
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'Peer Balance Sheet',
                field: 'peer_Balance_Sheet',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'Peer Balance Sheet',
                colId: 'peer_Balance_Sheet',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'All Balance Sheet',
                field: 'all_Balance_Sheet',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'All Balance Sheet',
                colId: 'all_Balance_Sheet',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            }
        ]
    },
    {
        headerName: 'Institutional Investment',
        headerTooltip: 'Institutional Investment',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        groupId: '6',
        children: [
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'Peer Institutional Investment',
                field: 'peer_II',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'Peer Institutional Investment',
                colId: 'peer_II',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'All Institutional Investment',
                field: 'all_II',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'All Institutional Investment',
                colId: 'all_II',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            }
        ]
    },
    {
        headerName: 'Activist Investment',
        headerTooltip: 'Activist Investment',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        groupId: '7',
        children: [
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'Peer Activist Investment',
                field: 'peer_AI',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'Peer Activist Investment',
                colId: 'peer_AI',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'All Activist Investment',
                field: 'all_AI',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'All Activist Investment',
                colId: 'all_AI',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            }
        ]
    },
    {
        headerName: 'Director Support',
        headerTooltip: 'Director Support',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        groupId: '8',
        children: [
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'Peer Director Support',
                field: 'peer_VFD',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'Peer Director Support',
                colId: 'peer_VFD',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'All Director Support',
                field: 'all_VFD',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'All Director Support',
                colId: 'all_VFD',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            }
        ]
    },
    {
        headerName: 'Remuneration Support',
        headerTooltip: 'Remuneration Support',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        groupId: '9',
        children: [
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'Peer Remuneration Support',
                field: 'peer_VFR',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'Peer Remuneration Support',
                colId: 'peer_VFR',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'All Remuneration Support',
                field: 'all_VFR',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'All Remuneration Support',
                colId: 'all_VFR',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            }
        ]
    },
    {
        headerName: 'No. of Directors',
        headerTooltip: 'No. of Directors',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        groupId: '10',
        children: [
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'Peer No. of Directors',
                field: 'peer_numD',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'Peer No. of Directors',
                colId: 'peer_numD',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'All No. of Directors',
                field: 'all_numD',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'All No. of Directors',
                colId: 'all_numD',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            }
        ]
    },
    {
        headerName: 'Director Tenure',
        headerTooltip: 'Director Tenure',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        groupId: '11',
        children: [
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'Peer Director Tenure',
                field: 'peer_Tenure',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'Peer Director Tenure',
                colId: 'peer_Tenure',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'All Director Tenure',
                field: 'all_Tenure',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'All Director Tenure',
                colId: 'all_Tenure',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            }
        ]
    },
    {
        headerName: 'Director Age',
        headerTooltip: 'Director Age',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        groupId: '12',
        children: [
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'Peer Director Age',
                field: 'peer_DAge',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'Peer Director Age',
                colId: 'peer_DAge',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'All Director Age',
                field: 'all_DAge',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'All Director Age',
                colId: 'all_DAge',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            }
        ]
    },
    {
        headerName: 'Reporting',
        headerTooltip: 'Reporting',
        headerClass: 'text-center',
        field: '',
        toolPanelClass: '',
        groupId: '13',
        children: [
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'In Play',
                field: 'Campaign_in_play',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'In Play',
                colId: 'Campaign_in_play',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            },
            {
                editable: false,
                sortable: true,
                suppressMenu: true,
                resizable: true,
                enableColResize: true,
                flex: 1,
                floatingFilter: null,
                cellClass: 'ag-right-aligned-cell',
                cellClassRules: {},
                filter: 'agSetColumnFilter',
                filterParams: {
                    newRowsAction: 'keep',
                    buttons: [
                        'apply',
                        'reset'
                    ],
                    values: [
                        '1',
                        '0',
                        null
                    ]
                },
                headerClass: 'text-center',
                enableRowGroup: true,
                hide: true,
                headerName: 'Reports',
                field: 'has_report',
                toolPanelClass: '',
                type: [
                    'numberColumn',
                    'rightAligned',
                    'enableRowGroup',
                    'hiddenField'
                ],
                aggFunc: 'count(Dist)',
                allowedAggFuncs: [
                    'count(Dist)',
                    'count'
                ],
                enablePivot: true,
                chartDataType: 'category',
                minWidth: 125,
                maxWidth: 150,
                headerTooltip: 'Reports',
                colId: 'has_report',
                width: 150,
                rowGroup: false,
                rowGroupIndex: null,
                pivot: false,
                pivotIndex: null,
                pinned: null,
                sort: null,
                sortIndex: null
            }
        ]
    }
];

export default {
    COLUMNS_DEF_POWERSEARCH_DEFAULT,
    COLUMNS_DEF_ADVANCEDVULNERABILITYSEARCH_DEFAULT,
  };
