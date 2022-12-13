import React, {useCallback, useEffect, useState} from 'react';
import MealList from "./Containers/MealList/MealList";
import {Meal} from "./types";
import axiosApi from "./axios-api";
import {Route, Routes, useLocation} from "react-router-dom";
import MealForm from "./Containers/MealForm/MealForm";
import NavBar from "./Components/NavBar/NavBar";
import CaloriesCalc from "./Components/CaloriesCalc/CaloriesCalc";

function App() {
    const location = useLocation();

    const [preloader, setPreloader] = useState(true);

    const [meals, setMeals] = useState<Meal[]>([]);

    const getMeals = useCallback(async () => {
        try {
            setPreloader(true);
            const response = await axiosApi('/calTracker.json');
            let meal: Meal[] = [];
            if (response) {
                meal = Object.keys(response.data).map(key => {
                    return {...response.data[key], id: key, cal: parseInt(response.data[key].cal)}
                })
            }
            setMeals(meal);
        } finally {
            setPreloader(false);
        }
    }, [])

    useEffect(() => {
        getMeals().catch(console.error);
    }, [getMeals, location]);

    return (
        <div className="App">
            <NavBar/>
            <CaloriesCalc allMeals={meals}/>
            <Routes>
                <Route path='/' element={(<MealList allMeals={meals} preloader={preloader}/>)}/>
                <Route path='/:id/edit' element={(<MealForm/>)}/>
                <Route path='/add' element={(<MealForm/>)}/>
            </Routes>
        </div>
    );
}

export default App;
