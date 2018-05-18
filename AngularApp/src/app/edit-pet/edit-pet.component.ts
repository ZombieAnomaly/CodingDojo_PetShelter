import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {

  errors = [];
  editPet = {}
  petID = "";
  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getPetInfo();
  }

  getPetInfo(){
    this._route.params.subscribe((params: Params) => {
      this.petID = params['id'];
      let obs = this._httpService.getPet(this.petID)
      obs.subscribe( data =>{
        this.editPet = {
          name: data['pet'].name,
          type: data['pet'].type,
          description: data['pet'].description,
          skills: data['pet'].skills
        };
      })
    });
  }

  cancel(){
    this.errors= [];
    this._router.navigate(['/PetsApp']);
  }

  editThisPet(){
    this.errors= [];
    console.log(this.editPet);
    let obs = this._httpService.editPet(this.petID, this.editPet)
    obs.subscribe( data =>{
      console.log(data);
      if(data['error']){
        for(let e in data['error'].errors){
          this.errors[this.errors.length] = data['error'].errors[e]
        }
        
        console.log(this.errors);
      }else{
        this._router.navigate(['/PetsApp']);
      }
    })
  }

}
