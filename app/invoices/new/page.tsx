import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewInvoice() {
  return (
    <main className="flex flex-col justify-center text-center gap-6 max-w-5xl mx-auto my-12">
    <div className="flex justify-between">
      <h1 className="text-3xl font-semibold">Create Invoice</h1>
    </div>

    <form className="grid gap-4 max-w-xs">
        <div>
            <Label htmlFor="name" className="block mb-2 font-semibold text-sm text-left">Billing Name</Label>
            <Input id="name" name="name" type="text" />
        </div>
        <div>
            <Label htmlFor="email" className="block mb-2 font-semibold text-sm text-left">Billing Email</Label>
            <Input id="email" name="email" type="email" />
        </div>
        <div>
            <Label htmlFor="value" className="block mb-2 font-semibold text-sm text-left">Value</Label>
            <Input id="value" name="value" type="text" />
        </div>
        <div>
            <Label htmlFor="description" className="block mb-2 font-semibold text-sm text-left">Description</Label>
            <Textarea id="description" name="description" />
        </div>
        <div>
            <Button type="submit" className="w-full">Submit</Button>
        </div>
    </form>


    </main>
  );
}
