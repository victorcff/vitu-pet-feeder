import {
  CreateMealRequest,
  MealResponse,
  UpdateMealRequest,
} from '../../types/api';
import MealsInstance from './instance';

const getAllMealsFromDevice = async (deviceId: number) => {
  return MealsInstance.get<MealResponse[]>(`/${deviceId}`);
};

const createMeal = async (params: CreateMealRequest) => {
  return MealsInstance.post<MealResponse>('', params);
};

const updateMeal = async (params: UpdateMealRequest) => {
  const updatedMeal: Omit<UpdateMealRequest, 'id'> = {
    device_id: params.device_id,
    name: params.name,
    time: params.time,
    weight: params.weight,
  };
  return MealsInstance.put<MealResponse>(`/id/${params.id}`, updatedMeal);
};

const deleteMeal = async (mealId: number) => {
  return MealsInstance.delete(`/${mealId}`);
};

export { getAllMealsFromDevice, createMeal, updateMeal, deleteMeal };
