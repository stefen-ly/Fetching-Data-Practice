import { UserResponse } from "@/lib/type/user";
import { UserCard } from "@/components/ui/user-card";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function loadUsers() {
  const response = await fetch(`${BASE_URL}/api/v1/users/`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const users = await response.json();
  return users;
}

export default async function UserPage(){
    const users =  await loadUsers();
    return (
        <main className="px-4 py-8 max-w-7xl mx-auto">
          <section>
            <h1 className="text-3xl font-bold mb-2">Users</h1>
            <p className="text-gray-600 mb-6">
              Browse all our registered users below.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {users.map((user: UserResponse) => (    
                    <UserCard
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        role={user.role[0]}
                        avatar={user.avatar}
                    />
                ))}
            </div>
          </section>
        </main>
    )
}