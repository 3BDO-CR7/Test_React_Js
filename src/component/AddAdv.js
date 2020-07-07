import React, { Component } from 'react';
import {Container, Row, Col, Button, Form, Label, Input} from 'reactstrap';
import '../App.css';
import {Animated} from "react-animated-css";

import ImageUploading from "react-images-uploading";

import Header from '../component/Header';

import { Link } from 'react-router-dom';

import axios from 'axios';

const maxNumber = 10;
const maxMbFileSize = 5 * 1024 * 1024;
const imageList = [];

class AddAdv extends Component {
    constructor() {
        super();
        this.state = {
            isLoading           : true,
            errToasts           : false,
            phone               : '',
        };
    }

    componentDidMount() {

        this.setState({ isLoading : false });

    }

    onChange = (imageList) => {
        // data for submit
        console.log(imageList);
    };

    validate = () => {
        let isError = false;
        let msg = '';

        if(this.state.phone.length <= 0) {
            isError     = true;
            msg         = 'إدخل رقم الهاتف';
        }
        if (msg !== ''){
            this.setState({
                isError             : msg,
                errToasts           : true
            })
        }
        return isError;
    };

    onSubmit(event) {

        event.preventDefault();

        const err = this.validate();

        setTimeout(
            function() {
                this.setState({errToasts: false});
            }.bind(this),
            2000
        );

        if (!err) {

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

                <div className="content_view">

                    <div className={this.state.errToasts ? 'toaster showToasts' : 'toaster hideToasts'}>
                        <h6>{ this.state.isError }</h6>
                    </div>

                    <div className='titleHead'>
                        <h5>إضافه إعلان</h5>
                    </div>

                    <div className='up_view'>

                        <ImageUploading multiple onChange={this.onChange} maxNumber={maxNumber}>
                            {({ imageList, onImageUpload, onImageRemoveAll }) => (
                                // write your building UI
                                <div className="upload__image-wrapper">
                                    <button onClick={onImageUpload}>Upload images</button>&nbsp;
                                    <button onClick={onImageRemoveAll}>Remove all images</button>
                                    {imageList.map(image => (
                                        <div key={image.key} className="image-item">
                                            <img src={image.dataURL} alt="" width="100" />
                                            <div className="image-item__btn-wrapper">
                                                <button onClick={image.onUpdate}>Update</button>
                                                <button onClick={image.onRemove}>Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ImageUploading>

                        <Form className="form_add" onSubmit={this.onSubmit.bind(this)} noValidate>
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
                            <Button
                                color           = "info"
                                className       = "btn_button"
                                type            = "submit"
                            >
                                إرسال
                            </Button>
                        </Form>
                    </div>

                </div>

            </div>

        )
    }
}

export default AddAdv;
