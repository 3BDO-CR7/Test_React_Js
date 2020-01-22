import React, { Component } from 'react';
import {Container, Row, Col, Button, Modal, ModalBody, Form, Input, Label} from 'reactstrap';
import '../App.css';
import { FaWhatsapp, FaUserAlt, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';
import { TiMessages } from 'react-icons/ti';
import { MdPhoneIphone } from 'react-icons/md';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import Header from '../component/Header';

import axios from 'axios';
import {Link} from "react-router-dom";
import {Animated} from "react-animated-css";

class Details extends Component {
    constructor() {
        super();
        this.state = {
            dataInfo            : '',
            writeComment        : '',
            isError             : '',
            empty               : 'لا يوجد شئ للعرض',
            intervalId          : 0,
            thePosition         : false,
            user_id             : 123,
            items               : [],
            sliders             : [],
            comments            : [],
            results             : [],
            isLoading           : true,
            showModal           : false,

            // Option slideProudct
            slideProudct: {
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
            // Option slideResult
            slideResult :{
                loop        : true,
                margin      : 10,
                center      : true,
                autoplay    : true,
                autoplayTimeout : 2000,
                smartSpeed      : 2000,
                dragEndSpeed    : 2000,
                pagination      : true,
                nav             : true,
                responsive      :{
                    0       : {
                        items: 1,
                    },
                    600     : {
                        items: 2,
                    },
                    1000    : {
                        items: 3,
                    },
                },
            }
        };
    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    };

    refresh = (id) =>{

        this.setState({isLoading: true});

        if(id === undefined || id === null){

            this.props.history.push('/');

        }else {

            axios.post(`https://alaaelden.aait-sa.com/api/BlogDetails`, { id : id })
                .then( (response)=> {

                    this.setState({
                        dataInfo            : response.data.data,
                        sliders             : response.data.data.images,
                        comments            : response.data.data.comments,
                        results             : response.data.data.results,
                        isLoading           : false
                    });

                    window.scrollTo(0, 0);

                })
                .catch( (error)=> {
                    this.setState({isLoading: false});
                }).then(()=>{
                    this.setState({isLoading: false});
            });

        }
    };

    componentDidMount() {

        if(this.props.location.id === undefined || this.props.location.id === null){

            this.props.history.push('/');

        }else {

            axios.post(`https://alaaelden.aait-sa.com/api/BlogDetails`, { id : this.props.location.id })
                .then( (response)=> {

                    this.setState({
                        dataInfo            : response.data.data,
                        sliders             : response.data.data.images,
                        comments            : response.data.data.comments,
                        results             : response.data.data.results,
                        isLoading           : false
                    });

                })
                .catch( (error)=> {
                    this.setState({isLoading: false});
                }).then(()=>{
                    this.setState({isLoading: false});
            });

        }

    }

    addComment(event){

        event.preventDefault();

        if(this.state.writeComment === ''){

            this.setState({ isError 	: 'آضف تعليقك' });

        }else {

            axios.post(`https://cors-anywhere.herokuapp.com/https://alaaelden.aait-sa.com/api/CommentBlog`, { blog_id : this.state.dataInfo.id, comment: this.state.writeComment, user_id : this.state.user_id })
                .then( (response)=> {

                    this.setState({
                        showModal       : !this.state.showModal,
                        writeComment    : '',
                        isError         : ''
                    });
                    this.state.comments.push(response.data.data);

                })
                .catch( (error)=> {
                    this.setState({isLoading: false});
                }).then(()=>{
                    this.setState({isLoading: false});
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

                <Container>

                    <Row>
                        <Col xs="12" sm="6">
                            <div className='title'>
                                <h5 className='text-right'> اسم الآعلان : <span>{ this.state.dataInfo.title }</span></h5>
                            </div>
                        </Col>
                        <Col xs="12" sm="6">
                            <div className='title'>
                                <h5 className='text-left'> السعر : <span>{ this.state.dataInfo.price }</span></h5>
                            </div>
                        </Col>
                    </Row>

                    <div className='slider_home'>
                        <h3 className='infoData'>{ this.state.dataInfo.date }</h3>
                        <OwlCarousel
                            className="owl-theme"
                            {...this.state.slideProudct}
                        >
                            {this.state.sliders.map(slide =>
                                <div className="item"><img src={slide.url}/></div>
                            )}
                        </OwlCarousel>
                    </div>


                    <div className='call_us'>
                        <ul>
                            {this.state.dataInfo.is_phone === true ? (
                                <li>
                                    <a href="">
                                        <MdPhoneIphone />
                                        إتصال
                                    </a>
                                </li>
                            ) : (
                                <div />
                            )}
                            {this.state.dataInfo.is_phone === true ? (
                                <li>
                                    <a href="">
                                        <FaWhatsapp />
                                        إرسال عبر الواتساب
                                    </a>
                                </li>
                            ) : (
                                <div />
                            )}
                            {this.state.dataInfo.is_chat === true ? (
                                <li>
                                    <a href="">
                                        <TiMessages />
                                        محادثه خاصه
                                    </a>
                                </li>
                            ) : (
                                <div />
                            )}
                        </ul>
                    </div>

                    <div className='infoDescription'>
                        <p>{ this.state.dataInfo.description }</p>
                    </div>

                    <h5 className="title_text">*  التعليقات</h5>
                    <div className='comments'>
                        {this.state.comments.length === 0 ? (

                            <h4 className='empty'>{this.state.empty}</h4>

                        ) : (
                            <div>
                                {this.state.comments.map(comment =>
                                    <div className='block_comment'>
                                        <div className='userInfo'>
                                            <h4><FaUserAlt /> { comment.user }</h4>
                                            <span><FaRegClock /> { comment.date }</span>
                                        </div>
                                        <p>{ comment.comment }</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <Button color="danger" onClick={() => this.toggleModal()} className='addComment'>آضف تعليقك</Button>

                    <div className='mapView'>
                        <Map
                            className           = 'mapStyle'
                            google              = {this.props.google}
                            zoom                = {8}
                            initialCenter       = {{ lat: this.state.dataInfo.latitude , lng: this.state.dataInfo.longitude }}
                        >
                            <Marker position    = {{ lat: this.state.dataInfo.latitude , lng: this.state.dataInfo.longitude }} />
                        </Map>
                    </div>

                    <div className='slider_home slider_result'>
                        <h5 className="title_text">* إعلانات مشابه</h5>
                        {this.state.results.length === 0 ? (

                            <h4 className='empty'>{this.state.empty}</h4>

                        ) : (
                            <div>
                                <OwlCarousel
                                    className="owl-theme"
                                    {...this.state.slideResult}
                                >
                                    {this.state.results.map(result =>
                                        <div className="item">
                                            <div className='block_result'>
                                                <Link onClick={() => this.refresh(result.id)} to={{pathname: '/details/'+ result.id, id: {id: result.id}}} className="nav-link">
                                                    <div className="section_e3lan">
                                                        <div className="img_e3lan">
                                                            <img src={ result.img } />
                                                            <p>{ result.date }</p>
                                                        </div>
                                                        <div className="block_e3lan">
                                                            <h4>{ result.title }</h4>
                                                            <p>{ result.description }</p>
                                                            <h6>
                                                                <span><FaUserAlt /> { result.user } </span>
                                                                <span><FaMapMarkerAlt />  { result.date } </span>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </OwlCarousel>
                            </div>
                        )}
                    </div>


                </Container>
                <Animated
                    animationIn             = "fadeInUp"
                    animationInDuration     = {1000}
                    animationOutDuration    = {1000}
                    isVisible               = {true}
                >
                    <Modal isOpen={this.state.showModal} toggle={() => this.toggleModal()} className="modal">
                            <ModalBody>
                                <Form className="form_control" onSubmit={this.addComment.bind(this)} noValidate>
                                    <Label for="examplePassword">كلمه المرور</Label>
                                    <Input
                                        type        = "textarea"
                                        name        = "text"
                                        id          = "examplePassword"
                                        value       = {this.state.writeComment}
                                        onChange    = {e => {this.setState({writeComment : e.target.value})}}
                                    />
                                    <h4 className='Error_Text'>{ this.state.isError }</h4>
                                    <Button
                                        color           = "info"
                                        className       = "btn_button"
                                        type            = "submit">
                                        آضف تعليقك
                                    </Button>
                                </Form>
                            </ModalBody>
                    </Modal>
                </Animated>

            </div>

        )
    }
}

// export default Details;
export default GoogleApiWrapper({apiKey: 'AIzaSyBNm7VC4eQsCZcny5cVteIkg_SMJpc2G7Y'})(Details)
