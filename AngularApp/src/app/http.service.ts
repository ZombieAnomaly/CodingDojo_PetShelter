import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient){}

  getPets(sorted){
    let obs = this._http.get('/pets/' + sorted);
    return obs;
  }
  getPet(id){
    let obs = this._http.get('/pets/details/' + id);
    return obs;
  }
  createPet(pet){
    console.log(pet);
    let obs = this._http.post('/pets', pet);
    return obs;
  }
  editPet(id, data){
    let obs = this._http.put('/pets/' + id, data);
    return obs;
  }
  likePet(id:string){
    let obs = this._http.get('/pets/like/' + id);
    return obs;
  }
  deletePet(id){
    let obs = this._http.delete('/pets/' + id);
    return obs;
  }
}
