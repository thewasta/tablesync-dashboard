"use client";

import { Card, CardBody, CardFooter } from "@heroui/react";
import { CircleDollarSign } from "lucide-react";

const items = [
  {
    name: "Income",
    value: "63.4K",
    icon: CircleDollarSign,
    sign: "$",
  },
  {
    name: "Sales",
    value: "63.4K",
    icon: CircleDollarSign,
    sign: "$",
  },
  {
    name: "Customer",
    value: "63.4K",
    icon: CircleDollarSign,
    sign: "$",
  },
];

export default function Overview() {
  return (
    <>
      {items.map((item, index) => (
        <Card
          key={`card-${index}`}
          className="col-span-6 sm:col-span-4 mx-3 my-2 sm:my-0"
        >
          <CardBody className="flex flex-row justify-between">
            <p className="font-bold text-xl">
              {item.value} {item.sign}
            </p>
            <CircleDollarSign className="inline text-green-500" />
          </CardBody>
          <CardFooter>
            <h5 className="text-sm">{item.name}</h5>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
