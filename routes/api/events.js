const express = require('express');

const ctrl = require('../../controllers/events');
const { validateBody, validateQuery } = require('../../decorators');
const schemas = require('../../schemas/events');

const addEventValidate = validateBody(schemas.eventAddSchema);
const queryEventValidate = validateQuery(schemas.eventQuerySchema);

const router = express.Router();

router.get('/', queryEventValidate, ctrl.getAll);
router.post('/', addEventValidate, ctrl.add);

module.exports = router;
