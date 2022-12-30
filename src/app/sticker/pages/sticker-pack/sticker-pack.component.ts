import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPackData } from 'src/app/models';
import { StickersService } from 'src/app/services/stickers.service';

@Component({
  selector: 'app-sticker-pack',
  templateUrl: './sticker-pack.component.html',
  styleUrls: ['./sticker-pack.component.css']
})
export class StickerPackComponent implements OnInit {
  stickers!: IPackData[];

  constructor(private router: Router, private route:ActivatedRoute, private stickerService: StickersService) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation && currentNavigation.extras.state) {
      this.stickers = currentNavigation.extras.state['stickersFromPack'];
    }else {
      const stickerPackName = this.route.snapshot.params['sticker-pack-name']
      console.log(stickerPackName);
      this.stickerService.getStickersFromPack(stickerPackName).subscribe({
        next: res => {
          this.stickers = res;
        }
      })
    }
  }

  ngOnInit(): void {
    console.log(this.stickers);
  }

  trackByStickerId(index: number, sticker: any) {
    return sticker.name;
  }
  

}
