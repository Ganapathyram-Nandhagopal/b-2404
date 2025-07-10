
import React from 'react';

const TotalsSection = ({ 
  calculateSubTotal, 
  taxPercentage, 
  setTaxPercentage, 
  calculateTaxAmount, 
  calculateGrandTotal 
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Totals</h3>
      <div className="flex justify-between mb-2">
        <span>Sub Total:</span>
        <span>₹ {calculateSubTotal()}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Tax (%):</span>
        <input
          type="number"
          value={taxPercentage}
          onChange={(e) =>
            setTaxPercentage(parseFloat(e.target.value) || 0)
          }
          className="w-24 p-2 border rounded"
          min="0"
          max="28"
          step="1"
        />
      </div>
      <div className="flex justify-between mb-2">
        <span>Tax Amount:</span>
        <span>₹ {calculateTaxAmount()}</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>Grand Total:</span>
        <span>₹ {calculateGrandTotal()}</span>
      </div>
    </div>
  );
};

export default TotalsSection;
