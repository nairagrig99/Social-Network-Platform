import {Component, OnInit} from '@angular/core';
import {AuthService} from "@auth/service/auth.service";
import {ActivatedRoute, Router, PRIMARY_OUTLET, NavigationEnd} from "@angular/router";
import {AuthUserInterface} from "@auth/interface/auth-user.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlBase} from "@app/shared/base-class/form-control-base";
import {filter} from "rxjs";
import {NamedOutletEnum} from "@app/shared/enums/named-outlet.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent extends FormControlBase implements OnInit {
  public userItem!: AuthUserInterface;
  public allUser!: AuthUserInterface[];
  public searchForm!: FormGroup;
  public namedOutlet = NamedOutletEnum;
  public outletName!: string;

  constructor(private store: AuthService,
              private route: Router,
              private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.userItem = this.store.getSignInUser();
    this.allUser = this.store.getAllUserListFromLocaleToStorage();
    this.initForm();
    this.getRouterOutletName();
  }

  private initForm() {
    this.searchForm = this.formBuilder.group({
      search: [null]
    })
  }

  public openSearchPanel(): void {
    const searchURL = ['/main', {outlets: {searchOutlet: ['search']}}];
    this.route.navigate(['/main', {outlets: {feedOutlet: null}}], {skipLocationChange: true}).then(() => {
      this.route.navigate(searchURL, {state: this.searchForm.value});
    });
  }

  public showFeed(): void {
    const feedURL = ['/main', {outlets: {feedOutlet: ['feed']}}];
    this.route.navigate(['/main', {outlets: {searchOutlet: null}}], {skipLocationChange: true}).then(() => {
      this.route.navigate(feedURL);
    });
  }

  private getRouterOutletName(): void {

    this.route.events.subscribe(() => {
      const primaryRouter = this.route.routerState.snapshot.root;
      const findOutletName = (route: any) => {
        if (route.outlet !== PRIMARY_OUTLET) {
          return route.outlet;
        }
        for (const child of route.children) {
          const outletName: string = findOutletName(child);
          if (outletName) {
            return outletName;
          }
        }
        return PRIMARY_OUTLET;
      }
      this.outletName = findOutletName(primaryRouter);
    })

  }

}
