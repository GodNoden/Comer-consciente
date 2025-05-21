
import React from 'react';
import Header from '@/components/Header';
import FeaturedRecipes from '@/components/FeaturedRecipes';
import ActionButtons from '@/components/ActionButtons';

const Index = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="bg-linear-to-r from-food-soft-purple to-food-light-green rounded-3xl p-8 my-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-food-purple mb-2">Welcome to FoodTrack</h1>
                    <p className="text-gray-700 max-w-xl">
                        Discover delicious recipes, track your cooking progress, and plan your meals for the week.
                    </p>
                </div>

                <FeaturedRecipes />
            </main>

            <ActionButtons />
        </div>
    );
};

export default Index;
