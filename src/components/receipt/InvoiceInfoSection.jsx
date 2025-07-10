
import React from 'react';
import FloatingLabelInput from '../FloatingLabelInput';

const InvoiceInfoSection = ({ invoice, setInvoice }) => {
  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Invoice Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FloatingLabelInput
          id="invoiceNumber"
          label="Invoice Number"
          value={invoice.number}
          onChange={handleInputChange(setInvoice)}
          name="number"
        />
        <FloatingLabelInput
          id="invoiceDate"
          label="Invoice Date"
          type="date"
          value={invoice.date}
          onChange={handleInputChange(setInvoice)}
          name="date"
        />
      </div>
    </div>
  );
};

export default InvoiceInfoSection;
