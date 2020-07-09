import React, { useState , useEffect } from "react";
import {Container} from 'reactstrap';
import '../App.css';
import {Animated} from "react-animated-css";

import Header from '../component/Header';
import {useSelector, useDispatch} from 'react-redux';
import {getAbout} from '../actions/AboutAction';

function About(navigation) {

    const [lang, setLang]       = useState('ar');
    const about                 = useSelector(state => state.about.about);
    const loader                = useSelector(state => state.about.loader);
    const dispatch              = useDispatch();

    function fetchData(){
        dispatch(getAbout(lang));
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , loader]);

    function renderLoader(){
        if (loader === false){
            return(
                <div className='loading'>
                    <img src={require('../imgs/loader.gif')} />
                </div>
            );
        }
    }

    return (
        <div className="body_section">

            { renderLoader() }

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
                        <h4>{about}</h4>
                    </div>
                </Container>
            </div>

        </div>
    );
}

export default About;
