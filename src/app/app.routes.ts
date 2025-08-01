import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatbotDataComponent } from './components/chatbot-data/chatbot-data.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'chatbot-data',component:ChatbotDataComponent},
];
