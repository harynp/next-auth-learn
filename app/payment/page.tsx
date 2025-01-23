"use client";

import { useSession } from "next-auth/react";

const PaymentPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Welcome, {session?.user?.name || "User"}</p>
    </div>
  );
};

export default PaymentPage;
