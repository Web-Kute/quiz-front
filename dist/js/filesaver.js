export function download_file(name, contents, mime_type) {
  mime_type = mime_type || 'text/plain;charset=utf-8"';

  const blob = new Blob([contents], { type: mime_type });

  const dlink = document.createElement('a');
  dlink.download = name;
  dlink.href = window.URL.createObjectURL(blob);
  dlink.onclick = function () {
    // revokeObjectURL needs a delay to work properly
    const that = this;
    setTimeout(function () {
      window.URL.revokeObjectURL(that.href);
    }, 1500);
  };

  dlink.click();
  dlink.remove();
}
