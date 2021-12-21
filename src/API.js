import axios from 'axios';
require('dotenv').config()
const baseURL = 'http://localhost:3000';

const products = {
    getAll: () => axios.get(`${baseURL}/productos`),
    getOne: (id) => axios.get(`${baseURL}/productos/${id}`),
    create: (item) => axios.post(`${baseURL}/productos`, item),
    modify: (item) => axios.put(`${baseURL}/productos/${item.id}`, item),
    delete: (id) => axios.delete(`${baseURL}/productos/${id}`),
};

export default {
    products
};