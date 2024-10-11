document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  function getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll"; // forcing scrollbar to appear
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
    const contenDiv = document.getElementsByClassName("section_project")[0];
    contenDiv.appendChild(outer);
    //document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement("div");
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    console.log("getScrollbarWidth : scrollbarWidth >> " + scrollbarWidth);

    return scrollbarWidth;
  }

  const scrollbarWidth = getScrollbarWidth();
  const sectionsContainer = document.querySelector(".horizontal-box");

  function setRefreshAndGetScrollAmount() {

    const sectionsContainerWidth = sectionsContainer.scrollWidth; // .horizontal-box
    const boxListWidth = document.querySelector(".horizontal-box__list").offsetWidth;
    const boxListCount = document.querySelectorAll(".horizontal-box__list").length;
    var rate = 0.4 ; // 0.3, 0.4, 0.7 
    const checkWidth = window.innerWidth;
    console.log("innerHeight : " + window.innerHeight);
    console.log("screen rate : " + (checkWidth /window.innerHeight) );

    const checkRate = (checkWidth /window.innerHeight);

    if(checkRate > 1){
      rate = 0.25; //'desktop';
    }else if(checkRate >0.8){
      rate = 0.30;
    }else if(checkRate >0.7){
      rate = 0.36;
    }else if(checkRate >0.6){
      rate = 0.43;
    }else if(checkRate >0.52){
      rate = 0.50;
    }else if(checkRate >0.45){
      rate = 0.60;
    }else{
      rate = 0.7;
    }

    console.log("result Rate : " + rate);

    return (
      - (boxListWidth*(boxListCount) - window.innerWidth + (boxListWidth*rate) ) 
    );
  }

  const tween = gsap.to(sectionsContainer, {
    
    x: setRefreshAndGetScrollAmount,
    ease: "none",
  });

  ScrollTrigger.create({
    trigger: ".horizontal",
    start: "top 20%",
    markers: false,
    scrub: true,
    pin: true,
    pinSpacing: true,
    invalidateOnRefresh: true,
    animation: tween,


    end: ()=>{
      let listWidth = document.querySelector(".horizontal-box__list").offsetWidth;
      let listCount = document.querySelectorAll(".horizontal-box__list").length;
      return "+="+((listWidth)*listCount);
    },
  });
});



gsap.to(".horizontal-box", {
  marginTop: "50px", // 원하는 값으로 수정
  duration: 1
});