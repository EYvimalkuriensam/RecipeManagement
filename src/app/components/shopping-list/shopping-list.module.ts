import { SharedModule } from "./../../shared/shared.module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRouting } from "./shopping-list-routing.module";

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [FormsModule, RouterModule, ShoppingListRouting, SharedModule],
})
export class ShoppingListModule {}
