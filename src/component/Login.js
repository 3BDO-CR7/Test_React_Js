import React, { Component } from 'react';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../App.css';
import {Animated} from "react-animated-css";
import axios from "axios";
import CONST from "../const/api";
import {Link} from "react-router-dom";
import { MdKeyboardArrowDown} from 'react-icons/md';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            phone           : '',
            password        : '',
            isError         : '',
            isLoading       : true,
            codes           : [],
            code            : null
        };
    }

    componentWillMount() {


        axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}codes`, {
            lang: 'ar'
        }).then( (response)=> {
                this.setState({codes: response.data.data});
         }).catch( (error)=> {
                this.setState({isLoading : false});
            }).then(()=>{
                this.setState({isLoading : false});
            });

    }

    onSubmit(event){

        // this.setState({isLoading : true});

        event.preventDefault();

        if(this.state.phone === ''){
            this.setState({ isError 	: 'إدخل رقم الهاتف' });
        }else if(this.state.code === null){
            this.setState({ isError 	: 'إدخل كود الدوله' });
        }else if(this.state.password === ''){
            this.setState({ isError 	: 'إدخل كلمه المرور' });
        }else {

            axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}signIn`, {
                phone : this.state.phone,
                password : this.state.password,
                device_id : 123,
                key : this.state.code,
                lang : 'ar'
            }).then( (response)=> {

                this.setState({ isError 	: response.data.msg });

                console.log('response', response.data.data)

                if (response.data.value !== '0'){

                    this.props.history.push('/');
                    const data = response.data.data;
                    localStorage.setItem('user_data', JSON.stringify(data));
                }

                })
                .catch( (error)=> {
                    this.setState({isLoader: false});
                }).then(()=>{
                this.setState({isLoader: false});
            });

        }

    }

    changeCode(event){

        this.state.code = event.target.value

    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className='loading'>
                    <img src={require('../imgs/loader.gif')} />
                </div>
            );
        }
        return (

            <div className="main_content">
            <div className="overlay"></div>
            <Container>
                <Animated
                    animationIn             = "fadeInUp"
                    animationInDuration     = {1000}
                    animationOutDuration    = {1000}
                    isVisible               = {true}
                >
                    <Form className="form_control" onSubmit={this.onSubmit.bind(this)} noValidate>
                        <img src={require('../imgs/logo.png')} />
                        <div className="input_grop">
                            <Label for="examplePhone">رقم الجوال</Label>
                            <div className='group_item position-relative'>
                                <Input
                                    type        = "phone"
                                    name        = "phone"
                                    id          = "examplePhone"
                                    value       = {this.state.phone}
                                    onChange    = {e => {this.setState({phone : e.target.value})}}
                                />
                                <div className='select_code selector'>
                                    <MdKeyboardArrowDown className='iconDown' />
                                    <select name="" id="" onChange={this.changeCode.bind(this)}>
                                        <option hidden>كود الدوله</option>
                                        {
                                            this.state.codes.map(code => (
                                                <option key={code} value={code}>
                                                    {code}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="input_grop">
                            <Label for="examplePassword">كلمه المرور</Label>
                            <Input
                                type        = "password"
                                name        = "password"
                                id          = "examplePassword"
                                value       = {this.state.password}
                                onChange    = {e => {this.setState({password : e.target.value})}}
                            />
                        </div>
                        <h4 className='Error_Text'>{ this.state.isError }</h4>

                        <Link to={{pathname: '/ForgetPassword/'}} className="nav-link">
                            <h6 className='color_white text_center'>نسيت كلمه المرور ؟</h6>
                        </Link>

                        <Button
                            color           = "info"
                            className       = "btn_button"
                            type            = "submit"
                        >
                            دخول
                        </Button>

                        <Link to={{pathname: '/signUp/'}} className="nav-link">
                            <h6 className='color_white text_center'>حساب جديد</h6>
                        </Link>

                    </Form>
                </Animated>
            </Container>
            </div>

        );
    }
}

export default Login;
