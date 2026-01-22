"use client";
import React, { useEffect, useState } from "react";
import Badge from "../ui/badge/Badge";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  DollarLineIcon,
  ArrowRightIcon
} from "@/icons";

import {
  providerMetrics,
} from "@/lib/metrics";
import { useMetrics } from "@/hooks/metrics/useMetrics";
import { IProviderMetrics } from "@/schemas/metrics";

export const ProviderMetrics = () => {
  const { data: metrics } = useMetrics()
  const [providerMetricData, setProviderMetricData] = useState<IProviderMetrics | null>(null)



  useEffect(() => {
    if (metrics) {
      const result = providerMetrics({
        bookings: metrics.bookings,
        transactions: metrics.transactions
      })
      setProviderMetricData(result);
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
              Movimentos
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {providerMetricData?.gmv}Kz
            </h4>
          </div>
          <Badge color={
            providerMetricData?.transactionRate.dominant === 'PAID' ? 'success'
              : providerMetricData?.transactionRate.dominant === 'FAILED' ? 'error'
                : 'info'
          }>
            {providerMetricData?.transactionRate.dominant === 'PAID' ? <ArrowUpIcon /> :
             providerMetricData?.transactionRate.dominant === 'FAILED' ? <ArrowDownIcon />
             : <ArrowRightIcon />
            }
            {providerMetricData?.transactionRate.dominant === 'PAID' ? providerMetricData.transactionRate.paidRate?.toFixed(0) :
              providerMetricData?.transactionRate.dominant === 'FAILED' ? providerMetricData.transactionRate.failedRate?.toFixed(0) :
                providerMetricData?.transactionRate.paid?.toFixed(0)}%
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
              {providerMetricData?.totalBookings}
            </h4>
          </div>

          <Badge color={
            providerMetricData?.bookingRate.dominant === 'COMPLETED' ? 'success' :
              providerMetricData?.bookingRate.dominant === 'CANCELLED' ? 'error'
                : 'info'
          }>
            {providerMetricData?.bookingRate.dominant === 'COMPLETED' ? <ArrowUpIcon /> :
             providerMetricData?.bookingRate.dominant === 'CANCELLED' ? <ArrowDownIcon />
             : <ArrowRightIcon />
            }
            {providerMetricData?.bookingRate.dominant === 'COMPLETED' ? 
            providerMetricData.bookingRate.completedRate?.toFixed(0) :
              providerMetricData?.bookingRate.dominant === 'CANCELLED' ? 
              providerMetricData.bookingRate.cancelledRate?.toFixed(0) :
                providerMetricData?.bookingRate.completedRate?.toFixed(0)}%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
