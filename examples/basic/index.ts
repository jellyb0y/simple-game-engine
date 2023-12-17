import { Frame, BackgroundEntity } from '../../lib';

const canvasEl = document.body.querySelector('#app') as HTMLCanvasElement;

const frame = new Frame(canvasEl);
const background = new BackgroundEntity('https://github.com/images/modules/site/readme/unseen-oss/unseen-oss2.jpg', {
  fitMode: 'cover',
  alignX: true,
  alignY: true,
});

frame.add(background);

window.addEventListener('resize', () => {
  console.log('resize');
  frame.resize();
});
