const express = require('express');

const ctrl = require('../../controllers/events');
const { validateBody, validateQuery } = require('../../decorators');
const { isValidId } = require('../../middlewares');
const schemas = require('../../schemas/events');

const eventValidate = validateBody(schemas.eventAddSchema);
const queryEventValidate = validateQuery(schemas.eventQuerySchema);

const router = express.Router();

router.get('/', queryEventValidate, ctrl.getAll);
router.get('/:id', isValidId, ctrl.getById);
router.post('/', eventValidate, ctrl.add);
router.put('/:id', isValidId, eventValidate, ctrl.updateById);
router.delete('/:id', ctrl.deleteById);
module.exports = router;
