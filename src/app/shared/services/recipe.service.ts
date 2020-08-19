import { Recipe } from "./../models/recipe.model";
import { Injectable } from "@angular/core";
import { Ingredients } from "../models/ingredients.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Tasty Schnitzel",
  //     "A super tasty Schnitzel - just awesome!",
  //     "https://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-5.jpg",
  //     [new Ingredients("Meat", 1), new Ingredients("French Fries", 20)]
  //   ),
  //   new Recipe(
  //     "Big Fat Hamburger",
  //     "What else can you say?",
  //     "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg",
  //     [new Ingredients("Bun", 2), new Ingredients("Meat", 1)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  getRecipes = (): Recipe[] => this.recipes.slice();

  getRecipe = (id: number): Recipe => this.recipes[id];

  addRecipe = (recipe: Recipe): void => {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  };

  setRecipes = (recipes: Recipe[]) => {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  };

  updateRecipe = (index: number, newRecipe: Recipe) => {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  };

  deleteRecipe = (id: number): void => {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  };
}
