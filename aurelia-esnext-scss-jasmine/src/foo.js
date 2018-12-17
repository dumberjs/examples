import {fib} from './fib.wasm';

const CAP = 30;
export class Foo {
  message = 'Foo!';
  val = 5;
}

export class FibValueConverter {
  toView(value) {
    try {
      const n = parseInt(value, 10);
      if (n > 0 && n < CAP) {
        return fib(n);
      } else {
        return `Try a positive integer below ${CAP} please`;
      }
    } catch(err) {
      return '';
    }
  }
}