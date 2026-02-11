import { MenuItem } from './types';

// Based on the screenshot:
// Order 1 -> Ramen (200)
// Order 3 -> Fried Chicken (100)
// We will fill in the gaps for a complete demo
export const MENU_ITEMS: MenuItem[] = [
  { id: 1, name: 'Ramen', price: 200, emoji: '🍜' },
  { id: 2, name: 'Gyoza', price: 80, emoji: '🥟' },
  { id: 3, name: 'Fried Chicken', price: 100, emoji: '🍗' },
  { id: 4, name: 'Green Tea', price: 40, emoji: '🍵' },
  { id: 5, name: 'Tempura', price: 120, emoji: '🍤' },
  { id: 6, name: 'Rice Bowl', price: 150, emoji: '🍚' },
];