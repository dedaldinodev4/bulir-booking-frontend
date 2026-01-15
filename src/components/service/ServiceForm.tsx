"use client";
import React, { useState } from 'react';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import Input from '../form/input/InputCustom';
import TextArea from '../form/input/TextArea';

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateServiceSchema,
  CreateServiceDTO,
} from "@/schemas/service";
import { useCreateService } from '@/hooks/services/useCreateService';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import Button from '../ui/button/Button';
import { useSession } from "next-auth/react";


export default function ServiceForm() {
  const [description, setDescription] = useState("");
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateServiceDTO>({
    resolver: zodResolver(CreateServiceSchema),
  })

  const createService = useCreateService();
  const router = useRouter();
  

  const onSubmit: SubmitHandler<CreateServiceDTO> = async (serviceData) => {
    const { name, price } = serviceData;
    
    createService.mutate({
      name,
      price,
      description,
      providerId: session?.user.id
    });
    setTimeout(() => {
      toast.info('Serviço adicionado com sucesso!')
      router.push("/services");
    }, 1000) 

  }

  return (
    <ComponentCard title="Formulário">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Nome</Label>
            <Input
              type="text"
              {...register('name')}
              error={!!errors.name}
              hint={errors.name?.message}
            />
          </div>
          <div>
            <Label>Preço</Label>
            <Input
              type="number"
              min={500}
              {...register('price')}
              error={!!errors.price}
              hint={errors.price?.message}
            />
          </div>

          <div>
            <Label>Descrição</Label>
            <TextArea
              rows={6}
              placeholder='Descrição do serviço'
              value={description}
              onChange={(value) => setDescription(value)}
            />
          </div>
        </div>
          <div className='mt-6'>
            <Button size="sm" type="submit">
              Adicionar Serviço 
            </Button>
          </div>
      </form>
    </ComponentCard>
  );
}
