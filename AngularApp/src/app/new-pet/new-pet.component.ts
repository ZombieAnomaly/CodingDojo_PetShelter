import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.css']
})
export class NewPetComponent implements OnInit {
  errors = [];
  newPet = {
    name: "",
    type: "",
    description: "",
    skills: []
  }
  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
  }

  cancel(){
    this.errors= [];
    this._router.navigate(['/PetsApp']);
  }

  createPet(){
    this.errors= [];
    console.log(this.newPet);
    let obs = this._httpService.createPet(this.newPet)
    obs.subscribe( data =>{
      console.log(data);
      if(data['error']){
        for(let e in data['error'].errors){
          this.errors[this.errors.length] = data['error'].errors[e]
        }
        if(!data['error'].errors){
          this.errors[this.errors.length] = {message:data['error'].errmsg}
        }
        console.log(this.errors);
      }else{
        this._router.navigate(['/PetsApp']);
      }
    })
  }
}
