import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {
  petID = "";
  pet = {};
  likeDisabled = false; 
  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getPetInfo();
  }

  getPetInfo(){
    this._route.params.subscribe((params: Params) => {
      this.petID = params['id'];
      let obs = this._httpService.getPet(this.petID)
      obs.subscribe( data =>{
        this.pet = data['pet'];
      })
    });
  }

  likePet(id){
    let obs = this._httpService.likePet(id);
    obs.subscribe( data => {
      if(data['updated']){
        this.getPetInfo();
      }
    })
   this.likeDisabled = true;
  }

  adoptPet(id){
    let obs = this._httpService.deletePet(id);
    obs.subscribe(data =>{
      console.log(data);
      if(data['error']){
        console.log(data);
      }else{
        this._router.navigate(['/PetsApp']);
      }
    })
  }
}
