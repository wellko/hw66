import React from 'react';
import {Meal} from "../../types";

interface Props {
    allMeals: Meal[]
}

const CaloriesCalc:React.FC<Props> = ({allMeals}) => {
   const summary = allMeals.map(item => item.cal).reduce((acc, cal) => {
       return acc + cal
   }, 0);


    return (
        <div className='fw-bolder text-center'>
           <h1> Summary {summary}  kcal</h1>
        </div>
    );
};

export default CaloriesCalc;