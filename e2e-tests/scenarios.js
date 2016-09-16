'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('chat ui tests', function() {

  it('should automatically redirect to /list when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/list");
  });

  describe('chat details view', function() {

    beforeEach(function() {
      browser.get('index.html#!/list/0');
      browser.sleep(2000);
      element.all(by.repeater('chatObj in userChats')).get(0).click();
      browser.sleep(2000);
      element.all(by)
    });

    it('should render chat details when user clicks on a chat', function() {
      var el = element.all(by.tagName('section-header'));
      el.getAttribute('type').then(function(value) {
        expect(value[0]).toEqual('detail');
      });
    });
  });

  describe('chat details view --> list view', function() {
    beforeEach(function() {
      browser.get('index.html#!/list/0');
      browser.sleep(2000);
      element.all(by.repeater('chatObj in userChats')).get(0).click();
      browser.sleep(2000);
      element.all(by.css('a.left.back')).click();
      browser.sleep(2000);
    });

    it('should go back to list view', function() {
      var el = element.all(by.tagName('section-header'));
      el.getAttribute('type').then(function(value) {
        expect(value[0]).toEqual('list');
      });
    });
  });

});
