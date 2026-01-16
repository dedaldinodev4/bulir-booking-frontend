import React from "react";

import ComponentCard from "@/components/common/ComponentCard";
import { Metadata } from "next";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import TransactionTables from "@/components/tables/Transaction";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export const metadata: Metadata = {
  title: "booking.ao | Transação",
  description: "",
};

export default function Transactions() {

  return (
    <ProtectedRoute allowedRoles={["PROVIDER", "CLIENT"]}>
      <div>
      <PageBreadcrumb pageTitle="Transações" />
        <div className="space-y-6">
          <ComponentCard title="Lista de Transações">
            <TransactionTables />
          </ComponentCard>
        </div>
      </div>
    </ProtectedRoute>

  );
}
