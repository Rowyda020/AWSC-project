import { FileUploadDialogComponent } from './../file-upload-dialog/file-upload-dialog.component';
import { FileUploadService } from './../file-upload.service';
import { Component } from '@angular/core';
// import { FileUploadService } from './FileUploadServ';
import { ApiService } from '../services/api.service';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  providers: [ GlobalService ],

  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  loading: boolean = false; // Flag variable
  file:any;
   File = null; // Variable to store file

  // Inject service 
  constructor(private api: ApiService, public shortLink: GlobalService) { }

  ngOnInit(): void {
    console.log("shortlink oninit",this.shortLink)

  }

  // On file Select
  onChange(event:any) {
    alert('filleeee')

      this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {

      this.loading = !this.loading;
      this.api.upload(this.file).subscribe(
          (event: any) => {
              if (typeof (event) === 'object') {

                  // Short link via api response
                  this.shortLink = event.link;

                  this.loading = false; // Flag variable 
                  console.log("shortlink",this.shortLink)
              }
          }
      );
  }
}

