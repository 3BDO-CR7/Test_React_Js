import React, { Component } from 'react';
import {Container, Row, Col, Button, Alert} from 'reactstrap';
import '../App.css';
import {Animated} from "react-animated-css";
import { FaUserAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { MdFavoriteBorder, MdFavorite, MdKeyboardArrowDown , MdNearMe} from 'react-icons/md';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import CONST from '../const/api';

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
            countries           : [],
            cities              : [],
            Toasts              : '',
            value               : '',
            countryId           : null,
            cityId              : null,
            latitude            : '',
            longitude           : '',
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

        this.getBlogs();

        axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}countries`, { lang : 'ar' })
            .then(res => {
                this.setState({ countries : res.data.data});
                console.log('res', res.data.data)
            });

    }

    getLocation(){

        navigator.geolocation.getCurrentPosition(
            function(position) {
                console.log(position);
                this.setState({longitude: position.coords.longitude});
                this.setState({latitude: position.coords.latitude});
            },
            function(error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }
        );

        setTimeout(()=>{
            this.getBlogs();
        },1000);
    }

    changeCountry(event){

        this.setState({ countryId : event.target.value });

        axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}cities`, { lang: 'ar' , country_id : event.target.value })
            .then( (res)=> {
                this.setState({ cities: res.data.data });
            });

        setTimeout(()=>{
            this.getBlogs();
        },1000);
    }

    changeCity(event){

        this.setState({ cityId : event.target.value });

        setTimeout(()=>{
            this.getBlogs();
        },1000);
    }

    getBlogs(){
        axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}get-blogs`,
            {
                lang            : 'ar',
                city_id         : this.state.cityId,
                latitude        : this.state.latitude ,
                longitude       : this.state.longitude ,
                country_id      : this.state.countryId ,
            })
            .then(res => {
                this.setState({ items : res.data.data, isLoading : false });
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

                <div className={this.state.errToasts ? 'toaster showToasts' : 'toaster hideToasts'}>
                    <h6>{ this.state.Toasts }</h6>
                </div>

                <Header />

                {
                    this.state.sliders.length !== 0 ?
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
                        :
                        <div/>
                }

                <div className="content_view">
                    <Container>

                        <div className='filter flex_between'>
                            <div className='select_box selector'>
                                <MdKeyboardArrowDown className='iconDown' />
                                <select name="" id="" onChange={this.changeCountry.bind(this)}>
                                    <option hidden>آختر المدينه</option>
                                    {
                                        this.state.countries.map(item => (
                                            <option key={item.value} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='select_box selector'>
                                <MdKeyboardArrowDown className='iconDown' />
                                <select name="" id="" onChange={this.changeCity.bind(this)}>
                                    <option hidden>آختر الدوله</option>
                                    {
                                        this.state.cities.map(item => (
                                            <option key={item.value} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='select_box'>
                                <button onClick={() => this.getLocation()}>
                                    <MdNearMe />
                                    <span>الاقرب</span>
                                </button>
                            </div>
                        </div>

                        <div className='section_body padding_all_10'>

                            <Row>
                                {
                                    this.state.items.length !== 0 ?
                                        this.state.items.map(item =>
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
                        </div>
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
