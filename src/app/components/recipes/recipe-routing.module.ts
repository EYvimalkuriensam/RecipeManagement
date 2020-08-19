import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "src/app/shared/services/auth-guard.service";
import { RecipeStartComponent } from "./recipe-list/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeResolverService } from "src/app/shared/services/recipe-resolver.service";

const routes: Routes = [
  {
    path: "",
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: RecipeStartComponent, pathMatch: "full" },
      { path: "new", component: RecipeEditComponent },
      {
        path: ":id",
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService],
      },
      {
        path: "edit/:id",
        component: RecipeEditComponent,
        resolve: [RecipeResolverService],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
