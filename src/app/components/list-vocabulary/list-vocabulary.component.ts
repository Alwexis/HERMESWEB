import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { BdService } from '../../services/bd.service';

@Component({
  selector: 'list-vocabulary',
  standalone: true,
  imports: [],
  templateUrl: './list-vocabulary.component.html',
  styleUrl: './list-vocabulary.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListVocabularyComponent implements OnInit {

  data: any;
  loading: boolean = true;

  constructor(private _bd: BdService) { }

  async ngOnInit() {
    this.data = await this._bd.get('/Diccionario');
    console.log(this.data);
    this._bd.onPost.subscribe((data: any) => {
      this.data.push(data[0]);
    });
  }
}
