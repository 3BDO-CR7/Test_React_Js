import React, { Component } from 'react';
import { Container, Row , Col } from 'reactstrap';
import '../App.css';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            userInfo : localStorage.getItem('user_data')
        };
    }

    componentWillMount() {
        console.log('user_data', localStorage.getItem('user_data'));
    }

    logOut(){

        localStorage.removeItem('user_data');
    }


    render() {
        return (

            <div className="body_section">

                <div className="Nav_Bar">
                    <Container>
                        <Row>
                            <Col xs="6" sm="3">
                                <li>
                                    <Link to={'/'} className="nav-link">
                                        <img src={require('../imgs/logo.png')} />
                                    </Link>
                                </li>
                            </Col>
                            <Col xs="6" sm="9">
                                <ul>
                                    <li><Link to={'/'} className="nav-link"> الرئيسيه </Link></li>
                                    <li><Link to={'/About'} className="nav-link"> من نحن </Link></li>
                                    <li><Link to={(this.state.userInfo === null) ? '/login' : '/myFav'} className="nav-link"> المفضله </Link></li>
                                    <li><Link to={(this.state.userInfo === null) ? '/login' : '/TermsAdv'} className="nav-link"> إضافه إعلان </Link></li>
                                    {
                                        this.state.userInfo !== null ?
                                            <li><Link to={'/Profile'} className="nav-link"> حسابي </Link></li>
                                            :
                                            null
                                    }
                                    {
                                        this.state.userInfo === null ?
                                            <li><Link to={'/login'} className="nav-link"> تسجيل دخول </Link></li>
                                            :
                                            null
                                    }
                                    {
                                        this.state.userInfo === null ?
                                            <li><Link to={'/signUp'} className="nav-link"> حساب جديد </Link></li>
                                            :
                                            null
                                    }
                                    {
                                        this.state.userInfo !== null ?
                                            <li onClick={() => this.logOut()}><Link to={'/login'} className="nav-link"> تسجيل خروج </Link></li>
                                            :
                                            null
                                    }
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>

            </div>

        )
    }
}

export default Header;
