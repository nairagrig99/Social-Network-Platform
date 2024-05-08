import {ConstructorMixin} from "@app/core/type/constructor.type";
import {inject, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

export function SvgIcon<T extends ConstructorMixin>(Base: T) {
  return class SvgIcon extends Base {
    public matIconRegistry = inject(MatIconRegistry);
    public domSanitizer = inject(DomSanitizer);

    public svgIconShow(svgName: string) {
      this.matIconRegistry?.addSvgIcon(
        `${svgName}`,
        this.domSanitizer?.bypassSecurityTrustResourceUrl(`assets/svg/${svgName}.svg`)
      );
    }
  }
}

export function UnsubscribeMixin<T extends ConstructorMixin>(Base: T) {
  return class UnsubscribeMixin extends Base implements OnDestroy {
    constructor(...args: any[]) {
      super()
    }

    ngUnsubscribe: Subject<void> = new Subject<void>();

    public unsubscribe(): void {
      this.ngUnsubscribe.next()
      this.ngUnsubscribe.complete()
    }

    ngOnDestroy(): void {
      this.unsubscribe()
    }
  }
}
