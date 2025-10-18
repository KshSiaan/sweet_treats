import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPinnedIcon } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <section>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-primary ">
          Google Maps Integration
        </h3>
        <p className="text-sm text-muted-foreground">
          Add and manage your store location on Google Maps..
        </p>
      </div>
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold text-primary">
            Store Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label>Google Maps Embed Code</Label>
          <Textarea
            className="resize-none"
            placeholder="Paste your Google Maps embed code here........"
          />
          <Button>Save Location</Button>
        </CardContent>
        <CardContent>
          <div className="w-full aspect-[3/1] bg-secondary rounded-lg flex justify-center items-center">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon" className="size-[64px]">
                  <MapPinnedIcon className="text-muted-foreground size-[38px]" />
                </EmptyMedia>
              </EmptyHeader>
              <EmptyContent>
                <EmptyTitle className="text-muted-foreground">
                  Paste your Google Maps embed code here........
                </EmptyTitle>
              </EmptyContent>
            </Empty>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
