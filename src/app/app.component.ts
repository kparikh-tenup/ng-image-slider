import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgImageSliderModule, NgImageSliderComponent } from 'ng-image-slider';
import { HeroService } from "./hero.service";
import { SliderService } from 'projects/ng-image-video-gallery/src/lib/services/slider.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    @ViewChild('nav', {static: false}) ds: NgImageSliderComponent;
    title = 'Ng Image Slider';
    showSlider = true;

    sliderWidth: Number = 940;
    sliderImageWidth: Number = 250;
    sliderImageHeight: Number = 200;
    sliderArrowShow: Boolean = true;
    sliderInfinite: Boolean = false;
    sliderImagePopup: Boolean = true;
    sliderAutoSlide: Boolean = false;
    sliderSlideImage: Number = 1;
    sliderAnimationSpeed: any = 1;
    imageObject = [];
    slideOrderType:string = 'DESC';

    constructor(private heroService: HeroService,private sliderService: SliderService) {
        this.setImageObject();
    }

    ngOnInit() {
      }

    onChangeHandler() {
        this.setImageObject();
        this.showSlider = false;
        setTimeout(() => {
            this.showSlider = true;
        }, 10);
    }

    setImageObject() {
        this.imageObject.push({
                video: 'https://vimeo.com/411598677',
                title: 'video'
        })
        this.imageObject.push({
            video: 'https://www.youtube.com/watch?v=jLtQH93m4bQ'
        })
        this.imageObject.push({
            video: 'https://vimeo.com/channels/staffpicks/548847228'
        })
        this.imageObject.push({
            image: "https://i.picsum.photos/id/916/889/536.jpg?hmac=Vpy97Y1IPFVIZxWmh0O3p-hGT6dx1jKwIyY2gkz3kAw",
            title: 'Images',
            imageTitle: 'imageTitle Image',
            imageDescription: 'imageDescription imageDescription',
            description: 'titletitletitle title title title titletitletitle title title title titletitletitle title title title titletitletitle title title title titletitletitle title title title titletitletitle title title title titletitletitle title title title'
        })
        this.imageObject.push({
            image: "https://i.picsum.photos/id/916/889/536.jpg?hmac=Vpy97Y1IPFVIZxWmh0O3p-hGT6dx1jKwIyY2gkz3kAw",
            title: 'Images title',
            description: 'titletitletitle title title title titletitletitle title title title titletitletitle title title title titletitletitle title title title titletitletitle title title title titletitletitle title title title titletitletitle title title title'
        })
        this.imageObject.push({
            video: 'https://www.youtube.com/watch?v=p4qJ6r7J8_A&list=PLZnxqowr6IKjAKo3wmBBgjUgfFejvqho_'
        })
      //  console.log(this.imageObject)
    }

    imageOnClick(index) {
        console.log('index', index);
    }

    lightboxClose() {
        console.log('lightbox close')
    }

    arrowOnClick(event) {
        console.log('arrow click event', event);
    }

    lightboxArrowClick(event) {
        console.log('popup arrow click', event);
    }

    prevImageClick() {
        this.ds.prev();
    }

    nextImageClick() {
        this.ds.next();
    }
}
