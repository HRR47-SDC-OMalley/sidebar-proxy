const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const URL = process.env.URL || 'http://localhost';
const PORT = process.env.PORT || '3000';

app.use('/item/:id', express.static(path.resolve(__dirname, './../public')));

/**
 * Main Photo Proxy
 */
const photoTarget = process.env.PHOTO_TARGET || 'http://localhost:3001';
const photoProxy = { target: photoTarget, changeOrigin: true }
app.use('*/photo/api', createProxyMiddleware(photoProxy));

/**
 * Sidebar Proxy
 */
const sbTarget = process.env.SB_TARGET || 'http://localhost:3210';
const sbProxy = { target: sbTarget, changeOrigin: true }
app.use('*/sb/api', createProxyMiddleware(sbProxy));

/**
 * Seller Reviews Proxy
 */
const reviewsTarget = process.env.REVIEWS_TARGET || 'http://localhost:3210';
const reviewsProxy = { target: reviewsTarget, changeOrigin: true }
app.use('*/reviews/api', createProxyMiddleware(reviewsProxy));

/**
 * Similar Listings & Related News Proxy
 */
const slnTarget = process.env.SLN_TARGET || 'http://localhost:3005';
const slnProxy = { target: slnTarget, changeOrigin: true }
app.use('*/sln/api', createProxyMiddleware(slnProxy));

app.listen(PORT, () => console.log(`ReBurke listening on ${URL}:${PORT}`));
