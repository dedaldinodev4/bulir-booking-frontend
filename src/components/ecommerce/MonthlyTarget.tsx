"use client";
import { useSession } from "next-auth/react";
import { MonthlyTargetClient } from "./MonthlyTargetClient";
import { MonthlyTargetProvider } from "./MonthlyTargetProvider";


export default function MonthlyTarget() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user.role === 'CLIENT' ?
        <MonthlyTargetClient /> :
        <MonthlyTargetProvider />
      }
    </>
  );
}
