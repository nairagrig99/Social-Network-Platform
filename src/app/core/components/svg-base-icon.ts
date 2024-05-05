import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Injectable} from "@angular/core";

export abstract class SvgBaseIcon {
  protected constructor(public matIconRegistry: MatIconRegistry,
                        public domSanitizer: DomSanitizer) {
  }

  protected svgIconShow() {
    this.matIconRegistry?.addSvgIcon(
      'left',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/left.svg')
    );
    this.matIconRegistry?.addSvgIcon(
      'right',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/right.svg'),
    );
    this.matIconRegistry?.addSvgIcon(
      'arrow',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/arrow.svg')
    );
    this.matIconRegistry?.addSvgIcon(
      'eye',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/password-eye.svg')
    )
  }

}
