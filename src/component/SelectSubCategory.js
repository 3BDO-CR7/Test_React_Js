import React, { Component } from 'react';
import {Container} from 'reactstrap';
import '../App.css';
import {Animated} from "react-animated-css";
import Header from '../component/Header';
import CONST from '../const/api';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SelectSubCategory extends Component {
    constructor() {
        super();
        this.state = {
            isLoading           : true,
            user_id             : 123,
            Toasts              : '',
            sub_categories      : [],
        };
    }

    componentDidMount() {

        console.log('childes',this.props.location.childes.childes);

        this.setState({
            sub_categories : this.props.location.childes.childes,
            isLoading : false
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

                <div className="content_view text_center pt-5">
                    <Container>

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
                                            <Link to={{pathname: '/SelectSubCategory/'+ cate.id, id : { id: cate.id }}} className='box_blog flew_row padding_all_10'>
                                                <div className='img_blog'>
                                                    <img src={cate.icon} />
                                                </div>
                                                <div className='info_blog'>
                                                    <h6>{ cate.name }</h6>
                                                </div>
                                            </Link>
                                        </div>
                                    </Animated>
                                </div>
                            ))
                        }

                    </Container>
                </div>

            </div>

        )
    }
}

export default SelectSubCategory;
