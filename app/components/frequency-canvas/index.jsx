import React from 'react';

import './style.css';

let canvas;

const FrequencyCanvas = ({ data }) => {

  const WIDTH = window.innerWidth * 0.9;
  const HEIGHT = 200;

  if (canvas) {
    const canvasCtx = canvas.getContext(`2d`);
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = 'rgba(0, 0, 0, 0)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    var barWidth = (WIDTH / data.length) * 2.5;
    var barHeight;
    var x = 0;

    for(var i = 0; i < data.length; i++) {
      barHeight = data[i] / 2;

      canvasCtx.fillStyle = `rgb(80, 80, ${ 80 + barHeight })`;
      canvasCtx.fillRect(x, HEIGHT/2 - barHeight/2, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

  return (
    <div className={`frequency`}>
      <canvas width={WIDTH} height={HEIGHT} ref={(r) => {
        if(r)
          canvas = r;
      }}></canvas>
    </div>
  );
};

export default FrequencyCanvas;
