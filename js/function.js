
// 1.解决获取类名的兼容性问题
function getClass(classname,obj){   //obj(父类)获取范围，缩小范围去找，处理默认值
    obj=obj||document;   //obj没有传参时，obj默认document
    if (obj.getElementsByClassName) {
    	return obj.getElementsByClassName(classname);
    }else{
    	var arr=[];   //创建空数组（一个集合）
    	var objs=obj.getElementsByTagName('*');  //将所有的标签名放入新对象集合里
    	for (var i = 0; i < objs.length; i++) {   //遍历所有类名
    		if(checkclass(objs[i].className,classname)){   //类名和类名比，符合的放入新数组中
    			arr.push(objs[i]);
    		}
    	}return arr;
    }
}

function checkClass(string,val){
    var arr=string.split(" ");
    for(var i=0;i<arr.length;i++){
        if(arr[i]==val){
            return true;
        }
    }return false;
}
//2.解决获取样式的兼容函数
function getStyle (obj,attr) {
    if(obj.currentStyle){     //IE浏览器
        return obj.currentStyle[attr];
    }
    else{        //现代浏览器
        return getComputedStyle(obj,null)[attr];
    }
}
//3.获取元素的兼容函数
function $(selecter,father){   //参数及其父类
    if(typeof selecter=="string"){   //检测是否为字符串
        father=father||document;
        selecter=selecter.replace(/^\s*|\s*$/g,"");  //检测空格
        if(selecter.charAt(0)=="."){    //检测类
            return getClass(selecter.slice(1),father);
        }else if(selecter.charAt(0)=="#"){   //检测ID
            return document.getElementById(selecter,slice(1))
        }else if(/^[a-zA-Z][a-zA-Z0-6]{0,8}$/.test(selecter)){   //检测任意字符
            return father.getElementsByTagName(selecter);
        }else if(/^<[a-zA-Z][a-zA-Z0-6]{0,8}>$/.test(selecter)){   //检测任意字符
            return document.createElement(selecter.slice(1,-1));
        }
    }else if(typeof selecter=="function"){  //检测为函数。调用
        window.onload=function(){
            selecter();
        }
    }
}
//4.获取节点的兼容函数
function getChilds(obj,type){    
    var arr=[];
    var childs=obj.childNodes;   //获取子节点的集合
    type=type||"no";     
    for (var i = 0; i < childs.length; i++) {
        if(type=="no"){       
            if(childs[i].nodeType==1){//元素节点
               arr.push(childs[i]);   //添加到集合
            }
        }else if(type=="yes"){   //元素节点，文本节点，空
            if(childs[i].nodeType==1||childs[i].nodeType==3&&childs[i].nodeValue.replace("/^\s*|\s*$/g","")){
               arr.push(childs[i]);
           }
        }
    }
    return arr;
}
//5.获取第一个子节点
function getFirst(obj,type){
    type=type||"no";
    if(type=="no"){
       return getChilds(obj,"no")[0];   //调用getChilds;
    }else if(type=="yes"){
       return getChilds(obj,"yes")[0];
    }
}
//6.获取最后一个子节点
function getLast(obj,type){
    type=type||"no";
    if(type=="no"){
       return getChilds(obj,"no")[getChilds(obj,"no").length-1];
    }else if(type=="yes"){
       return getChilds(obj,"yes")[getChilds(obj,"yes").length-1];
    }
}
//7.获取指定的子节点
function getNum(obj,num,type){
    type=type||"no";
    if(type=="no"){
       return getChilds(obj,"no")[num-1];
    }else if(type=="yes"){
       return getChilds(obj,"yes")[num-1];
    }
}
//8.获取下一个兄弟节点
function getNext(obj,type){
    type=type||"no";
    var next=obj.nextSibling;
    if(next==null){
        return false;
    }
    if(type=="no"){
        while(next.nodeType==3||next.nodeType==8){
            next=next.nextSibling;
            if(next==null){
               return false;
            }
        }
        return next;
    }else if(type=="yes"){
        while(next.nodeType==3&&!next.nodeValue.replace("/^\s*|\s*$/g","")||next.nodeType==8){
            next=next.nextSibling;
            if(next==null){
               return false;
            } 
        }return next;
    }
}
//9.获取上一个兄弟节点
function getPrevious(obj,type){
    type=type||"no";
    var prev=obj.previousSibling;
    if(prev==null){
        return false;
    }
    if(type=="no"){
       while(prev.nodeType==3||prev.nodeType==8){
            prev=prev.previousSibling;
            if(prev==null){
               return false;
            } 
        }return prev;
    }else if(type=="yes"){
        while(prev.nodeType==3&&!prev.nodeValue.replace("/^\s*|\s*$/g","")||prev.nodeType==8){
            prev=prev.previousSibling;
            if(prev==null){
               return false;
            }
        }
    }
    return prev;
}
//10.把一个元素插入到某一元素之前
function insertBefore(newobj,oldobj){
    var parent=oldobj.parentNode;
    parent.insertBefore(newobj,oldobj);
}
//11.把一个元素插入到某一元素之后
function insertAfter(newobj,oldobj){
    var parent=oldobj.parentNode;
    var next=getNext(oldobj,"yes");
    if(next){
       insertBefore(newobj,next);
    }else{
        parent.appendChild(newobj);
    }
}
//12.事件绑定,删除的兼容性问题
function addEvent(obj,event,fun){
    if (obj.addEventListener) {
        obj.addEventListener(event,function(e){   //事件处理程序
            var e=e||window.event;
            fun.call(obj,e) //6.7.8里的this不正确   call需要转换指针方向
        },false);
    }else{
        obj.attachEvent("on"+event,function(){
            var e=e||window.event;
            fun.call(obj,e);
        })
    }
}
function removeEvent(obj,event,fun){
    if (obj.addEventListener) {
        obj.removeEventListener(event,fun,false);
    }else{
        obj.detachEvent("on"+event,fun);
    }
}
//13.鼠标滚轮
function mouseWheel(obj,upfun,downfun){
    if (document.attachEvent) {
            document.attachEvent("onmousewheel",fun)
        }else if (document.addEventListener) {
            document.addEventListener("mousewheel",fun,false)
            document.addEventListener("DOMMouseScroll",fun,false)
        }
    function fun(e){
        var ev=e||window.event;
        var num=ev.wheelDelta||ev.detail;
        if (num==-3||num==120) {
            upfun.call(obj);
        }else if (num==3||num==-120) {
            downfun.call(obj);
        };
    }
}


//14.cookie
function setCookie(attr,value,time){
	if(time){
		var nowtime=new Date();
		nowtime.setTime(nowtime.getTime()+time*1000);
		document.cookie=attr+"="+value+";expires="+nowtime.toGMTString();
	}else{
		document.cookie=attr+"="+value;
	}
}
function getCookie(attr){
	var cookies=document.cookie;
	var arr=cookies.split("; ");
	for(var i=0;i<arr.length;i++){
		var brr=arr[i].split("=");
		if(brr[0]==attr){
			return brr[1];
		}
	}
	return false;
}
function delCookie(attr){
	var nowtime=new Date();
	nowtime.setTime(nowtime.getTime()-1);
	document.cookie=attr+"=a;expires="+nowtime.toGMTString();   //删除
	
}
//15.判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
