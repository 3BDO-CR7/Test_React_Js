import React, { Component } from 'react';
import { Container, Button, Form, Label, Input } from 'reactstrap';
import '../App.css';
import {Animated} from "react-animated-css";

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            phone           : '',
            password        : '',
            isError         : '',
            isLoading       : true
        };
    }

    componentWillMount() {
        this.setState({isLoading : false});
    }

    onSubmit(event){

        // this.setState({isLoading : true});

        event.preventDefault();

        if(this.state.phone === ''){
            this.setState({ isError 	: 'إدخل رقم الهاتف' });
        }else if(this.state.password === ''){
            this.setState({ isError 	: 'إدخل كلمه المرور' });
        }else {
            if(this.state.phone === 'sh3wza@gmail.com' && this.state.password === '123'){
                this.setState({ isError 	: 'آهلا بك في موقع الندم' });
                this.props.history.push('/');
            }else{
                this.setState({ isError 	: 'هذه البيانات غير صحيحه' });
            }
        }

    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className='loading'>
                    <img src={require('../imgs/loader.gif')} />
                </div>
            );
        }
        return (

            <div className="main_content">
                <div className="overlay"></div>
                <Container>
                    <Animated
                        animationIn             = "fadeInUp"
                        animationInDuration     = {1000}
                        animationOutDuration    = {1000}
                        isVisible               = {true}
                    >
                        <Form className="form_control" onSubmit={this.onSubmit.bind(this)} noValidate>
                            <img src={require('../imgs/logo.png')} />
                            <div className="input_grop">
                                <Label for="examplePhone">رقم الجوال</Label>
                                <Input
                                    type        = "phone"
                                    name        = "phone"
                                    id          = "examplePhone"
                                    value       = {this.state.phone}
                                    onChange    = {e => {this.setState({phone : e.target.value})}}
                                />
                            </div>
                            <div className="input_grop">
                                <Label for="examplePhone">رقم الجوال</Label>
                                <Input
                                    type        = "phone"
                                    name        = "phone"
                                    id          = "examplePhone"
                                    value       = {this.state.phone}
                                    onChange    = {e => {this.setState({phone : e.target.value})}}
                                />
                            </div>
                            <div className="input_grop">
                                <Label for="examplePhone">رقم الجوال</Label>
                                <Input
                                    type        = "phone"
                                    name        = "phone"
                                    id          = "examplePhone"
                                    value       = {this.state.phone}
                                    onChange    = {e => {this.setState({phone : e.target.value})}}
                                />
                            </div>
                            <div className="input_grop">
                                <Label for="examplePassword">كلمه المرور</Label>
                                <Input
                                    type        = "password"
                                    name        = "password"
                                    id          = "examplePassword"
                                    value       = {this.state.password}
                                    onChange    = {e => {this.setState({password : e.target.value})}}
                                />
                            </div>
                            <h4 className='Error_Text'>{ this.state.isError }</h4>
                            <Button
                                color           = "info"
                                className       = "btn_button"
                                type            = "submit"
                            >
                                دخول
                            </Button>
                        </Form>
                    </Animated>
                </Container>
            </div>

        );
    }
}

export default SignUp;
