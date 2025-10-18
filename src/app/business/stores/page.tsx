import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Page() {
  return (
    <section>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary ">
          Store Front Customization
        </h3>
        <p className="text-sm text-muted-foreground">
          Customize how your store appears to customers.
        </p>
      </div>
      <Card>
        <CardContent>
          <h3 className="text-2xl font-semibold text-primary ">
            Store Images (Up to 3)
          </h3>
          {Array(3)
            .fill("")
            .map((_, i) => (
              <div className="space-y-4 mt-4" key={i + 1}>
                <Label>Image {i + 1}</Label>
                <Input type="file" />
                <Input placeholder={`Caption for image ${i + 1}`} />
              </div>
            ))}
        </CardContent>
        <Separator />
        <CardContent>
          <h3 className="text-2xl font-semibold text-primary ">
            Store Video (Max 30s)
          </h3>
          <div className="space-y-4 mt-4">
            <Label>Video</Label>
            <Input type="file" />
            <Input placeholder={`Caption for video`} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="px-12" size={"lg"}>
            Save
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
