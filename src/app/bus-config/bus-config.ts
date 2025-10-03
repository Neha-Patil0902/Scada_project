import { Component, OnInit } from '@angular/core';
import { Converter } from '../models/converter';
import { BusConfiguration } from '../services/bus-configuration';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-bus-config',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './bus-config.html',
  styleUrl: './bus-config.css'
})
export class BusConfig implements OnInit {

  converters: Converter[] = [];
  selected: Converter | null = null;

  showAddForm = false; 

   newPort: Converter = {
    id: 0,
    portNumber: 0,
    ipAddress: '',
    isActive: false
  };

  constructor(private busConfigService: BusConfiguration) {}

  ngOnInit() {
    this.loadConverters();
  }

  loadConverters() {
    this.busConfigService.getConverters().subscribe(data => (this.converters = data));
  }

  select(conv: Converter) {
    // copy to avoid directly mutating table row
    this.selected = { ...conv };
  }

 save() {
  if (!this.selected) return;
  this.busConfigService.updateConverter(this.selected).subscribe({
    next: updated => {
      const idx = this.converters.findIndex(
        c => c.id === updated.id
      );
      if (idx !== -1) this.converters[idx] = updated;
      alert('Saved to server!!');
    },
    error: err => console.error(err)
  });
 }

 startAdd() {
    this.showAddForm = true;
  }
   addPort() {
    this.busConfigService.addConverter(this.newPort).subscribe({
      next: created => {
        this.converters.push(created);
        this.showAddForm = false;
        this.newPort = { id: 0, portNumber: 0, ipAddress: '', isActive: false };
        alert('New port added!');
      },
      error: err => console.error(err)
    });
  }

  cancelAdd() {
  this.showAddForm = false;
  this.newPort = { id: 0, portNumber: 0, ipAddress: '', isActive: false };
   }
 
  deletePort(index: number) {
  // remove the port at this index
  this.converters.splice(index, 1);

  // reassign IDs so they stay 1,2,3...
  this.converters.forEach((item, i) => item.id = i + 1);
}
}