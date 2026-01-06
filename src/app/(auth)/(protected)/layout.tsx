import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;
  if (token) {
    return notFound();
  }
  return children;
}
