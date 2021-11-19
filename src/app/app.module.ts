import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommentsComponent } from './cmps/comments/comments.component';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { CommentEditComponent } from './cmps/comment-edit/comment-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    FormatTimePipe,
    CommentEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
