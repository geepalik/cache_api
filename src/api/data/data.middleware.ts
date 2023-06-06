import {check, query} from "express-validator";

const getKeyValidator = [
    query('key')
        .not()
        .isEmpty()
        .withMessage('Key is required')
];

const setKeyValidator = [
    check('key')
        .not()
        .isEmpty()
        .withMessage('Key is required'),
    check('value')
        .not()
        .isEmpty()
        .withMessage('Value is required'),
    check('hour')
        .not()
        .isEmpty()
        .isNumeric()
        .withMessage('Hour is required'),
    check('minutes')
        .not()
        .isEmpty()
        .isInt({ min: 0, max: 59 })
        .withMessage('Minutes are required and must be within the allowed values: 0-59'),
    check('seconds')
        .not()
        .isEmpty()
        .isInt({ min: 0, max: 59 })
        .withMessage('Seconds are required and must be within the allowed values: 0-59'),
];

export {
    getKeyValidator,
    setKeyValidator
}