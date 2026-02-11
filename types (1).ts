export interface MenuItem {
  id: number;
  name: string;
  price: number;
  emoji: string;
}

// Mirroring the C struct logic conceptually
// typedef struct node { order_number, q (quantity), next }
export interface OrderNode {
  customerNo: number; // Unique ID for the customer
  items: MenuItem[];  // The order details
  totalAmount: number;
  paidAmount: number;
  change: number;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED';
  timestamp: number;
}

export interface QueueState {
  head: OrderNode | null;
  tail: OrderNode | null; // In a JS array this is implicit, but useful for types
  length: number;
}