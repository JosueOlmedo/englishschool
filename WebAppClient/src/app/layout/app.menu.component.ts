import { AfterContentChecked, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styleUrls: ['./app.menu.component.scss']
})
export class AppMenuComponent implements AfterContentChecked {

    menus = [
        { label: 'Users', srcIconSvg: 'assets/img/users-solid.svg', srcIconSvgActive: 'assets/img/users-solid.svg', icon: '', routerLink: ['/users'], active: false, main: false },
        { label: 'My Learning', srcIconSvg: 'assets/img/chalkboard-user-solid.svg', srcIconSvgActive: 'assets/img/chalkboard-user-solid.svg',  icon: '', routerLink: ['/mylearning'], active: false, main: true },
        { label: 'Students', srcIconSvg: 'assets/img/book-open-reader-solid.svg', srcIconSvgActive: 'assets/img/book-open-reader-solid.svg', icon: '', routerLink: ['/students'], active: false, main: false },
        { label: 'Books', srcIconSvg: 'assets/img/book-open-reader-solid.svg', srcIconSvgActive: 'assets/img/book-open-reader-solid.svg', icon: '', routerLink: ['/books'], active: false, main: false },
        //{ label: 'Timeline', srcIconSvg: 'assets/img/timeline.svg', srcIconSvgActive: 'assets/img/timeline-active.svg', icon: 'fa-solid fa-timeline', routerLink: ['/timeline'], active: false, main: false },
        //{ label: 'Usuarios', srcIconSvg: 'assets/img/users-solid.svg', srcIconSvgActive: 'assets/img/users-solid.svg', routerLink: ['/useradmin'], active: false, main: false }
    ];

    constructor(private router: Router, public layoutService: LayoutService) { }

    ngAfterContentChecked() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.findActive();
            }
        });
        this.findActive();
    }

    private findActive() {
        this.menus.forEach(x => {
            x.active = false;
            if (x.routerLink[0] == this.router.url) {
                x.active = true;
            }
            else if(x.routerLink[0].includes('briefcase') && this.router.url.includes('briefcase')) {
                x.active = true;
            }
            if (this.router.url == '/') {
                this.menus.forEach(x => { 
                    x.active = false;
                    if (x.main) {
                        x.active = true;
                    }
                });

            }
        });
    }
}
