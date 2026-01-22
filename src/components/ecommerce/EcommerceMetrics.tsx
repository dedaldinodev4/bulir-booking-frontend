"use client";
import React, { useState } from "react";

import { useSession } from "next-auth/react";
import { ClientMetrics } from "./ClientMetrics";
import { ProviderMetrics } from "./ProviderMetrics";

export const EcommerceMetrics = () => {
  const { data: session, status } = useSession()
  
  return (
   <>
    { session?.user.role === 'CLIENT' ? <ClientMetrics/> : <ProviderMetrics/> }
   </>
  );
};
