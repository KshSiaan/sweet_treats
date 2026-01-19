import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DonutChart } from "./donut-chart";
import { PieChartBlock } from "./pie-chart";
import { Badge } from "@/components/ui/badge";
import { cookies } from "next/headers";
import { getStatisticsCD, getStatisticsEP } from "@/lib/api/business";
import { notFound } from "next/navigation";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return notFound();
  }
  const CD = await getStatisticsCD(token);
  const EP = await getStatisticsEP(token);
  return (
    <section>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary ">
          Statistics Dashboard
        </h3>
        <p className="text-sm text-muted-foreground">
          Comprehensive analytics for your business performance.
        </p>
      </div>
      <h3 className="text-2xl font-semibold text-primary py-6">
        Customer Demographics
      </h3>
      <Card>
        <CardContent className="w-full grid grid-cols-2 gap-6">
          <div className="w-fullf flex justify-center items-center">
            <DonutChart data={CD.data.gender} />
          </div>
          <div className="w-fullf flex justify-center items-center">
            <PieChartBlock data={CD.data.age} />
          </div>
        </CardContent>
      </Card>
      <div className="w-full flex justify-between items-center py-4">
        <h2 className="mb-6 text-2xl font-semibold text-primary">
          Employee Performance
        </h2>
      </div>

      <Card className="p-0! overflow-hidden!">
        <CardContent className="p-0! ">
          <Table className="">
            <TableHeader className="bg-accent">
              <TableRow>
                <TableHead className="text-primary! text-center">
                  Employee
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Total Sales
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Transactions
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Avg. Rating
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Performance
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {EP.data.map((emp) => (
                <TableRow>
                  <TableCell className="text-center">
                    {emp.employee_name}
                  </TableCell>
                  <TableCell className="text-center">
                    ${emp.total_sales}
                  </TableCell>
                  <TableCell className="text-center">
                    {emp.order_completed}
                  </TableCell>
                  <TableCell className="text-center">{emp.rating}</TableCell>
                  <TableCell className="text-center">
                    {parseInt(emp?.rating[0]) >= 4 ? (
                      <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                        <span
                          className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                          aria-hidden="true"
                        />
                        Excellent
                      </Badge>
                    ) : parseInt(emp.rating[0]) > 2 ? (
                      <Badge className="rounded-full border-none bg-yellow-600/10 text-yellow-600 focus-visible:ring-yellow-600/20 focus-visible:outline-none dark:bg-yellow-400/10 dark:text-yellow-400 dark:focus-visible:ring-yellow-400/40 [a&]:hover:bg-yellow-600/5 dark:[a&]:hover:bg-yellow-400/5">
                        <span
                          className="size-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400"
                          aria-hidden="true"
                        />
                        Good
                      </Badge>
                    ) : (
                      <Badge className="rounded-full border-none bg-red-600/10 text-red-600 focus-visible:ring-red-600/20 focus-visible:outline-none dark:bg-red-400/10 dark:text-red-400 dark:focus-visible:ring-red-400/40 [a&]:hover:bg-red-600/5 dark:[a&]:hover:bg-red-400/5">
                        <span
                          className="size-1.5 rounded-full bg-red-600 dark:bg-red-400"
                          aria-hidden="true"
                        />
                        Needs Improvement
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
