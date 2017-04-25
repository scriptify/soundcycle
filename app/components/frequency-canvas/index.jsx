import React from 'react';

import './style.css';
import logo from 'icons/logo.png';

let canvas;
const logoImg = new Image();
logoImg.src = logo;

const FrequencyCanvas = ({ data }) => {

  const WIDTH = window.innerWidth * 0.9;
  const HEIGHT = 200;

  if (canvas) {
    const canvasCtx = canvas.getContext(`2d`);
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = 'rgba(0, 0, 0, 0)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / data.length) * 2.5;
    let barHeight;
    let x = 0;
    let avgVal = 0;

    for (let i = 0; i < data.length; i++) {
      barHeight = data[i] / 2;
      avgVal += data[i];

      canvasCtx.fillStyle = `rgb(80, 80, ${ 80 + barHeight })`;
      canvasCtx.fillRect(x, HEIGHT/2 - barHeight/2, barWidth, barHeight);

      x += barWidth + 1;
    }

    avgVal = avgVal / data.length;
    const IMG_H = 100 + avgVal;
    const IMG_W = 100 + avgVal;

    canvasCtx.drawImage(logoImg, WIDTH/2 - IMG_W/2, HEIGHT/2 - IMG_H/2, IMG_W, IMG_H);
  }

  return (
    <div className={`frequency`}>
      <canvas width={WIDTH} height={HEIGHT} ref={(r) => {
        if (r)
          canvas = r;
      }}></canvas>
    </div>
  );
};

export default FrequencyCanvas;
