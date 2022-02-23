import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { articleSelectors } from 'src/app/store/selectors/article.selectors';
import { productAdSelectors } from 'src/app/store/selectors/product-ad.selectors';
import { forumSelectors } from 'src/app/store/selectors/forum.selectors';
import { NavigatorService } from 'src/app/services/navigator.service';
import { Article } from 'src/app/models/article.model';
import { Carousel } from 'primeng/carousel';
import { debounceTime, fromEvent, Subscription, tap } from 'rxjs';
import { ThemeSettingsStore } from 'src/app/store/theme-settings.state';
import { categorySelectors } from '../../../store/selectors/category.selectors';
import { LandingService } from '../service/landing.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('eventSlider')
  eventSlider!: Carousel;

  @ViewChild('articleSlider')
  articleSlider!: Carousel;

  @ViewChild('marketSlider')
  marketSlider!: Carousel;

  @ViewChild('multimediaSlider')
  multimediaSlider!: Carousel;

  subscription!: Subscription;

  responsiveOptions = [
    {
      breakpoint: '2000px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  multimedia$ = this.themeStore.featuredMultimedia$;

  productAds$ = this.store.select(productAdSelectors.all);
  highlights$ = this.themeStore.highlightArticlesArray$;
  featuredArticles$ = this.themeStore.featuredArticlesArray$;
  featuredEvents$ = this.themeStore.featuredEventsArray$;

  // forum$ = this.store.select(forumSelectors.getById(1));
  forumMetrics$ = this.themeStore.forumMetrics$;

  featuredCategories$ = this.themeStore.featuredCategoryArray$;

  digiLinks!: any;

  constructor(
    private store: Store,
    private navigator: NavigatorService,
    private themeStore: ThemeSettingsStore,
    private landingService: LandingService
  ) {}
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  ngAfterViewInit(): void {
    // this.startCarouselAutoplay(this.eventSlider, 15000);
    // this.startCarouselAutoplay(this.marketSlider, 7000);
    // this.startCarouselAutoplay(this.articleSlider, 8000);
    // this.startCarouselAutoplay(this.multimediaSlider, 8000);
    // event
    // this.subscription = this.getCarouselMouseEnterSubscription(
    //   this.eventSlider
    // );
    // articles
    // this.subscription.add(
    //   this.getCarouselMouseEnterSubscription(this.articleSlider)
    // );
    // this.subscription.add(
    //   this.getCarouselMouseLeaveSubscription(this.articleSlider, 8000)
    // );
    // this.subscription.add(
    //   this.getCarouselMouseLeaveSubscription(this.eventSlider, 15000)
    // );
    // market
    // this.subscription.add(
    //   this.getCarouselMouseEnterSubscription(this.marketSlider)
    // );
    // this.subscription.add(
    //   this.getCarouselMouseLeaveSubscription(this.marketSlider, 7000)
    // );
    // multimedia
    // this.subscription.add(
    //   this.getCarouselMouseEnterSubscription(this.multimediaSlider)
    // );
    // this.subscription.add(
    //   this.getCarouselMouseLeaveSubscription(this.multimediaSlider, 8000)
    // );
  }

  ngOnInit() {
    this.getDirectLinks();
  }

  goToArticle(article: Article) {
    this.navigator.article.goToViewDetailsPage(article.slug);
  }

  startCarouselAutoplay(carouselRef: Carousel, interval = 3000) {
    if (!carouselRef) return;
    carouselRef.allowAutoplay = true;
    carouselRef.autoplayInterval = interval;
    carouselRef.startAutoplay();
    carouselRef.cd.detectChanges();
  }

  stopCarouselAutoplay(carouselRef: Carousel) {
    if (!carouselRef) return;
    carouselRef.allowAutoplay = false;
    carouselRef.autoplayInterval = 0;
    carouselRef.stopAutoplay();
    carouselRef.cd.detectChanges();
  }

  getCarouselMouseEnterSubscription(carouselRef: Carousel) {
    return fromEvent(carouselRef.el.nativeElement, 'mouseenter')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.stopCarouselAutoplay(carouselRef);
      });
  }

  getCarouselMouseLeaveSubscription(carouselRef: Carousel, interval: number) {
    return fromEvent(this.eventSlider.el.nativeElement, 'mouseleave')
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.startCarouselAutoplay(carouselRef, interval);
      });
  }

  getDirectLinks() {
    this.landingService.getResources().subscribe(data => {
      this.digiLinks = data;
    });
  }
}
