import React from "react";
import "./login.scss";
import {
  NormalInput,
  NormalButton,
  // NormalCheckbox
} from "../../../components/common";
import { Link } from "react-router-dom";
// import SimpleReactValidator from 'simple-react-validator';
// import { userSignin } from "../../../redux/actions/login";
import { history } from "../../../helpers";
// import { LOGIN_TYPE, EXIST_LOCAL_STORAGE } from "../../../service/constants";
export class Login extends React.Component {
  state = {
    loginForm: {
      username: "",
      password: "",
      // userType: LOGIN_TYPE.ADMIN
    },
    isFormLoder: false,
    isKeepMe: false,
    keepMeObj: {
      username: "",
      password: "",
      // userType: LOGIN_TYPE.ADMIN
    }
  };




  componentWillMount() {

  }


  //handle input change function call start
  handleInputChange = e => {
    let { value, name } = e.target;
    this.setState({
      loginForm: {
        ...this.state.loginForm,
        [name]: value
      }
    })
  };


  //login submit API call function  start
  handleSubmit = () => {


  }

  // handlekeep me change start
  handleisKeepMeChange = () => {

  }

  render() {
    let { loginForm, isFormLoder, isResErr, isKeepMe } = this.state;
    return (
      <div className="row login justify-content-md-center login-page">
        <div className="col-md-9 col-xs-9">
          <div className="row">
            <div className="col-md-12 title">
              <h4>Sign in to access AZXY</h4>
              <h4>Super Admin Portal</h4>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <NormalInput label='User name' />
              <NormalInput label='password' />

            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="d-grid gap-2">
                <NormalButton label='Sign in' className=' btn-primary shadow'  onClick={()=> {
               history.push('/dashboard')}}/>
              </div>

            </div>
            <div className="col-md-12 text-center mt-2">
              <a className='link-primary'>Forgot your password?</a >

            </div>
          </div>

        </div>
      </div>
    );
  }
}
