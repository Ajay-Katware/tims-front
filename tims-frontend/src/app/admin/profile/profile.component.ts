import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { State } from '../../shared/models/state';
import { CountryStateService } from '../../shared/services/country-state.service';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  countries: string[];
  states: State[];
  user:User;
  constructor(private countryService: CountryStateService, private location: Location, private profileService: UserService) {
    this.countries = this.countryService.getCountries();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("auth_token"));
    this.onSelect(this.user.country);
    console.log("country", this.user.country);
  } 

  onSelect(country) {
    this.states = this.countryService.getStates().filter((item) => item.country === country);
  }

  onSubmit(): void {
    console.log("user", this.user)
    this.profileService.update(this.user);
    this.location.back();
  }

  goBack(): void{
    this.location.back();
  }
}