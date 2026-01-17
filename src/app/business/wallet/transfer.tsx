import React from "react";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
export default function Transfer() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <PlusIcon />
          Transfer
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0! ">
        <DialogHeader className="bg-gradient-to-r from-primary to-[#FF7C36] p-4 rounded-t-lg text-background">
          <DialogTitle>Transfer Funds</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 space-y-4">
          <Label>Amount</Label>
          <Input placeholder="Enter fund amount" />
          <Label>Purpose</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Transfer">Transfer</SelectItem>
              <SelectItem value="Loan">Loan</SelectItem>
              <SelectItem value="Gift">Gift</SelectItem>
            </SelectContent>
          </Select>
          <Label>Description (Optional)</Label>
          <Textarea />
        </div>
        <DialogFooter className="p-4">
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button>Transfer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
