const db = require('../config/database');

const getAllInvoices = (callback) => {
  db.query('SELECT * FROM invoice', (err, results) => {
    if (err) {
      console.error('Error fetching invoices:', err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getInvoiceById = (id, callback) => {
  db.query('SELECT * FROM invoice WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching invoice:', err);
      callback(err, null);
    } else {
      callback(null, results[0]);
    }
  });
};

const createInvoice = (invoiceData, callback) => {
  db.query('INSERT INTO invoice SET ?', invoiceData, (err, results) => {
    if (err) {
      console.error('Error creating invoice:', err);
      callback(err, null);
    } else {
      callback(null, { id: results.insertId, ...invoiceData });
    }
  });
};

const updateInvoice = (id, invoiceData, callback) => {
  db.query('UPDATE invoice SET ? WHERE id = ?', [invoiceData, id], (err, results) => {
    if (err) {
      console.error('Error updating invoice:', err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const deleteInvoice = (id, callback) => {
  db.query('DELETE FROM invoice WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error deleting invoice:', err);
      callback(err, null);
    } else {
      callback(null, results);
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
