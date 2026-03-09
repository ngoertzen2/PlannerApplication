import { useEffect } from "react";

const AccountModal = ({ openState, handleClose }) => {

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };

    if (openState) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [openState, handleClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          openState ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ${
          openState ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <h2 className="text-xl text-gray-800 font-primary font-bold">Account</h2>

          <p className="mt-4 text-gray-600">
            Account settings will go here.
          </p>

          <button
            className="mt-auto ml-auto px-4 py-0 text-red-500 font-bold"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountModal