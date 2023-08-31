import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PostListComponent,
    AddPostComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule
  ],
  schemas: [],
})
export class PostModule { }
