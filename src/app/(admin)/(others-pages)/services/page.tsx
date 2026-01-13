import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ServiceTable from "@/components/tables/ServiceTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "booking.ao | Serviços",
  description:"",
};

export default function Services() {
  return (
    <div>
      <div className="space-y-6">
        <ComponentCard title="Lista de Serviços">
          <ServiceTable />
        </ComponentCard>
      </div>
    </div>
  );
}
