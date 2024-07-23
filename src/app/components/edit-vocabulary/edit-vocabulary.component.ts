import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BdService } from '../../services/bd.service';
import { FormsModule } from '@angular/forms';
import { Util } from '../../classes/util';

@Component({
  selector: 'app-edit-vocabulary',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-vocabulary.component.html',
  styleUrl: './edit-vocabulary.component.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EditVocabularyComponent implements OnInit {
  @Input('palabra') palabra: any;
  @Output('onClose') onClose = new EventEmitter<boolean>();
  palabraAEditar: any = {
    text: '',
    images: []
  };
  editingVocab: boolean = false;
  addingImages: boolean = false;

  constructor(private _bd: BdService) { }

  ngOnInit() {
    console.log(this.palabra);
    this.palabraAEditar.text = this.palabra.text.join(', ');
    this.palabraAEditar.images = this.palabra.images;
  }

  async editVocabulary() {
    if (this.editingVocab) return;
    if (this.palabraAEditar.text == '' || this.palabraAEditar.images.length < 1) return;
    this.editingVocab = true;
    this.palabraAEditar.text = this.palabraAEditar.text.split(',').map((content: string) => content.trim())
    console.log(this.palabraAEditar.text);
    let d: any;
    try {
      d = await this._bd.patch('/Diccionario/', this.palabra.id, this.palabraAEditar);
    } catch (e) { }
    this.palabraAEditar.text = '';
    this.palabraAEditar.images = [];
    this.editingVocab = false;
    this.onClose.emit(d);
  }

  async onFileChange(event: any) {
    if (this.addingImages) return;
    this.addingImages = true;
    const files = event.target.files;
    if (files) {
      this.palabraAEditar.images = []
      for (let file of files) {
        const base64 = await Util.convertToBase64(file as any);
        this.palabraAEditar.images.push(base64)
      }
    }
    this.addingImages = false;
  }

}
