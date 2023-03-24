import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(pageName:string) {
    (async() => {
      let promise = await this.saveUserId();
    })();

    if (environment.userID != "") {
      this.router.navigate([`${pageName}`]);
    }
  }


  async saveUserId() : Promise<any> {
    environment.userID = "641b97ad0df3d227f1daeb5e";
  }
}