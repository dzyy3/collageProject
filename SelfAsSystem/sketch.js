const navItems = document.querySelectorAll('.nav-item');
const mainImage = document.getElementById('main-image');
let currentStep = 0;

// Arrays: put your file names here
const gifs = [
  "Assets/animations/Driving.gif",
  "Assets/animations/Birthday.gif",
  "Assets/animations/Snow.gif",
  "Assets/animations/Shooting.gif",
  "Assets/animations/Drinking.gif"
];

const staticImages = [
  "Assets/backgrounds/portrait (2).png",
  "Assets/backgrounds/portrait (3).png",
  "Assets/backgrounds/portrait (4).png",
  "Assets/backgrounds/portrait (5).png",
  "Assets/backgrounds/portrait (6).png"
];

navItems.forEach((item, index) => {
  const thumb = item.querySelector("img");

  thumb.addEventListener("click", () => {
    if (index !== currentStep) return; // only allow in order

    // Fade out first
    mainImage.classList.add("fade-out");

    const onFadeOut = (evt) => {
      if (evt.propertyName !== "opacity") return;
      mainImage.removeEventListener("transitionend", onFadeOut);

      // Swap to GIF
      mainImage.src = gifs[index];

      mainImage.onload = () => {
        mainImage.classList.remove("fade-out");
        mainImage.classList.add("fade-in");

        // Clean fade-in
        setTimeout(() => {
          mainImage.classList.remove("fade-in");
        }, 900);

        // After 6 seconds, fade back to static image
        setTimeout(() => {
          mainImage.classList.add("fade-out");

          const backToImage = () => {
            if (event.propertyName !== "opacity") return;
            mainImage.removeEventListener("transitionend", backToImage);

            mainImage.src = staticImages[index];
            mainImage.onload = () => {
              mainImage.classList.remove("fade-out");
              mainImage.classList.add("fade-in");

              setTimeout(() => {
                mainImage.classList.remove("fade-in");
              }, 900);
            };
          };

          mainImage.addEventListener("transitionend", backToImage);
        }, 6000);
      };
    };

    mainImage.addEventListener("transitionend", onFadeOut);

    // Mark step complete + unlock next
    item.classList.remove("active");
    item.classList.add("completed");
    currentStep++;
    if (currentStep < navItems.length) {
      navItems[currentStep].classList.add("active");
    }
  });
});
