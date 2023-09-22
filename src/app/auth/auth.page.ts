import { Component, OnInit } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Router } from '@angular/router';

import awsExports from '../../aws-exports.js';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(public router: Router, public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }

  ngOnInit() {
  }

  goToRoomList() {
    this.router.navigateByUrl("/room-list")
  }

}
