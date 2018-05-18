import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pets = [];
  constructor(private _httpService: HttpService, private _router: Router) { }
  sorted = false;
  ngOnInit() {
    this.getPets(false);
  }

  getPets(bool){
    console.log(bool)
    let obs = this._httpService.getPets(bool);
    obs.subscribe( data =>{
      this.pets = data['pets'];
      console.log(data['pets']);
    })
  }
  toggleSort(){
    this.sorted = !this.sorted;
    if(this.sorted){
      this.getPets(true);
    }else{
      this.getPets(false);
    }
  }
  viewPet(pet){
    this._router.navigate(['/PetsApp/' + pet]);
  }

  editPet(pet){
    this._router.navigate(['/PetsApp/' + pet + "/edit"]);
  }
}
