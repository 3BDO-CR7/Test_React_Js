import React, { Component } from 'react';
import {Container} from 'reactstrap';
import '../App.css';
import {Animated} from "react-animated-css";

import Header from '../component/Header';
import CONST from '../const/api';


import { Link } from 'react-router-dom';

import axios from 'axios';

class SelectCategory extends Component {
    constructor() {
        super();
        this.state = {
            isLoading           : true,
            user_id             : 123,
            Toasts              : '',
            categories          : [],
        };
    }

    componentDidMount() {

        axios.post(`${CONST.url}categories`, { lang : 'ar'})
            .then(res => {
                this.setState({ categories : res.data.data, isLoading : false });
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

                    </Container>
                </div>

            </div>

        )
    }
}

export default SelectCategory;
