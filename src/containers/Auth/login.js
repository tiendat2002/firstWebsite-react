import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './login.scss';
import {userService} from '../../services'
import { userLoginSuccess } from '../../store/actions';
 
class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
        this.state = {
            username : '',
            password: '',
            errMessage:'',
        }
    }
    handleLogin= async()=>{
        this.setState({
            errMessage: '',
        })
        try{
        let data = await userService.login(this.state.username,this.state.password);
        if(data && data.errCode !==0){
            this.setState({
                errMessage:data.message,
            })
        }
        if(data && data.errCode===0){
            //to do
            this.props.userLoginSuccess(data.user);

        }
        }
        catch(e){
            if(e.response){
                if(e.response.data){
                    this.setState({errMessage: e.response.data.message})
            }
        }
        }
    
    }

    handleOnChangeEmail = (e)=>{
        this.setState({
            username: e.target.value,
        })
    }

    handleOnChangePassword = (e)=>{
        this.setState({
            password: e.target.value,
        })
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text' className='form-control' placeholder='Enter your username' value={this.state.username}
                            onChange={this.handleOnChangeEmail}></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <input type='password' className='form-control' placeholder='Enter your password' value={this.state.password}
                            onChange={this.handleOnChangePassword}></input>
                        </div>
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={this.handleLogin}>Log in</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>

                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-social'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
