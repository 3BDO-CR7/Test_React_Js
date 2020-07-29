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
            user_id             : 123,
            items               : [],
            Toasts              : '',
        };
    }

    componentDidMount() {

        axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}favourites`, { user_id : this.state.user_id })
            .then(res => {
                this.setState({ items : res.data.data, isLoading : false });
                console.log('data', res.data);
            });

    }

    onClickFav = (id, i) => {

        this.setState({
            isLoader : true
        });

        axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}favouriteBlog`, { id : id  , user_id : this.state.user_id })
            .then( (response)=> {

                this.setState({
                    isLoader            : false,
                    Toasts              : response.data.msg,
                    errToasts           : true,
                });

                this.state.items.splice(i,1);

                setTimeout(
                    function() {
                        this.setState({errToasts: false});
                    }.bind(this),
                    3000
                );

            })
            .catch( (error)=> {
                this.setState({isLoader: false});
            }).then(()=>{
            this.setState({isLoader: false});
        });

    };

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
                                                        <button onClick={() => this.onClickFav(item.id, i)} className='clickFav'>
                                                            <MdFavorite className='iconFav' />
                                                        </button>
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
