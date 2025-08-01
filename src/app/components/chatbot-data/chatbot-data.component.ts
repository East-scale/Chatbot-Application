import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-chatbot-data',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot-data.component.html',
  styleUrl: './chatbot-data.component.css'
})
export class ChatbotDataComponent {
  constructor(private router: Router) {}
   chatbotMessages = [
    { user: 'User', message: 'Hello!' },
    { user: 'Bot', message: 'Hi there! How can I assist you today?' },
    { user: 'User', message: 'What’s the weather like?' },
    { user: 'Bot', message: 'It’s sunny and 25°C outside.' }
  ];
}
