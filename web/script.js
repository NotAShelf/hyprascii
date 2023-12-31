window.onload = async () => {
  const ascii = document.getElementById("ascii");
  const audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "assets/loop.mp3");
  audioElement.setAttribute("loop", "true");
  audioElement.play();

  const blob = await (await fetch("assets/img.png")).blob();
  const url = URL.createObjectURL(blob);
  const img = document.createElement("img");
  img.src = url;

  const cvs = document.createElement("canvas");
  cvs.width = 72;
  cvs.height = 36;
  const ctx = cvs.getContext("2d", { willReadFrequently: true });

  const getLuminance = (r, g, b) => {
    return Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
  };

  ctx.fillStyle = "#000000";
  const interval = setInterval(() => {
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    const t = new Date().getTime() * 0.002;
    let px = ((-Math.cos(t) + 1) / 2) * cvs.width;
    let sx = Math.cos(t) * cvs.width;

    ctx.drawImage(img, px, 0, sx, cvs.height);

    const idata = ctx.getImageData(0, 0, cvs.width, cvs.height);
    const pixels = idata.data;
    const text = [];
    const chars = " .-=+";
    for (let y = 0; y < cvs.height; y++) {
      for (let x = 0; x < cvs.width; x++) {
        const idx = 4 * ((sx < 0 ? cvs.width - x - 1 : x) + cvs.width * y);
        const br = getLuminance(
          pixels[idx] / 256,
          pixels[idx + 1] / 256,
          pixels[idx + 2] / 256,
        );
        text.push(chars[Math.floor(br * chars.length)]);
      }
      text.push("\n");
    }
    ascii.innerText = text.join("");
  }, 33);
};
