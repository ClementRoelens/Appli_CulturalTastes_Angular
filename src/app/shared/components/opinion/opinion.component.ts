import { OpinionService } from '../../../core/services/opinion.service';
import { Observable, combineLatest, map, tap, switchMap } from 'rxjs';
import { Component, Input, OnInit, EventEmitter, Output, ChangeDetectionStrategy, HostBinding, HostListener } from '@angular/core';
import { Opinion } from '../../models/opinion.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpinionComponent implements OnInit {

  @HostBinding('device') device!: string;

  opinions$!: Observable<Opinion[]>;
  selectedOpinion$!: Observable<Opinion>;

  @Input() opinionsId!: string[];

  @Output() opinionLiked = new EventEmitter<string>();
  @Output() opinionExists = new EventEmitter<Opinion | null>();
  @Output() opinionWrited = new EventEmitter<boolean>();

  lastOpinionsId!: string[];
  isLiked!: boolean;
  likedOpinionIcon!: string;

  constructor(
    private opinionService: OpinionService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.checkWidth(window.innerWidth);
    this.selectedOpinion$ = this.opinionService.selectedOpinion$;
    this.opinions$ = this.opinionService.opinions$;
    this.createObservables();
  }

  ngOnChanges() {
    // L'avis sélectionné bougeait tout seul quand on likait un film, ce paragrape empêche ce comportement
    // let newOpinions = true;
    // if (this.lastOpinionsId !== undefined){
    //   newOpinions = false;
    //   let i = 0;
    //   let c = this.lastOpinionsId.length;
    //   while (!newOpinions && i<c){
    //     if (this.lastOpinionsId[i] !== this.opinionsId[i]){
    //       newOpinions = true;
    //     }
    //     i++;
    //   }
    // }
    // if (newOpinions){
    //   this.lastOpinionsId = this.opinionsId;
    //   this.opinionService.getOpinions(this.opinionsId);
    // }
  }

  private createObservables(){
    const user = this.authService.user$;
    combineLatest([
      user,
      this.selectedOpinion$,
      this.opinions$
    ]).pipe(
      tap(([user, opinion, opinions]) => {
        if (opinion._id && user._id) {
          this.isLiked = user.likedOpinionsId.includes(opinion._id);
        } else {
          this.isLiked = false;
        }
        if (opinions.length > 0 && user._id){
          let opinionToSend = null;
          for (opinion of opinions) {
            if (user.opinionsId.includes(opinion._id)) {
              opinionToSend = opinion;
              break;
            }  
          }
          this.opinionExists.emit(opinionToSend);
        }
        this.likedOpinionIcon = (this.isLiked) ? "./assets/full_heart.png" : "./assets/empty_heart.png";
      })
    ).subscribe();
  }

  opinionSelection(action: number) {
    this.opinionService.indexChange(action);
  }

  checkWidth(width: number) {
    if (width <= 900) {
      this.device = 'mobile-only';
    } else {
      this.device = 'desktop-only';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWidth(event.target.innerWidth);
  }
  
  likeOpinion(id: string) {
    console.log("likeOpinion lancé");
    this.opinionLiked.emit(id);
  }

  writeOpinion(){
    this.opinionWrited.emit(true);
  }
}
