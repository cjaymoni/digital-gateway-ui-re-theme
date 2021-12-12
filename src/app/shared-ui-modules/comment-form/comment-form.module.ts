import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from './comment-form.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ClickOutsideModule } from 'ng-click-outside';
@NgModule({
  imports: [
    CommonModule,
    InputTextareaModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    DirectivesModule,
    ClickOutsideModule,
  ],
  declarations: [CommentFormComponent],
  exports: [CommentFormComponent],
})
export class CommentFormModule {}
