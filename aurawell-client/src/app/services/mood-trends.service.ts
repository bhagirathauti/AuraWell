// mood-trends.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import DiaryEntry from '../models/dairy-entry.model';
import { EntriesService } from './entries.service';

@Injectable({
  providedIn: 'root'
})
export class MoodTrendsService {
  constructor(private http: HttpClient, private entriesSvc: EntriesService) {}

  getMoodEntries(): Observable<DiaryEntry[]> {
    return this.entriesSvc.getEntries(localStorage.getItem('email') || "")
  }

  calculateMoodTrends(entries: DiaryEntry[], interval: 'day' | 'week' | 'month' | 'overall' = 'overall') {
    const filteredEntries = this.filterEntriesByInterval(entries, interval);

    const moodDistribution = this.calculateMoodDistribution(filteredEntries);

    const moodProgression = this.calculateMoodProgression(filteredEntries);

    return {
      distribution: moodDistribution,
      progression: moodProgression,
      totalEntries: filteredEntries.length
    };
  }

  private filterEntriesByInterval(entries: DiaryEntry[], interval: 'day' | 'week' | 'month' | 'overall'): DiaryEntry[] {
    const now = new Date();
    
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      const daysDiff = (now.getTime() - entryDate.getTime()) / (1000 * 3600 * 24);

      switch (interval) {
        case 'day': return daysDiff <= 1;
        case 'week': return daysDiff <= 7;
        case 'month': return daysDiff <= 30;
        case 'overall':
        default: return true;
      }
    });
  }

  private calculateMoodDistribution(entries: DiaryEntry[]) {
    return entries.reduce((acc, entry) => {
      const mood = entry.mood === 'mood' ? 'Undefined' : entry.mood;
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {} as {[key: string]: number});
  }

  private calculateMoodProgression(entries: DiaryEntry[]) {
    const sortedEntries = entries.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return sortedEntries.map((entry, index) => ({
      date: entry.date,
      mood: entry.mood === 'mood' ? 'Undefined' : entry.mood,
      index
    }));
  }
}