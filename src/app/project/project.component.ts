import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Project} from '../models/project';

@Component({
  /* tslint:disable */ selector: '[app-project]', /* tslint:enable */
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  @Input() canEdit: boolean;
  @Input() isEditing: boolean;
  @Output() beginEdit = new EventEmitter();
  @Output() endEdit = new EventEmitter<boolean>();
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.canEdit);
  }
}
