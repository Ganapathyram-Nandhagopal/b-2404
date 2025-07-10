
import React from 'react';
import FloatingLabelInput from '../FloatingLabelInput';

const BillToSection = ({ billTo, setBillTo }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Bill To</h2>
      <FloatingLabelInput
        id="billTo"
        label="Bill To"
        value={billTo}
        onChange={(e) => setBillTo(e.target.value)}
        name="billTo"
      />
    </div>
  );
};

export default BillToSection;
