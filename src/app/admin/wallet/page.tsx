import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/custom-tabs";
import Wallet from "./wallet";
import { getTransaction, getWithdrawHistory } from "@/lib/api/business";
import { cookies } from "next/headers";
import History from "./history";
import { getAdminWithdrawRequest } from "@/lib/api/admin";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const data = await getTransaction(token!);
  const withdrawData = await getAdminWithdrawRequest(token!);
  return (
    <section>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary">Wallet System</h3>
        <p className="text-sm text-muted-foreground">
          Manage your business finances and transactions.
        </p>
      </div>
      <Tabs defaultValue="wallet">
        <TabsList>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="history">Withdraw Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="wallet">
          <Wallet data={data} />
        </TabsContent>
        <TabsContent value="history">
          <History data={withdrawData.data} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
