import axios from 'axios';

const axiosInstance = axios.create({baseURL: 'https://node.innobing.net/api/', responseType: 'json'});

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
 * Recoge los eventos del calendario del usuario
 * */
export const getCalendar = (idUser) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
    }
    return new Promise((resolve, reject) => {
        axiosInstance.get(`get_working_hours/${idUser}`, {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}
/**
 * Recoge los dias festivos
 * */
export const getHolidaysDays = (idUser) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
    }
    return new Promise((resolve, reject) => {
        axiosInstance.get(`holidays`, {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * Edita la imagen de perfil
 * */
export const editProfileImage = async (formData) => {

    const headers = {
        'Accept':'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': localStorage.getItem('token')
    }

    const data = {
        files: {
            file: formData
        }
    }


    return new Promise((resolve, reject) => {
        axiosInstance.post('update_profile_image', formData, {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * Edita la descripcion del usuario
 * */
export const editDescription = (description) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
    }
    const data = {
        description: description
    }
    return new Promise((resolve, reject) => {
        axiosInstance.post('update_description', data, {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * Cambia el estado del usuario
 * */
export const changeStatus = (status) => {
    console.log('ESTADO', status)
    return new Promise((resolve, reject) => {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token')
        }

        const data = {
            status: status
        }

        axiosInstance.post('update_coach_status', data, {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}
