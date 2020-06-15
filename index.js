/** @format */

const puppeteer = require("puppeteer");

let browserPromise = puppeteer.launch({
  args: ["--no-sandbox"],
});

exports.aojAutoRSVP = async (req, res) => {
  const url = "https://mindbody.io/locations/art-of-jiu-jitsu";

  const browser = await browserPromise;
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

  await page.goto(url);

  const image = await page.screenshot({ fullPage: true });

  res.setHeader("Content-Type", "image/png");
  res.send(image);

  context.close();
};
