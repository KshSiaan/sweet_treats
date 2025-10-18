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

export default function Page() {
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
              <TableRow>
                <TableCell className="text-center">John Smith</TableCell>
                <TableCell className="text-center">
                  robert.j@example.com
                </TableCell>
                <TableCell className="text-center">Jan 15, 2025</TableCell>
                <TableCell className="text-center">12</TableCell>
                <TableCell className="text-center">
                  <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                    <span
                      className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                      aria-hidden="true"
                    />
                    Active
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
