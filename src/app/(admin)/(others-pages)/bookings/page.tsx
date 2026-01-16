import React from "react";

import ComponentCard from "@/components/common/ComponentCard";
import { Metadata } from "next";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import BookingTables from "@/components/tables/Booking";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export const metadata: Metadata = {
  title: "booking.ao | Reservas",
  description: "",
};

export default function Bookings() {

  return (
    <ProtectedRoute allowedRoles={["PROVIDER", "CLIENT"]}>
      <div>
      <PageBreadcrumb pageTitle="Reservas" />
        <div className="space-y-6">
          <ComponentCard title="Lista de Reservas">
            <BookingTables />
          </ComponentCard>
        </div>
      </div>
    </ProtectedRoute>

  );
}
