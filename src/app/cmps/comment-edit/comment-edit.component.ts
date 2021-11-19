import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss']
})
export class CommentEditComponent implements OnInit {
  @Input() loggedInUser: User | undefined
  @Output() sendCommentEvent = new EventEmitter();
  txt: string = ''
  constructor() { }

  sendComment(ev: any) {
    ev.preventDefault();
    this.sendCommentEvent.emit({ txt: this.txt, idAtAdd: null })
  }

  ngOnInit(): void {
  }

}
