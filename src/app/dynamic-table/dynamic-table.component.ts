import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

//importing json file
import dat from '../../../data/table.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DynamicTableComponent {
  dataJson: any = dat;

  // data: {
  //   title: string;
  //   header: { name: string; columns: string[] };
  //   vaccines: {
  //     vaccineName: string;
  //     alias?: string;
  //     doses: { dosageName: string; dosageType: string }[];
  //   }[]
  // } = this.dataJson
  data: any;
  custom: boolean = true

  constructor(private http: HttpClient) {}
  ngOnInit(): void {

    const headers = new HttpHeaders({
      Authorization: 'Bearer alexnder-token',
    });

    this.http
      .get('assets/table.json', { headers, observe: 'events' })
      .subscribe((d) => {
        this.data = d;
        console.log('response', d);
      });
  }
}
