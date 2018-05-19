import { Observable } from 'rxjs/Observable';
import { RequestOptions, Headers, Response } from '@angular/http';

export const headerConfig = () => {
  const headers = new Headers({'Content-Type': 'application/json'});
  return new RequestOptions({headers: headers});
};

export const getErrorMessage = (error) => {
  const applicationError = error.headers.get('Application-Error');
  if (applicationError) {
    return Observable.throw('Server Internal Error');
  }
  if (error.status === 401) {
    return Observable.throw('Authentication Failed');
  }
  if (error instanceof Response) {
    const errorJson = error.json();
    const errorArray = Object.keys(errorJson).map(key => {
      let returnString = `${key}: `;
      if (Array.isArray(errorJson[key])) {
        for (let i = 0; i < errorJson[key].length; i++) {
          returnString += `${errorJson[key][i]}`;
        }
      }
      return returnString;
    }).reverse();
    return Observable.throw(errorArray);
  }
  return Observable.throw(error.error);
};

export const jwt = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const headers = new Headers({'Authorization': 'Bearer ' + token});
    headers.append('Content-Type', 'application/json');
    return new RequestOptions({headers: headers});
  }
  return new RequestOptions();
};
