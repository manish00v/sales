const { validationResult } = require('express-validator');

// const validate = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

// module.exports = validate;

const validate = (schema) => async (req, res, next) => {
  try {
    // Async validation with proper error handling
    const validatedData = await schema.validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    // Replace body with validated data
    req.body = validatedData;
    next();
  } catch (error) {
    if (error.isJoi) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/['"]/g, '')
      }));
      return res.status(400).json({ errors });
    }
    next(error);
  }
};

module.exports = validate;