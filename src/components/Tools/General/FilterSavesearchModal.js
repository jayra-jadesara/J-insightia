import React, { useState } from 'react';
import DropdownList from '../../GeneralForm/DropdownList';
import Modal from '../../GeneralForm/Modal';

const FilterSavesearchModal = (props) => {
  const [saveSearchMsg, setsaveSearchMsg] = useState({
    status: false,
    message: '',
    color: 'text-danger',
  });
  const [saveSearchClick, setsaveSearchClick] = useState(false);

  async function saveSearch() {
    if (props.saveSearchTextboxValue.toString().trim() === '') {
      setsaveSearchMsg({
        status: true,
        message: 'Please enter Save Search',
        color: 'text-danger',
      });
    } else {
      setsaveSearchMsg({
        status: false,
        message: '',
        color: 'text-danger',
      });
      setsaveSearchClick(true);
      if (props.onSavedSearches_Create) {
        const existingStatus = props.saveSearchDDLList.some(
          (x) =>
            x.label.toLowerCase() ===
            props.saveSearchTextboxValue.trim().toLowerCase()
        );
        if (!existingStatus) {
          await props.onSavedSearches_Create();
          setsaveSearchMsg({
            status: true,
            message: 'Saved successfully!',
            color: 'text-green',
          });
          setTimeout(() => {
            props.handleShow_SaveThisSearch_Modal(false);
            setsaveSearchMsg({
              status: false,
              message: '',
              color: 'text-danger',
            });
          }, 1500);
        } else {
          if (
            confirm(
              'Save search name already exists! Do you want overwrite existing search criteria?'
            )
          ) {
            if (props.onSavedSearches_Update) {
              await props.onSavedSearches_Update();
              setsaveSearchMsg({
                status: true,
                message: 'Updated successfully!',
                color: 'text-green',
              });
              setTimeout(() => {
                props.handleShow_SaveThisSearch_Modal(false);
                setsaveSearchMsg({
                  status: false,
                  message: '',
                  color: 'text-danger',
                });
              }, 1500);
            }
          }
        }
      }
      setsaveSearchClick(false);
    }
  }

  function getMessage() {
    if (saveSearchMsg && saveSearchMsg.status) {
      return (
        <>
          <span className='col-3 col-form-label' />
          <span className={`col-9 col-form-label ${saveSearchMsg.color}`}>
            {saveSearchMsg.message}
          </span>
        </>
      );
    }
  }
  return (
    props.isShowFilterSavesearchModal !== undefined &&
    props.isShowFilterSavesearchModal && (
      <>
        <div className='col-lg col-12 col-md-6'>
          <div className='mb-3 row'>
            <label htmlFor='inputPassword' className='col-lg-4 col-form-label pt-2'>
              Saved Searches
            </label>
            <div className='col-lg-8 pt-2 pb-2'>
              <div className='col-lg-12 col-12 pb-2'>
                <DropdownList
                  handleChange={(e) => {
                    props.handleSetSaveSearchedDDLSelection(e);
                  }}
                  options={props.saveSearchDDLList}
                  Dvalue={props.saveSearchedDDLSelection}
                  maxHeight={180}
                  placeholder='(Optional) Choose Saved Search...'
                />
              </div>
              <div className='col-lg-12 col-12 d-flex pt-2'>
                <button
                  type='button'
                  className='btn btn-primary btn-sm me-2'
                  disabled={props.saveSearchedDDLSelection === null}
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      props.onSavedSearches_btnApply &&
                      props.saveSearchedDDLSelection !== null
                    ) {
                      props.onSavedSearches_btnApply();
                    }
                  }}
                >
                  Apply
                </button>
                <button
                  type='button'
                  className='btn btn-primary btn-sm me-2'
                  onClick={(e) => {
                    e.preventDefault();
                    if (props.handleShow_SaveThisSearch_Modal) {
                      props.handleShow_SaveThisSearch_Modal(true);
                      if (
                        props.saveSearchedDDLSelection !== null &&
                        props.saveSearchedDDLSelection
                      ) {
                        const val = props.saveSearchedDDLSelection.label;
                        props.handleSaveSearchTextboxValue(val);
                      }
                    }
                  }}
                >
                  Save This Search
                </button>
                <button
                  type='button'
                  className='btn btn-primary btn-sm'
                  disabled={props.saveSearchedDDLSelection === null}
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      props.onSavedSearches_btnDelete &&
                      props.saveSearchedDDLSelection !== null
                    ) {
                      if (
                        confirm(
                          `Do you want to delete '${props.saveSearchedDDLSelection.label}' saved search ?`
                        )
                      ) {
                        props.onSavedSearches_btnDelete();
                      }
                    }
                  }}
                >
                  Delete Search
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Saved Searches popup modal */}
        <Modal
          show={props.isShow_SaveThisSearch_Modal}
          handleClose={() => {
            props.handleShow_SaveThisSearch_Modal(false);
            setsaveSearchMsg({
              status: false,
              message: '',
              color: 'text-danger',
            });
            props.handleSaveSearchTextboxValue('');
          }}
          size='lg'
          title='Saved Searches            '
        >
          <div className='row mb-5 mt-4'>
            <label
              htmlFor='savecurrentlist'
              className='col-sm-3 col-form-label text-primary font-weight-bold'
            >
              Save Search:
            </label>
            <div className='col-sm-9'>
              <input
                type='text'
                autoComplete='off'
                value={props.saveSearchTextboxValue}
                onChange={(e) => {
                  if (props.handleSaveSearchTextboxValue) {
                    props.handleSaveSearchTextboxValue(e.target.value);
                  }
                }}
                className='form-control'
                id='savecurrentlist'
                placeholder='Enter a name to save this search'
              />
            </div>
            {getMessage()}
          </div>

          <hr />
          <div className='row'>
            <label htmlFor='run' className='col-sm-3 col-form-label' />
            <div className='col-sm-9 m-0'>
              <button
                onClick={() => {
                  saveSearch();
                }}
                disabled={saveSearchClick}
                type='button'
                className='btn btn-primary btn-sm m-1 float-end'
              >
                {props.saveSearchedDDLSelection
                  ? props.saveSearchTextboxValue ===
                    props.saveSearchedDDLSelection.label
                    ? 'Update Search'
                    : 'Save Search'
                  : 'Save Search'}
              </button>
            </div>
          </div>
        </Modal>
      </>
    )
  );
};

export default React.memo(FilterSavesearchModal);
