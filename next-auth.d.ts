import { DefaultSession } from "next-auth";
import { User as NextAuthUser } from "next-auth";

declare module "next-auth" {
  interface User extends NextAuthUser{
    id: string,
    name: string,
    email: string,
    accessToken?: string;
  }

  interface Session extends DefaultSession {
    accessToken?: string;
  }
}
