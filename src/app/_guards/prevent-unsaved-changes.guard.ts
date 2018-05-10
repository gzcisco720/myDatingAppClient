import { UserEditComponent } from './../Auth/user-edit/user-edit.component';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { rendererTypeName } from '@angular/compiler';

Injectable();
export class PreventUnsavedChangesGuard implements CanDeactivate<UserEditComponent> {

  canDeactivate(component: UserEditComponent): boolean | Observable<boolean> | Promise<boolean> {
    if (component.editForm.dirty) {
      return confirm('Changes haven\'t been saved, Do you really want to leave this page?');
    }
    return true;
  }
}
