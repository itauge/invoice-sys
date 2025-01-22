"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Container from "@/components/Container"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Invoices, Status } from "@prisma/client"
import { useOptimistic } from "react"

interface InvoiceProps {
    invoice: Invoices
    updateInvoiceStatus: (formData: FormData) => Promise<void>
    AVAILABLE_STATUSES: {id: string, label: string}[]
}

export default function Invoice({invoice, updateInvoiceStatus, AVAILABLE_STATUSES}: InvoiceProps) {

    //樂觀更新 - 即係話喺server確認之前，UI就會即刻更新。
    const [currentStatus, setCurrentStatus] = useOptimistic(
        invoice.status, (state, newStatus: Status) => {
        return newStatus
    })

    async function handleUpdateStatus(formData: FormData) {
        setCurrentStatus(formData.get("status") as Status)
        try{
            await updateInvoiceStatus(formData)
        } catch {
            setCurrentStatus(invoice.status)
        }
    }

    return (
        <main className="w-full h-full my-12">
        <Container>
        <div className="flex justify-between mb-8">
        <h1 className="flex items-center gap-2 text-3xl font-semibold">{invoice.id}
            <Badge className={cn(
                "rounded-full",
                currentStatus === "PENDING" && "bg-yellow-500",
                currentStatus === "PAID" && "bg-green-500",
                currentStatus === "CANCELLED" && "bg-red-500"
            )}>
                {currentStatus}
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
                    <DropdownMenuItem key={status.id} disabled={currentStatus === status.id}>
                        <form action={handleUpdateStatus}>
                            <input type="hidden" name="id" value={invoice.id} />
                            <input type="hidden" name="status" value={status.id} />
                            <button type="submit">
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
    )
}

