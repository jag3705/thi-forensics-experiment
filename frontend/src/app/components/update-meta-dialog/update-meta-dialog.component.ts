import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {ProfileService, StudentMeta} from "../../services/profile.service";
import {RecommendRefreshService} from "../../services/recommend-refresh.service";

@Component({
  selector: 'app-update-meta-dialog',
  templateUrl: './update-meta-dialog.component.html',
  styleUrls: ['./update-meta-dialog.component.css']
})
export class UpdateMetaDialogComponent {
  message: string = '';
  public result: any;
  form: FormGroup = new FormGroup({});
  updateMetaForm = this.formBuilder.group({
    bio: [''],
  });

  constructor(private router: Router, public dialogRef: MatDialogRef<UpdateMetaDialogComponent>,
              private formBuilder: FormBuilder, private profileApi: ProfileService, private refreshApi: RecommendRefreshService) {
  }

  ngOnInit() {
    this.profileApi.getProfile().subscribe((rsp: any) => {
      if (rsp.data != false) {
        this.updateMetaForm.setValue({bio: rsp.data[0].bio});
      }
    });
  }

  public onClickSubmit(): void {
    let bio = this.updateMetaForm.value.bio;
    if (!bio) {
      return;
    }
    let meta: StudentMeta = {
      bio: bio
    }

    this.profileApi.updateMeta(meta).subscribe({
      next: (rsp: any) => {
        if (rsp.data != false) {
          this.refreshApi.recommendRefresh(rsp.data);
          this.dialogRef.close(this.result);
          this.router.navigate(['me'])
        }
      },
      error: (err) => {
        console.log(err)
        if (err.error?.message) {
          this.message = err.error?.message;
        } else {
          if (err.error?.data?.error) {
            this.message = err.error?.data?.error;
          } else {
            if (err.message) {
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
