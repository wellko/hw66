import React from 'react';
import {Meal} from "../../types";

interface Props {
    allMeals: Meal[]
}

const CaloriesCalc:React.FC<Props> = ({allMeals}) => {
   const todayObj = new Date();
   const today = todayObj.getFullYear().toString() + '.' + (todayObj.getMonth() + 1).toString() + '.' + todayObj.getDate().toString();
   const todayMeals = allMeals.filter((meal) => meal.date === today);

    const summary = todayMeals.map(item => item.cal).reduce((acc, cal) => {
       return acc + cal
   }, 0);


    return (
        <div className='fw-bolder text-center'>
           <h1> Summary {summary}  kcal today</h1>
        </div>
    );
};

export default CaloriesCalc;