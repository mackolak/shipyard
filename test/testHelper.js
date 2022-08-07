const request = require('supertest');
const sinon = require('sinon');
const chai = require('chai');
const buildFastify = require('../app');

const { expect } = chai;
const sandbox = sinon.createSandbox();

module.exports = {
  buildFastify,
  expect,
  request,
  sandbox,
};
