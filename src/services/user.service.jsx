import axios from 'axios';

const axiosInstance = axios.create({baseURL: 'https://node.mybeatcoach.com/api/', responseType: 'json'});

/**
 * Iniciar sesion
 * */
export const login = (email, pass) => {
    const headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    return new Promise((resolve, reject) => {
        axiosInstance.post('login', {email: email, password: pass}, {headers}).then(res => {
            console.log('THEN LOGIN', res)
            localStorage.setItem('token', res.data.user.token);
            localStorage.setItem('USER', JSON.stringify(res.data));
            resolve(res);
        }).catch(err => {
            console.log('CATCH LOGIN')
            reject(err);
        })
    })
}

/**
 * Cerrar sesion
 * */
export const logout = async () => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
    }
    return new Promise((resolve, reject) => {
        axiosInstance.get('logout', {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * Recoge el perfil del usuario
 * */
export const getProfile = () => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
    }
    return new Promise((resolve, reject) => {
        axiosInstance.get('my_profile', {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * Edita la imagen de perfil
 * */
export const editProfileImage = (image) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
    }
    const data = {
        file: image
    }
    return new Promise((resolve, reject) => {
        axiosInstance.post('update_profile_image', data, {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}
