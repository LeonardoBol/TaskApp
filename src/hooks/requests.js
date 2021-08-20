import { useState, useEffect } from 'react';
import axios from "axios";
import { message } from "antd";

export const useGetsData = (url) => {
    const [result, setResult] = useState({
        data: [],
        loading: true
    })

    useEffect(() => {
        async function requestData() {
            try {
                const resp = await axios.get(`http://localhost:5000/api/${url}`);
                const { status, data } = await resp;
                console.log(data)
                if (status === 200) {
                    console.log("Petición GET exitosa");
                    setResult({ data, loading: false });
                }
            } catch (e) {
                console.log("Peticion GET fallida:", e);
                setResult({ data: [], loading: false });
                message.error({ content: 'Ocurrio un error', duration: 2, style: { marginTop: '15vh' } });
            }
        }
        requestData();
    },
        [url]
    )
    return result
}


export const useDeleteData = (url, id) => {


    async function requestData() {
        try {
            const resp = await axios.delete(`http://localhost:5000/api/${url}`, {data: id});
            const { status, data } = await resp;
            if (status === 200) {
                console.log("Petición DELETE exitosa");
            }
        } catch (e) {
            console.log("Peticion POST fallida:", e);
            message.error({ content: 'Ocurrio un error', duration: 2, style: { marginTop: '15vh' } });
        }
    }
    requestData();
}

export const useCreateData = ( {url, taskData} ) => {
    const [result, setResult] = useState({message:""});

    async function requestData() {
        try {
            const resp = await axios({
                url: `http://localhost:5000/api/${url}`,
                method: 'POST',
                data: taskData
            })
            const { status, message } = await resp;
            if (status === 200) {
                console.log("Petición POST exitosa");
                setResult({message});
            }
        } catch (e) {
            console.log("Peticion POST fallida:", e);
            message.error({ content: 'Ocurrio un error', duration: 2, style: { marginTop: '15vh' } });
        }
    }
    requestData()
    return result
}