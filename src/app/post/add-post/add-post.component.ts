import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/data/models/post.model';
import { AppState } from '../../store/app.state';
import { addPost } from '../state/post.action';
import { Router } from '@angular/router';

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
    private store: Store<AppState>,
    private rt: Router
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
    };

    this.store.dispatch(addPost( {post} ));
    this.rt.navigate(['post']);
  }

}
