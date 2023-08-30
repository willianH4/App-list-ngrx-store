import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/data/models/post.model';
import { AppState } from 'src/app/data/store-global/app.state';
import { addPost } from '../state/post.action';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  postForm: FormGroup = this.fb.group({
    title: [ null, [Validators.required, Validators.minLength(6)] ],
    description: [null, [Validators.required, Validators.minLength(10)] ]
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  invalidInput( campo: string ) {
    return this.postForm.get(campo)?.invalid && this.postForm.get(campo)?.touched;
  }

  get titleErrorMsg(): string {
    const errors = this.postForm.get('title')?.errors;
    if ( errors?.['required'] ) {
      return 'The title is required';
    } else if ( errors?.['minlength'] ) {
      return 'The title should min 6 characters';
    }
    return '';
  }

  get descriptionErrorMsg(): string {
    const errors = this.postForm.get('description')?.errors;
    if ( errors?.['required'] ) {
      return 'The description is required';
    } else if ( errors?.['minlength'] ) {
      return 'The description should min 10 characters';
    }
    return '';
  }

  onAddPost() {
    if (!this.postForm.valid) {
      this.postForm.markAllAsTouched();
      return;
    }
    const post:Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description
    }
    console.log(post);
    this.store.dispatch(addPost( {post} ));
  }

}
