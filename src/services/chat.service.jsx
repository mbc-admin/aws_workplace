import axios from 'axios';

const axiosInstance = axios.create({baseURL: 'https://node.innobing.net/api/'});

/**
 * Recoge los chats ya se hayan cerrado o esten activos (0 = cerrados || 1 = abiertos)
 * */
export const getConversations = async (status) => {
    let token = await localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }
    return new Promise((resolve, reject) => {
        axiosInstance.get(`channels?status=${status}`, {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * Recoge los mensajes de una conversacion
 * */
export const getChannelMessages = async (channelId) => {
    let token = await localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }
    return new Promise((resolve, reject) => {
        axiosInstance.get(`channels/${channelId}`, {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * Envia un mensaje nuevo
 * */
export const sendMessage = async (channelId, userId, message, file) => {
    let token = await localStorage.getItem('token');
    let headers;
    console.log('FILE SERVICE', file)
    console.log('FILE SERVICE TYPE', typeof file)
    const formData = new FormData();
    formData.append('channel_id', channelId);
    formData.append('user_id', userId);
    formData.append('content', message);
    formData.append('file', file);

    console.log('MESSAGE TEXT', file);
    if (file === null) {
        headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    } else {
        headers = {
            'Accept':'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        }
    }

    let dataMessage = {
        "channel_id": channelId,
        "user_id": userId,
        "content": message
    }

    return new Promise((resolve, reject) => {
        axiosInstance.post('messages', file === null ? dataMessage : formData , {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}


/**
 * Finaliza una sesion
 * */
export const finishSession = async (idChat) => {
    let token = await localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }
    return new Promise((resolve, reject) => {
        axiosInstance.get(`channels/finalize/${idChat}`, {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * Valorar una sesion
 * */
export const rateSession = async (idChat, rate, speciality) => {
    let token = await localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    const data = {
        videocall_rating: rate,
        speciality_id: speciality
    }

    return new Promise((resolve, reject) => {
        axiosInstance.post(`channels/${idChat}/videocall_rate`, data, {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * Recoge las conversaciones finalizadas
 * */
export const getFinishedChats = async () => {
    let token = await localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }
    return new Promise((resolve, reject) => {
        axiosInstance.get('coaches/channels/my_ended_channels', {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

/**
 * Banea un usuario
 * */
export const blockUser = async (idUser, idChannel, reason) => {
    let token = await localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    const data = {
        user_id: idUser,
        channel_id: idChannel,
        reason: reason
    }

    return new Promise((resolve, reject) => {
        axiosInstance.post('bann_user', data, {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}


/**
 * Cambia el estado del coach al entrar a videollamada
 * */
export const changeStatusToEnterVideoCall = async (isChannel) => {
    let token = await localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    const data = {
        channel_id: isChannel
    }

    return new Promise((resolve, reject) => {
        axiosInstance.post('start_videocall', data,  {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}
