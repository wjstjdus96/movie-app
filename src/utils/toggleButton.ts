export const toggleButtonClicked = (mediaType: string) => {
  const btns = document.getElementsByTagName("button");
  for (let i = 0; i < btns.length; i++) {
    if (btns[i].id == mediaType) {
      btns[i].classList.add("actived");
    } else {
      btns[i].classList.remove("actived");
    }
  }
};
