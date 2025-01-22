"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Container from "@/components/Container"
import { ChevronDown, Ellipsis } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Invoices, Status } from "@prisma/client"
import { useOptimistic } from "react"
import { useRouter } from "next/navigation"
import { 
    AlertDialog,
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger } from "@/components/ui/alert-dialog"

interface InvoiceProps {
    invoice: Invoices
    updateInvoiceStatus: (formData: FormData) => Promise<void>
    deleteInvoice: (formData: FormData) => Promise<void>
    AVAILABLE_STATUSES: {id: string, label: string}[]
}

export default function Invoice({invoice, updateInvoiceStatus, deleteInvoice, AVAILABLE_STATUSES}: InvoiceProps) {

    const router = useRouter()

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

    async function handleDeleteInvoice(formData: FormData) {
        try{
            await deleteInvoice(formData)
            router.push("/dashboard")
        } catch {
            console.error("Failed to delete invoice")
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

        <div className="flex flex-col gap-2">
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

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2" variant="outline">
                    <span>
                        More Options
                    </span>
                    <Ellipsis className="w-4 h-auto" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={e => e.preventDefault()}>
                <AlertDialog>
                        <AlertDialogTrigger className="w-full text-left">
                            Delete Invoice
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the invoice.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    <form action={handleDeleteInvoice}>
                                        <input type="hidden" name="id" value={invoice.id} />
                                        <button type="submit">
                                            Delete
                                        </button>
                                    </form>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
        

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

