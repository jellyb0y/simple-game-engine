import { Frame, ImageEntity, BackgroundEntity } from '../../lib';

const canvasEl = document.body.querySelector('#app') as HTMLCanvasElement;

const frame = new Frame(canvasEl);

/* const background = new BackgroundEntity('https://github.com/images/modules/site/readme/unseen-oss/unseen-oss2.jpg', {
  fitMode: 'cover',
  alignX: true,
  alignY: true,
}); */

const highway = new ImageEntity('/static/public/basic/highway_1.svg', {
  size: {
    width: 200,
  },
  primaryPoint: {
    x: 0,
    y: -68,
  },
});

const highway2 = new ImageEntity('/static/public/basic/highway_1.svg', {
  size: {
    width: 200,
  },
  primaryPoint: {
    x: 0,
    y: -68,
  },
  position: {
    x: 100,
    y: 58,
  }
});

const highway3 = new ImageEntity('/static/public/basic/highway_1.svg', {
  size: {
    width: 200,
  },
  primaryPoint: {
    x: 0,
    y: -68,
  },
  position: {
    x: 200,
    y: 116,
  }
});

frame.add(highway, 1);
frame.add(highway2, 2);
frame.add(highway3, 3);
// frame.add(background);

window.addEventListener('resize', () => {
  console.log('resize');
  frame.resize();
});
