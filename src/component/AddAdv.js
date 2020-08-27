import React, { Component } from 'react';
import {Container, Row, Col, Button, Form, Label, Input} from 'reactstrap';
import '../App.css';
import { IoIosAdd, IoIosClose, IoMdRepeat } from 'react-icons/io';
import { MdKeyboardArrowDown} from 'react-icons/md';

import ImageUploading from "react-images-uploading";

import Header from '../component/Header';

import { Link } from 'react-router-dom';

import axios from 'axios';
import CONST from "../const/api";

const maxNumber = 10;
const maxMbFileSize = 5 * 1024 * 1024;
const imageList = [];

class AddAdv extends Component {
    constructor() {
        super();
        this.state = {
            isLoading           : true,
            loadFun             : false,
            errToasts           : false,
            name                : '',
            price               : '',
            phone               : '',
            details             : '',
            countryId           : null,
            cityId              : null,
            user_id             : null,
            countries           : [],
            cities              : [],
            arrImg              : [],
            years               : [],
            year                : null,
        };
    }

    componentDidMount() {

        let user_id = JSON.parse(localStorage.getItem('user_data'));

        this.setState({ user_id : user_id.id })

        axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}countries`, { lang : 'ar' })
            .then(res => {
                this.setState({
                    countries : res.data.data,
                    isLoading : false
                });
            });

        for(let i = 2020; i > 1990 ; i--){
            this.state.years.push(JSON.stringify(i));
        }

        console.log('id push',this.props.location.state.id);
        console.log('id push',this.props.location.state.car);

    }

    onChange = (imageList) => {

        this.setState({ arrImg :  imageList});

    };

    changeCountry(event){

        // this.setState({ countryId : event.target.value });
        this.state.countryId = event.target.value
        console.log('countryId', this.state.countryId)

        axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}cities`, { lang: 'ar' , country_id : event.target.value })
            .then( (res)=> {
                this.setState({ cities: res.data.data });
            });
    }

    changeCity(event){

        // this.setState({ cityId : event.target.value });
        this.state.cityId = event.target.value
        console.log('cityId', this.state.cityId)

    }

    changeYears(event){

        this.state.year = event.target.value
        console.log('year', this.state.year)
    }

    validate = () => {
        let isError = false;
        let msg = '';

        if( this.state.arrImg.length <= 0) {
            isError     = true;
            msg         = 'إدخل صور الاعلان';
        }else if(this.state.year === null && this.props.location.state.car === 'car') {
            isError     = true;
            msg         = 'إختر الموديل';
        }else if(this.state.countryId === null) {
            isError     = true;
            msg         = 'إختر الدوله';
        }else if(this.state.cityId === null) {
            isError     = true;
            msg         = 'إختر المدينه';
        } else if(this.state.name.length <= 0) {
            isError     = true;
            msg         = 'إدخل اسم الاعلان';
        }else if (this.state.price.length <= 0){
            isError     = true;
            msg         = 'إدخل سعر الاعلان';
        }else if (this.state.phone.length <= 0){
            isError     = true;
            msg         = 'إدخل رقم الهاتف';
        }else if (this.state.details.length <= 0){
            isError     = true;
            msg         = 'إدخل تفاصيل الإعلان';
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

            this.setState({ loadFun : true });

            axios.post(`https://cors-anywhere.herokuapp.com/${CONST.url}uploadAd`,
                {
                    lang                : 'ar' ,
                    title               : this.state.name,
                    youtube             : this.state.youtube,
                    mobile              : this.state.phone,
                    key                 : this.state.key,
                    price               : this.state.price,
                    description         : this.state.details,
                    country_id          : this.state.countryId,
                    city_id             : this.state.cityId,
                    latitude            : 26.8206,
                    longitude           : 30.8025,
                    user_id             : this.state.user_id,
                    category_id         : this.props.location.state.id,
                    type                : '1',
                    is_refreshed        : 'true',
                    is_mobile           : 'true',
                    is_chat             : 'true',
                    model_id            : null,
                    section_id          : null,
                    model               : this.state.year,
                    images              : this.state.arrImg
                })
                .then( (res)=> {
                    console.log('res', res.data)

                    this.setState({
                        loadFun             : false,
                        isError             : res.data.msg,
                        errToasts           : true,
                    });

                    setTimeout(
                        function() {
                            this.setState({errToasts: false});
                        }.bind(this),
                        2000
                    );

                    console.log('imageList', this.state.arrImg)

                    if (res.data.value !== '0'){
                        this.props.history.push('/');
                    }

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

                <div className="content_view">

                    {
                        (this.state.loadFun === true) ?
                            <div className='loadFun'>
                                <img src={require('../imgs/loader.gif')} />
                            </div>
                            :
                            <div/>
                    }

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
                                    <button onClick={onImageUpload} className='upload_img'><IoIosAdd /></button>
                                    {
                                        imageList.length !== 0 ?
                                            <button onClick={onImageRemoveAll} className='remove_all'>حذف كل الصور</button>
                                            :
                                            null
                                    }
                                    <div className='over_upload'>
                                        {
                                            imageList.map(image => (
                                                <div key={image.key} className="image_item">
                                                    <img src={image.dataURL} alt="" />
                                                    <button onClick={image.onUpdate} className='update'><IoMdRepeat /></button>
                                                    <button onClick={image.onRemove} className='remove'><IoIosClose /></button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )}
                        </ImageUploading>

                        <Container>

                            <Form className="form_add" onSubmit={this.onSubmit.bind(this)} noValidate>

                                <Row>
                                    {
                                        (this.props.location.state.car === 'car') ?
                                            <Col xs="12" sm="12">
                                                <div className='select_form selector mb-4'>
                                                    <MdKeyboardArrowDown className='iconDown' />
                                                    <select name="" id="" onChange={this.changeYears.bind(this)}>
                                                        <option hidden>آختر الموديل</option>
                                                        {
                                                            this.state.years.map(year => (
                                                                <option key={year} value={year}>
                                                                    {year}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </Col>
                                            :
                                            <div/>
                                    }
                                    <Col xs="12" sm="6">
                                        <div className='select_form selector'>
                                            <MdKeyboardArrowDown className='iconDown' />
                                            <select name="" id="" onChange={this.changeCountry.bind(this)}>
                                                <option hidden>آختر الدوله</option>
                                                {
                                                    this.state.countries.map(item => (
                                                        <option key={item.value} value={item.id}>
                                                            {item.name}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <div className='select_form selector'>
                                            <MdKeyboardArrowDown className='iconDown' />
                                            <select name="" id="" onChange={this.changeCity.bind(this)}>
                                                <option hidden>آختر المدينه</option>
                                                {
                                                    this.state.cities.map(item => (
                                                        <option key={item.value} value={item.id}>
                                                            {item.name}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs="12" sm="6">
                                        <div className="input_grop">
                                            <Label for="examplePhone">اسم الإعلان</Label>
                                            <Input
                                                type        = "name"
                                                name        = "name"
                                                id          = "exampleName"
                                                value       = {this.state.name}
                                                onChange    = {e => {this.setState({name : e.target.value})}}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <div className="input_grop">
                                            <Label for="examplePhone">السعر</Label>
                                            <Input
                                                type        = "price"
                                                name        = "price"
                                                id          = "examplePrice"
                                                value       = {this.state.price}
                                                onChange    = {e => {this.setState({price : e.target.value})}}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <div className="input_grop">
                                            <Label for="examplePhone">رقم الهاتف</Label>
                                            <Input
                                                type        = "phone"
                                                name        = "phone"
                                                id          = "examplePhone"
                                                value       = {this.state.phone}
                                                onChange    = {e => {this.setState({phone : e.target.value})}}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <div className="input_grop">
                                            <Label for="examplePhone">تفاصيل الإعلان</Label>
                                            <Input
                                                type        = "details"
                                                name        = "details"
                                                id          = "exampleDetails"
                                                value       = {this.state.details}
                                                onChange    = {e => {this.setState({details : e.target.value})}}
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <Button
                                    color                   = "info"
                                    className               = "btn_button"
                                    type                    = "submit"
                                >
                                    إرسال
                                </Button>

                            </Form>

                        </Container>
                    </div>

                </div>

            </div>

        )
    }
}

export default AddAdv;
