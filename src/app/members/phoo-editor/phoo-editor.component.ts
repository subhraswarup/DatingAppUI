import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-phoo-editor',
  templateUrl: './phoo-editor.component.html',
  styleUrls: ['./phoo-editor.component.css']
})
export class PhooEditorComponent implements OnInit {
@Input() photos: Photo[];
 uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initializeUploader();
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'user/' + this.authService.decodedToken.nameid + '/phots',
      authToken: 'Bearer' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    })
  }
}
