
export function print(arr) {
  const frameDocument = document.getElementById('report-frame').contentWindow.document
  console.log(arr)
  for (let i = 1; i < 80; i++) {
    console.log(frameDocument.getElementById('param_' + i))
    frameDocument.getElementById('param_' + i).innerHTML = arr[i - 1]
  }
  frameDocument.getElementById('WordSection1').printArea()
}
