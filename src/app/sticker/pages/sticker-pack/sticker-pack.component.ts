import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPackData, StickerPackDataJson } from 'src/app/models';
import { StickersService } from 'src/app/services/stickers.service';

@Component({
  selector: 'app-sticker-pack',
  templateUrl: './sticker-pack.component.html',
  styleUrls: ['./sticker-pack.component.css']
})
export class StickerPackComponent implements OnInit {
  stickers!: IPackData[];
  stickersDataJson!: StickerPackDataJson;
  stickerPackName!: string;

  constructor(private router: Router, private route:ActivatedRoute, private stickerService: StickersService) {
    const currentNavigation = this.router.getCurrentNavigation();
    this.stickerPackName = this.route.snapshot.params['sticker-pack-name'];
    
    if (currentNavigation && currentNavigation.extras.state) {
      this.stickers = currentNavigation.extras.state['stickersFromPack'];
      this.stickersDataJson = currentNavigation.extras.state['stickersDataJson'];
    }else {
      console.log(this.stickerPackName);
      this.stickerService.getStickersFromPack(this.stickerPackName).subscribe({
        next: res => {
          this.stickers = res;
          this.stickerService.getPackDataInfo(this.stickerPackName).subscribe({
            next: res => {
              this.stickersDataJson = res;
            }
          });
        }
      });
    }
  }

  ngOnInit(): void {
    //console.log(this.stickersDataJson);
  }

  trackByStickerId(index: number, sticker: any) {
    return sticker.name;
  }
  

}
