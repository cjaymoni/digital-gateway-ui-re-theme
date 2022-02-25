import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppClickableDirective } from './clickable.directive';
import { AppClickConfirmDirective } from './click-confirm.directive';
import { AppProceedIfLoggedDirective } from './click-if-logged-in.directive';
import { AppAutofocusDirective } from './autofocus.directive';
import { EnterPressedDirective } from './enter-pressed.directive';
import { AppShellNoRenderDirective } from './app-shell-no-render.directive';
import { AppShellRenderDirective } from './app-shell-render.directive';

@NgModule({
  declarations: [
    AppClickableDirective,
    AppClickConfirmDirective,
    AppProceedIfLoggedDirective,
    AppAutofocusDirective,
    EnterPressedDirective,
    AppShellNoRenderDirective,
    AppShellRenderDirective,
  ],
  imports: [CommonModule],
  exports: [
    AppClickableDirective,
    AppClickConfirmDirective,
    AppProceedIfLoggedDirective,
    AppAutofocusDirective,
    EnterPressedDirective,
    AppShellRenderDirective,
    AppShellNoRenderDirective,
  ],
})
export class DirectivesModule {}
