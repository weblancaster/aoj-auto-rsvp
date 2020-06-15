/** @format */

const puppeteer = require("puppeteer");

let browserPromise = puppeteer.launch({
  args: ["--no-sandbox"],
});

const loginPage = "https://mindbody.io/login";
const aojPage = "https://mindbody.io/locations/art-of-jiu-jitsu";
const loginRequest = "https://identity.mparticle.com/v1/login";

exports.aojAutoRSVP = async (req, res) => {
  const browser = await browserPromise;
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

  await page.goto(loginPage, {
    waitUntil: "load",
  });

  // login
  await page.type('input[name="email"]', process.env.CRED_EMAIL);
  await page.type('input[name="password"]', process.env.CRED_PWD);
  await page.keyboard.press("Enter");
  await page.waitForResponse(loginRequest);

  // go to aoj page
  await page.goto(aojPage);
  await page.waitFor(5000);

  // select class

  const image = await page.screenshot({ fullPage: true });

  res.setHeader("Content-Type", "image/png");
  res.send(image);

  context.close();
};
