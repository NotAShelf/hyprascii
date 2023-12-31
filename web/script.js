window.onload = async function () {
  const response = await fetch("/logo-ascii-art.txt");
  const asciiArt = await response.text();
  document.getElementById("asciiArt").innerText = asciiArt;
  document.getElementById("backgroundMusic").play();
};
