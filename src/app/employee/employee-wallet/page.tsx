import {
  AlertTriangleIcon,
  DollarSignIcon,
  FileTextIcon,
  HandCoinsIcon,
  LandmarkIcon,
  PackageIcon,
  SmartphoneIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const dataset = [
  {
    title: "Current Balance",
    amm: "$450.00",
    desc: "Available for withdrawal",
    icon: WalletIcon,
  },
  {
    title: "Last Payroll",
    amm: "$1,200.00",
    desc: "Received on 15th Oct",
    icon: HandCoinsIcon,
  },
];

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="">
        <h3 className="text-2xl font-semibold text-primary ">
          Employee Wallet
        </h3>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        {dataset.map((x) => (
          <div
            className="bg-background p-3 border shadow aspect-[3/1] rounded-xl flex justify-between items-center"
            key={x.title}
          >
            <div className="flex-1 space-y-2">
              <h2 className="text-lg font-semibold text-muted-foreground">
                {x.title}
              </h2>
              <p className="text-xl font-semibold text-primary">{x.amm}</p>
              <p className="text-muted-foreground text-xs">{x.desc}</p>
            </div>
            <div className="">
              <div className="flex items-center gap-2">
                <div className="bg-accent p-4 rounded-lg">
                  <x.icon className="size-5 text-primary" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="py-2">
        <h3 className="text-2xl font-semibold text-primary ">
          Withdrawal Options
        </h3>
      </div>
      <Card>
        <CardContent className="grid grid-cols-4 gap-6">
          <Card>
            <CardHeader className="">
              <div className="flex justify-between items-start">
                <CardTitle className="text-muted-foreground">
                  Bank Transfer
                </CardTitle>
                <div className="size-12 bg-accent rounded-lg flex justify-center items-center text-primary">
                  <LandmarkIcon />
                </div>
              </div>
              <CardDescription>Transfer to your bank account</CardDescription>
            </CardHeader>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant={"outline"}>
                    Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0! ">
                  <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 pt-0! rounded-t-lg text-background">
                    <DialogTitle>Withdrawal Request</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 p-4 pt-0!">
                    <h4 className="text-muted-foreground font-semibold">
                      Withdrawal Method
                    </h4>
                    <p className="text-sm">Bank Transfer</p>
                    <h4 className="font-semibold">Amount</h4>
                    <div className="space-y-2">
                      <Input placeholder="Enter amount" />
                      <p className="text-xs font-semibold text-muted-foreground">
                        Available balance: $450.00
                      </p>
                    </div>
                    <Label className="font-semibold text-base">
                      Account Number
                    </Label>
                    <Input placeholder="Enter your account number" />
                    <Label className="font-semibold text-base">
                      Routing Number
                    </Label>
                    <Input placeholder="Enter your routing number" />
                  </div>
                  <DialogFooter className="p-4">
                    <Button variant={"outline"}>Cancel</Button>
                    <Button>Submit Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="">
              <div className="flex justify-between items-start">
                <CardTitle className="text-muted-foreground">
                  Digital Wallet
                </CardTitle>
                <div className="size-12 bg-accent rounded-lg flex justify-center items-center text-primary">
                  <SmartphoneIcon />
                </div>
              </div>
              <CardDescription>Transfer to PayPal</CardDescription>
            </CardHeader>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant={"outline"}>
                    Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0! ">
                  <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                    <DialogTitle>Withdrawal Request</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 p-4">
                    <h4 className="text-muted-foreground font-semibold">
                      Withdrawal Method
                    </h4>
                    <p className="text-sm">Digital Wallet</p>
                    <h4 className="font-semibold">Amount</h4>
                    <div className="space-y-2">
                      <Input placeholder="Enter amount" />
                      <p className="text-xs font-semibold text-muted-foreground">
                        Available balance: $450.00
                      </p>
                    </div>
                    <Label className="font-semibold text-base">
                      Account Number
                    </Label>
                    <Input placeholder="Enter your account number" />
                    <Label className="font-semibold text-base">
                      Wallet ID/ Email
                    </Label>
                    <Input placeholder="Enter your wallet ID or email" />
                  </div>
                  <DialogFooter className="p-4">
                    <Button variant={"outline"}>Cancel</Button>
                    <Button>Submit Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="">
              <div className="flex justify-between items-start">
                <CardTitle className="text-muted-foreground">
                  Cash Pickup
                </CardTitle>
                <div className="size-12 bg-accent rounded-lg flex justify-center items-center text-primary">
                  <HandCoinsIcon />
                </div>
              </div>
              <CardDescription>Collect cash at store</CardDescription>
            </CardHeader>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant={"outline"}>
                    Request
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0! ">
                  <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
                    <DialogTitle>Withdrawal Request</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 p-4">
                    <h4 className="text-muted-foreground font-semibold">
                      Withdrawal Method
                    </h4>
                    <p className="text-sm">Cash Pickup</p>
                    <h4 className="font-semibold">Amount</h4>
                    <div className="space-y-2">
                      <Input placeholder="Enter amount" />
                      <p className="text-xs font-semibold text-muted-foreground">
                        Available balance: $450.00
                      </p>
                    </div>
                  </div>
                  <DialogFooter className="p-4">
                    <Button variant={"outline"}>Cancel</Button>
                    <Button>Submit Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min bg-background! flex flex-col justify-start items-start">
        <h3 className="text-2xl font-semibold text-primary mb-6">
          Recent Orders
        </h3>
        <Table className="">
          <TableHeader className="bg-accent ">
            <TableRow>
              <TableHead className="text-primary! text-center">Date</TableHead>
              <TableHead className="text-primary! text-center">
                Description
              </TableHead>
              <TableHead className="text-primary! text-center">
                Amount
              </TableHead>
              <TableHead className="text-primary! text-center">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">Sep 18, 2025</TableCell>
              <TableCell className="text-center">Payroll Deposit</TableCell>
              <TableCell className="text-center">+$1,200.00</TableCell>
              <TableCell className="text-center">
                <Badge className="rounded-full border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5">
                  <span
                    className="size-1.5 rounded-full bg-green-600 dark:bg-green-400"
                    aria-hidden="true"
                  />
                  Credit
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
