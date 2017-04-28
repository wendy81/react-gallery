'use strict';

describe('YeomanGruntApp', () => {
  let React = require('react/addons');
  let YeomanGruntApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    YeomanGruntApp = require('components/YeomanGruntApp.js');
    component = React.createElement(YeomanGruntApp);
  });

  it('should create a new instance of YeomanGruntApp', () => {
    expect(component).toBeDefined();
  });
});
