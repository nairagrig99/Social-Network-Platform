import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SvgIcon} from "@app/shared/input-calendar/input-calendar-window/base-mixin";
import {BehaviorSubject, map, combineLatest, Observable, of} from "rxjs";
import {DirectionEnum} from "@app/shared/enums/direction-enum";


interface DialogData {
  imageUrl: []
}

@Component({
  selector: 'app-story-dialog',
  templateUrl: './story-dialog.component.html',
  styleUrl: './story-dialog.component.scss'
})
export class StoryDialogComponent extends SvgIcon(class {
}) implements OnInit {

  public directionEnum = DirectionEnum;

  public currentImage$!: Observable<unknown[]>;
  private currentImageIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    super();
    this.svgIconShow('left');
    this.svgIconShow('right');
  }

  public changeStory(currentImage?: string): void {
    let imageIndex: number = this.currentImageIndex$.getValue();

    const lastImage = this.data.imageUrl.length - 1;

    this.currentImageIndex$.next(
      currentImage === this.directionEnum.NEXT && imageIndex < this.data.imageUrl.length - 1 ? ++imageIndex :
        currentImage === this.directionEnum.PREV && imageIndex > 0 ? --imageIndex :
          currentImage === this.directionEnum.PREV && imageIndex === 0 ? lastImage : 0)

  }

  ngOnInit(): void {
    this.slideImage();
  }

  private slideImage(): void {

    this.currentImage$ = combineLatest([of(this.data?.imageUrl), this.currentImageIndex$])
      .pipe(map(([imageUrl, currentImageIndex]) => {
          return imageUrl.filter((img, index) => index === currentImageIndex)
        })
      )
  }

}
