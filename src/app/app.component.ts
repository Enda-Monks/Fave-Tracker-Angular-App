/********************************************************************************* 
* WEB422 – Assignment 6
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source 
* (including web sites) or distributed to other students. 
* 
* Name: Kathleen Monks | Student ID: 144 994 209 | Date: 2022-04-08
*
* Angular App (Deployed) Link: https://mellifluous-hummingbird-a23fae.netlify.app
*
* User API (Heroku) Link: https://thawing-tundra-19265.herokuapp.com/api/user
* ********************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'web422-a6';
  searchString: string = "";
  public token: any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
      this.router.events.subscribe((event: Event) => {
          if (event instanceof NavigationStart) { 
              this.token = this.auth.readToken();
          }
      });
  }

  handleSearch(): void {
      this.router.navigate(['/search'], { queryParams: { q: this.searchString }, });
      this.searchString = ""; 
  }

  logout(){
      localStorage.clear();
      this.router.navigate(['/login']);
  }
}
