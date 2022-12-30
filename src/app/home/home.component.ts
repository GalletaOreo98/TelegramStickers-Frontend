import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPack, IPackData } from '../models';
import { StickersService } from '../services/stickers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  stickersPacks!: IPack[];
  stickersFromPack!: IPackData[];
  constructor(private stickerService: StickersService, private router: Router) { }

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

}

