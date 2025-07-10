
import React from 'react';
import { format } from 'date-fns';
import BaseTemplate2 from './BaseTemplate2';
import { calculateSubTotal, calculateTaxAmount, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Receipt5 = ({ data, isPrint = false }) => {
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
        className="bg-white flex flex-col min-h-full"
        style={{
          fontSize: isPrint ? "8px" : "14px",
          fontFamily: "'Arial', sans-serif",
          whiteSpace: "pre-wrap",
          lineHeight: "1.3",
        }}
      >
        <div className="flex-grow">
          <div className="text-center mb-3">
            <div className="bg-black text-white p-2 mb-2">
              <div className="font-bold text-lg">SALES RECEIPT</div>
            </div>
            {yourCompany.name && <div className="font-bold text-lg">{yourCompany.name}</div>}
            {yourCompany.address && <div className="text-sm">{yourCompany.address}</div>}
            {yourCompany.phone && <div className="text-sm">Tel: {yourCompany.phone}</div>}
          </div>
          
          <div className="border-t border-b border-gray-400 py-2 mb-2">
            <div className="flex justify-between">
              <span><strong>Receipt#:</strong> {invoice.number || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span><strong>Date:</strong> {invoice.date ? format(new Date(invoice.date), "dd/MM/yyyy") : "N/A"}</span>
              <span><strong>Time:</strong> {format(new Date(), "HH:mm")}</span>
            </div>
            <div><strong>Customer:</strong> {billTo || "Walk-in"}</div>
            <div><strong>Served by:</strong> {cashier || "N/A"}</div>
          </div>

          <div className="mb-3">
            <div className="grid grid-cols-4 gap-1 text-xs font-bold border-b pb-1 mb-2">
              <span>Item</span>
              <span className="text-center">Qty</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-4 gap-1 text-xs mb-1">
                <span className="text-xs">{item.name || "Item"}</span>
                <span className="text-center">{item.quantity || 0}</span>
                <span className="text-right">{formatCurrency(item.amount || 0)}</span>
                <span className="text-right">{formatCurrency((item.quantity || 0) * (item.amount || 0))}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-400 pt-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>{formatCurrency(subTotal)}</span>
            </div>
            {taxPercentage > 0 && (
              <div className="flex justify-between text-sm">
                <span>Tax ({taxPercentage}%):</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base border-t pt-1 mt-1">
              <span>TOTAL:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          {notes && (
            <div className="mt-3 text-xs">
              <div>{notes}</div>
            </div>
          )}
        </div>
        
        <div className="text-center text-xs mt-4 border-t pt-2">{footer || ""}</div>
      </div>
    </BaseTemplate2>
  );
};

export default Receipt5;
