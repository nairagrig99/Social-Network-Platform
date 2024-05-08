import {Component, OnInit} from '@angular/core';
import {AuthService} from "@auth/service/auth.service";
import {Router} from "@angular/router";
import {AuthUserInterface} from "@auth/interface/auth-user.interface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public userItem!: AuthUserInterface;

  constructor(private store: AuthService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.userItem = this.store.getSignInUser();
  }
}
