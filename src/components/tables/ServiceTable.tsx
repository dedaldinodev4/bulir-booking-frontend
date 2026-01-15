"use client"
import React, { useState } from "react";
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

import { useServiceProvider } from "@/hooks/useServiceProvider";
import { useSession } from "next-auth/react";
import { formattedCurrency } from "@/utils/currency";

import { UpdateServiceSchema, type Service, type UpdateServiceDTO } from "@/schemas/service";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateService } from "@/hooks/services/useUpdateService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useModal } from "@/hooks/useModal";

import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import Input from "../form/input/InputCustom";
import Label from "../form/Label";
import TextArea from "../form/input/TextArea";
import { useDeleteService } from "@/hooks/services/useDeleteService";


export default function ServiceTable() {
  const [serviceSelected, setServiceSelected] = useState<any>(null)
  const [serviceSelectedDelete, setServiceSelectedDelete] = useState<Service | null>(null)
  const { data: session, status } = useSession();
  const { data, error } = useServiceProvider(session?.user.id || "")
  const { isOpen, openModal, closeModal } = useModal();
  const errorModal = useModal();



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UpdateServiceDTO>({
    resolver: zodResolver(UpdateServiceSchema),
  })
  const updateService = useUpdateService();
  const deleteService = useDeleteService();
  const router = useRouter();
  const [description, setDescription] = useState("");

  const onSubmit: SubmitHandler<UpdateServiceDTO> = async (serviceData) => {
    const { name, price } = serviceData;
    updateService.mutate({
      id: serviceSelected.id || "", payload: {
        name, price, description: description ? description : serviceSelected.description
      }
    });
    setTimeout(() => {
      toast.info('Alteração feita com sucesso!')
      router.push("/");
    }, 2000)

  }

  const openWithService = (serviceItem: Service) => {
    reset(serviceItem);
    setServiceSelected(serviceItem)
    openModal()
  }

  const openDeleteModal = (serviceItem: Service) => {
    setServiceSelectedDelete(serviceItem)
    errorModal.openModal()
  }

  const handleButtonDelete = () => {
    if (serviceSelectedDelete?.id) {
      deleteService.mutate(serviceSelectedDelete.id)
      setTimeout(() => {
        errorModal.closeModal();
        toast.warning('Serviço deletado com sucesso.')
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
                      {service.status && <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
                        <button
                          onClick={() => openWithService(service)}
                          className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <PencilIcon />
                        </button>
                        <button
                          onClick={() => openDeleteModal(service)}
                          className="px-3 py-2 text-sm text-red-600 hover:bg-red-100"
                        >
                          <TrashIcon />
                        </button>
                      </div>}
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Modal key={serviceSelected?.id} isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Editar Serviço
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Atualização dos dados do serviço
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="custom-scrollbar h-[250px] overflow-y-auto px-2 pb-3">
              <div className="mt-2">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Serviço
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Nome</Label>
                    <Input
                      type="text"
                      {...register('name')}
                      defaultValue={serviceSelected && serviceSelected.name || ""}
                      error={!!errors.name}
                      hint={errors.name?.message}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Preço</Label>
                    <Input
                      type="number"
                      {...register('price')}
                      defaultValue={serviceSelected && Number(serviceSelected.price) || ""}
                      error={!!errors.price}
                      hint={errors.price?.message}
                      min={500}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Descrição</Label>
                    <TextArea
                      rows={6}
                      placeholder='Descrição do serviço'
                      value={description ? description : serviceSelected?.description}
                      onChange={(value) => setDescription(value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cancelar
              </Button>
              <Button size="sm" type="submit">
                Salvar Alteração
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        key={serviceSelectedDelete?.id}
        isOpen={errorModal.isOpen}
        onClose={errorModal.closeModal}
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
                  d="M9.62684 11.7496C9.04105 11.1638 9.04105 10.2141 9.62684 9.6283C10.2126 9.04252 11.1624 9.04252 11.7482 9.6283L18.9985 16.8786L26.2485 9.62851C26.8343 9.04273 27.7841 9.04273 28.3699 9.62851C28.9556 10.2143 28.9556 11.164 28.3699 11.7498L21.1198 18.9999L28.3699 26.25C28.9556 26.8358 28.9556 27.7855 28.3699 28.3713C27.7841 28.9571 26.8343 28.9571 26.2485 28.3713L18.9985 21.1212L11.7482 28.3715C11.1624 28.9573 10.2126 28.9573 9.62684 28.3715C9.04105 27.7857 9.04105 26.836 9.62684 26.2502L16.8771 18.9999L9.62684 11.7496Z"
                  fill=""
                />
              </svg>
            </span>
          </div>

          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 sm:text-title-sm">
            Deletar Serviço
          </h4>
          <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
            Tem certeza que deseja continuar com esta ação, pois
            isso irá apagar o serviço "{serviceSelectedDelete?.name}" na plataforma.
            Deseja continuar ?
          </p>

          <div className="flex items-center justify-center w-full gap-3 mt-7">
            <button
              onClick={() => handleButtonDelete()}
              type="button"
              className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-error-500 shadow-theme-xs hover:bg-error-600 sm:w-auto"
            >
              Sim, Continuar
            </button>
          </div>
        </div>
      </Modal>

    </>
  );
}
