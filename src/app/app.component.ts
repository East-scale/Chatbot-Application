import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatbotDataComponent } from './components/chatbot-data/chatbot-data.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, DashboardComponent, ChatbotDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'amazon-lex';
  constructor(private router: Router) {}
  logout(): void {
    // Clear session storage
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  
}
