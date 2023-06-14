import axios from 'axios';

const axiosInstance = axios.create({baseURL: 'https://node.mybeatcoach.com/api/'});

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
export const sendMessage = async (channelId, userId, message) => {
    let token = await localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }
    console.log('MESSAGE TEXT', channelId)
    console.log('MESSAGE TEXT', userId)
    console.log('MESSAGE TEXT', message)
    let dataMessage = {
        "channel_id": channelId,
        "user_id": userId,
        "content": message
    }
    return new Promise((resolve, reject) => {
        axiosInstance.post('messages', dataMessage , {headers}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}
