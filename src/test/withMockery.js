/* istanbul ignore file */

'use strict';
const mockery = require('mockery');

module.exports = mockeryOverride => {
  before(() => {
    mockery.enable(
      Object.assign(
        {
          warnOnReplace: false,
          warnOnUnregistered: false,
          useCleanCache: true
        },
        mockeryOverride
      )
    );
  });

  after(() => {
    mockery.deregisterAll();
    mockery.disable();
  });
};
