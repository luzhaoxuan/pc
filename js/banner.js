/**
 * Created by Administrator on 2016/9/2.
 */

function Banner(id){
    this.oBox1=document.getElementById(id);
    this.oBoxInner=this.oBox1.getElementsByTagName('div')[0];
    this.aDiv=this.oBoxInner.getElementsByTagName('div');
    this.aImg=this.oBoxInner.getElementsByTagName('img');
    this.oUl=this.oBox1.getElementsByTagName('ul')[0];
    this.aLi=this.oUl.getElementsByTagName('li');
    this.timer=null;
    this.step=0;
    this.data=null;
    this.init()
}

Banner.prototype={
    construction:Banner,
    init:function(){
        var _this=this;
        this.getData();

        this.bind();

        this.lazyImg();

        this.timer=setInterval(function(){_this.autoMove()},2000);

        this.overOut();

        this.handleBanner();

    },

    getData:function(){
        var _this=this;
        var xml=new XMLHttpRequest();
        xml.open('get','json/data.txt',false);
        xml.onreadystatechange=function(){
            if(xml.readyState==4 && /^2\d{2}$/.test(xml.status)){
                _this.data=utils.jsonParse(xml.responseText)
            }
        };
        xml.send();
        //console.log(_this.data)
    },

    bind:function(){
        var strDiv='';
        var strLi='';
        for(var i=0;i<this.data.length;i++){
            strDiv+='<div><img realImg="'+this.data[i].imgSrc+'" alt=""/></div>';
            strLi+=i===0?'<li class="on"></li>':'<li></li>';
        }
        this.oBoxInner.innerHTML+=strDiv;
        this.oUl.innerHTML+=strLi;
    },

    lazyImg:function(){
        var _this=this;
        for(var i=0;i<this.aDiv.length;i++ ){
            (function(index){
                var tmpImg=new Image;
                tmpImg.src=_this.aImg[index].getAttribute('realImg');
                tmpImg.onload=function(){
                    _this.aImg[index].src=this.src;
                    var oDiv=_this.aDiv[0]
                    utils.css(oDiv,'zIndex',1)
                    animate(oDiv,{opacity:1})
                }
            })(i)
        }
    },

    autoMove:function(){
        var _this=this;
        if(_this.step>=_this.aDiv.length-1){
            _this.step=-1;
        }
        _this.step++;
        _this.setBanner();
    },

    setBanner:function(){
        var _this=this;
        for(var i=0;i<this.aDiv.length;i++){
            if(i===this.step){
                utils.css(this.aDiv[i],'zIndex',1);
                animate(this.aDiv[i],{opacity:1},500,function(){
                    var siblings=utils.siblings(this);
                    for(var i=0;i<siblings.length;i++){
                        animate(siblings[i],{opacity:0})
                    }
                });
                continue
            }
            utils.css(this.aDiv[i],'zIndex',0)
        }
        this.bannerTip()
    },

    bannerTip:function(){
        for(var i=0;i<this.aLi.length;i++){
            this.aLi[i].className=i===this.step?'on':null;
        }
    },

    overOut:function(){
        var _this=this;
        this.oBox1.onmouseover=function(){
            clearInterval(_this.timer);
        }
        this.oBox1.onmouseout=function(){
            _this.timer=setInterval(function(){_this.autoMove()},2000);
        }
    },

    handleBanner:function(){
        var _this=this;
        for(var i=0;i<this.aLi.length;i++){
            this.aLi[i].index=i;
            this.aLi[i].onclick=function(){
                _this.step=this.index;
                _this.setBanner();
            }
        }
    }



};
