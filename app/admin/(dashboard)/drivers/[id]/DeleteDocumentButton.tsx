"use client";

import { useState } from "react";
import { deleteDocument } from "../../actions";

export default function DeleteDocumentButton({ docId }: { docId: string }) {
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this document?")) return;
    
    setIsPending(true);
    try {
      await deleteDocument(docId);
    } catch (e) {
      alert("Error deleting document.");
      setIsPending(false);
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
      title="Delete Document"
    >
      {isPending ? (
        <span className="text-[10px] uppercase font-bold">Deleting...</span>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
      )}
    </button>
  );
}
