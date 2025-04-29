const accountService = require('../services/accountService');

exports.getAllAccounts = async (req, res) => {
  try {
    const result = await accountService.getAllAccounts(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAccount = async (req, res) => {
  try {
    const account = await accountService.getAccountById(parseInt(req.params.id));
    if (!account) return res.status(404).json({ message: 'Account not found' });
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAccount = async (req, res) => {
  try {
    const newAccount = await accountService.createAccount(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const updatedAccount = await accountService.updateAccount(
      parseInt(req.params.id),
      req.body
    );
    res.json(updatedAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    await accountService.deleteAccount(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDropdownOptions = async (req, res) => {
  try {
    const options = await accountService.getDropdownOptions();
    res.json(options);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};