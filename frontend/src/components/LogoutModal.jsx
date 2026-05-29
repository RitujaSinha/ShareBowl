function LogoutModal({
    isOpen,
    onClose,
    onConfirm,
  }) {
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
  
        <div className="w-[350px] rounded-2xl bg-white p-6 shadow-xl">
  
          <h2 className="mb-3 text-xl font-bold text-black">
            Confirm Logout
          </h2>
  
          <p className="mb-6 text-gray-600">
            Are you sure you want to logout from ShareBowl?
          </p>
  
          <div className="flex justify-end gap-3">
  
            <button
              onClick={onClose}
              className="rounded-lg bg-gray-200 px-4 py-2 font-medium"
            >
              Cancel
            </button>
  
            <button
              onClick={onConfirm}
              className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-500"
            >
              Logout
            </button>
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default LogoutModal;