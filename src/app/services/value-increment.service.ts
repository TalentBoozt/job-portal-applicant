import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValueIncrementService {

  constructor() { }

  incrementValue(targetValue: number, callback: (value: number) => void, interval: number = 50, incrementValue: number = 1): any {
    let currentValue = 0;

    if (targetValue >= 100) {
      incrementValue = 10;
    } else if (targetValue >= 1000) {
      incrementValue = 100;
    }
    const increment = () => {
      if (currentValue < targetValue) {
        currentValue += incrementValue;
        callback(currentValue);
        setTimeout(increment, interval);
      } else {
        callback(targetValue);
      }
    }

    increment();
  }
}
