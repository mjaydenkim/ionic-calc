import { Component, Input } from '@angular/core';

@Component({
  selector: 'status-indicator',
  templateUrl: './status-indicator.component.html',
  styleUrls: ['./status-indicator.component.scss'],
})
export class StatusIndicatorComponent {

  @Input() status: string

  constructor() { }

}
