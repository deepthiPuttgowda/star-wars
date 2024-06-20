import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'star-wars';
  private subscription: any;

      constructor(private router: Router) {
        this.subscription = this.router.events.pipe(
          filter((e : any) => e instanceof NavigationStart && e.id === 1))
          .subscribe((e:any) => {
            this.redirectToSplash();
          });
    
      }

      private redirectToSplash() {
        this.router.navigate(["Characters"]);
        this.subscription.unsubscribe();
      }
}
