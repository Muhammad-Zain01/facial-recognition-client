import axios from 'axios';

export const UploadImage = async (data) => {
    let url = `${import.meta.env.VITE_SERVER_URL}/upload`;

    const body = new FormData();
    body.append('data', JSON.stringify(data));
    let config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: url,
        data: body
    };

    return await axios.request(config)
        .then((response) => response.data)
        .catch((error) => { console.log(error) });
}
export const RegisterUser = async (path_id) => {
    let url = `${import.meta.env.VITE_SERVER_URL}/register`;

    const body = new FormData();
    body.append('path', path_id);
    let config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: url,
        data: body
    };

    return await axios.request(config)
        .then((response) => response.data)
        .catch((error) => { console.log(error) });
}

export const CheckUser = async (image) => {
    let url = `${import.meta.env.VITE_SERVER_URL}/check`;

    const body = new FormData();
    body.append('img', image);
    let config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: url,
        data: body
    };

    return await axios.request(config)
        .then((response) => response.data)
        .catch((error) => { console.log(error) });
}