
import React from 'react';
import { RotateCw } from 'lucide-react';
import FloatingLabelInput from '../FloatingLabelInput';
import { generateGSTNumber } from '../../utils/invoiceCalculations';

const CompanySection = ({ yourCompany, setYourCompany, cashier, setCashier }) => {
  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Your Company</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingLabelInput
          id="yourCompanyName"
          label="Name"
          value={yourCompany.name}
          onChange={handleInputChange(setYourCompany)}
          name="name"
        />
        <FloatingLabelInput
          id="yourCompanyPhone"
          label="Phone"
          value={yourCompany.phone}
          onChange={handleInputChange(setYourCompany)}
          name="phone"
        />
      </div>
      <FloatingLabelInput
        id="yourCompanyAddress"
        label="Address"
        value={yourCompany.address}
        onChange={handleInputChange(setYourCompany)}
        name="address"
        className="mt-4"
      />
      <div className="relative mt-4">
        <FloatingLabelInput
          id="yourCompanyGST"
          label="GST No."
          value={yourCompany.gst}
          onChange={(e) => {
            const value = e.target.value.slice(0, 15);
            handleInputChange(setYourCompany)({
              target: { name: "gst", value },
            });
          }}
          name="gst"
          maxLength={15}
        />
        <button
          type="button"
          onClick={() => {
            const newGST = generateGSTNumber();
            setYourCompany(prev => ({ ...prev, gst: newGST }));
          }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200"
          title="Generate new GST number"
        >
          <RotateCw size={16} />
        </button>
      </div>
      <FloatingLabelInput
        id="cashier"
        label="Cashier"
        value={cashier}
        onChange={(e) => setCashier(e.target.value)}
        name="cashier"
        className="mt-4"
      />
    </div>
  );
};

export default CompanySection;
