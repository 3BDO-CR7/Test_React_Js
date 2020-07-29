import React, { Component } from 'react';
import {Container, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
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
            category_id         : '',
            nameCar             : '',
            categories          : [],
            sub_categories      : [],
            modal               : false
        };
    }

    componentDidMount() {

        axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}categoriesList`, { lang : 'ar'})
            .then(res => {
                this.setState({ categories : res.data.data, isLoading : false });
                console.log('sub_categories', res.data.data);
            });

    }

    toggle(arr,id){
        this.setState({
            modal           : !this.state.modal,
            sub_categories  : arr
        });
        if (id === 61){
            this.state.nameCar = 'car';
        }else {
            this.state.nameCar = '';
        }
        console.log('arr', arr);
        console.log('car', this.state.nameCar);
    }

    pushArr(arr,id){
        this.setState({
            sub_categories  : arr,
            category_id     : id,
        });
        if (arr.length === 0) {
            this.props.history.push('/AddAdv', { id : id, car : this.state.nameCar });
        }
        console.log('arr', arr);
        console.log('id', id)
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

                <div className="content_view text_center pt-5">
                    <Container>

                        {
                            this.state.categories.map(cate => (
                                <div className='overHidden'>
                                <Animated
                                    animationIn             = "fadeInUp"
                                    animationInDuration     = {1000}
                                    animationOutDuration    = {1000}
                                    isVisible               = {true}
                                >
                                <div className='blog_category'>
                                    <Button onClick={() => this.toggle(cate.childes, cate.id)} className='box_blog flew_row padding_all_10'>
                                        <div className='img_blog'>
                                            <img src={cate.icon} />
                                        </div>
                                        <div className='info_blog'>
                                            <h6>{ cate.name }</h6>
                                        </div>
                                    </Button>
                                </div>
                                </Animated>
                                </div>
                            ))
                        }

                    </Container>

                    <Modal isOpen={this.state.modal} toggle={() => this.toggle(this.state.sub_categories)} className={'modal'}>
                        <ModalHeader toggle={this.state.modal}>
                            <h5>إختر القسم الفرعي</h5>
                        </ModalHeader>
                        <ModalBody>
                            {
                                this.state.sub_categories.map(cate => (
                                    <div className='overHidden'>
                                        <Animated
                                            animationIn             = "fadeInUp"
                                            animationInDuration     = {1000}
                                            animationOutDuration    = {1000}
                                            isVisible               = {true}
                                        >
                                            <div className='blog_category'>
                                                <Button onClick={() => this.pushArr(cate.childes,cate.id)} className='box_blog flew_row padding_all_10'>
                                                    <div className='img_blog'>
                                                        <img src={cate.icon} />
                                                    </div>
                                                    <div className='info_blog'>
                                                        <h6>{ cate.name }</h6>
                                                    </div>
                                                </Button>
                                            </div>
                                        </Animated>
                                    </div>
                                ))
                            }
                        </ModalBody>
                    </Modal>

                </div>

            </div>

        )
    }
}

export default SelectCategory;
