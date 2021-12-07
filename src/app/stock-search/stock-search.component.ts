import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss'],
})
export class StockSearchComponent {
  constructor(public dialog: MatDialog) {}
  ticker: string;

  @Output() addTickerToFeed: EventEmitter<String> = new EventEmitter();

  openDialog(): void {
    const dialogRef = this.dialog.open(SearchDialog, {
      width: '250px',
      data: { ticker: this.ticker },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.addTickerToFeed.emit(result);
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
    this.dialogRef.close();
  }
}
