import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private authService: AuthService,
    public router: Router) { }

  ngOnInit() {
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  entrar(){
    this.router.navigate(['/user/login']);
  }

  logout(){
    localStorage.removeItem('token');
    this.toastr.show('Log Out');
    this.router.navigate(['/user/login']);
  }

}
