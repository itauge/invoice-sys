import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Container from "@/components/Container";
import Link from "next/link";
import DataTable from "@/app/invoices/DataTable";
import prisma from "@/prisma/db"
import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {

    const session = await auth();

    const invoices = await prisma.invoices.findMany({
        where: {
            userId: session?.userId
        },
        include: {
            customer: true
        }
    });

  return (
        <main className="h-full my-12">
            <Container>
                <div className="flex justify-between mb-6">
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
        </Container>
    </main>
  );
}
