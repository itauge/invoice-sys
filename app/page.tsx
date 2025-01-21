
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Home() {
  return (
      <main className="flex flex-col justify-center h-screen">
        <h1 className="text-5xl font-bold">Invoicing App</h1>
        <div className="flex gap-2">
          <Button>
            <Link href="/dashboard">Sign in</Link>
          </Button>
        </div>
      </main>
  );
}
