export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  username: string;
  bank?: {
    cardNumber?: string;
    currency?: string;
    iban?: string;
  };
}
