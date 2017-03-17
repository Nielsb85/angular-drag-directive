import {Directive, HostListener, OnInit, ElementRef} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';

@Directive({
    selector: '[appMyDrag]',

})
export class MyDragDirective implements OnInit {


    private mouseDown$: Observable<any>;
    private mouseMove$: Observable<any>;
    private mouseUp$: Observable<any>;
    private startMove$: Observable<any>;
    private touchStart$: Observable<any>;

    constructor(public element: ElementRef) {

        this.element.nativeElement.style.position = 'absolute';

        this.mouseDown$ = Observable.fromEvent(element.nativeElement, 'mousedown');
        this.touchStart$ = Observable.fromEvent(element.nativeElement, 'touchstart');
        this.mouseUp$ = Observable.fromEvent(element.nativeElement, 'mouseup');
        this.mouseMove$ = Observable.fromEvent(document, 'mousemove');

        this.startDrag();


    }

    ngOnInit() {
        this.startMove$.subscribe({
            next: pos => {
                this.element.nativeElement.style.top = pos.y + 'px';
                this.element.nativeElement.style.left = pos.x + 'px';
            }
        });


        this.mouseUp$.map(event => {


            console.log(this.element);

            let clientX = event.clientX,
                clientY = event.clientY,
                eot = this.element.nativeElement.offsetTop,
                eol = this.element.nativeElement.offsetLeft;


            console.log('clientX', clientX);
            console.log('clientY', clientY);
            console.log('eot', eot);
            console.log('eol', eol);


        }).subscribe();
    }


    startDrag() {

        this.startMove$ = this.mouseDown$
            .switchMap((event) => {
                console.log('move');
                const ox = event.target.offsetLeft,
                    oy = event.target.offsetTop,
                    omx = event.clientX,
                    omy = event.clientY;

                return this.mouseMove$.map(mmevent => {
                    return {
                        x: ox + (mmevent.clientX - omx),
                        y: oy + (mmevent.clientY - omy),
                    }
                }).takeUntil(this.mouseUp$);
            })

    }

}
