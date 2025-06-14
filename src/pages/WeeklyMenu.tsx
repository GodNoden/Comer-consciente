import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import WeeklyMenuDay from '@/components/WeeklyMenuDay';
import AddMealDialog from '@/components/AddMealDialog';
import ShoppingListDialog from '@/components/ShoppingListDialog';
import { Recipe, MealPlan, DayMeals } from '@/types/menu';

// Sample recipes data
const sampleRecipes: Recipe[] = [
    {
        id: 1,
        title: "Grilled Chicken Salad",
        image: "/placeholder.svg",
        calories: 350,
        protein: 30,
        carbs: 15,
        fat: 18,
        ingredients: ["chicken breast", "mixed greens", "cherry tomatoes", "cucumber", "olive oil", "lemon juice"]
    },
    {
        id: 2,
        title: "Salmon with Quinoa",
        image: "/placeholder.svg",
        calories: 450,
        protein: 35,
        carbs: 30,
        fat: 20,
        ingredients: ["salmon fillet", "quinoa", "broccoli", "lemon", "garlic", "olive oil"]
    },
    {
        id: 3,
        title: "Greek Yogurt Bowl",
        image: "/placeholder.svg",
        calories: 280,
        protein: 20,
        carbs: 25,
        fat: 12,
        ingredients: ["greek yogurt", "berries", "granola", "honey", "almonds"]
    }
];

