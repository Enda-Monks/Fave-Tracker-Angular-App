import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = {userName: "", 
                       password: "", 
                      _id: ""};
                      
  public warning: string = "";
  public loading: boolean = false;

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {}

  onSubmit(f: NgForm): void {
      if( this.user.userName && 
          this.user.password  ) { //ensure fields populated

            this.loading = true;
            
            this.auth.login(this.user).subscribe({ // with user-api
                next: success=>{
                    this.loading = false; 
                    localStorage.setItem('access_token',success.token); 
                    this.router.navigate(['/newReleases']);
                },
                error: err=>{
                    this.warning= err.error.message;
                    this.loading = false;
                }
            });
      }
  }
}
