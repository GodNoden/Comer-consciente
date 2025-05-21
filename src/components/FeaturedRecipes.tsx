
import React from 'react';
import RecipeCard from './RecipeCard';

// Sample recipe data
const recipes = [
  {
    id: 1,
    title: 'Greek Yogurt Pancakes',
    time: '20 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1000',
    category: 'Breakfast'
  },
  {
    id: 2,
    title: 'Teriyaki Salmon Bowl',
    time: '30 mins',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000',
    category: 'Lunch'
  },
  {
    id: 3,
    title: 'Margherita Pizza',
    time: '45 mins',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=1000',
    category: 'Dinner'
  },
  {
    id: 4,
    title: 'Chocolate Avocado Mousse',
    time: '15 mins',
    difficulty: 'easy' as const,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000',
    category: 'Dessert'
  },
  {
    id: 5,
    title: 'Shakshuka',
    time: '25 mins',
    difficulty: 'medium' as const,
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1000',
    category: 'Breakfast'
  },
  {
    id: 6,
    title: 'Beef Wellington',
    time: '2 hours',
    difficulty: 'hard' as const,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000',
    category: 'Dinner'
  }
];

const FeaturedRecipes = () => {
  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Featured Recipes</h2>
        <button className="text-food-purple hover:underline font-medium">View All</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            time={recipe.time}
            difficulty={recipe.difficulty}
            image={recipe.image}
            category={recipe.category}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedRecipes;
