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
import { Mail, User } from "lucide-react"

export function UserCard({
  avatar = "https://avatar.vercel.sh/shadcn1",
  name = "Stefen",
  email = "john@example.com",
  role = "Customer",
}) {
  return (
    <Card className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
      {/* Cover */}
      <div className="relative h-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <CardAction className="absolute right-3 top-3 z-20">
          <Badge variant="secondary" className="backdrop-blur-sm">
            {role}
          </Badge>
        </CardAction>
      </div>

      {/* Avatar */}
      <div className="relative z-10 -mt-12 flex justify-center">
        <img
          src={avatar}
          alt="User avatar"
          className="h-24 w-24 rounded-full border-4 border-background object-cover shadow-lg"
        />
      </div>

      <CardHeader className="items-center text-center">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-4 w-4 text-muted-foreground" />
          {name}
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          {email}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex gap-2">
        <Button variant="outline" className="w-1/2">
          Message
        </Button>
        <Button className="w-1/2">View Profile</Button>
      </CardFooter>
    </Card>
  )
}
