const timeout = process.env.SLOWMO ? 30000 : 10000;

beforeAll(async () => {
  await page.goto(URL, {waitUntil: 'domcontentloaded'});
});

describe('Test header and title of the page', () => {
  test('Title of the page', async () => {
    const title = await page.title();
    expect(title).toBe('Calc App E2E Testing');

  }, timeout);
});

test('Calc `Add` Test ', async () => {
  await page.$eval('#a', el => el.value = '');
  await page.$eval('#b', el => el.value = '');

  await page.type('#a', '3');
  await page.type('#b','2');
  await page.select('#operator', 'add');
  await page.click('#equals');

  await page.waitForFunction('document.getElementById("result").value != ""');

  const result = await page.$eval('#result', el => el.value)

  expect(result).toBe('5');
}, timeout);

test('Calc `Sub` Test ', async () => {

  await page.$eval('#a', el => el.value = '');
  await page.$eval('#b', el => el.value = '');

  await page.type('#a', '6');
  await page.type('#b','3');
  await page.select('#operator', 'sub');
  await page.click('#equals');

  await page.waitForFunction('document.getElementById("result").value != ""');

  const result = await page.$eval('#result', el => el.value)

  expect(result).toBe('3');
}, timeout);

test('Calc `Multiply` Test ', async () => {

  await page.$eval('#a', el => el.value = '');
  await page.$eval('#b', el => el.value = '');

  await page.type('#a', '5');
  await page.type('#b','4');
  await page.select('#operator', 'multiply');
  await page.click('#equals');

  await page.waitForFunction('document.getElementById("result").value != ""');

  const result = await page.$eval('#result', el => el.value)

  expect(result).toBe('20');
}, timeout);

test('Calc `Divide` Test ', async () => {

  await page.$eval('#a', el => el.value = '');
  await page.$eval('#b', el => el.value = '');

  await page.type('#a', '16');
  await page.type('#b','4');
  await page.select('#operator', 'divide');
  await page.click('#equals');

  await page.waitForFunction('document.getElementById("result").value != ""');

  const result = await page.$eval('#result', el => el.value)

  expect(result).toBe('4');
}, timeout);
