
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateReceiptPDF } from "../utils/receiptPDFGenerator";
import { generateRandomInvoiceNumber, footerOptions } from "../utils/receiptUtils";
import ItemDetails from "../components/ItemDetails";
import CompanySection from "../components/receipt/CompanySection";
import BillToSection from "../components/receipt/BillToSection";
import InvoiceInfoSection from "../components/receipt/InvoiceInfoSection";
import TotalsSection from "../components/receipt/TotalsSection";
import NotesFooterSection from "../components/receipt/NotesFooterSection";
import ReceiptTemplateSelector from "../components/receipt/ReceiptTemplateSelector";
import ReceiptPreview from "../components/receipt/ReceiptPreview";

const ReceiptPage = () => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const receiptRef = useRef(null);

  const [billTo, setBillTo] = useState("");
  const [invoice, setInvoice] = useState({
    date: "",
    number: generateRandomInvoiceNumber(),
  });
  const [yourCompany, setYourCompany] = useState({
    name: "",
    address: "",
    phone: "",
    gst: "",
  });
  const [cashier, setCashier] = useState("");
  const [items, setItems] = useState([
    { name: "", description: "", quantity: 0, amount: 0, total: 0 },
  ]);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [theme, setTheme] = useState("Receipt1");
  const [notes, setNotes] = useState("");
  const [footer, setFooter] = useState("Thank you");

  const refreshFooter = () => {
    const randomIndex = Math.floor(Math.random() * footerOptions.length);
    setFooter(footerOptions[randomIndex]);
  };

  useEffect(() => {
    // Initialize with default values
    setInvoice((prev) => ({ ...prev, number: generateRandomInvoiceNumber() }));
    setItems([{ name: "", description: "", quantity: 0, amount: 0, total: 0 }]);
  }, []);

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    const formData = {
      billTo,
      invoice,
      yourCompany,
      cashier,
      items,
      taxPercentage,
      notes,
      footer,
    };
    localStorage.setItem("receiptFormData", JSON.stringify(formData));
  }, [billTo, invoice, yourCompany, items, taxPercentage, notes]);

  const handleDownloadPDF = async () => {
    if (!isDownloading && receiptRef.current) {
      setIsDownloading(true);
      try {
        await generateReceiptPDF(receiptRef.current);
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === "quantity" || field === "amount") {
      newItems[index].total = newItems[index].quantity * newItems[index].amount;
    }
    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", description: "", quantity: 0, amount: 0, total: 0 },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const calculateSubTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const calculateTaxAmount = () => {
    const subTotal = parseFloat(calculateSubTotal());
    return (subTotal * (taxPercentage / 100)).toFixed(2);
  };

  const calculateGrandTotal = () => {
    const subTotal = parseFloat(calculateSubTotal());
    const taxAmount = parseFloat(calculateTaxAmount());
    return (subTotal + taxAmount).toFixed(2);
  };

  const receiptData = {
    billTo,
    invoice,
    yourCompany,
    cashier,
    items,
    taxPercentage,
    notes,
    footer,
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Receipt Generator</h1>
        <div className="flex items-center">
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="mr-4"
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              "Download Receipt PDF"
            )}
          </Button>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
            aria-label="Switch to Bill Generator"
          >
            <FileText size={24} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <form>
            <CompanySection
              yourCompany={yourCompany}
              setYourCompany={setYourCompany}
              cashier={cashier}
              setCashier={setCashier}
            />

            <BillToSection billTo={billTo} setBillTo={setBillTo} />

            <InvoiceInfoSection invoice={invoice} setInvoice={setInvoice} />

            <ItemDetails
              items={items}
              handleItemChange={handleItemChange}
              addItem={addItem}
              removeItem={removeItem}
            />

            <TotalsSection
              calculateSubTotal={calculateSubTotal}
              taxPercentage={taxPercentage}
              setTaxPercentage={setTaxPercentage}
              calculateTaxAmount={calculateTaxAmount}
              calculateGrandTotal={calculateGrandTotal}
            />

            <NotesFooterSection
              notes={notes}
              setNotes={setNotes}
              footer={footer}
              setFooter={setFooter}
              refreshFooter={refreshFooter}
            />
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Receipt Preview</h2>
          <ReceiptTemplateSelector theme={theme} setTheme={setTheme} />
          <ReceiptPreview ref={receiptRef} theme={theme} data={receiptData} />
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
