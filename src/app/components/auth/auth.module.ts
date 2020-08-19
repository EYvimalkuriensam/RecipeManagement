import { SharedModule } from "./../../shared/shared.module";
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: AuthComponent }];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
