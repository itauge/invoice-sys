import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Invoices, Customers } from "@prisma/client";
import Link from "next/link";

interface Props {
    invoices: (Invoices & {
        customer: Customers | null
    })[]
}

const DataTable = ({invoices}: Props) => {
    return (
        <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px] p-4">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Value</TableHead>
          </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
        <TableRow key={invoice.id}>
            <TableCell className="font-medium text-left">
                <Link href={`/invoices/${invoice.id}`} className="font-semibold">
                    {invoice.createdAt.toLocaleDateString()}
                </Link>
            </TableCell>
            <TableCell className="text-left">
                <Link href={`/invoices/${invoice.id}`} className="font-semibold">
                    {invoice.customer?.name}
                </Link>
            </TableCell>
            <TableCell className="text-left">
                <Link href={`/invoices/${invoice.id}`} className="font-semibold">
                    {invoice.customer?.email}
                </Link>
            </TableCell>
            <TableCell className="text-center">
                <Link href={`/invoices/${invoice.id}`}>
                    <Badge className={cn(
                        "rounded-full",
                        invoice?.status === "PENDING" && "bg-yellow-500",
                        invoice?.status === "PAID" && "bg-green-500",
                        invoice?.status === "CANCELLED" && "bg-red-500"
                    )}>
                        {invoice?.status}
                    </Badge>
                </Link>
            </TableCell>
            <TableCell className="text-right">
                <Link href={`/invoices/${invoice.id}`} className="font-semibold">
                    ${invoice.value}
                </Link>
            </TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
    )
}

export default DataTable;