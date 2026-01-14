"use client";
import React, { useState } from 'react';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import Input from '../form/input/InputCustom';
import TextArea from '../form/input/TextArea';



export default function ServiceForm() {


  return (
    <ComponentCard title="Formulário">
      <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Nome</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Preço</Label>
          <Input type="number" min={500}/>
        </div>

        <div>
          <Label>Descrição</Label>
          <TextArea
            rows={6}
            placeholder='Descrição do serviço'
          />
        </div>
       
      </div>
    </ComponentCard>
  );
}
