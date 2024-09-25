import React from "react";
import { format } from 'date-fns'

export default ({ data, children }) => {
  return (
    <div className="w-full bg-white relative block px-4 xl:px-5 xl:py-5 xl:border border-neutral-200 xl:shadow-medium rounded-none xl:rounded-lg mb-0">
      <h1 className="text-xl font-medium">{ data?.title }</h1>
      <p className="text-sm text-gray-500">Date created { format(new Date(data?.created_at), 'MMM dd, yyyy') }</p>
      <p className="mt-2">{ data?.description?.substring(0, 240).concat('...') }</p>
      {children}
    </div>
  );
}