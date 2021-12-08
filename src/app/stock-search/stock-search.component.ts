import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StockService } from '../shared/services/stock.service';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss'],
})
export class StockSearchComponent implements OnInit {
  constructor(public dialog: MatDialog, private stockService: StockService) {}
  ticker: string;
  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  @Output() addTickerToFeed: EventEmitter<String> = new EventEmitter();

  ngOnInit(): void {
    this.getAllTickers();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toUpperCase();

    return this.options.filter((option) =>
      option.toUpperCase().includes(filterValue)
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SearchDialog, {
      width: '250px',
      data: {
        ticker: this.ticker,
        options: this.options,
        filteredOptions: this.filteredOptions,
        myControl: this.myControl,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result ? this.addTickerToFeed.emit(result) : '';
    });
  }

  getAllTickers() {
    this.stockService.getAllTickers().subscribe((tickers) => {
      this.options = tickers.map((val) => {
        return val.symbol;
      });
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    });
  }
}

@Component({
  selector: 'search-dialog',
  templateUrl: './search-dialog.html',
})
export class SearchDialog {
  constructor(
    public dialogRef: MatDialogRef<SearchDialog>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onNoClick(): void {
    this.data.ticker = '';
    this.dialogRef.close();
  }
}
