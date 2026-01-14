"use client"
import { useSession } from "next-auth/react";
import React from "react";
import ServiceTable from "./ServiceTable";
import ServiceTablePagination from "./ServiceTablePagination";

export default function ServiceTables() {
  const { data: session, status } = useSession();

  return (
    session?.user.role === 'PROVIDER' ?
      <ServiceTable />
      : <ServiceTablePagination />
  )
}
