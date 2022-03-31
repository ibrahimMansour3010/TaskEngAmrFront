import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fromgroup:FormGroup|any;
  constructor(private authService:AuthService,private router:Router) {

   }
  ngOnInit(): void {
    this.fromgroup = new FormGroup({
      userNameOrEmail: new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    });
  }
  onSubmit(){
    this.authService.Login(this.fromgroup.value).subscribe({
      next:(res:any)=>{
        if(res.status){
          alert("Success");
          localStorage.setItem("token",res.response.token);
          this.router.navigate(['/Branch']);
        }else{
          alert("Invalid Login");
        } 
      }
    }); 
  }
}
