import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IPack, IPackData } from '../models';
import { StickersService } from '../services/stickers.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngbd-offcanvas-content',
  styleUrls: ['./home.component.css'],
	template: `
		<div class="offcanvas-header">
			<h3 class="offcanvas-title">Acerca de nostros</h3>
			<button
				type="button"
				class="btn-close text-reset"
				aria-label="Close"
				(click)="activeOffcanvas.dismiss('Cross click')"
			></button>
		</div>
		<div class="offcanvas-body">
			<div>Hello {{ name }}</div>
			<button type="button" class="btn btn-outline-dark" (click)="activeOffcanvas.close('Close click')">Close</button>
		</div>
	`,
})
export class NgbdOffcanvasContent {
	@Input() name:string = "";

	constructor(public activeOffcanvas: NgbActiveOffcanvas) {}

}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faBars = faBars;
  stickersPacks!: IPack[];
  stickersFromPack!: IPackData[];
  constructor(private stickerService: StickersService, private router: Router, private OffCanvasService: NgbOffcanvas) { }

  ngOnInit(): void {
    this.stickerService.getStickerPacks().subscribe({
      next: (res) => {
        this.stickersPacks = res;
        console.log(res);
      }
    });
  }

  selectStickerPack(StickerPackName: string) {
    console.log(StickerPackName);
    this.stickerService.getStickersFromPack(StickerPackName).subscribe({
      next: res => {
        this.stickersFromPack = res;
      },
      complete: () => {
        this.router.navigate(['sticker', StickerPackName], {state: {stickersFromPack: this.stickersFromPack}});
      }
    })
  }

  openOffCanvas(){
    this.OffCanvasService.open(NgbdOffcanvasContent);
  }

}

