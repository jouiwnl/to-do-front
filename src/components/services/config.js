import axios from 'axios';

export const http = axios.create({
    baseURL: 'http://ec2-18-230-113-105.sa-east-1.compute.amazonaws.com:3335/'
    //baseURL: 'http://localhost:3335/'
});