import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ApiMeal} from "../../types";
import axiosApi from "../../axios-api";
import Spinner from "../../Components/Spinner/Spinner";
import DatePicker from 'react-datepicker';


const MealForm = () => {
    const [preloader, setPreloader] = useState(false);

    const [startDate, setStartDate] = useState(new Date());

    const [meal, setMeal] = useState<ApiMeal>({
        desc: '',
        mealTime: '',
        cal: 0,
        date: startDate.getFullYear().toString() + '.' + (startDate.getMonth() + 1).toString() + '.' + startDate.getDate().toString(),
    });

    const navigate = useNavigate();

    const mealTime = [
        'Breakfast',
        'Snack',
        'Lunch',
        'Dinner'];

    const {id} = useParams();

    const getMeal = useCallback(async () => {
        if (id) {
            try {
                const response = await axiosApi('/calTracker/' + id + '.json');
                if (response) {
                    setMeal({
                        ...response.data,
                        date: startDate.getFullYear().toString() + '.' + (startDate.getMonth() + 1).toString() + '.' + startDate.getDate().toString()
                })
                }
            } finally {

            }
        }
    }, [id]);

    useEffect(() => {
        setStartDate(new Date());
        getMeal().catch(console.error);
    }, [getMeal]);


    const ChangeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setMeal(prev => ({...prev, [name]: value}));
    };

    const DateChanger = (date: Date) =>{
        const newDate = date.getFullYear().toString() + '.' + (date.getMonth() + 1).toString() + '.' + date.getDate().toString();
        setMeal(prev => ({...prev, date: newDate}));
    }


    const EditFunc = async (e: React.FormEvent) => {
        e.preventDefault();
        if (meal.mealTime.length > 1 && meal.desc.length > 1) {
            if (id) {
                try {
                    setPreloader(true);
                    await axiosApi.put('/calTracker/' + id + '.json', meal);
                } finally {
                    setPreloader(false);
                }
            } else {
                try {
                    setPreloader(true);
                    await axiosApi.post('/calTracker.json', meal);
                } finally {
                    setPreloader(false);
                    navigate('/');
                }
            }
        }
    }


    return (<div className='container'>
            <form onSubmit={EditFunc}>
                <div className='d-flex flex-column text-center border-dark border border-4 rounded mt-5'>
                    <h1>{id ? 'Edit Form' : 'Add Form'} </h1>
                    <label htmlFor='mealTime' className='fw-bold fs-4'></label>
                    <select name='mealTime' onChange={ChangeEvent} value={meal.mealTime}>
                        <option value=' '>select any meal time</option>
                        {mealTime.map(item => <option key={Math.random()}
                                                      value={item}> {item}</option>)}
                    </select>
                    <label htmlFor='desc' className='fw-bold fs-4 mt-4'>Dish description</label>
                    <input className='w-75 align-self-center' value={meal.desc} name='desc' onChange={ChangeEvent}
                           type='text'/>
                    <label htmlFor='cal' className='fw-bold fs-4 mt-4'>Calories</label>
                    <input className='mb-4 w-75 align-self-center' value={meal.cal} name='cal'
                           onChange={ChangeEvent}
                           type='number'/>
                    <DatePicker selected={startDate} onChange={(date)=> DateChanger(date!)} onSelect={(date)=>setStartDate(date!)} />
                    <button className='btn btn-dark' disabled={preloader}
                            type='submit'>{preloader ? <Spinner/> : (id ? 'save' : 'Add')}</button>
                </div>
            </form>
        </div>
    );
};

export default MealForm;