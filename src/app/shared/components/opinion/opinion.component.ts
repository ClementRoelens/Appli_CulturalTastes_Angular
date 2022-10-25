import { OpinionService } from './../../opinion.service';
import { Observable, combineLatest, map, tap, switchMap } from 'rxjs';
import { Component, Input, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Opinion } from '../../models/opinion.model';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpinionComponent implements OnInit {

  opinion$!: Observable<Opinion>;
  username$!: Observable<string>;

  @Output() opinionLiked = new EventEmitter<string>();

  isLiked!: boolean;
  likedOpinionIcon!: string;

  constructor(
    private opinionService: OpinionService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.opinion$ = this.opinionService.selectedOpinion$.pipe(
      tap(opinion => this.username$ = this.authService.getUsername(opinion.author))
    );

    const user = this.authService.user$;
    combineLatest([
      user,
      this.opinion$
    ]).pipe(
      tap(([user, opinion]) => {
        if (opinion._id && user._id) {
          this.isLiked = user.likedOpinionsId.includes(opinion._id);
        }
        else {
          this.isLiked = false;
        }
        this.likedOpinionIcon = (this.isLiked) ? "./assets/full_heart.png" : "./assets/empty_heart.png";
      })
    ).subscribe();
  }

  opinionSelection(action: number) {
    this.opinionService.indexChange(action);
  }

  likeOpinion(id: string) {
    this.opinionLiked.emit(id);
  }
}
