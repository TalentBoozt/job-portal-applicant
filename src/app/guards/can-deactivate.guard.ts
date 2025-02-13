import {Injectable} from '@angular/core';
import {CanDeactivateFn} from "@angular/router";


export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard {
  canDeactivate: CanDeactivateFn<CanComponentDeactivate> = (component: CanComponentDeactivate) => {
    return component.canDeactivate ? component.canDeactivate() : true;
  };
}
