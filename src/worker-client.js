const worker = new Worker(new URL('./worker-thread.js', import.meta.url));

export function fire(){
  worker.postMessage({
    question:
      'The Answer to the Ultimate Question of Life, The Universe, and Everything.',
  });
}
worker.onmessage = ({ data: { answer } }) => {
  alert('from worker: '+answer);
};
