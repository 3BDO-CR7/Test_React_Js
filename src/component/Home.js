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

import { Link } from 'react-router-dom';

import axios from 'axios';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            isLoading           : true,
            errToasts           : false,
            isFav               : false,
            favNum              : 0,
            user_id             : 123,
            items               : [],
            sliders             : [],
            Toasts              : '',
            options             : {
                loop        : true,
                margin      : 10,
                center      : true,
                autoplay    : true,
                autoplayTimeout : 2000,
                // animateOut      : 'fadeInUp',
                // animateIn       : 'fadeInDown',
                smartSpeed      : 2000,
                dragEndSpeed    : 2000,
                pagination      : true,
                nav             : true,
                responsive      :{
                    0       : {
                        items: 1,
                    },
                    600     : {
                        items: 1,
                    },
                    1000    : {
                        items: 1,
                    },
                },
            },
        };
    }

    componentDidMount() {

        axios.get(`https://alaaelden.aait-sa.com/api/get-blogs`)
            .then(res => {
                this.setState({ items : res.data.data, isLoading : false });
            });

        axios.get(`https://alaaelden.aait-sa.com/api/getSlider`)
            .then(res => {
                this.setState({ sliders : res.data.data});
            });

    }

    onClickFav = (id) => {

        if(localStorage.getItem('user_data') === null || localStorage.getItem('user_data') === undefined){
            this.props.history.push('/login');
        }else {
            axios.post(`https://cors-anywhere.herokuapp.com/https://alaaelden.aait-sa.com/api/favouriteBlog`, { id : id  , user_id : this.state.user_id })
                .then( (response)=> {

                    this.setState({
                        Toasts              : response.data.msg,
                        errToasts           : true,
                        favNum              : id,
                    });

                    setTimeout(
                        function() {
                            this.setState({errToasts: false});
                        }.bind(this),
                        3000
                    );

                })
                .catch( (error)=> {
                    this.setState({isLoading: false});
                }).then(()=>{
                this.setState({isLoading: false});
            });
        }

    };

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

                <div className={this.state.errToasts ? 'toaster showToasts' : 'toaster hideToasts'}>
                    <h6>{ this.state.Toasts }</h6>
                </div>

                <Header />

                <Container>
                    <div className='slider_home'>
                        <OwlCarousel
                            className="owl-theme"
                            {...this.state.options}
                        >
                            {this.state.sliders.map(slide =>
                                <div className="item"><img src={slide.url}/></div>
                            )}
                        </OwlCarousel>
                    </div>
                </Container>

                <div className="content_view">
                    <Container>
                        <Row>
                            {this.state.items.map(item =>
                                <Col xs="6" sm="4">
                                    <Animated
                                        animationIn             = "fadeInUp"
                                        animationInDuration     = {1000}
                                        animationOutDuration    = {1000}
                                        isVisible               = {true}
                                    >
                                        <div className="section_e3lan">
                                            <div className="img_e3lan">
                                                <button onClick={() => this.onClickFav(item.id)} className='clickFav'>
                                                    {this.state.favNum === item.id ? (
                                                        <MdFavorite />
                                                    ) : (
                                                        <MdFavoriteBorder />
                                                    )}
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
                            )}
                        </Row>
                    </Container>
                </div>

                {/*<div className="pagintion">*/}
                {/*    <ul>*/}
                {/*        <li><FaAngleDoubleRight /></li>*/}
                {/*        <li>1</li>*/}
                {/*        <li>2</li>*/}
                {/*        <li>3</li>*/}
                {/*        <li>4</li>*/}
                {/*        <li>5</li>*/}
                {/*        <li><FaAngleDoubleLeft /></li>*/}
                {/*    </ul>*/}
                {/*</div>*/}

            </div>

        )
    }
}

export default Home;
