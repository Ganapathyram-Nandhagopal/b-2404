
import React from 'react';

const ReceiptTemplateSelector = ({ theme, setTheme }) => {
  const templates = [
    { value: "Receipt1", label: "Classic" },
    { value: "Receipt2", label: "Modern" },
    { value: "Receipt3", label: "Detailed" },
    { value: "Receipt4", label: "GST" },
    { value: "Receipt5", label: "Sales" },
    { value: "Receipt6", label: "Formal" },
    { value: "Receipt7", label: "Digital" },
    { value: "Receipt8", label: "Terminal" },
  ];

  return (
    <div className="mb-4 flex items-center">
      <h3 className="text-lg font-medium mr-4">Receipt Type</h3>
      <div className="grid grid-cols-2 gap-2">
        {templates.map((template) => (
          <label key={template.value} className="flex items-center">
            <input
              type="radio"
              name="theme"
              value={template.value}
              checked={theme === template.value}
              onChange={() => setTheme(template.value)}
              className="mr-2"
            />
            {template.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ReceiptTemplateSelector;
