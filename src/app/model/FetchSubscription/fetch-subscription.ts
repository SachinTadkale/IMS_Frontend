import { UserData } from "../User-Data";

export class FetchSubscription {
 id!: number;                   // corresponds to Long id
  titel!: string;
  description!: string;
  transactionId!: string;
  upiLink!: string;
  amount!: number;
  status!: string;               // PENDING, SUCCESS, FAILED
  createdAt!: string;            // LocalDateTime usually comes as ISO string from backend
  imString!: string; 
  user: UserData | undefined;
}


