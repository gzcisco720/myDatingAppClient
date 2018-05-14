import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from './../Shared/shared.module';
import { AuthRoutes } from './auth.routing';
import { UserEditComponent } from './user-edit/user-edit.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    AuthRoutes,
    SharedModule,
    FileUploadModule
  ],
  declarations: [
    RegisterComponent,
    UserEditComponent,
    PhotoEditorComponent
  ]
})

export class AuthModule { }
