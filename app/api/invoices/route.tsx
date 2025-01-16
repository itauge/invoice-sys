import { NextRequest } from "next/server";
import prisma from "@/prisma/db";
import { NextResponse } from "next/server";
import { invoiceSchema } from "@/validationSchemas/invoices";

export async function POST(req: NextRequest) {

    const body = await req.json();

    const validation = invoiceSchema.safeParse(body);

    if(!validation.success){
        return NextResponse.json({error: validation.error.message}, {status: 400})
    }

    const invoice = await prisma.invoices.create({
        data: {value: Number(body.value), description: body.description}
    })
    return NextResponse.json(invoice, { status: 201 });
}
