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
import { useTransactions } from "@/hooks/useTransactions";
import { useUserWallet } from "@/hooks/useUserWallet";
import Badge from "../ui/badge/Badge";
import moment from "moment";



export default function TransactionsClientTable() {

  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { page, limit } = useAppSelector((state) => state.paginationReducer);

  const { data: wallet } = useUserWallet(session?.user.id || "")

  const { data, isLoading, isFetching } = useTransactions({
    page,
    limit,
    walletId: wallet ? wallet?.id : undefined
  })
  const totalPages = data?.paginator.pages || 1;


  const pagesAroundCurrent = Array.from(
    { length: Math.min(3, totalPages - 1 || 1) },
    (_, i) => i + Math.max(page - 1, 1)
  );

  if (isLoading) return <p>Carregando...</p>;

  if (!data?.data.length) {
    return <p>Nenhuma transação encontrada.</p>;
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
                    Tipo
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Montante
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
                {data.data.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="px-4 py-3 sm:px-6 text-start">
                      {moment(service.created_at).format('YYYY-MM-DD HH:mm')}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {service.booking?.service?.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge variant="solid" color={
                        service.type === 'CREDIT'
                          ? "success"
                          : 'error'
                      }>
                        {service.type === 'CREDIT' ? 'Crédito' : 'Débito'}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {formattedCurrency(service.amount)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          service.status === 'PAID'
                            ? "success"
                            : service.status === 'FAILED' ? 'error'
                              : service.status === 'REFUNDED' ? 'info' : 'warning'
                        }
                      >
                        {
                          service.status === 'PAID' ? "Pago"
                            : service.status === 'FAILED' ? "Falhou"
                              : service.status === 'REFUNDED' ? "Estorno" : "Pendente"
                        }
                      </Badge>
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
    </>
  );
}
