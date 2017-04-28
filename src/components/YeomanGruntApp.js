'use strict';

var React = require('react/addons');
// var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
//js做为一个横块，单独文件，加载css和image,以module.exports把接口输出
//webpack 把每个文件(.css, .html, .scss, .jpg, etc.) 都作为模块处理
require('normalize.css');
require('../styles/main.scss');

// var imageDatas = require('../data/imageDatas.json');
// var imageUrl = require('../images/' + imageDatas[0].fileName);
// var imageURL = [];
// for (let item of imageDatas) {
//   let imgurl = require('../images/' + item.fileName);
//   imageURL.push('<img src={' + imgurl + '}/>');
// }

var YeomanGruntApp = React.createClass({
  render: function() {
    return (
      <section className="stage">
        <section className="img-sec"></section>
        <nav className="controller-nav"></nav>
      </section>
    );
  }
});
React.render(<YeomanGruntApp />, document.getElementById('content')); // jshint ignore:line

module.exports = YeomanGruntApp;
