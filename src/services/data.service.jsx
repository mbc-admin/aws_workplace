import axios from 'axios';

const axiosInstance = axios.create({baseURL: 'https://node.innobing.net/api/', responseType: 'json'});


/**
 * Recoge los articulos
 * */
export const getArticles = async () => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
    }
    return new Promise((resolve, reject) => {
        axiosInstance.get('post_categories', {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * Recoge las especialidades
 * */
export const getSpecialities = async () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    return new Promise((resolve, reject) => {
        axiosInstance.get('specialities', {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}
