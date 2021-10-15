import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input('paginatePrev') paginatePrev!: string;
  @Input('paginateNext') paginateNext!: string;
  @Input('paginateTotal') paginateTotal!: number;
  @Input('paginateBatch') paginateBatch!: number;
  @Input('currPage') currPage!: number;
  @Input('scrollElem') scrollElem!: string;

  @Output('clicked') clicked = new EventEmitter<number>();

  pageNums: Array<number> = [];
  private reach = 2;

  constructor() { }

  ngOnInit(): void {
    this.generatePages();
    this.filterPages();
  }

  onClick(event: MouseEvent): void {
    let trg: HTMLDivElement = event.target as HTMLDivElement;
    let page = Number(trg.dataset.page);
    this.clicked.emit(page);
    this.currPage = page;
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

  fastForward(): void {
    this.currPage = this.getMaxPages();
    this.clicked.emit(this.getMaxPages());
    this.scolllToTop();
    this.generatePages();
    this.filterPages();
  }

  fastBackward(): void {
    this.currPage = 1;
    this.clicked.emit(1);
    this.scolllToTop();
    this.generatePages();
    this.filterPages();
  }

  forward(): void {
    this.currPage = this.currPage + 1;
    this.clicked.emit(this.currPage);
    this.scolllToTop();
    this.generatePages();
    this.filterPages();
  }

  backward(): void {
    this.currPage = this.currPage - 1;
    this.clicked.emit(this.currPage);
    this.scolllToTop();
    this.generatePages();
    this.filterPages();
  }


  getMaxPages(): number {
    return Math.ceil(this.paginateTotal / this.paginateBatch);
  }
}

