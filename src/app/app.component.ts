import { Component, OnInit } from '@angular/core';
import { Comment } from './interfaces/comment';
import { User } from './interfaces/user';
import { CommentService } from './services/comment.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: User[] = []
  comments: Comment[] = []
  data: any = []
  loggedInUser: User |undefined

  constructor(private userService: UserService, private commentService: CommentService) { }

  sortComments(comments: Comment[]) {
    return comments.sort((a: Comment, b: Comment) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
  }

  async sendComment(data: any) {
    if (this.loggedInUser) {
      const comments = await this.commentService.addComment(data, this.loggedInUser)
      this.setData(this.sortComments(comments))
    }
  }

  async removeComment(commentId: number) {
    const comments = await this.commentService.removeComment(commentId)
    this.setData(comments)
  }

  getComments(id: number, comments: any[]) {
    return comments.filter(comment => {
      if (comment.parentCommentId === id) {
        comment.comments = this.getComments(comment.id, comments)
        comment.user = this.users.find(user => user.id === comment.ownerId)
        return comment
      }
    })
  }

  changeUser(ev: any) {
    if (ev.target.value) {
      this.loggedInUser = this.users.find(user => user.id === +ev.target.value) || this.loggedInUser
    }
  }

  setData(comments: any[]) {
    this.data = []
    comments.forEach(comment => {
      if (!comment.parentCommentId) {
        this.data.push({
          id: comment.id,
          ownerId: comment.ownerId,
          txt: comment.txt,
          createdAt: comment.createdAt,
          user: this.users.find(user => user.id === comment.ownerId),
          comments: this.getComments(comment.id, comments)
        })
      }
    })
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users
    })
    this.commentService.getComments().subscribe((comments: Comment[]) => {
      this.setData(this.sortComments(comments))
    })
  }
}
