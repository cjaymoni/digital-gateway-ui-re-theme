import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private titleService: Title, private meta: Meta) {}

  generateTags(tags: any) {
    tags = {
      title: 'MSME Gateway',
      description: 'The MSME helper',
      image: '',
      slug: '',
      type: 'article',
      ...tags,
    };

    this.titleService.setTitle(tags.title);

    // twitter meta tags
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:site', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: tags.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: tags.description,
    });
    this.meta.updateTag({
      name: 'twitter:text:description',
      content: tags.description,
    });
    this.meta.updateTag({ name: 'twitter:image:src', content: tags.image });

    // meta tags
    this.meta.updateTag({ name: 'og:type', content: tags.type });
    this.meta.updateTag({ name: 'og:site_name', content: 'summary' });
    this.meta.updateTag({ name: 'og:title', content: tags.title });
    this.meta.updateTag({ name: 'og:description', content: tags.description });
    this.meta.updateTag({ name: 'og:image', content: tags.image });
    this.meta.updateTag({ name: 'og:image:alt', content: tags.title });

    this.meta.updateTag({ name: 'og:image.width', content: '1200' });
    this.meta.updateTag({ name: 'og:image.height', content: '600' });
    this.meta.updateTag({ name: 'og:type', content: 'object' });
  }

  setURL(url: string) {
    this.meta.updateTag({ name: 'og:url', content: url });
  }
}
