import prisma from "@/prisma/db"
import { auth } from "@clerk/nextjs/server";
import { Status } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Invoice from "./invoice";
  

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

async function deleteInvoice(formData: FormData) {
    "use server"

    const session = await auth();
    
    if (!session?.userId) {
        throw new Error("User not found");
    }

    const id = formData.get("id") as string

    await prisma.invoices.delete({where: {id: parseInt(id), userId: session.userId}})
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
    <Invoice 
    invoice={invoice} 
    updateInvoiceStatus={updateInvoiceStatus} 
    AVAILABLE_STATUSES={AVAILABLE_STATUSES} 
    deleteInvoice={deleteInvoice} />
  );
}
