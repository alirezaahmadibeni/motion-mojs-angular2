import { MotionPage } from './app.po';

describe('motion App', () => {
  let page: MotionPage;

  beforeEach(() => {
    page = new MotionPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
