"use client"
import React from "react";
import { useSession } from "next-auth/react";
import BookingsProviderTable from "./BookingsProviderTable";
import BookingsClientTable from "./BookingsClientTable";

export default function BookingTables() {
  const { data: session, status } = useSession();

  return (
    session?.user.role === 'PROVIDER' ?
      <BookingsProviderTable />
      : <BookingsClientTable />
  )
}
