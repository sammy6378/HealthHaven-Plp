import React from 'react';
import { FaRegCopy, FaPaperPlane } from 'react-icons/fa';

const Share = () => {
  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Share</h3>
      <p className="text-sm text-gray-500 mb-4">Link to your cabinet</p>
      <p className="text-blue-600 mb-4">telemed-health.com/mike-parker</p>

      <div className="flex flex-col gap-3">
        {/* Copy Link Button */}
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100">
          <FaRegCopy className="text-blue-600" />
          <span className="text-blue-600">Copy link</span>
        </button>

        {/* Send Link Button */}
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700">
          <FaPaperPlane />
          <span>Send link</span>
        </button>
      </div>

      {/* Paper plane icon */}
      <div className="mt-6 flex justify-end">
        <FaPaperPlane className="text-blue-200 text-6xl" />
      </div>
    </div>
  );
};

export default Share;
