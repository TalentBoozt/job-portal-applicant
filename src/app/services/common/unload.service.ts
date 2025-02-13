import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnloadService {
  private hasUnsavedChanges: boolean = false;

  constructor(private ngZone: NgZone) {
    window.addEventListener('beforeunload', (event) => {
      if (this.hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = ''; // This will trigger the confirmation dialog
      }
    });
  }

  setUnsavedChanges(value: boolean) {
    this.ngZone.run(() => {
      this.hasUnsavedChanges = value;
    });
  }

  promptCustomUnload(): boolean {
    if (this.hasUnsavedChanges) {
      return confirm("If you reload the page, all of your data will be erased. Please navigate to overview and reload again.");
    }
    return true;
  }
}
