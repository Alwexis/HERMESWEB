import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Output } from '@angular/core';
import { Util } from '../../classes/util';
import { FormsModule } from '@angular/forms';
import { BdService } from '../../services/bd.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'add-vocabulary',
  standalone: true,
  imports: [FormsModule, ToastComponent],
  templateUrl: './add-vocabulary.component.html',
  styleUrl: './add-vocabulary.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddVocabularyComponent {
  vocabulary: any = {
    images: [],
    text: ''
  }
  addingImages: boolean = false;
  addingVocab: boolean = false;
  toastData: any = {
    type: '',
    title: '',
    message: ''
  }

  constructor(private _bd: BdService) { }

  async createVocabulary() {
    if (this.addingVocab) return;
    if (this.vocabulary.text == '' || this.vocabulary.images.length < 1) return;
    this.addingVocab = true;
    this.vocabulary.text = this.vocabulary.text.split(',').map((content: string) => content.trim())
    console.log(this.vocabulary.text);
    try {
      await this._bd.post('/Diccionario/', this.vocabulary);
      this.toastData = {
        type: 'success',
        title: 'Exito',
        message: 'El vocabulario se ha agregado correctamente.'
      }
    } catch (e) {
      console.log(e);
      this.toastData = {
        type: 'error',
        title: 'Error',
        message: 'No se pudo agregar el vocabulario.'
      }
    }
    this.vocabulary.text = '';
    this.vocabulary.images = [];
    this.addingVocab = false;
    setTimeout(() => {
      if (this.toastData.type != '') {
        this.toastData = {
          type: '',
          title: '',
          message: ''
        }
      }
    }, 3000);
  }

  async onFileChange(event: any) {
    if (this.addingImages) return;
    this.addingImages = true;
    const files = event.target.files;
    if (files) {
      this.vocabulary.images = []
      for (let file of files) {
        const base64 = await Util.convertToBase64(file as any);
        this.vocabulary.images.push(base64)
      }
    }
    this.addingImages = false;
  }
}
