export function copyToClipboard(text: string): void {
  const hidden = document.createElement("textarea");

  hidden.style.position = "fixed";
  hidden.style.bottom = "0";
  hidden.style.right = "0";
  hidden.value = text;
  document.body.appendChild(hidden);
  hidden.select();
  document.execCommand('copy');
  document.body.removeChild(hidden);
}
