import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { MarketPost } from '../../models/market-post.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigatorService } from 'src/app/services/navigator.service';

@Component({
  selector: 'app-market-post-form',
  templateUrl: './market-post-form.component.html',
  styleUrls: ['./market-post-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketPostFormComponent implements OnInit {
  @ViewChild('imageUpload', { static: true })
  imageUploadComponent: ImageUploadComponent | null = null;

  price: number = 1;
  createForm = true;
  marketForm!: FormGroup;
  marketPost!: MarketPost;

  constructor(private fb: FormBuilder, private navigator: NavigatorService) {}

  ngOnInit() {
    this.marketForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      price: ['', [Validators.required]],
      brand: [''],
      product_type: ['', [Validators.required]],
      tags: [''],
      images: [],
    });
  }
  get tags() {
    return this.marketForm.get('tags') as FormControl;
  }
  get images() {
    return this.marketForm.get('images') as FormControl;
  }
  get postHasImage() {
    return this.images.value?.[0]?.image;
  }
  removeImage() {
    this.images.setValue([]);
  }
  onAddOrUpdateMarketPost() {}

  goBack() {
    this.navigator.goBack();
  }
}
