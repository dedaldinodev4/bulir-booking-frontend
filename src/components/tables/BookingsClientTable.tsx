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

import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setPage } from "@/redux/features/pagination-slice";
import Badge from "../ui/badge/Badge";
import moment from 'moment'
import { useBookings } from "@/hooks/useBookings";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import { useCancelBooking } from "@/hooks/bookings/useCancelBooking";
import type { Booking } from "@/schemas/booking";
import { toast } from "react-toastify";
import { Modal } from "../ui/modal";
import { ErrorIcon } from "@/icons";



export default function BookingsProviderTable() {

  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { page, limit } = useAppSelector((state) => state.paginationReducer);
  const [bookingSelected, setBookingSelected] = useState<Booking | null>(null)
  const router = useRouter();
  const cancelledModal = useModal();
  const cancelBooking = useCancelBooking();



  const { data, isLoading, isFetching } = useBookings({
    page,
    limit,
    clientId: session ? session.user?.id : undefined
  })
  const totalPages = data?.paginator.pages || 1;


  const pagesAroundCurrent = Array.from(
    { length: Math.min(3, totalPages - 1 || 1) },
    (_, i) => i + Math.max(page - 1, 1)
  );

  if (isLoading) return <p>Carregando...</p>;

  if (!data?.data.length) {
    return <p>Nenhuma reserva encontrada.</p>;
  }


  const handleCancelBooking = () => {
    if (bookingSelected?.id) {
      cancelBooking.mutate(bookingSelected.id || "")
      setTimeout(() => {
        cancelledModal.closeModal();
        toast.success('Serviço cancelado com sucesso.')
        router.push("/");
      }, 1000)
    }
  }

  const showCancelModal = (booking: Booking) => {
    setBookingSelected(booking)
    cancelledModal.openModal();
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
                    Data
                  </TableCell>
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
                    Prestador
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
                    Estado
                  </TableCell>

                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {data.data.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {moment(booking.created_at).format('YYYY-MM-DD HH:mm')}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {booking?.service?.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {booking.provider?.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 sm:px-6 text-start">
                      {formattedCurrency(booking.price)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          booking.status === 'COMPLETED'
                            ? "success"
                            : booking.status === 'CANCELLED' ? 'error'
                              : booking.status === 'CONFIRMED' ? 'info' : 'warning'
                        }
                      >
                        {
                          booking.status === 'COMPLETED' ? "Completo"
                            : booking.status === 'CANCELLED' ? "Cancelado"
                              : booking.status === 'CONFIRMED' ? "Confirmado" : "Pendente"
                        }
                      </Badge>
                    </TableCell>

                    <TableCell className="relative px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                      {booking.status === "CONFIRMED" && (

                        <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
                          <button
                            className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={() => showCancelModal(booking)}
                          >
                            Cancelar
                          </button>
                        </div>


                      )}
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
        key={bookingSelected?.id}
        isOpen={cancelledModal.isOpen}
        onClose={cancelledModal.closeModal}
        className="max-w-[600px] p-5 lg:p-10"
      >
        <div className="text-center">
          <div className="relative flex items-center justify-center z-1 mb-7">
            <svg
              className="fill-error-50 dark:fill-error-500/15"
              width="90"
              height="90"
              viewBox="0 0 90 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.364 6.85053C38.6205 -2.28351 51.3795 -2.28351 55.636 6.85053C58.0129 11.951 63.5594 14.6722 68.9556 13.3853C78.6192 11.0807 86.5743 21.2433 82.2185 30.3287C79.7862 35.402 81.1561 41.5165 85.5082 45.0122C93.3019 51.2725 90.4628 63.9451 80.7747 66.1403C75.3648 67.3661 71.5265 72.2695 71.5572 77.9156C71.6123 88.0265 60.1169 93.6664 52.3918 87.3184C48.0781 83.7737 41.9219 83.7737 37.6082 87.3184C29.8831 93.6664 18.3877 88.0266 18.4428 77.9156C18.4735 72.2695 14.6352 67.3661 9.22531 66.1403C-0.462787 63.9451 -3.30193 51.2725 4.49185 45.0122C8.84391 41.5165 10.2138 35.402 7.78151 30.3287C3.42572 21.2433 11.3808 11.0807 21.0444 13.3853C26.4406 14.6722 31.9871 11.951 34.364 6.85053Z"
                fill=""
                fillOpacity=""
              />
            </svg>

            <span className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <svg
                className="fill-error-600 dark:fill-error-500"
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M32.1445 19.0002C32.1445 26.2604 26.2589 32.146 18.9987 32.146C11.7385 32.146 5.85287 26.2604 5.85287 19.0002C5.85287 11.7399 11.7385 5.85433 18.9987 5.85433C26.2589 5.85433 32.1445 11.7399 32.1445 19.0002ZM18.9987 35.146C27.9158 35.146 35.1445 27.9173 35.1445 19.0002C35.1445 10.0831 27.9158 2.85433 18.9987 2.85433C10.0816 2.85433 2.85287 10.0831 2.85287 19.0002C2.85287 27.9173 10.0816 35.146 18.9987 35.146ZM21.0001 26.0855C21.0001 24.9809 20.1047 24.0855 19.0001 24.0855L18.9985 24.0855C17.894 24.0855 16.9985 24.9809 16.9985 26.0855C16.9985 27.19 17.894 28.0855 18.9985 28.0855L19.0001 28.0855C20.1047 28.0855 21.0001 27.19 21.0001 26.0855ZM18.9986 10.1829C19.827 10.1829 20.4986 10.8545 20.4986 11.6829L20.4986 20.6707C20.4986 21.4992 19.827 22.1707 18.9986 22.1707C18.1701 22.1707 17.4986 21.4992 17.4986 20.6707L17.4986 11.6829C17.4986 10.8545 18.1701 10.1829 18.9986 10.1829Z"
                  fill=""
                />
              </svg>
            </span>
          </div>

          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 sm:text-title-sm">
            Cancelar Serviço!
          </h4>
          <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
            Ao cancelar o serviço, o teu dinheiro volta pra sua carteira.
          </p>

          <div className="flex items-center justify-center w-full gap-3 mt-7">
            <button
              onClick={() => handleCancelBooking()}
              type="button"
              className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-error-500 shadow-theme-xs hover:bg-error-600 sm:w-auto"
            >
              Avançar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
