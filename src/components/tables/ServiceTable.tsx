"use client"
import React from "react";
import Decimal from 'decimal.js'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import PencilIcon from '../../icons/pencil.svg'
import TrashIcon from "../../icons/trash.svg"
import Image from "next/image";
import { useServiceProvider } from "@/hooks/useServiceProvider";
import { useSession } from "next-auth/react";
import { formattedCurrency } from "@/utils/currency";

interface IService {
  id: string;
  name: string;
  description: string;
  price: Decimal;
  providerId: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

export default function ServiceTable() {
  const { data: session, status } = useSession();
  const { data, error } = useServiceProvider(session?.user.id || "")

  return (
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
                  Nome
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
              {data && data.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="px-4 py-3 sm:px-6 text-start">
                    {service.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {formattedCurrency(service.price)}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        service.status === true
                          ? "success"
                          : "error"
                      }
                    >
                      {service.status === true ? "Ativo" : "Desativado"}
                    </Badge>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
                      <button
                        className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <PencilIcon />
                      </button>
                      <button
                        className="px-3 py-2 text-sm text-red-600 hover:bg-red-100"
                      >
                        <TrashIcon />
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
  );
}
