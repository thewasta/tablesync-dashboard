"use client";

import { Card } from "@heroui/react";
import { Skeleton } from "@heroui/react";

export default function Loading() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={`card-${index}`}
          className="col-span-6 sm:col-span-4 mx-3 my-2 sm:my-0"
          radius="lg"
        >
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300" />
          </Skeleton>
        </Card>
      ))}
    </>
  );
}
