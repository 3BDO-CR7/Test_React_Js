import React, { Component } from 'react';
import {Container, Col, Button, Form, Label, Input} from 'reactstrap';
import '../App.css';

import { MdKeyboardArrowDown} from 'react-icons/md';

import Header from '../component/Header';
import axios from "axios";
import CONST from "../const/api";

class EditProfile extends Component {
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
            countryId           : null,
            cityId              : null,
            countries           : [],
            cities              : [],
        };
    }

    componentDidMount() {

        if (this.state.userInfo === null) {

            this.props.history.push('/');

        }else {

            let user_id = JSON.parse(localStorage.getItem('user_data'));

            this.setState({
                avatar : user_id.avatar,
                cityId : user_id.city_id,
                countryId : user_id.country_id,
                email : user_id.email,
                phone : user_id.mobile,
                name : user_id.name,
                user_id : user_id.id
            });

            axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}countries`, { lang : 'ar' })
                .then(res => {
                    this.setState({
                        countries : res.data.data,
                        isLoading : false
                    });
                });

            axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}cities`, { lang: 'ar' , country_id : user_id.country_id })
                .then( (res)=> {
                    this.setState({
                        cities: res.data.data ,
                        isLoading : false
                    });
                });
        }

    }

    changeCountry(event){

        this.state.countryId = event.target.value

        axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}cities`, { lang: 'ar' , country_id : event.target.value })
            .then( (res)=> {
                this.setState({ cities: res.data.data });
            });
    }

    changeCity(event){

        this.state.cityId = event.target.value

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

            axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}editProfile`,
                {
                    lang                : 'ar',
                    name                : this.state.name,
                    avatar              : this.state.avatar,
                    country_id          : this.state.countryId,
                    city_id             : this.state.cityId,
                    user_id             : this.state.user_id,
                    phone               : this.state.mobile,
                    email               : this.state.email,
                    password            : '',
                    mute                : '',
                    key                 : '+20',
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
                                            value       = {this.state.name}
                                            onChange    = {e => {this.setState({name : e.target.value})}}
                                        />
                                    </div>
                                    <div className="input_grop mt-3 mb-3">
                                        <Input
                                            type        = "phone"
                                            name        = "phone"
                                            id          = "examplePhone"
                                            value       = {this.state.phone}
                                            onChange    = {e => {this.setState({phone : e.target.value})}}
                                        />
                                    </div>
                                    <div className="input_grop mt-3 mb-3">
                                        <Input
                                            type        = "email"
                                            name        = "email"
                                            id          = "exampleEmail"
                                            value       = {this.state.email}
                                            onChange    = {e => {this.setState({email : e.target.value})}}
                                        />
                                    </div>
                                    <div className='select_form selector mt-3 mb-3'>
                                        <MdKeyboardArrowDown className='iconDown' />
                                        <select name="" id="" value={this.state.countryId} onChange={this.changeCountry.bind(this)}>
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
                                        <select name="" id="" value={this.state.cityId} onChange={this.changeCity.bind(this)}>
                                            {
                                                this.state.cities.map(item => (
                                                    <option key={item.value} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <h4 className='Error_Text'>{ this.state.isError }</h4>
                                    <Button
                                        color           = "info"
                                        className       = "btn_button"
                                        type            = "submit"
                                    >
                                        تعديل الحساب
                                    </Button>
                                </Form>
                            </div>
                        </div>

                    </Container>
                </div>

            </div>

        )
    }
}

export default EditProfile;
