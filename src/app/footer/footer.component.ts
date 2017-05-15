import {
  AfterContentChecked, Component, NgZone, OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterContentChecked {
  @ViewChild('footer') footer: any;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    window.onresize = () => {
      this.layoutFooter();
    };
  }

  ngAfterContentChecked() {
    this.layoutFooter();
  }

  layoutFooter() {
    this.ngZone.runOutsideAngular(() => {
      this.footer.nativeElement.className = 'footer';
      const windowHeight = window.innerHeight;
      const footerTop = this.footer.nativeElement.offsetTop;
      const footerHeight = this.footer.nativeElement.clientHeight;
      if (footerTop + footerHeight < windowHeight) {
        this.footer.nativeElement.className = 'footer bottom-footer';
      } else {
        this.footer.nativeElement.className = 'footer';
      }
    });
  }

}
