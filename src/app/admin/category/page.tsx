import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { getAdminCategories } from "@/lib/api/admin";
import { AlertTriangleIcon, PlusIcon } from "lucide-react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return notFound();
  const categories = await getAdminCategories(token);

  return (
    <section>
      <div className="w-full flex justify-between items-center py-4">
        <h2 className="mb-6 text-2xl font-semibold text-primary">Category</h2>
      </div>
      <Card className="p-0! overflow-hidden!">
        <CardContent className="p-0! ">
          <Table className="">
            <TableHeader className="bg-accent ">
              <TableRow>
                <TableHead className="text-primary! text-center">
                  Category Name
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Description
                </TableHead>
                <TableHead className="text-primary! text-center">
                  Businesses
                </TableHead>
                {/* <TableHead className="text-primary! text-center">
                  Actions
                </TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.data.map((category) => (
                <TableRow>
                  <TableCell className="text-center">{category.name}</TableCell>
                  <TableCell className="text-center">
                    {category.description}
                  </TableCell>
                  <TableCell className="text-center">
                    {category.business}
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
