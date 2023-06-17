import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProfileService} from "../../services/profile.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {RecommendRefreshService} from "../../services/recommend-refresh.service";

@Component({
  selector: 'app-avatar-upload-dialog',
  templateUrl: './avatar-upload-dialog.component.html',
  styleUrls: ['./avatar-upload-dialog.component.css']
})
export class AvatarUploadDialogComponent {

  message: string = "";
  public result: any;
  selectedFile?: File;
  fileAttr = 'Choose Image from Disk';
  form: FormGroup = new FormGroup({});

  uploadAvatarForm = this.formBuilder.group({
    avatar: [''],
  });

  constructor(private router: Router, public dialogRef: MatDialogRef<AvatarUploadDialogComponent>,
              private formBuilder: FormBuilder,private profileApi: ProfileService, private refreshApi: RecommendRefreshService) {
  }

  uploadFileEvt(file: any) {
    if(file.target.files[0]){
      this.selectedFile = file.target.files[0];
      if (this.selectedFile?.name){
        this.fileAttr =  this.selectedFile?.name;
      }
    }
  }

  onClickSubmit(): void {

    let submitFormData = new FormData();
    const formData = this.uploadAvatarForm.value;

    if (this.uploadAvatarForm.value.avatar && this.selectedFile){
      submitFormData.append("avatar", this.selectedFile);
    }

    this.profileApi.uploadAvatar(submitFormData).subscribe({
      next: (rsp :any) => {
        if (rsp.data != false) {
          this.refreshApi.recommendRefresh(rsp.data);
          this.dialogRef.close(this.result);
          this.router.navigate(['me'])
        }
      },
      error: (err) => {
        console.log(err)
        if (err.error?.message){
          this.message = err.error?.message;
        }else{
          if (err.error?.data?.error){
            this.message = err.error?.data?.error;
          }else {
            if (err.message){
              this.message = err.message;
            }
          }
        }
      },
      complete: () => {
      }
    });

  }

}
