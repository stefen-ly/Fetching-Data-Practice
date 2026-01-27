import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ProductResponse } from "@/lib/type/product";
import { title } from "process";

export function ProductCard({
  images = ["https://i.imgur.com/KeqG6r4.jpeg"],
  title = "Design systems meetup",
  description = "A practical talk on component APIs, accessibility, and shipping faster.",
  price = 100
}: ProductResponse) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={images[0]}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{price}</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-gray-700 text-sm line-clamp-3">
          {description} A practical talk on component APIs, accessibility, and
          shipping faster.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter>
    </Card>
  );
}
