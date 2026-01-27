import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function UserCard({
  avatar = "https://avatar.vercel.sh/shadcn1",
  name = "Stefen",
  email = "john@example.com",
  role = "Customer"
}) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={avatar}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{role}</Badge>
        </CardAction>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {email}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Profile</Button>
      </CardFooter>
    </Card>
  )
}
