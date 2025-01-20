import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import DataTable from "@/app/invoices/DataTable";
import prisma from "@/prisma/db"

export default async function Dashboard() {

    const invoices = await prisma.invoices.findMany();

  return (
    <main className="flex flex-col justify-center text-center gap-6 max-w-5xl mx-auto my-12">
        <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-semibold">Invoices</h1>
        <p>
            <Button variant="outline">
                <Link href="/invoices/new" className="flex items-center gap-2">
                    <PlusIcon className="h-4 w-4" />
                    Create Invoice
                </Link>
            </Button>
        </p>
        </div>
        <DataTable invoices={invoices} />
    </main>
  );
}
