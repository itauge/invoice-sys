import { Badge } from "@/components/ui/badge";
import prisma from "@/prisma/db"
import { cn } from "@/lib/utils";

interface Props {
    params: {
        invoiceId: string
    }
}

export default async function Dashboard({params}: Props) {

    const invoiceId = parseInt(params.invoiceId);

    if (isNaN(invoiceId)) {
        throw new Error("Invalid invoice ID");
    }

    const invoice = await prisma.invoices.findUnique({
        where: {
            id: invoiceId
        }
    })

    if (!invoice) {
        throw new Error("Invoice not found");
    }

  return (
    <main className="h-full max-w-5xl mx-auto my-12">
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
        <p>
            
        </p>
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
    </main>
  );
}
