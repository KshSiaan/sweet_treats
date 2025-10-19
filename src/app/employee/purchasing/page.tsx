import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { QrCodeIcon } from "lucide-react";

export default function Page() {
  return (
    <section>
      <div className="w-fullflex flex-col gap-6">
        <div className="pb-4">
          <h3 className="text-2xl font-semibold text-primary ">
            Purchasing Ahead
          </h3>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Order #ORD-7842</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-start items-center gap-2">
            <Avatar className="size-12">
              <AvatarImage src={"https://avatar.iran.liara.run/public"} />
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
            <div className="">
              <h4 className="font-semibold">Jacky Mark</h4>
              <p className="text-xs">Code: S742J</p>
            </div>
          </CardContent>
          <CardContent>
            <div className="">
              <h4 className="font-semibold">Order Details</h4>
              <ul className="list-disc list-inside pl-4">
                <li>2 X Wireless Headphone</li>
                <li>3 X Sporting Shoes</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="space-x-2">
            <Button>Confirm Preparation</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"}>View Details</Button>
              </DialogTrigger>
              <DialogContent className="p-0! ">
                <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                  <DialogTitle>Order Details</DialogTitle>
                </DialogHeader>
                <div className="p-4 space-y-4">
                  <Label className="text-lg">Customer</Label>
                  <p className="text-sm">Customer</p>
                  <Label className="text-lg">Order Items</Label>
                  <p className="text-sm flex justify-between items-center">
                    <span>1 x Wireless Headphone</span>
                    <span>$89.99</span>
                  </p>
                  <Label className="text-lg">Special Instructions</Label>
                  <p className="text-sm">
                    Product’s packaging have to be best.
                  </p>
                  <Label className="text-lg">Status</Label>
                  <Badge className="bg-green-600">Completed</Badge>
                  <div className="p-2 bg-zinc-100 rounded-lg space-y-2 text-muted-foreground">
                    <p className="w-full flex justify-between items-center text-sm">
                      <span>Subtotal:</span>
                      <span>$89.99</span>
                    </p>
                    <p className="w-full flex justify-between items-center text-sm">
                      <span>Shipping:</span>
                      <span>$89.99</span>
                    </p>
                    <p className="w-full flex justify-between items-center text-sm">
                      <span>Tax:</span>
                      <span>$89.99</span>
                    </p>
                    <Separator />
                    <p className="w-full flex justify-between items-center text-sm font-semibold text-foreground">
                      <span>Total</span>
                      <span>$89.99</span>
                    </p>
                  </div>
                </div>
                <DialogFooter className="p-4">
                  <DialogClose asChild>
                    <Button variant={"outline"}>Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
      <div className="py-4">
        <h3 className="text-2xl font-semibold text-primary ">
          On-the-Ground Purchases
        </h3>
      </div>
      <Card>
        <CardContent className="flex flex-col gap-6 justify-center items-center">
          <div className="size-[200px] bg-accent rounded-sm flex justify-center items-center text-primary">
            <QrCodeIcon className="size-[120px]" />
          </div>
          <p className="font-semibold text-xl">
            Scan QR code to confirm in-store purchase
          </p>
          <Button>Start Scanner</Button>
        </CardContent>
      </Card>
      <div className="pt-4 space-y-4">
        <h4 className="text-xl">Order #ORD-784</h4>
        <p className="text-sm font-semibold text-muted-foreground">
          Product: Running Shoe
        </p>
        <p className="text-sm font-semibold text-muted-foreground">
          Price: $6.89
        </p>
        <Button>Start Scanner</Button>
      </div>
    </section>
  );
}
