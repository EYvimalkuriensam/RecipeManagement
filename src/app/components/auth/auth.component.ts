import { PlaceholderDirective } from "./../../shared/directives/placeholder.directive";
import { AlertComponent } from "./../../shared/alert/alert.component";
import { AuthResponseData } from "./../../shared/interface/authResponse.interface";
import { AuthService } from "./../../shared/services/auth.service";
import {
  Component,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnDestroy {
  private closeSub: Subscription;
  isLoginMode: boolean = false;
  isLoading: boolean = false;
  error: string = null;
  @ViewChild("authForm") authForm: NgForm;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy(): void {
    if (this.closeSub) this.closeSub.unsubscribe();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmit() {
    let authObs: Observable<AuthResponseData>,
      email: string = this.authForm.value.email,
      password: string = this.authForm.value.password;
    this.isLoading = true;
    if (this.authForm.invalid) return;

    if (this.isLoginMode) authObs = this.authService.login(email, password);
    else authObs = this.authService.signup(email, password);

    authObs.subscribe(
      (response) => {
        this.isLoading = false;
        console.log(response);
        this.router.navigate(["/recipe"]);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
        this.showErrorAlert(this.error);
      }
    );
    this.authForm.reset();
  }

  onHandleErrorClose = () => {
    this.error = null;
  };

  private showErrorAlert = (message: string): void => {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.vcRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  };
}
