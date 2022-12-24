import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MathjaxModule } from 'mathjax-angular';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        MathjaxModule.forRoot({
            "config": {
                "loader": {
                    "load": ["output/svg", "[tex]/require", "[tex]/ams", "input/asciimath", "output/chtml", "ui/menu"]
                    // "load": ["input/asciimath", "output/chtml", "ui/menu"]
                },
                // "tex": {
                //   "inlineMath": [["$", "$"]],
                //   "packages": ["base", "require", "ams"]
                // },
                // "asciimath2jax": {
                //   "inlineMath": [["#", "#"]],
                //   "delimiters": [["#", "#"]],
                //   "packages": ["base", "require", "ams"]
                // },
                asciimath: {
                    delimiters: [['$', '$'], ['`', '`']]
                },
                "svg": { "fontCache": "global" }
            },
            // "src": "https://cdn.jsdelivr.net/npm/mathjax@3.0.0/es5/startup.js"
            "src": "https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js"
        })
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule {}
