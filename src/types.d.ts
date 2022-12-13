export interface Meal {
    mealTime:string;
    desc: string;
    cal: number;
    id: string;
    date: string;
}

export type ApiMeal  = Omit<Meal, 'id'>;