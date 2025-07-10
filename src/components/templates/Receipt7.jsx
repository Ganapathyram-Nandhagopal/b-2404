
import React from 'react';
import { format } from 'date-fns';
import BaseTemplate2 from './BaseTemplate2';
import { calculateSubTotal, calculateTaxAmount, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Receipt7 = ({ data, isPrint = false }) => {
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
        className="bg-gradient-to-b from-blue-50 to-white flex flex-col min-h-full"
        style={{
          fontSize: isPrint ? "8px" : "14px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          whiteSpace: "pre-wrap",
          lineHeight: "1.2",
        }}
      >
        <div className="flex-grow">
          <div className="bg-blue-600 text-white p-3 text-center mb-3 -m-2 mb-2">
            <div className="font-bold text-lg">DIGITAL RECEIPT</div>
            {yourCompany.name && <div className="text-sm mt-1">{yourCompany.name}</div>}
          </div>
          
          <div className="px-2">
            {yourCompany.address && <div className="text-center text-sm mb-1">{yourCompany.address}</div>}
            {yourCompany.phone && <div className="text-center text-sm mb-3">📞 {yourCompany.phone}</div>}
            
            <div className="bg-white rounded-lg p-2 mb-3 shadow-sm border">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-gray-600">Receipt #</div>
                  <div className="font-bold">{invoice.number || "N/A"}</div>
                </div>
                <div>
                  <div className="text-gray-600">Date & Time</div>
                  <div className="font-bold">
                    {invoice.date ? format(new Date(invoice.date), "dd/MM/yy") : "N/A"} • {format(new Date(), "HH:mm")}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">Customer</div>
                  <div className="font-bold">{billTo || "Guest"}</div>
                </div>
                <div>
                  <div className="text-gray-600">Cashier</div>
                  <div className="font-bold">{cashier || "System"}</div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="bg-gray-100 p-2 rounded-t-lg">
                <div className="font-bold text-sm">ORDER SUMMARY</div>
              </div>
              <div className="bg-white border-l border-r border-b rounded-b-lg p-2">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.name || "Item"}</div>
                      <div className="text-xs text-gray-500">{item.quantity || 0} × {formatCurrency(item.amount || 0)}</div>
                    </div>
                    <div className="font-bold text-sm">
                      {formatCurrency((item.quantity || 0) * (item.amount || 0))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
              <div className="flex justify-between text-sm mb-1">
                <span>Subtotal</span>
                <span>{formatCurrency(subTotal)}</span>
              </div>
              {taxPercentage > 0 && (
                <div className="flex justify-between text-sm mb-1">
                  <span>Tax ({taxPercentage}%)</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t border-blue-300 pt-2 mt-2">
                <span>TOTAL</span>
                <span className="text-blue-600">{formatCurrency(total)}</span>
              </div>
            </div>

            {notes && (
              <div className="mt-3 p-2 bg-yellow-50 rounded border border-yellow-200 text-xs">
                <div className="font-bold text-yellow-800 mb-1">💡 Note:</div>
                <div className="text-yellow-700">{notes}</div>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center text-xs mt-4 p-2 bg-blue-600 text-white -m-2 mt-4">
          {footer || "Thank you for choosing us! 🙏"}
        </div>
      </div>
    </BaseTemplate2>
  );
};

export default Receipt7;
