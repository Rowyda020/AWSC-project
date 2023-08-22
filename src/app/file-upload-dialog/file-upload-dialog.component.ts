import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.css']
})
export class FileUploadDialogComponent {
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file:any;
   File = null; // Variable to store file
}
