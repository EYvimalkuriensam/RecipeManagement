import { Recipe } from "./../../../shared/models/recipe.model";
import { RecipeService } from "./../../../shared/services/recipe.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = "",
      recipeImagePath = "",
      recipeDescription = "",
      recipeIngredient = new FormArray([]);
    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredient.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9][0-9]*$/),
              ]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imagePath: new FormControl(recipeImagePath, [Validators.required]),
      description: new FormControl(recipeDescription, [Validators.required]),
      ingredients: recipeIngredient,
    });
  }

  onSubmit(): void {
    if (this.editMode)
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    else this.recipeService.addRecipe(this.recipeForm.value);
  }

  getControls() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl("", [Validators.required]),
        amount: new FormControl("", [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$/),
        ]),
      })
    );
  }

  onRecipeCancel = (): void => {
    if (isNaN(this.id)) this.router.navigate(["/recipe"]);
    else this.router.navigate(["/recipe", this.id]);
  };

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }
}
