import { ReactHttpClient } from '../public_api';

const requestInterceptor = (request) => {
    request.headers['token'] = 'tokentest12345'
}

let httpClient = new ReactHttpClient(requestInterceptor);

httpClient
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .subscribe(response => {
        console.log(response);
    })