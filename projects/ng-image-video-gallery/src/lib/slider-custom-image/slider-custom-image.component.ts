import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgImageSliderService } from './../ng-image-slider.service';
import { SliderService } from '../services/slider.service';

const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
    validFileExtensions = ['jpeg', 'jpg', 'gif', 'png'],
    validVideoExtensions = ['mp4'];
const vimeoRegExp = /\/\/(?:www.)?vimeo.com\/([0-9a-z-_]+)/i;

@Component({
    selector: 'custom-img',
    templateUrl: './slider-custom-image.component.html'
})
export class SliderCustomImageComponent implements OnChanges {
    YOUTUBE = 'youtube';
    IMAGE = 'image';
    VIDEO = 'video';
    VIMEO = 'vimeo';
    fileUrl: SafeResourceUrl = '';
    vimeoUrl: SafeResourceUrl = '';

    fileExtension = '';
    type = this.IMAGE;
    imageLoading:boolean = true;
    // @inputs
    @Input() showVideo: boolean = false;
    @Input() videoAutoPlay: boolean = false;
    @Input() showVideoControls: number = 1;
    @Input() currentImageIndex: number;
    @Input() imageIndex: number;
    @Input() speed: number = 1;
    @Input() imageUrl;
    @Input() isVideo = false;
    @Input() alt: String = '';
    @Input() title: String = '';
    @Input() direction: string = 'ltr';
    @Input() ratio: boolean = false;
    @Input() lazy: boolean = false;
    @Input() imgData;
    @Input() imgHeight;

    constructor(
        public imageSliderService: NgImageSliderService,
        private sanitizer: DomSanitizer,
        @Inject(DOCUMENT) document, private sliderService: SliderService) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.imageUrl
            && this.imageUrl
            && this.imageUrl
            && typeof (this.imageUrl) === 'string'
            && (
                (changes.imageUrl && changes.imageUrl.firstChange)
                ||
                (this.videoAutoPlay)
               )) {
            this.setUrl();
        }
    }

    setUrl() {
        const url = this.imageUrl;
        this.imageLoading = true;
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.fileExtension = url.split('.').pop().split(/\#|\?/)[0];
        if (this.imageSliderService.base64FileExtension(url)
        && (validFileExtensions.indexOf(this.imageSliderService.base64FileExtension(url).toLowerCase()) > -1 
        || validVideoExtensions.indexOf(this.imageSliderService.base64FileExtension(url).toLowerCase()) > -1)) {
            this.fileExtension = this.imageSliderService.base64FileExtension(url);
        }
        // verify for youtube url
        const match = url.match(youtubeRegExp);
        const matchVimeoUrl = url.match(vimeoRegExp);
        if (match && match[2].length === 11) {
            if (this.showVideo) {
                this.type = this.YOUTUBE;
                this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${'https://www.youtube.com/embed/'}${match[2]}${this.videoAutoPlay ? '?autoplay=1&enablejsapi=1' : '?autoplay=0&enablejsapi=1'}${'&controls='}${this.showVideoControls}`);
            } else {
                this.type = this.IMAGE;
                this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://img.youtube.com/vi/${match[2]}/0.jpg`);
            }
        } else if (matchVimeoUrl) {
            this.sliderService.getoEmbedResponse('https://vimeo.com/api/oembed.json?url=', url).subscribe(res=> {
          if (this.showVideo) {
            this.type = this.VIMEO;
            let vimeoVideoUrl = `${'https://player.vimeo.com/video/'}${res['video_id']}`;
            this.vimeoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vimeoVideoUrl);
        } else {
            this.type = this.IMAGE;
            this.vimeoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res['thumbnail_url']);
        }
      })
        }
        else if(url.indexOf('https://player.vimeo.com/video') !==-1){
            if (this.showVideo) {
                this.type = this.VIMEO;
                this.vimeoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            } else {
                this.type = this.IMAGE;
                this.vimeoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,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');
            }
        }
        else if (this.fileExtension && validFileExtensions.indexOf(this.fileExtension.toLowerCase()) > -1) {
            this.type = this.IMAGE;
        } else if (this.fileExtension && validVideoExtensions.indexOf(this.fileExtension.toLowerCase()) > -1) {
            this.type = this.VIDEO;
            if (this.videoAutoPlay && document.getElementById(`video_${this.imageIndex}`)) {
                const videoObj:any = document.getElementById(`video_${this.imageIndex}`);
                setTimeout(() => {
                    videoObj.play();
                }, this.speed * 1000);
            }
        }
    }

    videoClickHandler(event) {
        if (event && event.srcElement && !this.showVideoControls) {
            if (event.srcElement.paused) {
                event.srcElement.play();
            } else {
                event.srcElement.pause();
            }
        }
    }
}
