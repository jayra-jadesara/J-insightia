import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ErrorBoundary from './ErrorBoundary';

const ModalComponent = ({
  handleClose,
  handleOK,
  show,
  children,
  title,
  size = '',
  isInfo,
  isWarning,
  isShowFooter = false,
  isCancelButtonFooter = false,
  isLoginButtonFooter = false,
  className = '',
  handleInputChange,
  handleOnClick,
  InputValue
}) => (
  // function useKeypress(key, action) {
  //   useEffect(() => {
  //     function onKeyup(e) {
  //       if (e.key === key) action();
  //     }
  //     window.addEventListener('keyup', onKeyup);
  //     return () => window.removeEventListener('keyup', onKeyup);
  //   }, []);
  // }

  // useKeypress('Enter', handleClose);

  <ErrorBoundary>
    <Modal
      show={show}
      id='displayModal'
      size={size}
      aria-labelledby='modelLightBox' // contained-modal-title-vcenter"
      onHide={handleClose}
      backdrop='static' // false then no background black
      keyboard // true => Close the modal when escape key is pressed
      centered
      scrollable
      className={className}
    >
      <Modal.Header className='bg-primary text-white'>
        <h5 className='modal-title' id='modelLightBox'>
          {isInfo && (
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 16 16'
              className='bi bi-info-circle'
              fill='white'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path fillRule='evenodd' d='M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
              <path d='M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z' />
              <circle cx='8' cy='4.5' r='1' />
            </svg>
          )}
          {isWarning && (
            <svg
              width='1.0625em'
              height='1em'
              viewBox='0 0 17 16'
              className='bi bi-exclamation-triangle-fill'
              fill='white'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'
              />
            </svg>
          )}{' '}
          {title}
        </h5>
        <button type='button' className='btn-close' data-dismiss='modal' aria-label='Close' onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {isShowFooter && (
        <Modal.Footer>
          <button type='button' className='btn btn-primary btn-sm' onClick={handleClose} data-bs-dismiss='modal'>
            OK
          </button>
        </Modal.Footer>
      )}
      {isCancelButtonFooter && (
        <Modal.Footer>
          <button type='button' className='btn btn-primary btn-sm' onClick={handleOK} data-bs-dismiss='modal'>
            OK
          </button>
          <button type='button' className='btn btn-primary btn-sm' onClick={handleClose} data-bs-dismiss='modal'>
            Cancel
          </button>
        </Modal.Footer>
      )}
      {isLoginButtonFooter && (
        <Modal.Footer>
          <div className='row'>
            <div className='col-lg-10'>
              <input
                type='text'
                name='costCode'
                onChange={handleInputChange}
                className='form-control'
                placeholder='Enter Cost Code'
                aria-label='cost_code'
                aria-describedby='basic-addon2'
                value={InputValue}
                maxLength={50}
                required
              />
            </div>
            <div className='col-lg-2 btnForLogin'>
              <button type='button' className='btn btn-primary btn-lg' onClick={handleOnClick} data-bs-dismiss='modal'>
                  Log in
              </button>
            </div>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  </ErrorBoundary>
);

ModalComponent.propTypes = {
  children: PropTypes.any,
  handleClose: PropTypes.func,
  handleOK: PropTypes.func,
  isInfo: PropTypes.bool,
  isShowFooter: PropTypes.bool,
  isCancelButtonFooter: PropTypes.bool,
  isLoginButtonFooter: PropTypes.bool,
  isWarning: PropTypes.bool,
  show: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleOnClick: PropTypes.func,
  InputValue: PropTypes.string
};

export default React.memo(ModalComponent);
