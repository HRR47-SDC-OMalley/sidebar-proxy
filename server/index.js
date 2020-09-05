const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const pug = require('pug');

const app = express();
app.set('view engine', 'pug');

const URL = process.env.URL || 'http://localhost';
const PORT = process.env.PORT || '3000';
const CLOUD_STYLE_URL = process.env.CLOUD_STYLE_URL;

/**
 * Sources
 */
// Main Photo
// const photoTarget = process.env.PHOTO_TARGET
//   || 'http://localhost:3001';
// const photoScriptUrl = process.env.PHOTO_SCRIPT
//   || 'http://localhost:3001/bundle.js';
// Sidebar
const sbTarget = process.env.SB_TARGET
  || 'http://localhost:3210';
const sbScriptUrl = process.env.SB_SCRIPT
  || 'http://localhost:3210/bundle.js';
// User Reviews
// const reviewsTarget = process.env.REVIEWS_TARGET
//   || 'http://localhost:2625';
// const reviewsScriptUrl = process.env.REVIEWS_SCRIPT
//   || 'http://localhost:2625/dist/bundle.js';
// // Similar Listing and News
// const slnTarget = process.env.SLN_TARGET
//   || 'http://localhost:3005';
// const slnScriptUrl = process.env.SLN_SCRIPT
//   || 'http://localhost:3005/similar-listings-news.bundle.js';

/**
 * Serve template
 */
app.get('/item/:id', (req, res) => {
  res.end(pug.renderFile(path.resolve(__dirname, './../client/listing.pug'), {
    // photoScriptUrl,
    sbScriptUrl,
    // reviewsScriptUrl,
    // slnScriptUrl
  }));
});

/**
 * Serve Styles
 */
if (CLOUD_STYLE_URL) {
  app.get('*/styles.css', (req, res) => {
    res.redirect(`${CLOUD_STYLE_URL}/assets/styles.css`);
  });
} else {
  app.use('*/styles.css', express.static(
    path.resolve(__dirname, './../public/styles.css')
  ));
}

/**
 * Main Photo Proxy
 */
// const photoProxy = { target: photoTarget, changeOrigin: true };
// app.use('*/photo/api/*', createProxyMiddleware(photoProxy));

/**
 * Sidebar Proxy
 */
const sbProxy = { target: sbTarget, changeOrigin: true };
app.use('*/sb/api/*', createProxyMiddleware(sbProxy));

/**
 * Seller Reviews Proxy
 */
// const reviewsProxy = { target: reviewsTarget, changeOrigin: true };
// app.use('*/reviews/api/*', createProxyMiddleware(reviewsProxy));

/**
 * Similar Listings & Related News Proxy
 */
// const slnProxy = { target: slnTarget, changeOrigin: true };
// app.use('*/sln/api/*', createProxyMiddleware(slnProxy));

app.listen(PORT, () => console.log(`ReBurke listening on ${URL}:${PORT}`));
