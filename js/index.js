$(function(){
	//banner
	function  banner(){
		var topli=$("li",$(".lyj_bannertop")[0]);
		var buttonli=$("li",$(".lyj_bannerbottom")[0]);
		for (var i = 0; i < buttonli.length; i++) {
			buttonli[i].aa=i;
			buttonli[i].onmouseover=function () {
				for (var j = 0; j < topli.length; j++) {
					topli[j].style.display="none";
	                buttonli[j].className="";
				}
	            topli[this.aa].style.display="block";
	    		buttonli[this.aa].className="lyj_active";
			}
		}
	}
	banner();
	//banner
	//出现消失
	function show(){
		var ulbox=$("ul",$(".lyj_bodyul")[0]);
		var hei=$(".lyj_bodyli");
		var liang=$(".lyj_bodylis");
		for(var i=0;i<ulbox.length;i++){
			ulbox[i].aa=i;
			ulbox[i].onmouseover=function(){
				hei[this.aa].style.display="none";
				liang[this.aa].style.display="block";
			}
			ulbox[i].onmouseout=function(){
				hei[this.aa].style.display="block";
				liang[this.aa].style.display="none";
			}
		}
		
	}
	show();
	//出现消失
	
	
	
	
	
	
})
