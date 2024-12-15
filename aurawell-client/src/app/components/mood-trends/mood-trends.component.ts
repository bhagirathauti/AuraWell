import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MoodTrendsService } from '../../services/mood-trends.service';

Chart.register(...registerables);

@Component({
  selector: 'app-mood-trends',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <mat-card class="mood-trends-container">
      <mat-card-header>
        <mat-card-title>Mood Trends</mat-card-title>
      </mat-card-header>
      
      <mat-button-toggle-group 
        class="interval-selector" 
      >
        <mat-button-toggle value="day" (click)="updateTrends('day')">Day</mat-button-toggle>
        <mat-button-toggle value="week" (click)="updateTrends('week')">Week</mat-button-toggle>
        <mat-button-toggle value="month" (click)="updateTrends('month')">Month</mat-button-toggle>
        <mat-button-toggle value="overall" (click)="updateTrends('overall')">Overall</mat-button-toggle>
      </mat-button-toggle-group>

      <div class="charts-container">
        <mat-card class="chart-wrapper">
          <mat-card-header>
            <mat-card-title>Mood Distribution</mat-card-title>
          </mat-card-header>
          <div class="chart-content">
            <canvas #distributionChart></canvas>
          </div>
        </mat-card>

        <mat-card class="chart-wrapper">
          <mat-card-header>
            <mat-card-title>Mood Breakdown</mat-card-title>
          </mat-card-header>
          <div class="chart-content">
            <div class="summary-grid">
              <div *ngFor="let mood of Object.keys(moodDistribution)" class="summary-item">
                <mat-icon>sentiment_satisfied</mat-icon>
                <span><b>{{ mood }}</b>: {{ moodDistribution[mood] }} entries</span>
              </div>
            </div>
            <p class="total-entries">Total Entries: {{ totalEntries }}</p>
          </div>
        </mat-card>
      </div>
    </mat-card>
  `,
  styles: [`
    .mood-trends-container {
      max-width: 1200px;
      margin: 20px auto;
      padding: 20px;
    }
    .interval-selector {
      display: flex;
      justify-content: center;
      margin: 20px 0;
      width: 100%;
    }
    .charts-container {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 20px;
    }
    .chart-wrapper {
      flex: 1;
      height: 400px;
      overflow: hidden;
    }
    .chart-content {
      height: 350px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .mood-summary {
      text-align: center;
    }
    .summary-grid {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 35px;
    }
    .summary-item {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .total-entries {
      font-weight: bold;
      color: #666;
    }
  `]
})
export class MoodTrendsComponent implements OnInit {
  @ViewChild('distributionChart') distributionChartRef!: ElementRef;

  moodDistribution: { [key: string]: number } = {};
  moodProgression: any[] = [];
  totalEntries: number = 0;
  Object = Object;
  selectedInterval: 'day' | 'week' | 'month' | 'overall' = 'day';

  private distributionChart: Chart | null = null;

  constructor(private moodTrendsService: MoodTrendsService) { }

  ngOnInit() {
    this.loadMoodTrends(this.selectedInterval);
  }

  updateTrends(interval: 'day' | 'week' | 'month' | 'overall') {
    this.selectedInterval = interval;
    this.loadMoodTrends(interval);
  }

  private loadMoodTrends(interval: 'day' | 'week' | 'month' | 'overall') {
    this.moodTrendsService.getMoodEntries().subscribe(entries => {
      const trends = this.moodTrendsService.calculateMoodTrends(entries, interval);
      this.moodDistribution = trends.distribution;
      this.moodProgression = trends.progression;
      this.totalEntries = trends.totalEntries;

      this.renderDistributionChart();
    });
  }

  private renderDistributionChart() {
    if (this.distributionChart) {
      this.distributionChart.destroy();
    }

    const ctx = this.distributionChartRef.nativeElement;
    this.distributionChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(this.moodDistribution),
        datasets: [{
          data: Object.values(this.moodDistribution),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: 'Mood Distribution'
          }
        }
      }
    });
  }
}