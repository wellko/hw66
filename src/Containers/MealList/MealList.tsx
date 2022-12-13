import React from 'react';
import {Meal} from "../../types";
import MealItem from "../../Components/MealItem/MealItem";
import Spinner from "../../Components/Spinner/Spinner";

interface Props {
    allMeals: Meal[],
    preloader: boolean,
}

const MealList: React.FC<Props> = ({allMeals,preloader}) => {
    return (
        <div>
            {preloader? (<Spinner></Spinner>) : (allMeals.map(item => <MealItem key={Math.random()} meal={item}/>))}
        </div>
    );
};

export default MealList;