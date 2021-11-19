import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { User } from 'src/app/interfaces/user';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comments: any[] = []
  @Input() loggedInUser: User | undefined
  @Output() onRemoveComment = new EventEmitter<number>()
  @Output() sendCommentEvent = new EventEmitter();
  // @Output() saveCommentEvent = new EventEmitter();

  IdToAddComment: number | undefined
  commentIdToEdit: number | undefined
  txt: string = ''
  constructor(private commentService: CommentService) { }

  removeComment(commentId: number) {
    this.onRemoveComment.emit(commentId)
  }

  async sendComment(data: any) {
    if(this.loggedInUser) {
      if (data.idToAdd) {
        await this.commentService.addComment({ txt: data.txt, idToAdd: data.idToAdd }, this.loggedInUser)
        //   this.sendCommentEvent.emit({ txt: data.txt, idToAdd: data.idToAdd })
        } else {
        await this.commentService.addComment({ txt: data.txt, idToAdd: this.IdToAddComment }, this.loggedInUser)
      //   this.sendCommentEvent.emit({ txt: data.txt, idToAdd: this.IdToAddComment })
      }
    }
  }

  editComment(comment: Comment) {
    this.commentIdToEdit = comment.id
    this.txt = comment.txt
  }

  async saveComment(comment: Comment) {
    comment.txt = this.txt
    comment.createdAt = new Date().toISOString()
    await this.commentService.saveComment(comment)
    this.commentIdToEdit = undefined
    this.txt = ''
  }

  changeIdToAdd(id: number) {
    if (this.IdToAddComment === id) {
      this.IdToAddComment = undefined
    } else {
      this.IdToAddComment = id
    }
  }

  ngOnInit(): void {
  }

}
