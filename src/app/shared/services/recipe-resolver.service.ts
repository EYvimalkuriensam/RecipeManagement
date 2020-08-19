import { RecipeService } from "./recipe.service";
import { ApiService } from "./api.service";
import { Recipe } from "./../models/recipe.model";
import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({ providedIn: "root" })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private apiService: ApiService,
    private recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) return this.apiService.fetchRecipe();
    return recipes;
  }
}
