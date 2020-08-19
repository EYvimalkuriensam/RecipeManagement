import { ShoppingService } from "./../../shared/services/shopping.service";
import { Ingredients } from "./../../shared/models/ingredients.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredients[];
  igChanged: Subscription;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.igChanged = this.shoppingService.ingredientsChanged.subscribe(
      (ingredients: Ingredients[]) => (this.ingredients = ingredients)
    );
  }

  ngOnDestroy(): void {
    this.igChanged.unsubscribe();
  }

  onEditItem = (index: number):void => {
    this.shoppingService.editId.next(index)
  }
}
