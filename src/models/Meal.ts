import Food from './Food';

export default interface Meal {
  userId: number;
  meal: Food[];
  caloricValue: number;
  date: Date;
}
