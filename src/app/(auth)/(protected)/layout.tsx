import { getMeApi } from "@/lib/api/auth";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;
  if (token) {
    const me = await getMeApi(token ?? "");
    if (me?.data?.user?.role === "ADMIN") {
      return redirect("/admin");
    } else if (me?.data?.user?.role === "BUSINESS") {
      return redirect("/business");
    } else if (me?.data?.user?.role === "EMPLOYEE") {
      return redirect("/employee");
    }
    return notFound();
  }

  return children;
}
