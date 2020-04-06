import app from '../src/app';

describe('Component app', () => {
  it('should render message', () => {
    expect(app.textContent).toBe('Hello world!');
  });
});
