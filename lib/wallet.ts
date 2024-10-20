export type User = {
  id: string;
  name: string;
  email: string;
  balance: number;
  currency: string;
};

// Singleton function to return the UserStore instance
const userStoreSingleton = () => {
  return new UserStore();
};

// Extend `globalThis` to hold the singleton instance
declare const globalThis: {
  userStoreGlobal: ReturnType<typeof userStoreSingleton>;
} & typeof global;

// Define the UserStore class
export class UserStore {
  // This will store the user data with userId as the key
  private users: { [userId: string]: User } = {};

  // Add a user to the store
  public addUser(
    userId: string,
    name: string,
    email: string,
    balance: number,
    currency: string
  ): void {
    if (!this.users[userId]) {
      this.users[userId] = { id: userId, name, email, balance, currency };
      console.log(
        `User added: ${name} (${email}) with balance: ${balance} ${currency}`
      );
      console.log("Current Users: ", this.users);
    } else {
      console.log(`User with ID ${userId} already exists.`);
    }
  }

  // Get a user by userId
  public getUser(userId: string): User | null {
    return this.users[userId] || null;
  }

  // Method to update a user's balance
  public updateUserBalance(userId: string, newBalance: number): void {
    const user = this.getUser(userId);

    if (user) {
      user.balance = newBalance;
      console.log(
        `User ${user.name}'s balance updated to: ${newBalance} ${user.currency}`
      );
    } else {
      console.log(`User with ID ${userId} not found.`);
    }
  }

  // Other methods like deleteUser can be added similarly
}

// Create a singleton instance of the UserStore
const userStore = globalThis.userStoreGlobal ?? userStoreSingleton();

export default userStore;
