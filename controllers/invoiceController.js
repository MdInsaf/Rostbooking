const invoiceService = require('../services/invoiceService');

const getAllInvoices = (req, res) => {
  invoiceService.getAllInvoices((err, invoices) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching invoices' });
    } else {
      res.status(200).json(invoices);
    }
  });
};

const getInvoiceById = (req, res) => {
  const { id } = req.params;
  invoiceService.getInvoiceById(id, (err, invoice) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching invoice' });
    } else {
      res.status(200).json(invoice);
    }
  });
};

const createInvoice = (req, res) => {
  const invoiceData = req.body;
  invoiceService.createInvoice(invoiceData, (err, invoice) => {
    if (err) {
      res.status(500).json({ error: 'Error creating invoice' });
    } else {
      res.status(201).json(invoice);
    }
  });
};

const updateInvoice = (req, res) => {
  const { id } = req.params;
  const invoiceData = req.body;
  invoiceService.updateInvoice(id, invoiceData, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error updating invoice' });
    } else {
      res.status(200).json(results);
    }
  });
};

const deleteInvoice = (req, res) => {
  const { id } = req.params;
  invoiceService.deleteInvoice(id, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting invoice' });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
