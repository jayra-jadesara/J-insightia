import PropTypes from 'prop-types';
import React from 'react';
import Collapse from 'react-bootstrap/Collapse';
import numConst from '../../constants/NumberConstants';

class UserPreferences extends React.Component {
  constructor() {
    super();
    this.state = {
      eyeNewpasswordShown: false,
      eyeNewpasswordShownAgain: false,
      eyePasswordExisting: false,
      isOpen: false,
      formValid: false,
      errors: {
        txtPasswordExisting: '',
        txtNewpassword: '',
        txtNewpasswordAgain: ''
      },
      inputs: {
        txtPasswordExisting: '',
        txtNewpassword: '',
        txtNewpasswordAgain: ''
      }
    };

    this.toggleNewPasswordVisiblity = (value) => {
      this.setState({ eyeNewpasswordShown: !value });
    };
    this.toggleNewPasswordAgainVisiblity = (value) => {
      this.setState({ eyeNewpasswordShownAgain: !value });
    };
    this.togglePasswordExistingVisiblity = (value) => {
      this.setState({ eyePasswordExisting: !value });
    };
    this.onCollpaseChange = (state) => {
      this.resetUserSection(state);
    };
  }

  handleSubmit = (e, state) => {
    if (this.validateForm(state)) {
      this.props.handleChangePasswordReq(state.inputs.txtNewpasswordAgain);
      this.resetUserSection(state); // console.info("Valid Form");
    }
  };
  async handleChange(e) {
    e.preventDefault();

    const { name, value } = e.target;
    const state = this.state;
    const errors = state.errors;
    const inputs = state.inputs;
    inputs[name] = value;

    switch (name) {
      case 'txtPasswordExisting':
        if (value.length === numConst.EMPTY_TABLE_LENGTH) {
          errors[name] = 'You must enter a existing password';
          break;
        }
        if (value.length < 6) {
          errors[name] = 'Existing password must be 6 characters long!';
          break;
        }
        if (value.length >= 6) {
          await this.props.validateOldPasswordHashReq(value);
          if (this.props.validateOldPasswod) {
            errors[name] = '';
          } else {
            errors[name] = 'Your existing password is not correct';
          }
          break;
        }
        break;
      case 'txtNewpassword':
        if (value.length === numConst.EMPTY_TABLE_LENGTH) {
          errors[name] = 'You must enter a new password';
          break;
        }
        if (value.length < 6) {
          errors[name] = 'New password must be 6 characters long!';
          break;
        }
        if (value.length >= 6) {
          errors[name] = '';
          break;
        }
        break;
      case 'txtNewpasswordAgain':
        if (value.length === numConst.EMPTY_TABLE_LENGTH) {
          errors[name] = 'You must enter the new password again to confirm';
          break;
        }
        if (value.length < 6) {
          errors[name] = 'New password again must be 6 characters long!';
          break;
        }
        if (
          this.state.inputs.txtNewpassword !== null &&
          this.state.inputs.txtNewpasswordAgain !== null
        ) {
          if (this.state.inputs.txtNewpassword !== value) {
            errors[name] = "Passwords don't match.";
            break;
          }
        }
        if (value.length >= 6) {
          errors[name] = '';
          break;
        }
        break;
      default:
        break;
    }
    this.setState({ errors: errors, inputs: inputs }, () => {
      this.validateForm(state);
    });
  }

