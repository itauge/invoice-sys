'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import axios from "axios";
import { invoiceSchema } from "@/validationSchemas/invoices";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";


type InvoicesFormData = z.infer<typeof invoiceSchema>;

export default function NewInvoice() {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const form = useForm<InvoicesFormData>({
        resolver: zodResolver(invoiceSchema)
    })

    async function onSubmit(formData: InvoicesFormData){
        try {
            setIsSubmitting(true);
            const response = await axios.post('/api/invoices', formData)
            router.push(`/invoices/${response.data.id}`)
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }

    }

  return (
    <main className="flex flex-col justify-center text-center gap-6 max-w-5xl mx-auto my-12">
    <div className="flex justify-between">
      <h1 className="text-3xl font-semibold">Create Invoice</h1>
    </div>

    <form className="grid gap-4 max-w-xs" onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                    <Label htmlFor="name" className="block mb-2 font-semibold text-sm text-left">Billing Name</Label>
                    <Input {...form.register('name')} />
                </div>
                <div>
                    <Label htmlFor="email" className="block mb-2 font-semibold text-sm text-left">Billing Email</Label>
                    <Input {...form.register('email')} />
                </div>
                <div>
                    <Label htmlFor="value" className="block mb-2 font-semibold text-sm text-left">Value</Label>
                    <Input {...form.register('value')} type="number" />
                </div>
                <div>
                    <Label htmlFor="description" className="block mb-2 font-semibold text-sm text-left">Description</Label>
                    <Textarea {...form.register('description')} />
                </div>
                <div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>Submit</Button>
                </div>
            </form>


    </main>
  );
}
