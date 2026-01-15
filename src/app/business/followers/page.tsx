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
import { Badge } from "@/components/ui/badge";
import { cookies } from "next/headers";
import { getFollowers } from "@/lib/api/business";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const data = await getFollowers(token!);

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
      <div className="w-full flex justify-between items-center py-4">
        <h2 className="mb-6 text-2xl font-semibold text-primary">
          Follower List
        </h2>
      </div>

      <Card className="p-0! overflow-hidden!">
        <CardContent className="p-0! ">
          <Table className="">
            <TableHeader className="bg-accent">
              <TableRow>
                <TableHead className="text-primary! text-center">
                  Customer
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Email
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Join Date
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Purchase Count
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((follower) => (
                <TableRow key={follower.id}>
                  <TableCell className="text-center">
                    {follower.customer.full_name}
                  </TableCell>
                  <TableCell className="text-center">
                    {follower.customer.email}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(follower.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {follower.order_count}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                      {follower?.customer?.status === "Active" ? (
                        <span
                          className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <span
                          className="size-1.5 rounded-full bg-red-600 dark:bg-red-400"
                          aria-hidden="true"
                        />
                      )}
                      {follower?.customer?.status}
                    </Badge>
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
