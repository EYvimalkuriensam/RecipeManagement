import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { NgModule } from "@angular/core";

const appRoutes: Routes = [
  { path: "", redirectTo: "/recipe", pathMatch: "full" },
  {
    path: "recipe",
    loadChildren: () =>
      import("../../components/recipes/recipes.module").then(
        (m) => m.RecipesModule
      ),
  },
  {
    path: "shopping",
    loadChildren: () =>
      import("../../components/shopping-list/shopping-list.module").then(
        (m) => m.ShoppingListModule
      ),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("../../components/auth/auth.module").then(
        (m) => m.AuthModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
