import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import prisma from "@/prisma/db"
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import { auth } from "@clerk/nextjs/server";
import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Status } from "@prisma/client";
import { revalidatePath } from "next/cache";
  

interface Props {
    params: {
        invoiceId: string
    }
}

const AVAILABLE_STATUSES = [{id: "PENDING", label: "Pending"}, {id: "PAID", label: "Paid"}, {id: "CANCELLED", label: "Cancelled"}]
// Another way to update the status instead of using api
async function updateInvoiceStatus(formData: FormData) {
    "use server"

    const session = await auth();
    
    if (!session?.userId) {
        throw new Error("User not found");
    }

    const id = formData.get("id") as string
    const status = formData.get("status") as string

    if (!["PENDING", "PAID", "CANCELLED"].includes(status)) {
        throw new Error("Invalid status value");
    }

    await prisma.invoices.update({
        where: {id: parseInt(id), userId: session.userId},
        data: {status: status as Status}
    })

    revalidatePath(`/invoices/${id}`)
}

export default async function InvoicePage({params}: Props) {

    const session = await auth();

    const {invoiceId} = await params;
    const id = parseInt(invoiceId);

    if (isNaN(id)) {
        throw new Error("Invalid invoice ID");
    }

    const invoice = await prisma.invoices.findUnique({
        where: {
            id: id,
            userId: session?.userId
        }
    })

    if (!invoice) {
        throw new Error("Invoice not found");
    }

  return (
    <main className="w-full h-full my-12">
        <Container>
        <div className="flex justify-between mb-8">
        <h1 className="flex items-center gap-2 text-3xl font-semibold">{invoiceId}
            <Badge className={cn(
                "rounded-full",
                invoice?.status === "PENDING" && "bg-yellow-500",
                invoice?.status === "PAID" && "bg-green-500",
                invoice?.status === "CANCELLED" && "bg-red-500"
            )}>
                {invoice?.status}
            </Badge>
        </h1>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2" variant="outline">
                    Change Status
                    <ChevronDown className="w-4 h-auto" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {AVAILABLE_STATUSES.map((status) => (
                    <DropdownMenuItem key={status.id}>
                        <form action={updateInvoiceStatus}>
                            <input type="hidden" name="id" value={invoice.id} />
                            <input type="hidden" name="status" value={status.id} />
                            <button type="submit" name="status" value={status.id}>
                                {status.label}
                            </button>
                        </form>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

        </div>
        <p className="text-3xl mb-3">
            {invoice?.value}
        </p>

        <p className="text-lg mb-8">
            {invoice?.description}
        </p>
        <h2 className="font-bold text-lg mb-4">
            Billing Details
        </h2>
        <ul className="grid gap-2">
            <li className="flex gap-4">
                <strong className="block w-28 flex-shrink-0 font-medium text-sm">Invoice ID</strong>
                <span className="text-sm">{invoice?.id}</span>
            </li>
            <li className="flex gap-4">
                <strong className="block w-28 flex-shrink-0 font-medium text-sm">Invoice Date</strong>
                <span className="text-sm">{invoice?.createdAt.toLocaleDateString()}</span>
            </li>
            <li className="flex gap-4">
                <strong className="block w-28 flex-shrink-0 font-medium text-sm">Billing Name</strong>
                <span className="text-sm">text</span>
            </li>
            <li className="flex gap-4">
                <strong className="block w-28 flex-shrink-0 font-medium text-sm">Billing Email</strong>
                <span className="text-sm">text</span>
            </li>
        </ul>
        </Container>
    </main>
  );
}
