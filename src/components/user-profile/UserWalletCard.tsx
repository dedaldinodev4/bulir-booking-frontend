"use client";
import React from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

import { useSession } from "next-auth/react";
import { useUserWallet } from "@/hooks/useUserWallet";
import { formattedCurrency } from "@/utils/currency";
import { convertIDWallet } from "@/utils/wallet";


export default function UserWalletCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { data: session, status } = useSession();
  const { data, error } = useUserWallet(session?.user.id || "");

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  return (
    <>
      {session?.user.role === "ADMIN" ? null :
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                Carteira
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    ID
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {data && convertIDWallet(data.id)}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Saldo
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {data && formattedCurrency(data.balance)}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    MOEDA
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    AOA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </>
  );
}
