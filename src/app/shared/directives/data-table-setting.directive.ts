import { TranslateService } from '@ngx-translate/core';
import {
  Directive,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Table } from 'primeng/table';
import { isNullOrEmpty, onChanges, columnReordered } from 'src/app/core/utils/common-functions';
import { DateTableColumn } from '../../core/models/date-table-column';

@Directive({
  selector: '[peazyDataTableSetting]'
})
export class DataTableSettingDirective implements OnInit, OnChanges {

  @Input() tableKey: string;
  @Input() defaultColumns: any[];
  @Input() expandable: boolean;
  @Input() selectable: boolean;
  @Output() setPageSize: EventEmitter<any>;
  selectedCols: any;

  constructor(
    private zone: NgZone,
    private table: Table,
    private translateService: TranslateService) {
    this.tableKey = '';
    this.defaultColumns = [];
    this.selectedCols = this.defaultColumns;
    this.selectable = false;
    this.expandable = false;
    this.setPageSize = new EventEmitter();
    this.table = table;
    this.table.resizableColumns = true;
    this.table.columnResizeMode = 'expand';
    this.table.reorderableColumns = true;
    this.table.rowHover = false;
    this.table.paginator = true;
    this.table.rows = 5;
    this.table.rowsPerPageOptions = [20, 50, 100, 200, 500];
    this.table.scrollable = true;
    this.table.scrollHeight = '60vh';
    this.table.autoLayout = false;
    this.table.sortMode = 'single';
    this.table.styleClass = 'p-datatable-striped p-datatable-gridlines';
    this.table.onColReorder.subscribe((event: any) => this.colReordered(event));
    this.table.onColResize.subscribe((event: any) => this.colResized(event));
    this.translateService.onLangChange.subscribe((e: Event) => {
      this.pageSummaryTranslation();
    });
    this.pageSummaryTranslation();
  }

  @Input() get selectedColumns(): DateTableColumn[] {
    return this.selectedCols;
  }

  set selectedColumns(cols: DateTableColumn[]) {
    this.defaultColumns.forEach((x, i) => {
      const idx = cols.findIndex(y => y.field === x.field);
      x.display = idx > -1;
    });
    this.selectedCols = this.defaultColumns.filter((x: any) => x.display);
  }

  ngOnInit(): void {
    this.table.stateStorage = 'session';
    if (isNullOrEmpty(this.tableKey) === false) {
      this.table.stateKey = this.tableKey as string;
    }
    this.defaultColumns.forEach((col, index) => {
      if (col.order === undefined) {
        col.order = index;
      }
    });
    this.selectedCols = this.defaultColumns;
    this.table.columns = this.selectedColumns;
  }

  pageSummaryTranslation(): void{
    this.translateService.get('頁數')
    .subscribe({
      next: result => {
        this.table.showCurrentPageReport = true;
        this.table.currentPageReportTemplate = result;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    onChanges(changes, this.selectedCols);
  }

  colReordered(event: any): void {
    console.log('Column reordered');
    console.log(event);
    columnReordered(event.columns, this.defaultColumns);
  }

  colResized(event: any): void {
    console.log('Column resized');
    console.log(event);
    const field = event.element.getAttribute('ng-reflect-field');
    const column = this.defaultColumns.find(x => x.field === field);
    if (column) {
      column.width = event.element.offsetWidth;
    }
  }

}
