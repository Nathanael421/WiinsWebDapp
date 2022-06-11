import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  BackgroundPostModel,
  FeedPublicationCardComponent,
  FeedPublicationCardService,
} from '@wiins/feed-publication-card';
import {
  ISendFileToStorageWithProgress,
  StorageService,
} from '../../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class FeedPublicationService {
  // data
  linearBgPost: BackgroundPostModel[] = [
    new BackgroundPostModel(['#8E2DE2', '#4A00E0'], {
      start: [1, 1],
      end: [0, 0],
    }),
    new BackgroundPostModel(['red', 'green'], {
      start: [0, 0],
      end: [1, 0],
    }),
    new BackgroundPostModel(['blue', 'pink'], {
      start: [1, 0],
      end: [0, 1],
    }),
  ];

  constructor(
    private feedPublicationCardService: FeedPublicationCardService,
    private storageService: StorageService
  ) {}

  onCreatePublication(): MatDialogRef<FeedPublicationCardComponent> {
    this.onUploadEvent();
    return this.feedPublicationCardService.openModalPublication({
      linearBackgroundList: this.linearBgPost,
    });
  }

  onUploadEvent(): void {
    this.feedPublicationCardService
      .getImgPreview()
      .subscribe((data: File[]) => {
        const payload: ISendFileToStorageWithProgress = {
          files: data,
          progress: (event: number) =>
            this.feedPublicationCardService.setImgPreviewProgress(event),
        };
        this.storageService.sendFileToStorageWithProgress(payload);
      });

    this.feedPublicationCardService
      .getPosterPreview()
      .subscribe((data: File[]) => {
        const payload: ISendFileToStorageWithProgress = {
          files: data,
          progress: (event: number) => {
            console.log(event);
            return this.feedPublicationCardService.setPosterPreviewProgress(
              event
            );
          },
        };
        this.storageService.sendFileToStorageWithProgress(payload);
      });

    this.feedPublicationCardService
      .getVideoPreview()
      .subscribe((data: File[]) => {
        const payload: ISendFileToStorageWithProgress = {
          files: data,
          progress: (event: number) => {
            console.log(event);
            this.feedPublicationCardService.setVideoPreviewProgress(event);
          },
        };
        this.storageService.sendFileToStorageWithProgress(payload);
      });
  }
}
