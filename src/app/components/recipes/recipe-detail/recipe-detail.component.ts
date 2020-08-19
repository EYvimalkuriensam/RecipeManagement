import { RecipeService } from "./../../../shared/services/recipe.service";
import { ShoppingService } from "./../../../shared/services/shopping.service";
import { Recipe } from "./../../../shared/models/recipe.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  id: number;
  recipeSubscription: Subscription;
  constructor(
    private shoppingService: ShoppingService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  ngOnDestroy = (): void => {};

  toShoppingList = () =>
    this.shoppingService.onAddIngredients(this.recipe.ingredients);

  onEditRecipe = () =>
    this.router.navigate(["../edit", this.id], { relativeTo: this.route });

  onDeleteRecipe = (): void => {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipe"]);
  };
}
