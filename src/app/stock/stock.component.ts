import { Component, Input } from '@angular/core';
import { Stock } from '../shared/interfaces/stock';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {
  @Input() stock: Stock;
}
