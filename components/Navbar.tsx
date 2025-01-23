import Link from "next/link";

import { Button } from "./ui/button";
import { handleSignOut } from "@/app/actions/authActions";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center py-3 px-4 bg-white shadow-md">
      <div className="flex gap-4 justify-center items-center">
        <Link href="/" className="text-xl font-bold">
          Auth.Js
        </Link>
        <Link href="/payment" className="text-sm font-bold">
          Payment
        </Link>
        <Link href="/profile" className="text-sm font-bold">
          Profile
        </Link>
        <Link href="/villa" className="text-sm font-bold">
          Villa
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
