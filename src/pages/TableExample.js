import React, { useState } from 'react';
import Page from '../components/Page';
import Table from '../components/GeneralForm/Table';
import config from '../config/server-config';
import { dateToNull } from '../utils/general-util';
import {
  DOWN_ARROW_RED_IMG,
  FLAG_IMAGE_PATH,
  N0_CHANGE_IMG,
  NEW_POSITION_IMG,
  UP_ARROW_BLUE_IMG
} from '../constants/PathsConstant';

function TableExample() {
  const [recordset, setRecordset] = useState({
    colDefsMedalsIncluded: [
      {
        headerName: 'Date',
        field: 'filing_date',
        cellRendererFramework: (params) => <div>{dateToNull(params.data.filing_date, 'dd-mmm-yy', true)}</div>
      },
      {
        headerName: 'Activist',
        field: 'activist_name',
        cellRendererFramework: (params) => (
          <div>
            <img
              src={`${FLAG_IMAGE_PATH}${params.data.act_image_link}`}
              style={{ height: '22px', marginRight: '5px' }}
              alt='flag'
            />
            <span>{params.data.activist_name}</span>
          </div>
        )
      },
      {
        headerName: 'Company',
        field: 'company_name',
        cellRendererFramework: (params) => (
          <div>
            <img
              src={`${FLAG_IMAGE_PATH}${params.data.image_link}`}
              style={{ height: '22px', marginRight: '5px' }}
              alt='flag'
            />
            <span>{params.data.company_name}</span>
          </div>
        )
      },
      {
        headerName: '%',
        field: 'pcent_held',
        cellStyle: { textAlign: 'right' },
        cellRendererFramework: (params) => (
          <div>
            <span>{params.data.pcent_held}% &nbsp;</span>
            {(() => {
              if (params.data.transaction_type === 'Buy' || params.data.transaction_type === 'SC 13D') {
                return <img src={UP_ARROW_BLUE_IMG} alt='signature' />;
              }
              if (params.data.transaction_type === 'Sold') {
                return <img src={DOWN_ARROW_RED_IMG} alt='signature' />;
              }
              if (params.data.transaction_type === 'New') {
                return <img src={NEW_POSITION_IMG} alt='signature' />;
              }
              if (params.data.seq_id !== null && params.data.Previous13D < params.data.pcent_held) {
                return <img src={UP_ARROW_BLUE_IMG} alt='signature' />;
              }
              if (params.data.seq_id !== null && params.data.Previous13D > params.data.pcent_held) {
                return <img src={DOWN_ARROW_RED_IMG} alt='signature' />;
              }
              return <img src={N0_CHANGE_IMG} alt='signature' />;
            })()}
          </div>
        )
      },
      {
        headerName: 'Details',
        field: 'company_id',
        cellRendererFramework: (params) => (
          <div>
            <a
              className='text-secondary'
              href={`CompanyProfileActivists.aspx?cmpid=${params.data.company_id}&actid=${params.data.activist_id}`}
            >
              Detail
            </a>
          </div>
        ),
        sortable: false,
        suppressMovable: true,
        filter: false
      }
    ],
    colDefsMedalsExcluded: [],
    pinColumns: {
      isPinOption: false,
      columns: [
        {
          colId: 'activist_name',
          pinned: 'left'
        },
        {
          colId: 'company_id',
          pinned: 'right'
        }
      ]
    },
    paggination: { isPagging: false, pageSize: 20 },
    isfloatingFilter: false
  });

  async function fetchlistTopTwentyActivistActivity() {
    const fullResponse = await fetch(config.listTopTwentyActivistActivity, { method: 'POST' });
    const responseJson = await fullResponse.json();
    // setRecordset({ ...recordset, rowData: responseJson.data });

    setRecordset({
      colDefsMedalsIncluded: [
        {
          headerName: 'Date',
          field: 'filing_date',
          cellRendererFramework: (params) => <div>{dateToNull(params.data.filing_date, 'dd-mmm-yy', true)}</div>
        },
        {
          headerName: 'Activist',
          field: 'activist_name',
          cellRendererFramework: (params) => (
            <div>
              <img
                src={`${FLAG_IMAGE_PATH}${params.data.act_image_link}`}
                style={{ height: '22px', marginRight: '5px' }}
                alt='flag'
              />
              <span>{params.data.activist_name}</span>
            </div>
          )
        },
        {
          headerName: 'Company',
          field: 'company_name',
          cellRendererFramework: (params) => (
            <div>
              <img
                src={`${FLAG_IMAGE_PATH}${params.data.image_link}`}
                style={{ height: '22px', marginRight: '5px' }}
                alt='flag'
              />
              <span>{params.data.company_name}</span>
            </div>
          )
        },
        {
          headerName: '%',
          field: 'pcent_held',
          cellStyle: { textAlign: 'right' },
          cellRendererFramework: (params) => (
            <div>
              <span>{params.data.pcent_held}% &nbsp;</span>
              {(() => {
                if (params.data.transaction_type === 'Buy' || params.data.transaction_type === 'SC 13D') {
                  return `<img src=${UP_ARROW_BLUE_IMG} alt='signature' />`;
                }
                if (params.data.transaction_type === 'Sold') return <img src={DOWN_ARROW_RED_IMG} alt='signature' />;
                if (params.data.transaction_type === 'New') return <img src={NEW_POSITION_IMG} alt='signature' />;
                if (params.data.seq_id !== null && params.data.Previous13D < params.data.pcent_held) {
                  return <img src={UP_ARROW_BLUE_IMG} alt='signature' />;
                }
                if (params.data.seq_id !== null && params.data.Previous13D > params.data.pcent_held) {
                  return <img src={DOWN_ARROW_RED_IMG} alt='signature' />;
                }
                return <img src={N0_CHANGE_IMG} alt='signature' />;
              })()}
            </div>
          )
        },
        {
          headerName: 'Details',
          field: 'company_id',
          cellRendererFramework: (params) => (
            <div>
              <a
                className='text-secondary'
                href={`CompanyProfileActivists.aspx?cmpid=${params.data.company_id}&actid=${params.data.activist_id}`}
              >
                Detail
              </a>
            </div>
          ),
          sortable: false,
          suppressMovable: true,
          filter: false
        }
      ],
      colDefsMedalsExcluded: [],
      pinColumns: {
        isPinOption: false,
        columns: [
          {
            colId: 'activist_name',
            pinned: 'left'
          },
          {
            colId: 'company_id',
            pinned: 'right'
          }
        ]
      },
      paggination: { isPagging: false, pageSize: 20 },
      isfloatingFilter: false,
      rowData: responseJson.data
    });
  }

  React.useEffect(() => {
    fetchlistTopTwentyActivistActivity();
  }, []);

  return (
    <Page title='Table Sample' className='Dashboard' breadcrumbs={[{ name: 'Dashboard', active: 'true' }]}>
      <Table title='Table' smalltitle='Example' gridOptions={recordset} />
    </Page>
  );
}

export default TableExample;
