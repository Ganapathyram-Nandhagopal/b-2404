
import React from 'react';
import { format } from 'date-fns';
import BaseTemplate2 from './BaseTemplate2';
import { calculateSubTotal, calculateTaxAmount, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Receipt6 = ({ data, isPrint = false }) => {
  const { billTo = {}, invoice = {}, yourCompany = {}, cashier = '', items = [], taxPercentage = 0, notes = '', footer = '' } = data || {};

  const subTotal = calculateSubTotal(items);
  const taxAmount = calculateTaxAmount(subTotal, taxPercentage);
  const total = calculateGrandTotal(subTotal, taxAmount);

  return (
    <BaseTemplate2
      width="80mm"
      height="auto"
      className="p-2"
      data={data}
      isPrint={isPrint}
    >
      <div
        className="bg-white flex flex-col min-h-full border-2 border-gray-800"
        style={{
          fontSize: isPrint ? "8px" : "14px",
          fontFamily: "'Times New Roman', serif",
          whiteSpace: "pre-wrap",
          lineHeight: "1.2",
        }}
      >
        <div className="flex-grow p-2">
          <div className="text-center mb-3">
            <div className="border-double border-4 border-gray-800 p-2 mb-2">
              <div className="font-bold text-xl">INVOICE</div>
              {yourCompany.name && <div className="font-bold text-base mt-1">{yourCompany.name}</div>}
            </div>
            {yourCompany.address && <div className="text-sm italic">{yourCompany.address}</div>}
            {yourCompany.phone && <div className="text-sm">Phone: {yourCompany.phone}</div>}
          </div>
          
          <div className="border border-gray-600 p-2 mb-3">
            <div className="text-center font-bold mb-2">TRANSACTION DETAILS</div>
            <div className="text-sm">
              <div>Invoice No: <span className="font-bold">{invoice.number || "N/A"}</span></div>
              <div>Date: <span className="font-bold">{invoice.date ? format(new Date(invoice.date), "MMM dd, yyyy") : "N/A"}</span></div>
              <div>Time: <span className="font-bold">{format(new Date(), "hh:mm a")}</span></div>
              <div>Customer: <span className="font-bold">{billTo || "General"}</span></div>
              <div>Cashier: <span className="font-bold">{cashier || "N/A"}</span></div>
            </div>
          </div>

          <div className="mb-3">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-1">Description</th>
                  <th className="text-center py-1">Qty</th>
                  <th className="text-right py-1">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="py-1 text-xs">{item.name || "Item"}</td>
                    <td className="py-1 text-center">{item.quantity || 0}</td>
                    <td className="py-1 text-right">{formatCurrency((item.quantity || 0) * (item.amount || 0))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t-2 border-gray-800 pt-2">
            <div className="flex justify-between mb-1">
              <span>Sub Total:</span>
              <span className="font-bold">{formatCurrency(subTotal)}</span>
            </div>
            {taxPercentage > 0 && (
              <div className="flex justify-between mb-1">
                <span>Tax ({taxPercentage}%):</span>
                <span className="font-bold">{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold border-t border-gray-600 pt-1">
              <span>GRAND TOTAL:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          {notes && (
            <div className="mt-3 p-2 border border-gray-400 text-xs">
              <div className="font-bold mb-1">Notes:</div>
              <div>{notes}</div>
            </div>
          )}
        </div>
        
        <div className="text-center text-xs mt-2 p-2 border-t border-gray-600 bg-gray-100">
          {footer || "Thank you for your business!"}
        </div>
      </div>
    </BaseTemplate2>
  );
};

export default Receipt6;
