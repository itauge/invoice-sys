import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
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
        <TableRow>
            <TableCell className="font-medium text-left">
                <span className="font-semibold">
                    12/12/2024
                </span>
            </TableCell>
            <TableCell className="text-left">
                <span className="font-semibold">
                    John Doe
                </span>
            </TableCell>
            <TableCell className="text-left">
                <span className="font-semibold">
                    johndoe@gmail.com
                </span>
            </TableCell>
            <TableCell className="text-center">
                <Badge className="rounded-full">
                    Paid
                </Badge>
            </TableCell>
            <TableCell className="text-right">
                <span className="font-semibold">
                    $100.00
                </span>
            </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </main>
  );
}
