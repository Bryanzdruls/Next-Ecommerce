export const revalidate = 0;
// https://tailwindcomponents.com/component/hoverable-table

import { redirect } from "next/navigation";


import { Title } from "@/components";
import {  getPaginatedUsers } from "@/actions";
import { UsersTable } from "./ui/UsersTable";
import { auth } from "@/auth.config";

export default async function OrdersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  const session = await auth();

  
  if (!ok) {
    redirect("/auth/login");
  }
  
  return (
    <>
      <Title title="Mantenimiento de los usuarios" />

      <div className="mb-10">
        <UsersTable users={users} session={session}/>
      </div>
    </>
  );
}
