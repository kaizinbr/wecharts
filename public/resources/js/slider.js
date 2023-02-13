const controls = document.querySelectorAll(".control");
let currentItem = 0;


// https://www.youtube.com/watch?v=QAD0K112tlQ

controls.forEach((control) => {
  control.addEventListener("click", (e) => {
    isLeft = e.target.classList.contains("left");
    console.log(isLeft);
    const items = document.querySelectorAll(".banner");
    const maxItems = items.length;

    if (isLeft) {
      currentItem -= 1;
    } else {
      currentItem += 1;
    }

    if (currentItem >= maxItems) {
      currentItem = 0;
    }

    if (currentItem < 0) {
      currentItem = maxItems - 1;
    }

    items.forEach((item) => item.classList.remove("current-item"));

    items[currentItem].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });

    items[currentItem].classList.add("current-item");
  });
});
