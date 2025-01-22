import { NextRequest } from "next/server";
import prisma from "@/prisma/db";
import { NextResponse } from "next/server";
import { invoiceSchema } from "@/validationSchemas/invoices";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {

    const session = await auth();

    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const body = await req.json();

    const validation = invoiceSchema.safeParse(body);

    if(!validation.success){
        return NextResponse.json({error: validation.error.message}, {status: 400})
    }

    // Check if the customer already exists
    const customer = await prisma.customers.findFirst({where: {email: body.email}})

    let finalCustomer = customer;

    if(!customer){
        finalCustomer = await prisma.customers.create({
            data: {name: body.name, email: body.email, userId: String(session.userId)}
        })
    }

    // Create the invoice
    const invoice = await prisma.invoices.create({
        data: {
            value: Number(body.value), 
            description: body.description, 
            userId: session.userId, 
            customerId: finalCustomer ? finalCustomer.id : null
        }
    })
    return NextResponse.json({invoice, customer: finalCustomer}, { status: 201 });
}
