import React, { Component } from 'react';
import {Container} from 'reactstrap';
import '../App.css';
import {Animated} from "react-animated-css";

import Header from '../component/Header';
import CONST from '../const/api';


import { Link } from 'react-router-dom';

import axios from 'axios';

class TermsAdv extends Component {
    constructor() {
        super();
        this.state = {
            isLoading           : true,
            user_id             : 123,
            Toasts              : '',
            text                : '',
        };
    }

    componentDidMount() {

        axios.post(`${CONST.url}adsTermsAndConditions`, { lang : 'ar'})
            .then(res => {
                this.setState({ text : res.data.data, isLoading : false });
                console.log('data', res.data);
            });

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

                <div className="content_view text_center">
                    <Container>
                        <div className='section_about'>
                            <h4>شروط الإعلان</h4>
                            <div className='overHidden'>
                                <Animated
                                    animationIn             = "fadeInUp"
                                    animationInDuration     = {1000}
                                    animationOutDuration    = {1000}
                                    isVisible               = {true}
                                >
                                    <img src={require('../imgs/logo.png')} />
                                </Animated>
                            </div>
                            <h4>{ this.state.text }</h4>
                            <div className='flex_between padding_all_30'>
                                <Link to={{pathname: '/AddAdv/'}} className='padding_all_10 btn_blue color_white width_150'>
                                    موافق
                                </Link>
                                <Link to={{pathname: '/'}} className='padding_all_10 btn_red color_white width_150'>
                                    غير موافق
                                </Link>
                            </div>
                        </div>
                    </Container>
                </div>

            </div>

        )
    }
}

export default TermsAdv;
