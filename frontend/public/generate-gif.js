const GIF = require('gif.js');
const fs = require('fs');

const images = ['pushup1.jpg', 'pushup2.jpg', 'pushup3.jpg']; // Example images
const gif = new GIF({
  workers: 2,
  quality: 10,
  width: 640,
  height: 480,
});

images.forEach((image) => {
  const img = new Image();
  img.src = fs.readFileSync(image);
  gif.addFrame(img, { delay: 200 });
});

gif.on('finished', (blob) => {
  fs.writeFileSync('public/pushup.gif', blob);
});

gif.render();