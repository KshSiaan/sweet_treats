import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStocks } from "@/lib/api/business";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";
import UpdateRestock from "./update-restock";
import { Badge } from "@/components/ui/badge";

export default function Stock() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["stocks", token],
    queryFn: () => {
      return getStocks(token);
    },
  });
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  return (
    <div className="">
      <Table>
        <TableHeader className="bg-primary/20 ">
          <TableRow>
            <TableHead className="text-primary">Product</TableHead>
            <TableHead className="text-primary">Current Stock</TableHead>
            <TableHead className="text-primary">Required Stock</TableHead>
            <TableHead className="text-primary">Requested Date</TableHead>
            <TableHead className="text-primary">Status</TableHead>
            <TableHead className="text-primary">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.product?.product_name}</TableCell>
              <TableCell>{item.product?.stock}</TableCell>
              <TableCell>{item?.required_stock}</TableCell>
              <TableCell>
                {new Date(item?.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge variant={"outline"}>{item.status}</Badge>
              </TableCell>
              <TableCell>
                <UpdateRestock data={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
