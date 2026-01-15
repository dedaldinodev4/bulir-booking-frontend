import React from "react";

import ComponentCard from "@/components/common/ComponentCard";
import { Metadata } from "next";
import ServiceTables from "@/components/tables/Service";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export const metadata: Metadata = {
  title: "booking.ao | Serviços",
  description: "",
};

export default function Services() {

  return (
    <ProtectedRoute allowedRoles={["PROVIDER", "CLIENT"]}>
      <div>
        <div className="space-y-6">
          <ComponentCard title="Lista de Serviços">
            <ServiceTables />
          </ComponentCard>
        </div>
      </div>
    </ProtectedRoute>

  );
}
