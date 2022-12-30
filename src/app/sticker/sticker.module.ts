import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StickerRoutingModule } from './sticker-routing.module';
import { StickerPackComponent } from './pages/sticker-pack/sticker-pack.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    StickerPackComponent
  ],
  imports: [
    CommonModule,
    StickerRoutingModule,
    NgbModule
  ]
})
export class StickerModule { }
