const {
    createSourcingPerson,
    getSourcingPersonById,
    getAllSourcingPersons,
    updateSourcingPerson,
    deleteSourcingPerson
  } = require('../services/sourcingPersonService');
  const { validateSourcingPerson } = require('../validations/sourcingPersonValidation');
  
  exports.createSourcingPerson = async (req, res) => {
    try {
      const { error } = validateSourcingPerson(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
  
      const sourcingPerson = await createSourcingPerson(req.body);
      res.status(201).json(formatSourcingPersonResponse(sourcingPerson));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.getSourcingPerson = async (req, res) => {
    try {
      const sourcingPerson = await getSourcingPersonById(req.params.sourcingPersonId);
      if (!sourcingPerson) return res.status(404).json({ error: 'Sourcing person not found' });
      
      res.json(formatSourcingPersonResponse(sourcingPerson));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getAllSourcingPersons = async (req, res) => {
    try {
      const sourcingPersons = await getAllSourcingPersons();
      res.json(sourcingPersons.map(formatSourcingPersonResponse));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.updateSourcingPerson = async (req, res) => {
    try {
      const { error } = validateSourcingPerson(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
  
      const updatedSourcingPerson = await updateSourcingPerson(req.params.sourcingPersonId, req.body);
      if (!updatedSourcingPerson) return res.status(404).json({ error: 'Sourcing person not found' });
      
      res.json(formatSourcingPersonResponse(updatedSourcingPerson));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.deleteSourcingPerson = async (req, res) => {
    try {
      const deletedSourcingPerson = await deleteSourcingPerson(req.params.sourcingPersonId);
      if (!deletedSourcingPerson) return res.status(404).json({ error: 'Sourcing person not found' });
      res.json({ 
        message: 'Sourcing person deleted successfully',
        data: formatSourcingPersonResponse(deletedSourcingPerson)
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Helper function to format the response with all fields
  function formatSourcingPersonResponse(sourcingPerson) {
    return {
      sourcingPersonId: sourcingPerson.sourcingPersonId,
      sourcingPersonName: sourcingPerson.sourcingPersonName,
      sourcingPersonRole: sourcingPerson.sourcingPersonRole,
      street1: sourcingPerson.street1,
      street2: sourcingPerson.street2,
      city: sourcingPerson.city,
      state: sourcingPerson.state,
      region: sourcingPerson.region,
      country: sourcingPerson.country,
      pinCode: sourcingPerson.pinCode,
      phoneNumber: sourcingPerson.phoneNumber,
      mobileNumber: sourcingPerson.mobileNumber,
      email: sourcingPerson.email,
      department: sourcingPerson.department,
      createdAt: sourcingPerson.createdAt,
      updatedAt: sourcingPerson.updatedAt
    };
  }