import React, { useState } from 'react';
import qs from 'qs';
import { SlideDown } from 'react-slidedown';
import bn from '../../utils/bemnames';
import Checkbox from './CheckboxComponent';
import ErrorBoundary from './ErrorBoundary';
import { FIVE_SECOND_TIMEOUT } from '../../constants/NumberConstants';

const headerbem = bn.create('header');

const PDFNavMenu = ({
  handlePDFListItems,
  pdfListItems,
  handlePDFDownloadCancelClick,
  handlePDFMenuShow,
  pdfMenuShow,
  pdfDownloadNotification,
  handlePDFDownloadNotification,
  handleGeneratePDF,
  trialUserDisableDownload,
  pdfDownloadLoader,
  handlePDFDownloadLoader,
  isInvestorComparator,
  pdfDropdownHeightClassname,
  pdfBtnClassnames
}) => {
  const handleClick = (e) => {
    let array = [];
    array = pdfListItems.map((item) =>
      item.id === e.target.id
        ? {
            ...item,
            checked: e.target.checked,
          }
        : item
    );
    handlePDFListItems(array);
  };
  return (
    <ErrorBoundary>
      <span
        id='navbarDropdown'
        className={
          pdfBtnClassnames ? `${pdfBtnClassnames}` : 'pdfCustomStyle'
        }
        aria-hidden='true'
        onClick={() => handlePDFMenuShow(!pdfMenuShow)}
      >
        <button
          type='button'
          className={
            isInvestorComparator
              ? 'btn btn-primary btn-sm PDFButton PdfBtnOnTool'
              : 'btn PDFButton'
          }
          onClick={() => handlePDFMenuShow(!pdfMenuShow)}
        >
          <span>PDF Download</span>
          <i
            className='bi bi-download PDFButtonIcon ps-2 pe-2'
            onClick={() => handlePDFMenuShow(!pdfMenuShow)}
          />
          {pdfDownloadLoader && (
            // Loader
            <i title='waiting for generate a PDF' className='busy' />
          )}
        </button>
        <div
          className={
            pdfMenuShow
              ? headerbem.b('dropdown-menu show')
              : headerbem.b('dropdown-menu')
          }
          aria-labelledby='navbarDropdown'
        >
          <SlideDown className='my-dropdown-slidedown'>
            <div
              className={headerbem.b('card')}
              aria-hidden='true'
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className={headerbem.b('card-header text-transform-none PDFButton')}>
                Please note: PDF downloads may take a few minutes to complete. You can continue browsing the site whilst the PDF is downloading. Completed PDFs will appear in the Recent Downloads section found under the Settings cog icon. You will also receive an on-screen notification when the PDF is ready to view.
              </div>
              <div className='card-body'>
                <ul
                  className={`list-group list-group-flush scrollbar m-0 bg-white ${
                    pdfDropdownHeightClassname !== undefined
                      ? pdfDropdownHeightClassname
                      : 'pdfMenuListHeight'
                  }`}
                >
                  <li style={{ listStyleType: 'none' }}>
                    <div className='list-group-innertitle'>
                      <ul className='innerlist-group'>
                        {pdfListItems &&
                          pdfListItems.map((element, index) => (
                            <div key={`div${index + 1}`}>
                              {element.parent && element.parent !== undefined && (
                                <div
                                  className='d-flex ms-3'
                                  key={`ms${index + 1}`}
                                >
                                  <div className='m-0 me-2'>
                                    <span className='font-12'>
                                      <b>
                                        <u>{element.name}</u>
                                      </b>
                                    </span>
                                  </div>
                                </div>
                              )}
                              {element.parent === undefined && (
                                <div
                                  className='d-flex'
                                  key={`flex${index + 1}`}
                                >
                                  <div className='m-0 me-2'>
                                    <Checkbox
                                      id={element.id}
                                      disabled={element.disabled}
                                      checked={element.checked}
                                      checkBoxClassName='appearance-auto smallcheckbox form-check-input p-2 me-2'
                                      labelName={element.name}
                                      labelClassName='font-12 p-0 col-form-label text-primary font-weight-bold'
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        !element.disabled && handleClick(e);
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              {(pdfListItems.length > 0) && (
                <div className='card-footer text-muted'>
                  <button
                    className='btn btn-primary float-end'
                    type='button'
                    disabled={
                      pdfListItems.filter(
                        (x) => !x.parent && x.disabled === true
                      ).length === pdfListItems.filter((x) => !x.parent).length || pdfDownloadLoader || !pdfListItems.filter((x) => x.checked === true).length
                    }
                    onClick={async (e) => {
                      e.preventDefault();
                      handlePDFMenuShow(!pdfMenuShow);
                        handlePDFDownloadLoader(true);
                    }}
                  >
                    Download
                  </button>
                </div>
              )}
            </div>
          </SlideDown>
        </div>
      </span>
    </ErrorBoundary>
  );
};

export default React.memo(PDFNavMenu);
