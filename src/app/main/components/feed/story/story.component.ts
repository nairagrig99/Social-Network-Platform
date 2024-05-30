import {Component} from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss'
})
export class StoryComponent {

  public imageUrl!: string | ArrayBuffer | null;

  public selectImage(event: any) {

    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      this.imageUrl = reader.result
    }
    reader.readAsDataURL(file);
  }

}
