import { AngularDragPage } from './app.po';

describe('angular-drag App', () => {
  let page: AngularDragPage;

  beforeEach(() => {
    page = new AngularDragPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
