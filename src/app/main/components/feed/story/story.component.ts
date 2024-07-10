import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {StoryDialogComponent} from "@main/components/feed/story/story-dialog/story-dialog.component";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss'
})
export class StoryComponent {
  constructor(public dialog: MatDialog) {
  }

  public imageUrl: any[] = [];

  public selectImage(event: any) {

    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      this.imageUrl.push(reader.result)
    }
    reader.readAsDataURL(file);
  }

  public openStory(): void {
    this.dialog.open(StoryDialogComponent, {
      data: {
        imageUrl: this.imageUrl
      },
    });
  }

}
