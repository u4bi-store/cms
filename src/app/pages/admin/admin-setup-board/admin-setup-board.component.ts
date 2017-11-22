import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { BoardPanelModel } from '../../../providers/boardPanel/boardPanel.model';
import { GetBoardPanels, GetLaTestBoardPanel } from '../../../providers/boardPanel/boardPanel.actions';

interface MainState{
  boardPanel : any;
}

@Component({
  selector: 'app-admin-setup-board',
  templateUrl: './admin-setup-board.component.html',
  styleUrls: ['./admin-setup-board.component.css']
})
export class AdminSetupBoardComponent implements OnInit, OnDestroy {

  private sub : Subscription;
  private boardPanel$ : Observable<any>;

  tapBoard : BoardPanelModel[] = [];
  mainBoard : BoardPanelModel;

  constructor(private store : Store<MainState>) {
    
    this.boardPanel$ = this.store.select('boardPanel');
    this.sub = this.boardPanel$.subscribe(e => {
        if(e){
            this.tapBoard = e.tapBoard;
            this.mainBoard = e.mainBoard;
        }
    });
    
    this.store.dispatch(new GetBoardPanels());
    this.store.dispatch(new GetLaTestBoardPanel());
    
  }

  ngOnInit() {
  }
  
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
