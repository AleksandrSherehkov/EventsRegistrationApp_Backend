const express = require('express');

const ctrl = require('../../controllers/users');
const { validateBody, validateQuery } = require('../../decorators');
const { isValidId } = require('../../middlewares');
const schemas = require('../../schemas/users');

const addUserValidate = validateBody(schemas.userSchema);
const queryParamValidate = validateQuery(schemas.userQuerySchema);

const router = express.Router();

router.get('/', queryParamValidate, ctrl.getAll);
router.get('/event/:eventId', ctrl.getByEventId);

// router.get('/:id', isValidId, ctrl.getById);

router.post('/', addUserValidate, ctrl.add);

// router.put('/:id', isValidId, addUserValidate, ctrl.updateById);

// router.delete('/:id', ctrl.deleteById);

// router.get('/up/ping', ctrl.getPing);

module.exports = router;
