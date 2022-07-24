import React from "react";
import "./login.scss";
import {
  NormalInput,
  NormalButton,
  // NormalCheckbox
} from "../../../components/common";
import SimpleReactValidator from 'simple-react-validator';
import { Toast } from '../../../services/toast'
import { userSignin } from "../../../redux/actions/authentication";
import { history } from "../../../helpers";
// import { LOGIN_TYPE, EXIST_LOCAL_STORAGE } from "../../../service/constants";
// import { testGet } from '../../../redux/actions/test'
import { removeStorage } from '../../../services/helperFunctions'

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
      loginForm: {
        username: "",
        password: "",
      },
      isFormLoder: false,
    };
  }


componentDidMount(){
  removeStorage()
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
    let { loginForm } = this.state;
    if (this.validator.allValid()) {
      this.setState({ isFormLoder: true })
      userSignin(loginForm).then(({ status, results }) => {
        this.setState({ isFormLoder: false })
        if (status  ==='success' && results) {
          Toast({ type: 'success', message: 'You have been sucessfully logged into iTrain', title: 'Success!' })
          history.push('/models/sandbox')
        }
      }).catch((error) => {
        this.setState({ isFormLoder: false })
      })

    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }

  }



  render() {
    let { loginForm, isFormLoder, isResErr, isKeepMe } = this.state;
    return (
      <div className="row login justify-content-md-center login-page">
        <div className="col-md-9 col-xs-9">
          <div className="row">
            <div className="col-md-12 title">
              <h4>Sign in to access iTrain</h4>
              <h4>Super Admin Portal</h4>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <NormalInput label='User name'
                onChange={this.handleInputChange}
                value={loginForm.username}
                name='username'
                errorMessage={this.validator.message('User name', loginForm.username, 'required|email')} />
              <NormalInput label='password'
                onChange={this.handleInputChange}
                value={loginForm.password}
                name='password'
                type="password"
                errorMessage={this.validator.message('User name', loginForm.password, 'required')}
              />

            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="d-grid gap-2">
                <NormalButton isLoader={isFormLoder} label='Sign in' className=' btn-primary shadow' onClick={this.handleSubmit} />
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
