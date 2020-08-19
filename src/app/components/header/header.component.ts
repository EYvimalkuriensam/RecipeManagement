import { AuthService } from "./../../shared/services/auth.service";
import { ApiService } from "./../../shared/services/api.service";
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  isAuthenticated: boolean = false;
  @Output() routeName = new EventEmitter<string>();
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.userSub.subscribe(
      (user) => (this.isAuthenticated = !!user)
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onSaveData(): void {
    this.apiService.storeRecipes();
  }

  onFetchData(): void {
    this.apiService.fetchRecipe().subscribe();
  }

  onLogout():void {
    this.authService.logout()
  }
}
