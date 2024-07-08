import { Component } from '@angular/core';
import { AddVocabularyComponent } from '../../components/add-vocabulary/add-vocabulary.component';
import { ListVocabularyComponent } from '../../components/list-vocabulary/list-vocabulary.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [AddVocabularyComponent, ListVocabularyComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
