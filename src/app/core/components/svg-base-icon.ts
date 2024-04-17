import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

export class SvgBaseIcon {

  constructor(public matIconRegistry: MatIconRegistry,
              public domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon(
      'left',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/left.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'right',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/right.svg'),
    );
  }

}
