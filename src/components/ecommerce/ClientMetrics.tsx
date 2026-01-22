"use client";
import React, { useEffect, useState } from "react";
import Badge from "../ui/badge/Badge";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BoxIconLine,
  DollarLineIcon
} from "@/icons";

import {
  clientMetrics,
} from "@/lib/metrics";
import { useMetrics } from "@/hooks/metrics/useMetrics";
import { IClientMetrics } from "@/schemas/metrics";

export const ClientMetrics = () => {
  const { data: metrics } = useMetrics()
  const [clientMetricData, setClientMetricData] = useState<IClientMetrics | null>(null)

  useEffect(() => {
    if (metrics) {
      const result = clientMetrics({
        bookings: metrics.bookings,
        transactions: metrics.transactions
      })
      setClientMetricData(result);
    }
  }, [metrics])

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <DollarLineIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Gasto
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {clientMetricData?.totalSpent}Kz
            </h4>
          </div>
          <Badge color={
            clientMetricData?.transactionRate.dominant === 'PAID' ? 'success'
              : clientMetricData?.transactionRate.dominant === 'FAILED' ? 'error'
                : 'info'
          }>
            {clientMetricData?.transactionRate.dominant === 'PAID' ? <ArrowUpIcon /> :
             clientMetricData?.transactionRate.dominant === 'FAILED' ? <ArrowDownIcon />
             : <ArrowRightIcon />
            }
            {clientMetricData?.transactionRate.dominant === 'PAID' ? clientMetricData.transactionRate.paidRate?.toFixed(0) :
              clientMetricData?.transactionRate.dominant === 'FAILED' ? clientMetricData.transactionRate.failedRate?.toFixed(0) :
                clientMetricData?.transactionRate.paid?.toFixed(0)}%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total de Reservas
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {clientMetricData?.totalBookings}
            </h4>
          </div>

          <Badge color={
            clientMetricData?.bookingRate.dominant === 'COMPLETED' ? 'success' :
              clientMetricData?.bookingRate.dominant === 'CANCELLED' ? 'error'
                : 'info'
          }>
             {clientMetricData?.bookingRate.dominant === 'COMPLETED' ? <ArrowUpIcon /> :
             clientMetricData?.bookingRate.dominant === 'CANCELLED' ? <ArrowDownIcon />
             : <ArrowRightIcon />
            }
            {clientMetricData?.bookingRate.dominant === 'COMPLETED' ? 
            Number(clientMetricData.bookingRate.completedRate).toFixed(0) :
              clientMetricData?.bookingRate.dominant === 'CANCELLED' ? 
              Number(clientMetricData.bookingRate.cancelledRate).toFixed(0) :
                Number(clientMetricData?.bookingRate.completedRate).toFixed(0)}%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
