import { environment } from "./../../../environments/environment";
import { Recipe } from "./../models/recipe.model";
import { RecipeService } from "./recipe.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ApiService {
  private uri: string = environment.RECIPES_URI;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
  ) {}

  storeRecipes() {
    this.http
      .put<Recipe[]>(this.uri, this.recipeService.getRecipes())
      .subscribe((posted) => {
        console.log(posted);
      });
  }

  fetchRecipe() {
    return this.http.get<Recipe[]>(this.uri).pipe(
      map((recipes) => {
        if (recipes)
          return recipes.map((recipe) => ({
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          }));
        return [];
      }),
      tap((recipes) => this.recipeService.setRecipes(recipes))
    );
  }
}
