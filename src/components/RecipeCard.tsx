
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RecipeCardProps {
    id: number;
    title: string;
    time: string;
    difficulty: 'easy' | 'medium' | 'hard';
    image: string;
    category: string;
}

const RecipeCard = ({ id, title, time, difficulty, image, category }: RecipeCardProps) => {
    const difficultyColor = {
        easy: 'bg-green-100 text-green-800',
        medium: 'bg-amber-100 text-amber-800',
        hard: 'bg-red-100 text-red-800'
    };

    return (
        <Link to={`/recipe/${id}`} className="block h-full">
            <Card className="recipe-card h-full flex flex-col transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 left-3 bg-white/80 text-food-purple hover:bg-white">
                        {category}
                    </Badge>
                </div>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold line-clamp-1">{title}</CardTitle>
                    <CardDescription className="flex justify-between items-center">
                        <span className="text-sm">{time}</span>
                        <Badge variant="outline" className={`text-xs ${difficultyColor[difficulty]}`}>
                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </Badge>
                    </CardDescription>
                </CardHeader>
                <CardContent className="grow">
                    <p className="text-sm text-gray-500 line-clamp-2">
                        A delicious recipe that's perfect for any occasion. Try this mouth-watering dish today!
                    </p>
                </CardContent>
                <CardFooter className="pt-2">
                    <div className="text-xs text-gray-400 flex items-center justify-between w-full">
                        <span>4.5 ★★★★☆</span>
                        <span>15 min ago</span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default RecipeCard;
