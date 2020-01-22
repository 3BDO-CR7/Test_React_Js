import React, { Component } from 'react';
import { Container, Row , Col } from 'reactstrap';
import '../App.css';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {

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
                                    <li><Link to={'/myFav'} className="nav-link"> المفضله </Link></li>
                                    <li><Link to={'/signUp'} className="nav-link"> التسجيل </Link></li>
                                    <li><Link to={'/login'} className="nav-link"> تسجيل دخول </Link></li>
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
