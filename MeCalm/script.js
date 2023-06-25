const outline = document.querySelector(".seeker-outline circle");
const outlineLength = outline.getTotalLength();

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;

// let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
outline.style.strokeDashoffset = 1000;
console.log(outlineLength)