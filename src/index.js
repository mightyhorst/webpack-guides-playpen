import _ from 'lodash';
import './style.css';
import printMe from './print.js';
import fun from './fun.txt';



/**
 * @namespace SW
 */
 if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('---> SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}


async function getComponent() {
  /**
   * @step import lodash
   */
  // const { default: _ } = await import(/* webpackPrefetch: true */ 'lodash');

  const element = document.createElement('div');
  element.classList.add('hello');
  const btn = document.createElement('button');

  // Lodash, now imported by this script
  element.innerHTML = _.join([fun, 'Hello', 'world', '!'], ' ');

  btn.innerHTML = 'Click me!';

  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

getComponent().then(component => {
  document.body.appendChild(component);
});

if (module.hot) {
  module.hot.accept('./print.js', function() {
    const div = document.createElement('div');
    div.innerText = 'Accepting the updated printMe module!';
    document.body.appendChild(div);
    alert('hot');
    printMe();
  });
}
