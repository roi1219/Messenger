import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, of } from 'rxjs';
import { Comment } from '../interfaces/comment';
import { StorageService } from './storage.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  getComments() {
    if (this.storage.get('comments')) {
      return of(this.storage.get('comments'));
    } else {
      return this.http.get('assets/data/comments.json')
        .pipe(map((json: any) => {
          this.storage.set('comments', json);
          return json.sort((a: Comment, b: Comment) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          })
        }))
    }
  }

  addComment(data: any, loggedInUser: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getComments().subscribe((comments: Comment[]) => {
        const { idToAdd } = data
        const newComment: Comment = {
          id: comments.length + 1,
          parentCommentId: idToAdd,
          ownerId: loggedInUser.id,
          txt: data.txt,
          createdAt: new Date().toISOString(),
          deletedAt: null
        }
        comments.unshift(newComment);
        this.storage.set('comments', comments)
        resolve(comments)
      })
    })
  }

  saveComment(comment: Comment): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getComments().subscribe((comments: Comment[]) => {
        const index = comments.findIndex(c => c.id === comment.id)
        comments[index] = comment
        this.storage.set('comments', comments)
        resolve(comments)
      })
    })
  }

  removeComment(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getComments().subscribe((comments: Comment[]) => {
        const allIdsToRemove = this.removeChilds(id, comments)
        allIdsToRemove.push(id)
        comments = comments.filter(comment => !allIdsToRemove.includes(comment.id))
        this.storage.set('comments', comments)
        resolve(comments)
      })
    })
  }

  removeChilds(id: number | null, comments: Comment[]) {
    const ids = comments.reduce((acc: any, comment) => {
      if (comment.parentCommentId === id) {
        acc.push(comment.id)
      }
      return acc
    }, [])
    const allIds = ids.map((id: number) => {
      return this.removeChilds(id, comments)
    })
    return ids.concat(...allIds)
  }

}
