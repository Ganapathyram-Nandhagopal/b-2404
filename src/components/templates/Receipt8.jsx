
import React from 'react';
import { format } from 'date-fns';
import BaseTemplate2 from './BaseTemplate2';
import { calculateSubTotal, calculateTaxAmount, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Receipt8 = ({ data, isPrint = false }) => {
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
        className="bg-black text-green-400 flex flex-col min-h-full p-2"
        style={{
          fontSize: isPrint ? "8px" : "14px",
          fontFamily: "'Courier New', monospace",
          whiteSpace: "pre-wrap",
          lineHeight: "1.1",
        }}
      >
        <div className="flex-grow">
          <div className="text-center mb-3">
            <div className="text-green-300 font-bold">
              ╔══════════════════════════╗
            </div>
            <div className="text-green-300 font-bold">
              ║     TERMINAL RECEIPT     ║
            </div>
            <div className="text-green-300 font-bold">
              ╚══════════════════════════╝
            </div>
          </div>
          
          <div className="mb-2">
            <div className="text-green-300">COMPANY:</div>
            <div className="text-white">{yourCompany.name || "SYSTEM"}</div>
            {yourCompany.address && <div className="text-gray-400 text-xs">{yourCompany.address}</div>}
            {yourCompany.phone && <div className="text-gray-400 text-xs">TEL: {yourCompany.phone}</div>}
          </div>

          <div className="text-green-300">
            ════════════════════════════
          </div>

          <div className="my-2 text-xs">
            <div className="flex justify-between">
              <span className="text-green-300">ID:</span>
              <span className="text-white">{invoice.number || "000000"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-300">DATE:</span>
              <span className="text-white">
                {invoice.date ? format(new Date(invoice.date), "yyyy-MM-dd") : "0000-00-00"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-300">TIME:</span>
              <span className="text-white">{format(new Date(), "HH:mm:ss")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-300">USER:</span>
              <span className="text-white">{cashier || "ADMIN"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-300">CUST:</span>
              <span className="text-white">{billTo || "GUEST"}</span>
            </div>
          </div>

          <div className="text-green-300">
            ════════════════════════════
          </div>

          <div className="my-2">
            <div className="text-green-300 text-xs mb-1">ITEMS:</div>
            {items.map((item, index) => (
              <div key={index} className="text-xs mb-1">
                <div className="flex justify-between text-white">
                  <span>{(item.name || "ITEM").toUpperCase().substring(0, 15)}</span>
                  <span>{formatCurrency((item.quantity || 0) * (item.amount || 0))}</span>
                </div>
                <div className="text-gray-400 text-xs">
                  QTY: {item.quantity || 0} × {formatCurrency(item.amount || 0)}
                </div>
              </div>
            ))}
          </div>

          <div className="text-green-300">
            ════════════════════════════
          </div>

          <div className="my-2 text-xs">
            <div className="flex justify-between text-white">
              <span>SUBTOTAL:</span>
              <span>{formatCurrency(subTotal)}</span>
            </div>
            {taxPercentage > 0 && (
              <div className="flex justify-between text-white">
                <span>TAX ({taxPercentage}%):</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="text-green-300 mt-1">
              ────────────────────────────
            </div>
            <div className="flex justify-between text-green-300 font-bold">
              <span>TOTAL:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          {notes && (
            <div className="mt-2">
              <div className="text-green-300">
                ════════════════════════════
              </div>
              <div className="text-yellow-400 text-xs mt-1">
                NOTE: {notes}
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center text-xs mt-3">
          <div className="text-green-300">
            ════════════════════════════
          </div>
          <div className="text-gray-400 mt-1">
            {footer || "THANK YOU - SYSTEM LOGOUT"}
          </div>
          <div className="text-green-300 mt-1">
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
          </div>
        </div>
      </div>
    </BaseTemplate2>
  );
};

export default Receipt8;
