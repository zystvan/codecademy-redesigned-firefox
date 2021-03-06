function perNode(prop){
	NodeList.prototype[prop] = function(){
		[].forEach.call(this, function(node){
			node[prop].apply(node, [].slice.call(arguments, 0));
		});
	};
}

var props = ["toggle", "setAttribute", "insertAdjacentHTML", "hide", "focus", "keyup"];

props.forEach(perNode);

Node.prototype.hide = function (){
    this.style.display = "none";
};

window.qS = document.querySelector.bind(document);
window.qSAll = document.querySelectorAll.bind(document);

// one function for both fadeIn/fadeOut
window.fade = function(el, fadeInFlag) {
    el.style.opacity = fadeInFlag ? 0 : 1;

    var last = +new Date();
    function tick() {
        var diff = (fadeInFlag ? 1 : -1) * (new Date() - last) / 400
        el.style.opacity = +el.style.opacity + diff;
        last = +new Date();

        if (fadeInFlag && +el.style.opacity < 1 || !fadeInFlag && +el.style.opacity > 0) 
          (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    };

    tick();
};

Node.prototype.toggle = function(){
  if(this.style.display === "none") this.style.display = "initial";
  else this.style.display = "none";
};

Node.prototype.hasClass = function(cls){
    if (this.classList) return this.classList.contains(cls);
    else return new RegExp('(^| )' + cls + '( |$)', 'gi').test(this.classname);
};

// jquery equivlent of .not
NodeList.prototype.not = function(sel){
    return [].filter.call(this, function(node) {
		return !node.matches(sel);
    });
};