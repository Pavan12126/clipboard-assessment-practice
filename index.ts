import fetch from "node-fetch";

// Minimal user model for JSONPlaceholder API response
// Represents essential user data including contact and location information
interface User {
  name: string;
  email: string;
  address: {
    city: string;
  };
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<User[]>;
}

function filterUsers(users: User[]): User[] {
  return users.filter(user =>
    user.address.city.toLowerCase().includes("o")
  );
}

function printUsers(users: User[]): void {
  console.log("Users in cities that contain 'p':");
  users.forEach(user =>
    console.log(`- ${user.name} (${user.email})`)
  );
}

async function main() {
  try {
    const users = await fetchUsers();
    const filtered = filterUsers(users);
    printUsers(filtered);
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

main();
