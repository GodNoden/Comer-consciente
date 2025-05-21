
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, CalendarDays } from 'lucide-react';

const ActionButtons = () => {
    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 sm:flex-row">
            <Button
                className="action-button bg-food-orange hover:bg-food-orange/90 text-white shadow-lg"
                aria-label="Create Weekly Menu"
            >
                <CalendarDays className="h-5 w-5" />
                <span className="hidden sm:inline">Weekly Menu</span>
            </Button>

            <Button
                className="action-button bg-food-purple hover:bg-food-purple/90 text-white shadow-lg"
                aria-label="Add Recipe"
            >
                <Plus className="h-5 w-5" />
                <span className="hidden sm:inline">Add Recipe</span>
            </Button>
        </div>
    );
};

export default ActionButtons;