import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { IPack, IPackData, StickerPackDataJson } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StickersService {

  constructor(private http: HttpClient) { }

  getStickerPacks(): Observable<IPack[]> {
    let stickerPackages: any[];

    return this.http
      .get<any[]>('https://api.github.com/repos/GalletaOreo98/TelegramStickers/contents')
      .pipe(
        map(response => {
          stickerPackages = response.filter(e => !(e.name === 'CONTRIBUTING.md') && !(e.name === 'README.md') && !(e.name === 'LICENSE') && !(e.name === '.gitignore') && !(e.name === 'ANIMATED STICKERS'));
          return stickerPackages;
        }),
        mergeMap(() => {
          const data$ = stickerPackages.map(stickerPackage => this.getPackData(stickerPackage.url));
          return forkJoin(data$);
        }),
        map(packData => {
          return stickerPackages.map((stickerPackage, i) => ({
            name: stickerPackage.name,
            url: stickerPackage.url,
            data: packData[i]
          }));
        })
      );
  }

  getPackData(url: string): Observable<IPackData[]> {
    return this.http.get<IPackData[]>(url);
  }

  //Obtiene la información dentro del archivo Data.json del pack de stickers
  getPackDataInfo(StickerPackName: string): Observable<StickerPackDataJson>{
    return this.http
      .get<StickerPackDataJson>(`https://raw.githubusercontent.com/GalletaOreo98/TelegramStickers/main/${StickerPackName}/Data.json`)
  }

  getStickersFromPack(StickerPackName: string) {
    return this.http
      .get<any[]>(`https://api.github.com/repos/GalletaOreo98/TelegramStickers/contents/${StickerPackName}/PNG?ref=main`)
      .pipe(
        map((response) => {
          return response.map((stickerData) => {
            return {
              name: stickerData.name,
              url: stickerData.html_url,
              download_url: stickerData.download_url,
              loaded: false
            };
          });
        })
      );
  }

}

