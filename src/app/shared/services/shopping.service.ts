import { Ingredients } from "./../models/ingredients.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ShoppingService {
  private ingredients: Ingredients[] = [
    new Ingredients("apples", 5),
    new Ingredients("tomatoes", 10),
  ];
  editId = new Subject<number>();
  ingredientsChanged = new Subject<Ingredients[]>();

  getIngredients = (): Ingredients[] => this.ingredients.slice();

  getIngredient = (id: number): Ingredients => this.ingredients[id];

  onAddIngredient = (ingredient: Ingredients) => {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredients());
  };

  onAddIngredients = (ingredients: Ingredients[]) => {
    this.ingredients = [...this.ingredients, ...ingredients];
    this.ingredientsChanged.next(this.getIngredients());
  };

  onUpdateIngredient = (index: number, newIngredient: Ingredients): void => {
    this.ingredients[index] = new Ingredients(
      newIngredient.name,
      newIngredient.amount
    );
    this.ingredientsChanged.next(this.getIngredients());
  };

  onDeleteIngredient = (index: number): void => {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.getIngredients());
  };
}
