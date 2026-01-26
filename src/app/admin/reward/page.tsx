import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/custom-tabs";
import PerDollar from "./per-dollar";
import Conversion from "./converston";
import Claim from "./claim";

export default function Page() {
  return (
    <section>
      <div className="w-full flex justify-between items-center py-4">
        <h2 className="mb-6 text-2xl font-semibold text-primary">
          Reward Point Earning Rules
        </h2>
      </div>
      <Tabs defaultValue="perdollar">
        <TabsList>
          <TabsTrigger value="perdollar">Points per $1</TabsTrigger>
          <TabsTrigger value="conversion">
            Points conversion to dollars
          </TabsTrigger>
          <TabsTrigger value="claim">Claim Request</TabsTrigger>
        </TabsList>
        <TabsContent value="perdollar" className="mt-4 p-0">
          <PerDollar />
        </TabsContent>
        <TabsContent value="conversion" className="mt-4 p-0">
          <Conversion />
        </TabsContent>
        <TabsContent value="claim" className="mt-4 p-0">
          <Claim />
        </TabsContent>
      </Tabs>
    </section>
  );
}
