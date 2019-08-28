import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {environment} from '@env/environment';
import {XxxAlertService, XxxAlertType, XxxDataService, XxxEventMgrService, XxxStateStoreService} from '@app/xxx-common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xxx-answers-page',
  styleUrls: ['./xxx-answers-page.component.scss'],
  templateUrl: './xxx-answers-page.component.html'
})

export class XxxAnswersPageComponent implements OnDestroy, OnInit {
  answers: any = [];
  isBusy = false;
  isError = false;
  isQuestions = false;
  isResult = false;
  question: any = {};
  private apiKey = 'U4DMV*8nvpm3EOpvf69Rxw((';
  private questionId: string;
  private subscriptionRouteParam: Subscription;

  constructor(
      private route: ActivatedRoute,
      private changeDetectorRef: ChangeDetectorRef,
      private router: Router,
      private xxxAlertService: XxxAlertService,
      private xxxDataService: XxxDataService,
      private xxxEventMgrService: XxxEventMgrService,
      private xxxStateStoreService: XxxStateStoreService
  ) {
  }

  ngOnInit(): void {
    this.checkForQuestions();
    this.getQuestionId();
  }

  ngOnDestroy() {
    this.subscriptionRouteParam.unsubscribe();
  }

  decodeHtmlEntities(text) {
    if ((text === undefined) || (text === '')) {
      return '';
    }
    const doc = new DOMParser().parseFromString(text, 'text/html');
    let newText = doc.documentElement.textContent;
    newText = newText.replace('&quot;', '"');
    return newText;
  }

  onClickBackToQuestions() {
    this.xxxEventMgrService.handleEvent('routeQuestions');
  }

  private checkForQuestions() {
    if (this.xxxStateStoreService.getItem('questionsRoute')) {
      this.isQuestions = true;
    }
  }

  private getQuestionId() {
    this.questionId = '';
    this.subscriptionRouteParam = this.route.params.subscribe(params => {
      this.questionId = params['id'];
      if ((typeof this.questionId === 'string') && (this.questionId.length > 0)) {
        this.getQuestion();
      }
    });
  }

  private getQuestion() {
    this.isBusy = true;
    this.isResult = false;
    this.isError = false;
    // this.changeDetectorRef.detectChanges();
    let url = environment.url.api;
    url += 'questions/';
    url += this.questionId;
    url += '?key=' + this.apiKey;
    url += '&filter=withbody';
    url += '&order=desc';
    url += '&sort=activity';
    url += '&site=stackoverflow';
    this.xxxDataService.getData(url)
        .subscribe(result => this.onSuccessGetQuestion(result),
            () => this.onErrorGetQuestion());
  }

  private onSuccessGetQuestion(result) {
    if ((result.hasOwnProperty('items'))
        && (typeof result.items === 'object')
        && (result.items.length > 0)) {
      this.question = result.items[0];
      this.getAnswers();
    } else {
      this.isBusy = false;
      this.changeDetectorRef.detectChanges();
      const warningMsg = 'Given Question Id Not Found';
      this.xxxAlertService.openAlert(XxxAlertType.WARN, warningMsg);
    }
  }

  // Errors are handled by global interceptor.
  private onErrorGetQuestion() {
    this.isBusy = false;
    this.isError = true;
    this.changeDetectorRef.detectChanges();
  }

  private getAnswers() {
    this.isBusy = true;
    this.isResult = false;
    this.isError = false;
    this.answers = [];
    this.changeDetectorRef.detectChanges();
    let url = environment.url.api;
    url += 'questions/';
    url += this.questionId;
    url += '/answers';
    url += '?key=' + this.apiKey;
    url += '&site=stackoverflow';
    url += '&order=desc';
    url += '&sort=votes';
    url += '&filter=withbody';
    this.xxxDataService.getData(url)
        .subscribe(result => this.onSuccessGetAnswers(result),
            () => this.onErrorGetAnswers());
  }

  private onSuccessGetAnswers(result) {
    this.isBusy = false;
    if ((result.hasOwnProperty('items'))
        && (typeof result.items === 'object')
        && (result.items.length > 0)) {
      this.answers = result.items;
      this.isResult = true;
    } else {
      const warningMsg = 'No Answers Found For Given Question Id';
      this.xxxAlertService.openAlert(XxxAlertType.WARN, warningMsg);
    }
    this.changeDetectorRef.detectChanges();
  }

  // Errors are handled by global interceptor.
  private onErrorGetAnswers() {
    this.isBusy = false;
    this.isError = true;
    this.changeDetectorRef.detectChanges();
  }
}
