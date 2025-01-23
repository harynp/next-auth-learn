import Link from "next/link";

import { Button } from "./ui/button";
import { auth } from "@/auth";
import { handleSignOut } from "@/app/actions/authActions";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center py-3 px-4 bg-white shadow-md">
      <div className="flex gap-2 justify-center items-center">
        <Link href="/" className="text-xl font-bold">
          Auth.Js
        </Link>
        <Link href="/payment" className="text-sm font-bold">
          Payment
        </Link>
      </div>
      {!session ? (
        <Link href="/auth/signin">
          <Button variant="default">Sign In</Button>
        </Link>
      ) : (
        <form action={handleSignOut}>
          <Button variant="default" type="submit">
            Sign Out
          </Button>
        </form>
      )}
    </nav>
  );
}
