function houdini() {
  (async function () {
    // Polyfill for older browsers
    if (CSS['paintWorklet'] === undefined) {
      await import('https://unpkg.com/css-paint-polyfill');
    }

    // Looking for the source of the Paint Worklet?
    // ~> Go check out https://github.com/bramus/css-houdini-circles
    CSS.paintWorklet.addModule(
      'https://unpkg.com/css-houdini-circles/dist/circles.js',
    );
  })();
}
setTimeout(() => {
  houdini();
}, 300);
