import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getPostById } from '../state/post.selector';
import { Post } from 'src/app/data/models/post.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { updatePost } from '../state/post.action';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {

  postForm: FormGroup = this.fb.group({
    title: [null, [Validators.required, Validators.minLength(6)] ],
    description: [null, [Validators.required, Validators.minLength(10)] ]
  })

  post?: Post;
  postSubcription?: Subscription;

  constructor(
    private ar: ActivatedRoute,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private rt: Router
  ) { }


  ngOnInit(): void {
    this.ar.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.postSubcription = this.store.select(getPostById, { id }).subscribe((data) => {
        this.post = data;
        this.resetValuesForm();
      });
    })
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

  resetValuesForm() {
    this.postForm.reset({
      title: this.post?.title,
      description: this.post?.description
    })
  }

  onUpdatePost() {
    if (!this.postForm.valid) {
      this.postForm.markAllAsTouched();
      return;
    }
    const { title, description } = this.postForm.value;
    const post: Post = {
      id: this.post!.id,
      title,
      description
    };

    this.store.dispatch(updatePost({post}));
    this.rt.navigate(['post']);

  }

  ngOnDestroy(): void {
      if(this.postSubcription) this.postSubcription.unsubscribe();
  }
}
