import { ReactHttpClient } from '../public_api';

let httpClient = new ReactHttpClient();

httpClient
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .subscribe(response => {
        console.log(response);
    })