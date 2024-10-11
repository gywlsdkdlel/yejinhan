document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  // 스크롤바 넓이 구하기
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

    return scrollbarWidth;
  }

  const scrollbarWidth = getScrollbarWidth();

  const sectionsContainer = document.querySelector(".horizontal-box");
  const sections = sectionsContainer.querySelectorAll(".list");

  function setRefreshAndGetScrollAmount() {
    gsap.set(sections, {
      width: `${window.innerWidth - scrollbarWidth}px`,
    });

    const sectionsContainerWidth = sectionsContainer.scrollWidth;
    //return -sectionsContainerWidth - scrollbarWidth;
    const headerHeight = document.getElementById("header").offsetHeight;
    // console.log(offsetHeight);

    return (
      -(sectionsContainerWidth - window.innerWidth) -
      scrollbarWidth -
      headerHeight
    );
  }

  const tween = gsap.to(sectionsContainer, {
    x: setRefreshAndGetScrollAmount,
    ease: "none",
  });

  ScrollTrigger.create({
    trigger: ".horizontal",
    start: "center center",
    scrub: 1,
    markers: false,

    //end: () => window.innerHeight * 2,
    scrub: true,
    pin: true,
    pinSpacing: true,
    invalidateOnRefresh: true,
    animation: tween,
  });
});
