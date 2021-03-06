import React, { Component } from 'react';
import {Container, Col, Button, Form, Label, Input} from 'reactstrap';
import '../App.css';

import { MdKeyboardArrowDown} from 'react-icons/md';

import Header from '../component/Header';
import axios from "axios";
import CONST from "../const/api";
import {Link} from "react-router-dom";

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            isLoading           : true,
            avatar              : '',
            city                : '',
            country             : '',
            email               : '',
            phone               : '',
            name                : '',
            password            : '',
            countryId           : null,
            cityId              : null,
            countries           : [],
            cities              : [],
        };
    }

    componentDidMount() {

        axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}countries`, { lang : 'ar' })
            .then(res => {
                this.setState({
                    countries : res.data.data,
                    isLoading : false
                });
            });

    }

    changeCountry(event){

        this.state.countryId = event.target.value
        console.log('countryId', this.state.countryId)

        axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}cities`, { lang: 'ar' , country_id : event.target.value })
            .then( (res)=> {
                this.setState({ cities: res.data.data });
            });
    }

    changeCity(event){

        // this.setState({ cityId : event.target.value });
        this.state.cityId = event.target.value
        console.log('cityId', this.state.cityId)

    }

    validate = () => {
        let isError = false;
        let msg = '';

        if(this.state.name.length <= 0) {
            isError     = true;
            msg         = 'إدخل الاسم الخاص بك';
        }else if (this.state.phone.length <= 0){
            isError     = true;
            msg         = 'إدخل رقم الهاتف';
        }else if (this.state.email.length <= 0){
            isError     = true;
            msg         = 'إدخل البريد الإلكتروني';
        }else if(this.state.countryId === null) {
            isError     = true;
            msg         = 'إختر الدوله';
        }else if(this.state.cityId === null) {
            isError     = true;
            msg         = 'إختر المدينه';
        }else if(this.state.password.length <= 0) {
            isError     = true;
            msg         = 'ادخل كلمه المرور';
        }else if(this.state.password.length < 6) {
            isError     = true;
            msg         = 'كلمه المرور لا تقل عن ٦ حروف او ارقام';
        }
        if (msg !== ''){
            this.setState({
                isError             : msg,
                errToasts           : true
            })
        }
        return isError;
    };

    onSubmit(event) {

        event.preventDefault();

        const err = this.validate();

        setTimeout(
            function() {
                this.setState({errToasts: false});
            }.bind(this),
            2000
        );

        if (!err) {

            this.setState({ loadFun : true });

            axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}signUp`,
                {
                    lang: this.props.lang ,
                    phone : this.state.phone ,
                    email : this.state.email ,
                    files :  this.state.avatar,
                    name : this.state.name ,
                    password : this.state.password ,
                    key : this.state.key,
                    country_id: this.state.countryId ,
                    city_id : this.state.cityId
                })
                .then( (res)=> {
                    this.setState({
                        loadFun             : false,
                        isError             : res.data.msg,
                        errToasts           : true,
                    });

                    setTimeout(
                        function() {
                            this.setState({errToasts: false});
                        }.bind(this),
                        2000
                    );

                    if (res.data.value !== '0'){
                        this.props.history.push('/Profile');
                    }

                });

        }

    }

    render() {

        if (this.state.isLoading === true) {
            return (
                <div className='loading'>
                    <img src={require('../imgs/loader.gif')} />
                </div>
            );
        }

        return (

            <div className="body_section">

                <Header />

                <div className="content_view">
                    <Container>

                        <div className='info_user'>
                            <div className='img_user'>
                                <img src={ this.state.avatar } alt=""/>
                            </div>
                            <div className='info_contact'>
                                <Form className="edit_user" onSubmit={this.onSubmit.bind(this)} noValidate>
                                    <div className="input_grop mt-3 mb-3">
                                        <Input
                                            type        = "text"
                                            name        = "name"
                                            id          = "exampleName"
                                            placeholder = 'الاسم بالكامل'
                                            value       = {this.state.name}
                                            onChange    = {e => {this.setState({name : e.target.value})}}
                                        />
                                    </div>
                                    <div className="input_grop mt-3 mb-3">
                                        <Input
                                            type        = "phone"
                                            name        = "phone"
                                            id          = "examplePhone"
                                            placeholder = 'رقم الجوال'
                                            value       = {this.state.phone}
                                            onChange    = {e => {this.setState({phone : e.target.value})}}
                                        />
                                    </div>
                                    <div className="input_grop mt-3 mb-3">
                                        <Input
                                            type        = "email"
                                            name        = "email"
                                            id          = "exampleEmail"
                                            placeholder = 'البريد الإلكتروني'
                                            value       = {this.state.email}
                                            onChange    = {e => {this.setState({email : e.target.value})}}
                                        />
                                    </div>
                                    <div className='select_form selector mt-3 mb-3'>
                                        <MdKeyboardArrowDown className='iconDown' />
                                        <select name="" id="" onChange={this.changeCountry.bind(this)}>
                                            <option hidden>آختر الدوله</option>
                                            {
                                                this.state.countries.map(item => (
                                                    <option key={item.value} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='select_form selector mt-3 mb-3'>
                                        <MdKeyboardArrowDown className='iconDown' />
                                        <select name="" id="" onChange={this.changeCity.bind(this)}>
                                            <option hidden>آختر المدينه</option>
                                            {
                                                this.state.cities.map(item => (
                                                    <option key={item.value} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="input_grop mt-3 mb-3">
                                        <Input
                                            type        = "password"
                                            name        = "password"
                                            id          = "examplePassword"
                                            placeholder = 'كلمه المرور'
                                            value       = {this.state.password}
                                            onChange    = {e => {this.setState({password : e.target.value})}}
                                        />
                                    </div>
                                    <h4 className='Error_Text'>{ this.state.isError }</h4>
                                    <Button
                                        color           = "info"
                                        className       = "btn_button"
                                        type            = "submit"
                                    >
                                        تسجيل
                                    </Button>
                                    <Link to={{pathname: '/Login/'}} className="nav-link">
                                        <h6 className='text_center'>لديك حساب ؟</h6>
                                    </Link>
                                </Form>
                            </div>
                        </div>

                    </Container>
                </div>

            </div>

        )
    }
}

export default SignUp;
