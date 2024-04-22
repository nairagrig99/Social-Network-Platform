import {ConstructorMixin} from "@app/core/type/constructor.type";
import {SvgBaseIcon} from "@app/core/components/svg-base-icon";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

export function SvgIcon<T extends ConstructorMixin>(Base: T) {
  return class SvgIcon extends SvgBaseIcon {
    constructor(public override matIconRegistry: MatIconRegistry,
                public override domSanitizer: DomSanitizer) {
      super(matIconRegistry, domSanitizer);
      this.svgIconShow();
    }
  }
}
export function UnsubscribeMixin<T extends ConstructorMixin>(Base: T) {
  return class UnsubscribeMixin extends Base implements OnDestroy {
    constructor(...args: any[]) {
      super()
    }

    ngUnsubscribe: Subject<void> = new Subject<void>();

    public  unsubscribe(): void {
      this.ngUnsubscribe.next()
      this.ngUnsubscribe.complete()
    }

    ngOnDestroy(): void {
      this.unsubscribe()
    }
  }
}
