import React from 'react';

interface StatusBadgeProps {
  status: 'Approved' | 'Rejected' | 'Pending';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colors = {
    Approved: 'bg-green-100 text-green-700 ring-green-600/20',
    Rejected: 'bg-red-100 text-red-700 ring-red-600/10',
    Pending: 'bg-orange-100 text-orange-700 ring-orange-600/20'
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ring-1 ring-inset ${colors[status] || colors.Pending}`}>
      {status}
    </span>
  );
}
