
import axios from "axios";
import CONST from "../const/api";


export const getAbout = lang => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'aboutUs',
            method      : 'POST',
            data        : { lang }
        }).then(response => {
            dispatch({type: 'getAbout', payload: response.data});
        });
    }
};
