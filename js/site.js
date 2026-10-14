/* AMR Sealants Ltd — site.js */
(function(){
  "use strict";
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

  /* mobile drawer */
  var burger=$(".burger"),menu=$(".mobile-menu"),back=$(".mm-back"),close=$(".mm-close");
  function openM(){if(menu){menu.classList.add("open");back.classList.add("open");document.body.style.overflow="hidden"}}
  function closeM(){if(menu){menu.classList.remove("open");back.classList.remove("open");document.body.style.overflow=""}}
  if(burger)burger.addEventListener("click",openM);
  if(close)close.addEventListener("click",closeM);
  if(back)back.addEventListener("click",closeM);
  $$(".mobile-menu a").forEach(function(a){a.addEventListener("click",closeM)});

  /* scroll reveal */
  var io;
  if("IntersectionObserver" in window){
    io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})
    },{threshold:.12,rootMargin:"0px 0px -40px 0px"});
    $$("[data-reveal]").forEach(function(el,i){
      var d=(i%4)*70; el.style.transitionDelay=d+"ms"; io.observe(el);
    });
  }else{$$("[data-reveal]").forEach(function(el){el.classList.add("in")})}

  /* gallery lightbox */
  var lb=$(".lb");
  if(lb){
    var lbImg=$(".lb img"),items=$$(".gal a"),idx=0;
    function show(i){idx=(i+items.length)%items.length;lbImg.src=items[idx].getAttribute("href");}
    items.forEach(function(a,i){a.addEventListener("click",function(e){e.preventDefault();show(i);lb.classList.add("open");document.body.style.overflow="hidden"})});
    function closeL(){lb.classList.remove("open");document.body.style.overflow=""}
    $(".lb .x").addEventListener("click",closeL);
    $(".lb .prev").addEventListener("click",function(e){e.stopPropagation();show(idx-1)});
    $(".lb .next").addEventListener("click",function(e){e.stopPropagation();show(idx+1)});
    lb.addEventListener("click",function(e){if(e.target===lb)closeL()});
    document.addEventListener("keydown",function(e){
      if(!lb.classList.contains("open"))return;
      if(e.key==="Escape")closeL();
      if(e.key==="ArrowLeft")show(idx-1);
      if(e.key==="ArrowRight")show(idx+1);
    });
  }

  /* header shadow on scroll */
  var hd=$("header.site");
  if(hd){
    var onS=function(){hd.style.boxShadow=window.scrollY>8?"0 10px 30px -18px rgba(20,40,60,.3)":"none"};
    window.addEventListener("scroll",onS,{passive:true});onS();
  }

  /* year */
  $$(".yr").forEach(function(e){e.textContent=new Date().getFullYear()});
})();
