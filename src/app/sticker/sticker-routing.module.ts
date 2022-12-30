import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StickerPackComponent } from './pages/sticker-pack/sticker-pack.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: ':sticker-pack-name', component: StickerPackComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StickerRoutingModule { }
