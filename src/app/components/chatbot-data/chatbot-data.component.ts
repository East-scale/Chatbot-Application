import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

interface ConsultationData {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  Role: string;
  Email: string;
  PhoneNumber: string;
  timestamp?: string;
}

@Component({
  selector: 'app-chatbot-data',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot-data.component.html',
  styleUrl: './chatbot-data.component.css'
})
export class ChatbotDataComponent implements OnInit {
  
  consultationData: ConsultationData[] = [];
  loading = false;
  error: string | null = null;
  
  private dynamodb: DynamoDBDocumentClient;

  constructor(private router: Router) {
  const client = new DynamoDBClient({
    region: 'ap-southeast-2',
    credentials: {
    accessKeyId:'AKIA4AM74WDNAS642YPJ',
    secretAccessKey:'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'    
      
    }
  });
  
  this.dynamodb = DynamoDBDocumentClient.from(client);
  }

  ngOnInit() {
    this.loadConsultationData();
  }

  async loadConsultationData() {
    this.loading = true;
    this.error = null;
    
    try {
      const command = new ScanCommand({
        TableName: 'LexConversations'
      });
      
      const result = await this.dynamodb.send(command);
      
      if (result.Items) {
        this.consultationData = result.Items as ConsultationData[];
        console.log('Loaded consultation data:', this.consultationData);
      }
    } catch (error) {
      console.error('Error loading consultation data:', error);
      this.error = 'Failed to load consultation data. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  async deleteConsultation(id: string) {
    if (!confirm('Are you sure you want to delete this consultation?')) {
      return;
    }
    
    try {
      const command = new DeleteCommand({
        TableName: 'LexConversations',
        Key: { id: id }
      });
      
      await this.dynamodb.send(command);
      
      // Remove from local array
      this.consultationData = this.consultationData.filter(item => item.id !== id);
      
      console.log('Consultation deleted successfully');
    } catch (error) {
      console.error('Error deleting consultation:', error);
      alert('Failed to delete consultation. Please try again.');
    }
  }

  refreshData() {
    this.loadConsultationData();
  }
}