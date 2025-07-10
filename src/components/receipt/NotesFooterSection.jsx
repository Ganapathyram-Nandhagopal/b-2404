
import React from 'react';
import { RefreshCw } from 'lucide-react';

const NotesFooterSection = ({ notes, setNotes, footer, setFooter, refreshFooter }) => {
  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border rounded"
          rows="4"
        ></textarea>
      </div>
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <h3 className="text-lg font-medium">Footer</h3>
          <button
            type="button"
            onClick={refreshFooter}
            className="ml-2 p-1 rounded-full hover:bg-gray-200"
            title="Refresh footer"
          >
            <RefreshCw size={16} />
          </button>
        </div>
        <textarea
          value={footer}
          onChange={(e) => setFooter(e.target.value)}
          className="w-full p-2 border rounded"
          rows="2"
        ></textarea>
      </div>
    </>
  );
};

export default NotesFooterSection;
