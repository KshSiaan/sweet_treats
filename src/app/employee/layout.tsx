import { AppSidebar } from "@/components/sidebars/employee-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getMeApi } from "@/lib/api/auth";
import { base_url } from "@/lib/utils";
import { BellIcon, SearchIcon } from "lucide-react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return notFound();
  }
  const me = await getMeApi(token);
  if (!me?.data?.user) {
    return notFound();
  }
  if (me.data.user.role !== "EMPLOYEE") {
    return notFound();
  }
  return (
    <SidebarProvider className=" rounded-r-2xl border-0">
      <AppSidebar />
      <SidebarInset className="">
        <header className="shadow border bg-background rounded-xl flex h-18 mb-4! m-6 shrink-0 pr-4 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center w-full justify-between gap-2 px-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">Dashboard Overview</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-row justify-between items-center px-2 rounded-md border">
                <SearchIcon className="text-muted-foreground" />
                <Input
                  className="border-0! shadow-none! bg-transparent! ring-0! outline-0!"
                  placeholder="Search.."
                />
              </div>
              <Button size={"icon"} variant={"ghost"}>
                <BellIcon />
              </Button>
              <div className="flex flex-row gap-4 justify-center items-center">
                <Avatar>
                  <AvatarImage
                    src={
                      me?.data?.user?.avatar
                        ? `${base_url}${me?.data?.user?.avatar}`
                        : "https://avatar.iran.liara.run/public"
                    }
                  />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center items-start">
                  <p className="font-semibold">{me.data.user.full_name}</p>
                  <p className="text-muted-foreground text-xs">
                    {me.data.user.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-6 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
