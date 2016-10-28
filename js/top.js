

var bottom=document.getElementById('bottom');
var timer=null;
var bOk=false;
    window.onscroll=function(){
    if(bOk){
        clearInterval(timer);
    }
    bOk=true;
};
bottom.onclick=function(){
    var target=utils.win('scrollTop');
    var duration=1000;
    var interval=30;
    var step=target/duration*interval;
    timer=setInterval(function(){
        var curTop=utils.win('scrollTop');
        if(curTop<=0){
            clearInterval(timer);
            return;
        }
        curTop-=step;
        utils.win('scrollTop',curTop);
        bOk=false;
    },interval)
}