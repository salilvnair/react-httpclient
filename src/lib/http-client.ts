import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { Observable } from 'rxjs';



export class ReactHttpClient {
  private _httpClient: AxiosInstance;
  
  constructor(
    requestInterceptor?: any,
    responseInterceptor?: any,
    errorHandler?: any
  ) {
    this._httpClient = axios.create();
    if(requestInterceptor) {
      this._httpClient.interceptors.request.use(
        request => requestInterceptor(request),
        error => errorHandler(error)
      );
    }
    if(responseInterceptor) {
      this._httpClient.interceptors.response.use(
        response => responseInterceptor(response),
        error => errorHandler(error)
      );
    }
  }

  private _invokeHttpRequest<T>(method: string, url: string, queryParams?: object, body?: object) {
    let request: AxiosPromise<T>;
    switch (method) {
      case 'GET':
        request = this._httpClient.get<T>(url, {params: queryParams});
        break;
      case 'POST':
        request = this._httpClient.post<T>(url, body, {params: queryParams});
        break;
      case 'PUT':
        request = this._httpClient.put<T>(url, body, {params: queryParams});
        break;
      case 'PATCH':
        request = this._httpClient.patch<T>(url, body, {params: queryParams});
        break;
      case 'DELETE':
        request = this._httpClient.delete(url, {params: queryParams});
        break;
    
      default:
        throw new Error('Method not supported');
    }
    return new Observable<Response>(subscriber => {
      request.then(axiosResponse => {
        let response:Response = new Response();
        let { data, headers, status, statusText, config } = axiosResponse;
        response.data = data;
        response.headers = headers;
        response.status = status;
        response.statusText = statusText;
        response.config = config;
        subscriber.next(response);
        subscriber.complete();
      }).catch((err: Error) => {
        subscriber.error(err);
        subscriber.complete();
      });
    });
  }

  public get<T>(url: string, queryParams?: object) {
    return this._invokeHttpRequest<T>('GET', url, queryParams);
  }

  public post<T>(url: string, body: object, queryParams?: object) {
    return this._invokeHttpRequest<T>('POST', url, queryParams, body);
  }
  
  public put<T>(url: string, body: object, queryParams?: object) {
    return this._invokeHttpRequest<T>('PUT', url, queryParams, body);
  }

  public patch<T>(url: string, body: object, queryParams?: object) {
    return this._invokeHttpRequest<T>('PATCH', url, queryParams, body);
  }
  
  public delete(url: string, queryParams?: object) {
    return this._invokeHttpRequest('DELETE', url, queryParams);
  }
}

export class Response {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
}