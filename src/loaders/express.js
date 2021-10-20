const express = require('express');

module.exports = (expressApp) => {
  expressApp
    .use(express.urlencoded({extended: true}))
    .use(express.json());
}