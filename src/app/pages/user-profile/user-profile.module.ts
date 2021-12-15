import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutesModule } from './user-profile-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { ImageUploadModule } from 'src/app/shared-ui-modules/image-upload/image-upload.module';
import { ProfileTypeAutocompleteModule } from '../../shared-ui-modules/profile-type-autocomplete/profile-type-autocomplete.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserProfileRoutesModule,
    InputTextModule,
    ButtonModule,
    AvatarModule,
    DividerModule,
    InputTextareaModule,
    InputMaskModule,
    ImageUploadModule,
    ProfileTypeAutocompleteModule,
  ],
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent],
})
export class UserProfileModule {}
