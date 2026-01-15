// import { ChartBarDefault } from "./bar-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { getStocks } from "@/lib/api/employee";
import { cookies } from "next/headers";
import StockController from "./stock-controller";

export default async function Page() {
  const token = (await cookies()).get("token")?.value || "";
  const data = await getStocks(token);

  return (
    <section>
      <div className="w-full h-full flex flex-col gap-6">
        <div className="">
          <h3 className="text-2xl font-semibold text-primary ">
            Inventory Management
          </h3>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min bg-background! flex flex-col justify-start items-start">
          <Table className="">
            <TableHeader className="bg-accent ">
              <TableRow>
                <TableHead className="text-primary! text-center">
                  Product
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Current Stock
                </TableHead>
                {/* <TableHead className="text-primary! text-center">
                  Last Updated
                </TableHead> */}
                <TableHead className="text-primary! text-center">
                  Alert Level
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">
                    {item?.product_name}
                  </TableCell>
                  <TableCell className="text-center">{item?.stock}</TableCell>
                  {/* <TableCell className="text-center">10:24 AM</TableCell> */}
                  <TableCell className="text-center">
                    {item?.alert_lavel === "Critical" ||
                    item?.alert_lavel === "Out-of-stock" ? (
                      <Badge className="rounded-full border-none bg-red-600/10 text-red-600 focus-visible:ring-red-600/20 focus-visible:outline-none dark:bg-red-400/10 dark:text-red-400 dark:focus-visible:ring-red-400/40 [a&]:hover:bg-red-600/5 dark:[a&]:hover:bg-red-400/5">
                        <span
                          className="size-1.5 rounded-full bg-red-600 dark:bg-red-400"
                          aria-hidden="true"
                        />
                        {item?.alert_lavel}
                      </Badge>
                    ) : item?.alert_lavel === "Warning" ? (
                      <Badge className="rounded-full border-none bg-yellow-600/10 text-yellow-600 focus-visible:ring-yellow-600/20 focus-visible:outline-none dark:bg-yellow-400/10 dark:text-yellow-400 dark:focus-visible:ring-yellow-400/40 [a&]:hover:bg-yellow-600/5 dark:[a&]:hover:bg-yellow-400/5">
                        <span
                          className="size-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"
                          aria-hidden="true"
                        />
                        Warning
                      </Badge>
                    ) : (
                      <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                        <span
                          className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                          aria-hidden="true"
                        />
                        {item?.alert_lavel}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    <StockController item={item} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
