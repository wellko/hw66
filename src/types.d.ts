export interface Meal {
    meal:string;
    desc: string;
    cal: string;
    id: string;
}

export type ApiMeal  = Omit<Meal, 'id'>;