  validateForm = (state) => {
    let valid = true;
    Object.values(state.errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    Object.values(state.inputs).forEach(
      (val) => val.length === numConst.EMPTY_TABLE_LENGTH && (valid = false)
    );
    this.setState({ formValid: valid });
    return valid;
  };

  resetUserSection = (state) => {
    const isOpen = state.isOpen;
    const inputs = state.inputs;
    const errors = state.errors;

    if (inputs !== undefined && errors !== undefined) {
      errors['txtPasswordExisting'] = '';
      errors['txtNewpassword'] = '';
      errors['txtNewpasswordAgain'] = '';
      inputs['txtPasswordExisting'] = '';
      inputs['txtNewpassword'] = '';
      inputs['txtNewpasswordAgain'] = '';
      this.setState(
        {
          errors: errors,
          inputs: inputs,
          isOpen: !isOpen,
          eyeNewpasswordShown: false,
          eyeNewpasswordShownAgain: false,
          eyePasswordExisting: false
        },
        () => {}
      );
    }
  };

  render() {
    return (
      <div className='pb-1'>
        {/* ChangePassword Button */}
        <div className='pb-2'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={(e) => {
              e.preventDefault();
              this.onCollpaseChange(this.state);
            }}
            aria-controls='collapse-text-0'
            aria-expanded={this.state.isOpen}
          >
            Change Password
          </button>
        </div>

        <Collapse in={this.state.isOpen}>
          <div
            id='collapse-text-0'
            className='pt-3 ps-3 pe-3 border border-light'
          >
            <div className='row'>
              <label
                htmlFor='lblExistingPassword'
                className='col-12 col-md-3 col-lg-3 col-form-label text-primary font-weight-bold'
              >
                Existing Password:
              </label>
              <div className='col-12 col-md-6 col-lg-3 input-group'>
                <input
                  type={this.state.eyePasswordExisting ? 'text' : 'password'}
                  autoComplete='off'
                  onChange={this.handleChange.bind(this)}
                  onBlur={this.handleChange.bind(this)}
                  className='form-control'
                  id='txtPasswordExisting'
                  name='txtPasswordExisting'
                  value={this.state.inputs.txtPasswordExisting}
                  placeholder='Enter Existing Password'
                />
                <div className='input-group-addon'>
                  <i
                    name='passwordShown'
                    onClick={(e) => {
                      e.preventDefault();
                      this.togglePasswordExistingVisiblity(
                        this.state.eyePasswordExisting
                      );
                    }}
                    aria-hidden='true'
                    className={
                      !this.state.eyePasswordExisting
                        ? 'bi bi-eye-fill'
                        : 'bi bi-eye-slash-fill'
                    }
                  />
                </div>
              </div>
            </div>

            <div className='row'>
              <label
                htmlFor='lblNewPassword'
                className='col-12 col-md-3 col-lg-3 col-form-label text-primary font-weight-bold'
              >
                New Password:
              </label>
              <div className='col-12 col-md-6 col-lg-3 input-group'>
                <input
                  type={this.state.eyeNewpasswordShown ? 'text' : 'password'}
                  autoComplete='off'
                  onChange={this.handleChange.bind(this)}
                  onBlur={this.handleChange.bind(this)}
                  className='form-control'
                  id='txtNewpassword'
                  name='txtNewpassword'
                  value={this.state.inputs.txtNewpassword}
                  placeholder='Enter New Password'
                />
                <div className='input-group-addon'>
                  <i
                    onClick={(e) => {
                      e.preventDefault();
                      this.toggleNewPasswordVisiblity(
                        this.state.eyeNewpasswordShown
                      );
                    }}
                    aria-hidden='true'
                    className={
                      !this.state.eyeNewpasswordShown
                        ? 'bi bi-eye-fill'
                        : 'bi bi-eye-slash-fill'
                    }
                  />
                </div>
              </div>
            </div>

            <div className='row'>
              <label
                htmlFor='savecurrentlist'
                className='col-12 col-md-3 col-lg-3 mb-2 col-form-label text-primary font-weight-bold'
              >
                New Password again:
              </label>
              <div className='col-12 col-md-6 col-lg-3 input-group mb-2'>
                <input
                  type={
                    this.state.eyeNewpasswordShownAgain ? 'text' : 'password'
                  }
                  autoComplete='off'
                  onChange={this.handleChange.bind(this)}
                  onBlur={this.handleChange.bind(this)}
                  className='form-control'
                  id='txtNewpasswordAgain'
                  name='txtNewpasswordAgain'
                  value={this.state.inputs.txtNewpasswordAgain}
                  placeholder='Enter New Password again'
                />
                <div className='input-group-addon'>
                  <i
                    onClick={(e) => {
                      e.preventDefault();
                      this.toggleNewPasswordAgainVisiblity(
                        this.state.eyeNewpasswordShownAgain
                      );
                    }}
                    aria-hidden='true'
                    className={
                      !this.state.eyeNewpasswordShownAgain
                        ? 'bi bi-eye-fill'
                        : 'bi bi-eye-slash-fill'
                    }
                  />
                </div>
              </div>
            </div>

            {/* message */}
            <div className='row'>
              <div className='col-12 col-md-3 col-lg-3 mb-2' />
              <div className='col-12 col-md-9 col-lg-9 mb-2'>
                <div className='preferences-error-msg-color'>
                  {this.state.errors.txtPasswordExisting}
                </div>
                <div className='preferences-error-msg-color'>
                  {this.state.errors.txtNewpassword}
                </div>
                <div className='preferences-error-msg-color'>
                  {this.state.errors.txtNewpasswordAgain}
                </div>
              </div>
            </div>
            {/* Save & Cancel Button */}
            <div className='row'>
              <div className='col-12 col-md-3 col-lg-3' />
              <div className='col-12 col-md-6 col-lg-3 d-flex'>
                <div className='pe-1'>
                  <button
                    type='button'
                    disabled={!this.state.formValid}
                    onClick={(e) => {
                      e.preventDefault();
                      this.state.formValid && this.handleSubmit(e, this.state);
                    }}
                    className='btn btn-primary'
                    id='btnSave'
                  >
                    Save
                  </button>
                </div>
                <div>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.preventDefault();
                      this.onCollpaseChange(this.state);
                    }}
                    className='btn btn-primary'
                    id='btnCancel'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

UserPreferences.propTypes = {
  handleChangePasswordReq: PropTypes.func.isRequired,
  validateOldPasswod: PropTypes.func.isRequired,
  validateOldPasswordHashReq: PropTypes.func.isRequired
};

export default React.memo(UserPreferences);
