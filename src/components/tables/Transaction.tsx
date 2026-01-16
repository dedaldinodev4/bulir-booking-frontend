"use client"
import React from "react";
import { useSession } from "next-auth/react";
import TransactionsProviderTable from "./TransactionsProviderTable";
import TransactionsClientTable from "./TransactionsClientTable";

export default function TransactionTables() {
  const { data: session, status } = useSession();

  return (
    session?.user.role === 'PROVIDER' ?
      <TransactionsProviderTable />
      : <TransactionsClientTable />
  )
}
