import {Component, OnInit} from '@angular/core';
import {
  ActivatedRoute,
  Event,
  Router,
} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  public isFeed: boolean = false;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((url: Event) => {
      const splitUrl = this.removePunctuation(this.router.url);
      this.isFeed = splitUrl.some((str) => str === 'search');
    });
  }

  removePunctuation(inputString: string) {
    // Regular expression to match all punctuation characters
    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

    // Use replace() function with the regex to remove all punctuation
    const stringWithoutPunctuation = inputString.replace(regex, ' ');

    return stringWithoutPunctuation.split(' ').filter((str) => str != '');
  }
}
