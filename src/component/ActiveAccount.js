import React, { Component } from 'react';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../App.css';
import {Animated} from "react-animated-css";
import axios from "axios";
import CONST from "../const/api";
import {Link} from "react-router-dom";

class ActiveAccount extends Component {
    constructor() {
        super();
        this.state = {
            phone           : '',
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
        }else {

            axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}signIn`, {
                phone : this.state.phone,
                password : this.state.password,
                device_id : 123,
                key : '+20',
                lang : 'ar'
            }).then( (response)=> {

                this.setState({ isError 	: response.data.msg });

                console.log('response', response.data)

                // if (response.data.value !== '0'){
                //     this.props.history.push('/');
                // }

            })
                .catch( (error)=> {
                    this.setState({isLoader: false});
                }).then(()=>{
                this.setState({isLoader: false});
            });



            // if(this.state.phone === 'sh3wza@gmail.com' && this.state.password === '123'){
            //     this.props.history.push('/');
            //     const data = { 'phone' : this.state.phone , 'password' : this.state.password };
            //     localStorage.setItem('user_data', JSON.stringify(data));
            // }else{
            //     this.setState({ isError 	: 'هذه البيانات غير صحيحه' });
            // }

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
                                <Label for="examplePhone">كود التفعيل</Label>
                                <Input
                                    type        = "phone"
                                    name        = "phone"
                                    id          = "examplePhone"
                                    value       = {this.state.phone}
                                    onChange    = {e => {this.setState({phone : e.target.value})}}
                                />
                            </div>

                            <h4 className='Error_Text'>{ this.state.isError }</h4>

                            <Button
                                color           = "info"
                                className       = "btn_button"
                                type            = "submit"
                            >
                                إرسال
                            </Button>

                        </Form>
                    </Animated>
                </Container>
            </div>

        );
    }
}

export default ActiveAccount;
