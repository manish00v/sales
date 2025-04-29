const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { 
      abortEarly: false,
      stripUnknown: true
    });
    next();
  } catch (error) {
    let errorMessages = [];
    
    // Handle Joi validation errors
    if (error.details) {
      errorMessages = error.details.map(d => d.message);
    } 
    // Handle external validation errors
    else if (error.message) {
      errorMessages = [error.message];
    }
    // Handle unknown error types
    else {
      errorMessages = ['Validation failed'];
    }

    return res.status(400).json({
      message: 'Validation error',
      errors: errorMessages,
      success: false
    });
  }
};

module.exports = validate;