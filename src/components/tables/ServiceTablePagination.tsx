"use client"
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";


import { useSession } from "next-auth/react";
import { formattedCurrency } from "@/utils/currency";
import { useServices } from "@/hooks/useServices";

import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setPage } from "@/redux/features/pagination-slice";
import { Modal } from "../ui/modal";
import { useModal } from "@/hooks/useModal";
import Label from "../form/Label";
import Input from "../form/input/InputCustom";
import Button from "../ui/button/Button";
import type { Service } from "@/schemas/service";
import TextArea from "../form/input/TextArea";
import { useCreateBooking } from "@/hooks/bookings/useCreateBooking";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";



export default function ServiceTablePagination() {


  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { page, limit } = useAppSelector((state) => state.paginationReducer);
  const [serviceSelected, setServiceSelected] = useState<Service | null>(null)
  const router = useRouter();

  const { data, isLoading, isFetching } = useServices(page, limit)
  const totalPages = data?.paginator.pages || 1;
  const { isOpen, openModal, closeModal } = useModal();
  const createBooking = useCreateBooking();


  const pagesAroundCurrent = Array.from(
    { length: Math.min(3, totalPages - 1 || 1) },
    (_, i) => i + Math.max(page - 1, 1)
  );

  if (isLoading) return <p>Carregando...</p>;

  if (!data?.data.length) {
    return <p>Nenhum serviço encontrado.</p>;
  }

  const openModalWithService = (serviceItem: Service) => {
    setServiceSelected(serviceItem)
    openModal()
  }

  const saveBooking = () => {
    if (serviceSelected) {
      createBooking.mutate({
        serviceId: serviceSelected.id,
        providerId: serviceSelected.providerId,
        price: serviceSelected.price,
        clientId: session?.user.id
      })

      setTimeout(() => {
        toast.success('Contrato feito com sucesso!')
        router.push("/");
      }, 2000)
    }
  }



  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-[900px] overflow-x-auto">
          <div className="min-w-[400px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Serviço
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Preço
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Prestador
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Contacto
                  </TableCell>

                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {data.data.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="px-4 py-3 sm:px-6 text-start">
                      {service.name}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {formattedCurrency(service.price)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {service?.provider?.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {service?.provider?.email}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
                        <button
                          className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          disabled={!service.status}
                          onClick={() => openModalWithService(service)}
                        >
                          Contratar
                        </button>
                      </div>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </div>

        </div>

      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => dispatch(setPage(page - 1))}
          disabled={page === 1}
          className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
        >
          Anterior
        </button>
        <div className="flex items-center gap-2">
          {page > 3 && <span className="px-2">...</span>}
          {pagesAroundCurrent.map((page) => (
            <button
              key={page}
              onClick={() => dispatch(setPage(page))}
              className={`px-4 py-2 rounded ${data.paginator.currentPage === page
                ? "bg-brand-500 text-white"
                : "text-gray-700 dark:text-gray-400"
                } flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500`}
            >
              {page}
            </button>
          ))}
          {page < totalPages - 2 && <span className="px-2">...</span>}
        </div>
        <button
          onClick={() => dispatch(setPage(page + 1))}
          disabled={page === totalPages}
          className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
        >
          Próximo
        </button>
      </div>

      <Modal
        key={serviceSelected?.id}
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-10"
      >
        <form className="">
          <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
            Contrato
          </h4>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div className="col-span-1">
              <Label>Serviço</Label>
              <Input type="text" disabled defaultValue={serviceSelected?.name || ""} />
            </div>

            <div className="col-span-1">
              <Label>Prestador</Label>
              <Input type="text" disabled defaultValue={serviceSelected?.provider?.name || ""} />
            </div>

            <div className="col-span-1">
              <Label>Preço</Label>
              <Input type="text" disabled defaultValue={serviceSelected?.price || ""} />
            </div>

            <div className="col-span-1">
              <Label>Descrição</Label>
              <TextArea
                rows={3}
                disabled
                value={serviceSelected?.description || ""}
              />
            </div>
          </div>

          <div className="flex items-center justify-end w-full gap-3 mt-6">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Cancelar
            </Button>
            <Button size="sm" onClick={() => saveBooking()}>
              Avançar
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
