import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AuthService} from "./auth.service";
import {WindowService} from "./common/window.service";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkTheme: boolean = false;
  private currentColorShading: string = 'purple';
  private themeSubject = new BehaviorSubject<boolean>(this.isDarkTheme);
  private colorSubject = new BehaviorSubject<string>(this.currentColorShading);

  constructor(private cookieService: AuthService, private windowService: WindowService) {
    this.loadUserPreferences();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeSubject.next(this.isDarkTheme);
    this.cookieService.setThemeMode(this.isDarkTheme ? 'dark' : 'light');
    this.applyTheme();
  }

  changeColorShading(color: string) {
    this.currentColorShading = color;
    this.cookieService.setThemeColor(color);
    this.applyTheme();
    this.colorSubject.next(this.currentColorShading);
  }

  applyTheme() {
    // Clear previously applied theme
    const _document = this.windowService.nativeDocument;
    if (_document) {
      document.body.classList.remove(
        'theme-blue-light', 'theme-blue-dark',
        'theme-green-light', 'theme-green-dark',
        'theme-orange-light', 'theme-orange-dark',
        'theme-red-light', 'theme-red-dark',
        'theme-purple-light', 'theme-purple-dark',
        'theme-mixed-light', 'theme-mixed-dark'
      );

      // Add the new theme based on color and mode
      const themeClass = `theme-${this.currentColorShading}-${this.isDarkTheme ? 'dark' : 'light'}`;
      document.body.classList.add(themeClass);
    }
  }

  isDarkMode() {
    return this.isDarkTheme;
  };

  getThemeObservable() {
    return this.themeSubject.asObservable();
  }

  getColorObservable() {
    return this.colorSubject.asObservable();
  }

  getCurrentColor() {
    return this.currentColorShading;
  }

  /**
   * Load the user's theme preferences from cookies
   */
  private loadUserPreferences() {
    const savedThemeMode = this.cookieService.getThemeMode();
    const savedColorShading = this.cookieService.getThemeColor();

    // Check if user preferences are saved in cookies
    if (savedThemeMode) {
      this.isDarkTheme = (savedThemeMode === 'dark');
    } else {
      this.detectDefaultTheme(); // Detect default theme from the browser
    }

    if (savedColorShading) {
      this.currentColorShading = savedColorShading;
    }

    this.themeSubject.next(this.isDarkTheme);
    this.colorSubject.next(this.currentColorShading);
    this.applyTheme();
  }

  /**
   * Detect the browser/system default theme and set it
   */
  private detectDefaultTheme() {
    const _window = this.windowService.nativeWindow;
    if (_window) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkTheme = prefersDark;
    }
  }
}
