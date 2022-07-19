import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'calc-button',
  templateUrl: './calc-button.component.html',
  styleUrls: ['./calc-button.component.scss'],
})
export class CalcButtonComponent implements OnInit {
  @Input() display: string = ''
  @Input() secondaryDisplay: string = ''
  @Output() press: EventEmitter<string> = new EventEmitter()
  @Input() size: "small" | "medium" | "large" = "medium"
  @Input() color: "default" | "primary" | "secondary" | "tertiary"

  constructor() { }

  ngOnInit() {}

}
