import { useState } from "react";

export function ActionDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <span className="text-xl">⋮</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-lg">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <button className="flex w-full items-center px-4 py-2 hover:bg-gray-100">
                ✏️ Edit
              </button>
            </li>
            <li>
              <button className="flex w-full items-center px-4 py-2 hover:bg-gray-100">
                👁 View
              </button>
            </li>
            <li>
              <button className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-red-50">
                🗑 Delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
