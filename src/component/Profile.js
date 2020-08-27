import React, { Component } from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import '../App.css';
import {Animated} from "react-animated-css";

import { IoMdPerson } from "react-icons/io";

import Header from '../component/Header';
import { Link } from 'react-router-dom';
import axios from "axios";
import CONST from "../const/api";

class Profile extends Component {
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
        };
    }

    componentDidMount() {

        if (this.state.userInfo === null) {

            this.props.history.push('/');

        }else {

            let user_id = JSON.parse(localStorage.getItem('user_data'));

            // this.setState({
            //     avatar : user_id.avatar,
            //     city : user_id.city,
            //     country : user_id.country,
            //     email : user_id.email,
            //     phone : user_id.mobile,
            //     name : user_id.name,
            // });

            axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}profile`, {
                lang        : 'ar' ,
                user_id     : user_id.id
            }).then( (res)=> {
                console.log('res profile', res.data.data)
                this.setState({
                    avatar : user_id.avatar,
                    city : user_id.city,
                    country : user_id.country,
                    email : user_id.email,
                    phone : user_id.mobile,
                    name : user_id.name,
                    isLoading : false,
                });
                const data = res.data.data;
                localStorage.setItem('user_data', JSON.stringify(data));
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
                                <div className='block_info flew_row mt-2 mb-2 p-3'>
                                    <h5>الإسم : </h5>
                                    <div className='flew_row mr-3 ml-3'>
                                        <h6>{ this.state.name }</h6>
                                    </div>
                                </div>
                                <div className='block_info flew_row mt-2 mb-2 p-3'>
                                    <h5>رقم الجوال : </h5>
                                    <div className='flew_row mr-3 ml-3'>
                                        <h6>{ this.state.phone }</h6>
                                    </div>
                                </div>
                                <div className='block_info flew_row mt-2 mb-2 p-3'>
                                    <h5>الإيميل : </h5>
                                    <div className='flew_row mr-3 ml-3'>
                                        <h6>{ this.state.email }</h6>
                                    </div>
                                </div>
                                <div className='block_info flew_row mt-2 mb-2 p-3'>
                                    <h5>الدوله : </h5>
                                    <div className='flew_row mr-3 ml-3'>
                                        <h6>{ this.state.country }</h6>
                                    </div>
                                </div>
                                <div className='block_info flew_row mt-2 mb-2 p-3'>
                                    <h5>المدينه : </h5>
                                    <div className='flew_row mr-3 ml-3'>
                                        <h6>{ this.state.city }</h6>
                                    </div>
                                </div>
                            </div>
                            <div className='flex_between padding_all_30'>
                                <Link to={{pathname: '/EditProfile/'}} className='padding_all_10 btn_blue color_white width_150'>
                                    تعديل الحساب
                                </Link>
                                <Link to={{pathname: '/MyAdv'}} className='padding_all_10 btn_red color_white width_150'>
                                    إعلاناتي
                                </Link>
                            </div>
                        </div>

                    </Container>
                </div>

            </div>

        )
    }
}

export default Profile;