const WeeklyMenu = () => {
    const navigate = useNavigate();
    const [recommendedCalories, setRecommendedCalories] = useState<number>(0);
    const [mealPlan, setMealPlan] = useState<MealPlan>({
        Monday: { breakfast: [], lunch: [], dinner: [], snack: [] },
        Tuesday: { breakfast: [], lunch: [], dinner: [], snack: [] },
        Wednesday: { breakfast: [], lunch: [], dinner: [], snack: [] },
        Thursday: { breakfast: [], lunch: [], dinner: [], snack: [] },
        Friday: { breakfast: [], lunch: [], dinner: [], snack: [] },
        Saturday: { breakfast: [], lunch: [], dinner: [], snack: [] },
        Sunday: { breakfast: [], lunch: [], dinner: [], snack: [] }
    });

    const [addMealDialog, setAddMealDialog] = useState({
        isOpen: false,
        day: '',
        mealType: ''
    });

    const [shoppingListOpen, setShoppingListOpen] = useState(false);

    // Load user profile data on component mount
    useEffect(() => {
        const userProfile = localStorage.getItem('userProfile');
        if (userProfile) {
            const profile = JSON.parse(userProfile);
            setRecommendedCalories(profile.recommendedCalories || 0);
        }
    }, []);

    const addMeal = (recipe: Recipe) => {
        const { day, mealType } = addMealDialog;
        setMealPlan(prev => ({
            ...prev,
            [day]: {
                ...prev[day as keyof MealPlan],
                [mealType]: [...prev[day as keyof MealPlan][mealType as keyof DayMeals], recipe]
            }
        }));
        setAddMealDialog({ isOpen: false, day: '', mealType: '' });
    };

    const removeMeal = (day: string, mealType: string, recipeId: number) => {
        setMealPlan(prev => ({
            ...prev,
            [day]: {
                ...prev[day as keyof MealPlan],
                [mealType]: prev[day as keyof MealPlan][mealType as keyof DayMeals].filter(recipe => recipe.id !== recipeId)
            }
        }));
    };

    const calculateDayTotals = (dayMeals: DayMeals) => {
        const allMeals = [...dayMeals.breakfast, ...dayMeals.lunch, ...dayMeals.dinner, ...dayMeals.snack];
        return allMeals.reduce(
            (totals, recipe) => ({
                calories: totals.calories + recipe.calories,
                protein: totals.protein + recipe.protein,
                carbs: totals.carbs + recipe.carbs,
                fat: totals.fat + recipe.fat
            }),
            { calories: 0, protein: 0, carbs: 0, fat: 0 }
        );
    };

    const getMacroAlerts = (totals: { calories: number; protein: number; carbs: number; fat: number; }) => {
        const alerts = [];
        const totalMacros = totals.protein + totals.carbs + totals.fat;

        if (totalMacros > 0) {
            const proteinPercentage = (totals.protein / totalMacros) * 100;
            const carbsPercentage = (totals.carbs / totalMacros) * 100;
            const fatPercentage = (totals.fat / totalMacros) * 100;

            if (proteinPercentage > 60) {
                alerts.push({ type: 'protein', message: `High protein: ${Math.round(proteinPercentage)}%` });
            }
            if (carbsPercentage > 60) {
                alerts.push({ type: 'carbs', message: `High carbs: ${Math.round(carbsPercentage)}%` });
            }
            if (fatPercentage > 60) {
                alerts.push({ type: 'fat', message: `High fat: ${Math.round(fatPercentage)}%` });
            }
        }

        if (recommendedCalories > 0 && totals.calories > recommendedCalories) {
            alerts.push({
                type: 'calories',
                message: `Exceeds goal by ${totals.calories - recommendedCalories} cal`
            });
        }

        return alerts;
    };

    const generateShoppingList = () => {
        const allIngredients: string[] = [];

        Object.values(mealPlan).forEach((dayMeals: DayMeals) => {
            const allMeals = [...dayMeals.breakfast, ...dayMeals.lunch, ...dayMeals.dinner, ...dayMeals.snack];
            allMeals.forEach((recipe: Recipe) => {
                if (Array.isArray(recipe.ingredients)) {
                    allIngredients.push(...recipe.ingredients);
                }
            });
        });

        // Remove duplicates and return unique ingredients
        return [...new Set(allIngredients)];
    };

    const isCalorieExceeded = (dayCalories: number) => {
        return recommendedCalories > 0 && dayCalories > recommendedCalories;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate('/')}
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <h1 className="text-xl font-semibold text-gray-900">Weekly Menu</h1>
                        </div>
                        <Button
                            onClick={() => setShoppingListOpen(true)}
                            className="bg-food-orange hover:bg-food-orange/90"
                        >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Shopping List
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {recommendedCalories > 0 && (
                    <Alert className="mb-6 bg-blue-50 border-blue-200">
                        <AlertDescription className="text-blue-800">
                            <strong>Daily Calorie Goal:</strong> {recommendedCalories} calories
                            {' - '}Set up in your{' '}
                            <button
                                onClick={() => navigate('/profile')}
                                className="underline font-medium hover:text-blue-900"
                            >
                                profile settings
                            </button>
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                    {Object.entries(mealPlan).map(([day, dayMeals]) => {
                        const totals = calculateDayTotals(dayMeals);
                        const totalMacros = totals.protein + totals.carbs + totals.fat;
                        const isExceeded = isCalorieExceeded(totals.calories);
                        const alerts = getMacroAlerts(totals);

                        return (
                            <Card key={day} className="h-fit">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg text-center">{day}</CardTitle>
                                    <div className="text-center text-sm">
                                        <div className={`font-medium ${isExceeded ? 'text-red-600' : 'text-gray-600'}`}>
                                            {totals.calories} cal
                                            {isExceeded && (
                                                <span className="block text-xs text-red-500 mt-1">
                                                    ⚠️ Exceeds goal by {totals.calories - recommendedCalories} cal
                                                </span>
                                            )}
                                        </div>
                                        {totalMacros > 0 && (
                                            <div className="flex justify-center gap-2 mt-1 text-gray-600">
                                                <span>P: {Math.round((totals.protein / totalMacros) * 100)}%</span>
                                                <span>C: {Math.round((totals.carbs / totalMacros) * 100)}%</span>
                                                <span>F: {Math.round((totals.fat / totalMacros) * 100)}%</span>
                                            </div>
                                        )}
                                    </div>

                                    {alerts.length > 0 && (
                                        <div className="space-y-2 mt-3">
                                            {alerts.map((alert, index) => (
                                                <Alert key={index} className="bg-amber-50 border-amber-200 py-2">
                                                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                                                    <AlertDescription className="text-amber-800 text-xs ml-2">
                                                        {alert.message}
                                                    </AlertDescription>
                                                </Alert>
                                            ))}
                                        </div>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <WeeklyMenuDay
                                        day={day}
                                        dayMeals={dayMeals}
                                        onAddMeal={(mealType) => setAddMealDialog({ isOpen: true, day, mealType })}
                                        onRemoveMeal={(mealType, recipeId) => removeMeal(day, mealType, recipeId)}
                                    />
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            <AddMealDialog
                isOpen={addMealDialog.isOpen}
                onClose={() => setAddMealDialog({ isOpen: false, day: '', mealType: '' })}
                recipes={sampleRecipes}
                onAddMeal={addMeal}
                day={addMealDialog.day}
                mealType={addMealDialog.mealType}
            />

            <ShoppingListDialog
                isOpen={shoppingListOpen}
                onClose={() => setShoppingListOpen(false)}
                ingredients={generateShoppingList()}
            />
        </div>
    );
};

export default WeeklyMenu;
