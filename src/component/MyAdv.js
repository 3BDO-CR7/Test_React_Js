import React, { Component } from 'react';
import {Container, Row, Col, Button, Alert} from 'reactstrap';
import '../App.css';
import {Animated} from "react-animated-css";
import { FaUserAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import Header from '../component/Header';
import CONST from '../const/api';


import { Link } from 'react-router-dom';

import axios from 'axios';

class MyFav extends Component {
    constructor() {
        super();
        this.state = {
            isLoading           : true,
            isLoader            : false,
            errToasts           : false,
            favNum              : 0,
            user_id             : null,
            Toasts              : '',
            items               : [],
            blog_photo          : [],
        };
    }

    componentDidMount() {

        let user_id = JSON.parse(localStorage.getItem('user_data'));

        this.setState({ user_id : user_id.id });

        axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}myFreeBlogs`, { lang : 'ar', user_id : user_id.id })
            .then(res => {
                this.setState({
                    items           : res.data.data,
                    blog_photo      : res.data.data_photo,
                    isLoading       : false
                });
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

        if (this.state.isLoader === true) {
            return (
                <div className='loader'>
                    <img src={require('../imgs/loader.gif')} />
                </div>
            );
        }

        return (

            <div className="body_section">

                <div className={this.state.errToasts ? 'toaster showToasts' : 'toaster hideToasts'}>
                    <h6>{ this.state.Toasts }</h6>
                </div>

                <Header />

                <div className="content_view section_body padding_all_10">
                    <Container>
                        <Row>
                            {
                                this.state.items.length !== 0 ?
                                    this.state.items.map((item,i) =>
                                        <Col xs="6" sm="4">
                                            <Animated
                                                animationIn             = "fadeInUp"
                                                animationInDuration     = {1000}
                                                animationOutDuration    = {1000}
                                                isVisible               = {true}
                                            >
                                                <div className="section_e3lan">
                                                    <div className="img_e3lan">
                                                        <img src={ item.img } />
                                                        <p>{ item.date }</p>
                                                    </div>
                                                    <Link to={{pathname: '/details/'+ item.id, id : { id: item.id }}} className="nav-link">
                                                        <div className="block_e3lan">
                                                            <h4>{ item.title }</h4>
                                                            <p>{ item.description }</p>
                                                            <h6>
                                                                <span><FaUserAlt /> { item.user } </span>
                                                                <span><FaMapMarkerAlt />  { item.date } </span>
                                                            </h6>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </Animated>
                                        </Col>
                                    )
                                    :
                                    <div className='no_data'>
                                        <img src={require('../imgs/noData.png')} />
                                    </div>
                            }
                        </Row>
                    </Container>
                </div>

            </div>

        )
    }
}

export default MyFav;
