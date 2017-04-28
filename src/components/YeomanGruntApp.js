'use strict';

var React = require('react/addons');
// var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
//js做为一个横块，单独文件，加载css和image,以module.exports把接口输出
//webpack 把每个文件(.css, .html, .scss, .jpg, etc.) 都作为模块处理
require('normalize.css');
require('../styles/main.scss');

var $ = require('jquery');
var imageDatas = require('../data/imageDatas.json');
var styleObj = {};

//获取范围内的随机数
 function random(min, max){
    return Math.floor(min + Math.random() * (max - min));
}
var ImgTag = React.createClass({
	changeCenIndex: function(e) {
		e.preventDefault();
		if(!$(e.currentTarget).hasClass('centerImg') ) {
			this.props.rearrangeFun(this.props.index);
		} else {
			let that = this;
			$(e.currentTarget).toggleClass('img-transform');
			if($(e.currentTarget).hasClass('img-transform')) {
				setTimeout(function(){
					let pdom = React.findDOMNode(that.refs.pdom);
					$(pdom).slideDown(500);
				}, 1000);
			} else {
				setTimeout(function(){
					let pdom = React.findDOMNode(that.refs.pdom);
					$(pdom).slideUp(500);
				}, 1000);
			}
		}
	},
	render: function() {
		//定义this.props.arrange.pos即为当前<figure>的位置坐标
		if(this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
			styleObj.WebkitTransition = 'all 1s ease-in-out 0.2s';
			styleObj.transition = 'all 1s ease-in-out 0.2s';
		}
		return (
			<figure key={this.props.index} className="img-figure" style={styleObj} onClick={this.changeCenIndex}>
				<p ref='pdom'>{this.props.desc}</p>
				<img src={this.props.value} />
				<figcaption>
					<h2 className="img-title">{this.props.title}</h2>
				</figcaption>
			</figure>
		);
	}
});
var YeomanGruntApp = React.createClass({
getInitialState: function() {
    return {
	imgArrangeArr: [
		{
			pos: {
				// left: '0',
				// top: '0'
			}
		}
	],
	centerImg: 2
    };
},
Constant: {
	centerPos: {
		left: 0,
		top: 0
	},
	hPosRange: {  //初始化水平x的范围
		leftSecX: [0, 0],  //左块x范围的值
		rightSecX: [0, 0], //右块x范围的值
		y: [0, 0]
	},
	vPosRange: { //初始化垂直y的范围
		x: [0, 0],
		topY: [0, 0] //上分区y的值
	}
},
	//rearrange重新布局所有图片  @param centerIndex 表示居中图片的Index
	rearrange: function(centerIndex) {
		let imgArrangeArr = this.state.imgArrangeArr,
			Constants = this.Constant,
			centerPos = Constants.centerPos,  //中间图片位置
			hPosRange0 = Constants.hPosRange.y[0], //左右布局中图片垂直位置上极限
			hPosRange1 = Constants.hPosRange.y[1], //左右布局中图片垂直位置下极限
			hPosRangeleftSecX = Constants.hPosRange.leftSecX, //左布局水平 [左极限值, 右极限值]
			hPosRangerightSecX = Constants.hPosRange.rightSecX, //右布局水平 [左极限值, 右极限值]
			vPosRangetopY0 = Constants.vPosRange.topY[0], //上侧布局垂直上极限
			vPosRangetopY1 = Constants.vPosRange.topY[1], //上侧布局垂直下极限
			vPosRangex0 = Constants.vPosRange.x[0], //上侧布局水平左极限值
			vPosRangex1 = Constants.vPosRange.x[1]; //上侧布局水平右极限值

		let imgArrangeTopArr = []; //存储图片的上侧的状态信息
		let topImgNum = Math.ceil(Math.random() * 2); // ［0,1］的数值  表示上侧图片有或没有
		let topImgSpliceIndex = 0;  //上侧图片是用

		//中间图片的位置信息,把imgArrangeArr中的图片删除做为中间图片使用
		let imgArrangeCenterArr = imgArrangeArr.splice(centerIndex, 1);
		imgArrangeCenterArr[0].pos = centerPos;

		//上侧图片,把imgArrangeArr中的图片删除做为上侧图片使用
		topImgSpliceIndex = Math.ceil(Math.random() * (imgArrangeArr.length - topImgNum));
		imgArrangeTopArr = imgArrangeArr.splice(topImgSpliceIndex, topImgNum);
		//如果topImgNum为0,表示把下标为

		//布局上侧图片
		imgArrangeTopArr.forEach(function(v, i){
			imgArrangeTopArr[i].pos = {
				left: random(vPosRangex0, vPosRangex1),
				top: random(vPosRangetopY0, vPosRangetopY1)
			};
		});

		//剩余的图片做为左右图片布局使用
		for(let i = 0, j = imgArrangeArr.length, k = j / 2; i < j; i++) {
			let hPosRangeLorR = null;
			//前半部分布局左侧, 后半部分布局右侧
			if(i < k) {
				hPosRangeLorR = hPosRangeleftSecX;
			} else {
				hPosRangeLorR = hPosRangerightSecX;
			}

			imgArrangeArr[i].pos = {
				left: random(hPosRangeLorR[0], hPosRangeLorR[1]),
				top: random(hPosRange0, hPosRange1)
			};
		}

		//把删除的上侧图片的位置添加到imgArrangeArr数组中
		if(imgArrangeTopArr && imgArrangeTopArr[0]) {
			imgArrangeArr.splice(topImgSpliceIndex, 0, imgArrangeTopArr[0]);
		}
		//把删除的中间图片的位置添加到imgArrangeArr数组中
		imgArrangeArr.splice(centerIndex, 0, imgArrangeCenterArr[0]);

		this.setState({  //改变imgArrangeArr的值,原来的默认值为 this.state.imgArrangeArr = [{pos:[left:0,top:0]}]
			imgArrangeArr: imgArrangeArr
		});
		//Li点击传入中间图index,给当前li增加class='active'
		let curLi = React.findDOMNode(this.refs.refUl);
		$(curLi).find('li').eq(centerIndex).addClass('active').siblings().removeClass('active');
		$('img').parent().eq(centerIndex).addClass('centerImg').siblings().removeClass('centerImg');
		$('img').parent().removeClass('img-transform');
		$('img').parent().find('p').hide(2000);
	},
	componentDidMount: function() {
		let stageDom = React.findDOMNode(this.refs.stage),
			stageW = stageDom.scrollWidth,
			stageH = stageDom.scrollHeight,
			halfStageW = Math.ceil(stageW / 2),
			halfStageH = Math.ceil(stageH / 2);
		let imgFigureDom = React.findDOMNode(this.refs.imgFigure0),
			imgW = imgFigureDom.scrollWidth,
			imgH = imgFigureDom.scrollHeight,
			halfImgW = Math.ceil(imgW / 2),
			halfImgH = Math.ceil(imgH / 2);
		//中间图片的左上角位置
		this.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		};
		//左块和右块图片范围
		let leftSecX0 = -halfImgW, leftSecX1 = halfStageW - halfImgW * 3;
		let rightSecX0 = halfStageW + halfImgW, rightSecX1 = stageW - halfImgW;
		let hPosRangey0 = -halfImgH, hPsRangey1 = stageH - halfImgH;
		this.Constant.hPosRange = {
			leftSecX: [leftSecX0, leftSecX1],
			rightSecX: [rightSecX0, rightSecX1],
			y: [hPosRangey0, hPsRangey1]
		};
		//垂直y范围的值
		let vPosRangex0 = halfStageW - imgW, vPosRangex1 = halfStageW + imgW;
		let vPosRangetopY0 = -halfImgH, vPosRangetopY1 = halfStageH - halfImgH * 3;
		this.Constant.vPosRange = {
			x: [vPosRangex0, vPosRangex1],
			topY: [vPosRangetopY0, vPosRangetopY1] //上分区y的值
		};

		//0表示居中的图片的下标index
		this.rearrange(2);
	},
render: function() {
let navLi = [];
var imgSrc = imageDatas.map(function(v, i){
		if(!this.state.imgArrangeArr[i]) {
			//初始化imgArrangeArr中的位置为left:0,top:0
			this.state.imgArrangeArr[i] = {
				pos: {
					left: 0,
					top: 0
				}
			};
		}
		navLi.push(<li onClick={(this.rearrange).bind(this, i)}></li>);
		let imgUrl = require('../images/' + v.fileName);
		return <ImgTag rearrangeFun = {this.rearrange} index={i} key={imgUrl} value={imgUrl} desc={v.desc} title={v.title} ref={'imgFigure' + i} arrange={this.state.imgArrangeArr[i]}/>;
	}.bind(this));
    return (
		<section className="stage" ref="stage">
			<section className="img-sec">
				{imgSrc}
			</section>
			<nav className="controller-nav">
				<ul ref='refUl' >
					{navLi}
				</ul>
			</nav>
		</section>
    );
  }
});


React.render(<YeomanGruntApp />, document.getElementById('content'));

module.exports = YeomanGruntApp;
