import React, { Component } from 'react';
import {Container} from 'reactstrap';
import '../App.css';
import {Animated} from "react-animated-css";

import Header from '../component/Header';
import CONST from '../const/api';


import { Link } from 'react-router-dom';

import axios from 'axios';

class About extends Component {
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

        axios.post(`${CONST.url}aboutUs`, { lang : 'ar'})
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
                        </div>
                    </Container>
                </div>

            </div>

        )
    }
}

export default About;
