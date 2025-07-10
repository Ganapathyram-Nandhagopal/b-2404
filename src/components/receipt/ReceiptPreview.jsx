
import React from 'react';
import Receipt1 from '../templates/Receipt1';
import Receipt2 from '../templates/Receipt2';
import Receipt3 from '../templates/Receipt3';
import Receipt4 from '../templates/Receipt4';
import Receipt5 from '../templates/Receipt5';
import Receipt6 from '../templates/Receipt6';
import Receipt7 from '../templates/Receipt7';
import Receipt8 from '../templates/Receipt8';

const ReceiptPreview = React.forwardRef(({ theme, data }, ref) => {
  const renderTemplate = () => {
    const templateProps = { data };
    
    switch (theme) {
      case "Receipt1":
        return <Receipt1 {...templateProps} />;
      case "Receipt2":
        return <Receipt2 {...templateProps} />;
      case "Receipt3":
        return <Receipt3 {...templateProps} />;
      case "Receipt4":
        return <Receipt4 {...templateProps} />;
      case "Receipt5":
        return <Receipt5 {...templateProps} />;
      case "Receipt6":
        return <Receipt6 {...templateProps} />;
      case "Receipt7":
        return <Receipt7 {...templateProps} />;
      case "Receipt8":
        return <Receipt8 {...templateProps} />;
      default:
        return <Receipt1 {...templateProps} />;
    }
  };

  return (
    <div ref={ref} className="w-[380px] mx-auto border shadow-lg">
      {renderTemplate()}
    </div>
  );
});

ReceiptPreview.displayName = 'ReceiptPreview';

export default ReceiptPreview;
