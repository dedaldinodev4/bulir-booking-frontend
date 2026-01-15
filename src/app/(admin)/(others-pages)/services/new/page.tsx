import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ServiceForm from "@/components/service/ServiceForm";
import { Metadata } from "next";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export const metadata: Metadata = {
  title: "booking.ao | Novo Serviço",
  description: "",
};

export default function CreateService() {
  return (
    <ProtectedRoute allowedRoles={["PROVIDER"]}>
      <div>
        <PageBreadcrumb pageTitle="Novo Serviço" />
        <ServiceForm />
      </div>
    </ProtectedRoute>
  );
}
