import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import InputGroup from "@/components/form/form-elements/InputGroup";
import PhoneInput from "@/components/form/group-input/PhoneInput";
import Input from "@/components/form/input/InputCustom";
import Label from "@/components/form/Label";
import ServiceForm from "@/components/service/ServiceForm";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { EnvelopeIcon } from "@/icons";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "booking.ao | Novo Serviço",
  description: "",
};

export default function CreateService() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Novo Serviço" />
      <ServiceForm />
    </div>
  );
}
