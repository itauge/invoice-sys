import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center h-screen max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold">Invoicing App</h1>
      <p>
        <Button>
          <Link href="/dashboard">Sign in</Link>
        </Button>
      </p>
    </main>
  );
}
