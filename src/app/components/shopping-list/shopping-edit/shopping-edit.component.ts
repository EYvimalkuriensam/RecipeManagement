import { ShoppingService } from "./../../../shared/services/shopping.service";
import { Ingredients } from "./../../../shared/models/ingredients.model";
import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private editSubscription: Subscription;
  editMode: boolean = false;
  private editedItemIndex: number;
  editedItem: Ingredients;
  constructor(private shoppingService: ShoppingService) {}

  @ViewChild("sForm") sForm: NgForm;

  ngOnInit(): void {
    this.editSubscription = this.shoppingService.editId.subscribe(
      (id: number) => {
        this.editMode = true;
        this.editedItemIndex = id;
        this.editedItem = this.shoppingService.getIngredient(id);
        this.sForm.setValue({
          nameInput: this.editedItem.name,
          amountInput: this.editedItem.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

  onSFormSubmit = (): void => {
    const newIngredient = new Ingredients(
      this.sForm.value.nameInput,
      this.sForm.value.amountInput
    );
    if (this.editMode) {
      this.shoppingService.onUpdateIngredient(
        this.editedItemIndex,
        newIngredient
      );
      this.editMode = false;
    } else {
      this.shoppingService.onAddIngredient(newIngredient);
    }
    this.sForm.reset();
  };

  onClear = (): void => {
    this.sForm.reset();
    this.editMode = false;
  };

  onDelete = (): void => {
    this.shoppingService.onDeleteIngredient(this.editedItemIndex);
    this.sForm.reset();
  };
}
