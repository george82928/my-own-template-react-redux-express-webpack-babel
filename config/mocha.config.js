/* eslint-disable */
// import { COMPARE_LOCALSTORAGE_KEY } from './global.config';

require('@ow/ow-test-utils/lib/jsDom');

import localStorage from 'mock-local-storage';
window.localStorage = global.localStorage;
// window.localStorage.setItem(COMPARE_LOCALSTORAGE_KEY, '{}');

function CustomEvent(event, params) {
  params = params || { bubbles: false, cancelable: false, detail: undefined };
  var evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
}
if (!!global.CustomEvent) CustomEvent.prototype = global.CustomEvent.prototype;
global.CustomEvent = CustomEvent;

require('@babel/polyfill');
