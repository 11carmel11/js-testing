
window.onload = function() {

  document.getElementById('equals').addEventListener('click', async function () {
    const operator = document.getElementById('operator').value;

    const a = document.getElementById('a').value;
    const b = document.getElementById('b').value;

    document.getElementById('result').value = await calc(operator, a, b);
    document.getElementById('result').className = 'success';
  })
}


async function calc(operator, a, b) {
  const response = await fetch(`http://localhost:3000/${operator}?a=${a}&b=${b}`)
  const responseJson = await response.json();

  return responseJson.result;
}
