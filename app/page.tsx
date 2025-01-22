
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { auth } from "@clerk/nextjs/server";

export default async function Home() {

  const { userId } = await auth();


  return (
      <main className="flex flex-col justify-center gap-2 h-screen items-center">
        <h1 className="text-5xl font-bold">Invoicing App</h1>
        <div className="flex gap-2">
          <Button className="w-full">
            {userId ? <Link href="/dashboard">Dashboard</Link> : <Link href="/sign-in">Sign in</Link>}
          </Button>
        </div>
      </main>
  );
}
