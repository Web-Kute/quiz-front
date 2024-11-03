// import { saveAs } from '../../node_modules/file-saver/dist/FileSaver.js';

// import { domElements } from "./domelem.js";
import { modal } from "./modal.js";

export function saveFile(data, filename) {
  const blob = new Blob([data], { type: 'text/plain' });
  // Convert Blob to File
  const file = new File([blob], filename, {
    type: blob.type,
    lastModified: new Date().getTime(),
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = file;
  modal.appendChild(link);
  link.click();
  URL.revokeObjectURL(url);
}
// const blob = new Blob(['Hello, world!'], { type: 'text/plain' });
// saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBom })
// var blob = new Blob(['bob'], { type: 'text/plain;charset=utf-8' });
// FileSaver.saveAs(blob, 'hello-world.txt');

// let FileSaver = require('file-saver');
// let blob = new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' });
// FileSaver.saveAs(blob, 'hello.txt');

// const file = new File(['foo'], 'NOTE.txt', {
//   type: 'text/plain',
// });

// function download() {
//   const link = document.createElement('a');
//   const url = URL.createObjectURL(file);

//   link.href = url;
//   link.download = file.name;
//   document.body.appendChild(link);
//   link.click();

//   document.body.removeChild(link);
//   window.URL.revokeObjectURL(url);
// }

// console.log(file);
