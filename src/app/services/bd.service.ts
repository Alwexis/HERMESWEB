import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  private _baseUrl = 'https://144.22.37.132:3000/Hermes';
  private _apiKey = '309a44b9-9bc4-5f34-94bc-ed7e821d34b8';
  onPost = new EventEmitter<any>();

  constructor(private _http: HttpClient) { }

  async get(url: string) {
    const response: any = await new Promise((resolve, reject) => {
      try {
        this._http.get(this._baseUrl + url, {
          headers: {
            'ApiKey': this._apiKey
          }
        }).pipe(take(1)).subscribe({
          next: data => { resolve(data) },
          error: error => { reject(error) }
        })
      } catch (error) {
        reject(error);
      }
    });
    return response;
  }

  async post(url: string, data: any) {
    const response: any = await new Promise((resolve, reject) => {
      try {
        this._http.post(this._baseUrl + url, data, {
          headers: {
            'ApiKey': this._apiKey
          }
        }).pipe(take(1)).subscribe({
          next: data => { resolve(data) },
          error: error => { reject(error) }
        })
      } catch (error) {
        reject(error);
      }
    });
    this.onPost.emit(response);
    return response;
  }

  async patch(url: string, id: string, data: any) {
    const { _id, ...updateData } = data;
    const response: any = await new Promise((resolve, reject) => {
      try {
        this._http.patch(this._baseUrl + url, {
          query: { id: id },
          newData: updateData
        },
        {
          headers: {
            'ApiKey': this._apiKey
          }
        }).pipe(take(1)).subscribe({
          next: data => { resolve(data) },
          error: error => { reject(error) }
        })
      } catch (error) {
        reject(error);
      }
    });
    return response;
  }

  async delete(url: string, id: string) {
    const response: any = await new Promise((resolve, reject) => {
      try {
        this._http.delete(this._baseUrl + url, {
          body: {
            id
          },
          headers: {
            'ApiKey': this._apiKey
          }
        }).pipe(take(1)).subscribe({
          next: data => { resolve(data) },
          error: error => { reject(error) }
        })
      } catch (error) {
        reject(error);
      }
    });
    return response;
  }
}
