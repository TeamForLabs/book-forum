import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input('paginateTotal') paginateTotal!: number;
  @Input('paginateBatch') paginateBatch: number = 12;
  @Input('currPage') currPage!: number;
  @Input('scrollElem') scrollElem!: string;
  @Input('baseUrl') baseUrl!: string;

  @Output('page-change') clicked = new EventEmitter<number>();

  public pageNums: Array<number> = [];
  public reach = 2;

  constructor() { }

  ngOnInit(): void {
    this.generatePages();
    this.filterPages();
  }

  ngOnChanges(): void {
    this.generatePages();
    this.filterPages();
  }

  onClick(event: MouseEvent): void {
    let trg: any = event.target as any;
    trg = trg.closest('button') as HTMLButtonElement;
    if(trg.id === 'step-forward') {
      this.currPage++;
    } else if(trg.id === 'step-backward') {
      this.currPage--;
    } else if(trg.id === 'fast-forward') {
      this.currPage = this.getMaxPages();
    } else if(trg.id === 'fast-backward') {
      this.currPage = 1;
    } else  {
      this.currPage = Number(trg.dataset.page);
    }
    this.clicked.emit(this.currPage);
    this.scolllToTop();
    this.generatePages();
    this.filterPages();
    
  }

  filterPages(): void {
    let nPages = this.getMaxPages();
    let around = 2 * this.reach + 1;
    if (nPages >= 5) {
      if (nPages - this.currPage <= this.reach) {
        this.pageNums = this.pageNums.slice(-around);
        return;
      }
      if (this.currPage > this.reach && this.currPage <= nPages) {
        this.pageNums = this.pageNums.filter(p => p >= this.currPage - this.reach && p <= this.currPage + this.reach);
        return;
      } else {
        this.pageNums.splice(around);
        return;
      }
    }
  }

  generatePages(): void {
    let nPages = this.getMaxPages();
    this.pageNums = [];
    for (let page = 1; page <= nPages; page++) {
      this.pageNums.push(page);
    }
  }

  scolllToTop(): void {
    if (this.scrollElem) {
      document.querySelector(this.scrollElem)?.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  getMaxPages(): number {
    return Math.ceil(this.paginateTotal / this.paginateBatch);
  }
}

