import { CUSTOM_ELEMENTS_SCHEMA, Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { BdService } from '../../services/bd.service';
import { DeleteComponent } from '../delete/delete.component';
import { ViewContainerRef } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';
import { EditVocabularyComponent } from '../edit-vocabulary/edit-vocabulary.component';

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
  dataToIterate: any;
  loading: boolean = true;
  characters: string[] = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
  activeChar: string = '';
  private _deleteComponent!: ComponentRef<DeleteComponent> | null;
  private _toastComponent!: ComponentRef<ToastComponent> | null;
  private _editVocabComponent!: ComponentRef<EditVocabularyComponent> | null;

  constructor(private _bd: BdService, private _viewContainerRef: ViewContainerRef) { }

  async ngOnInit() {
    this.data = await this._bd.get('/Diccionario/');
    this.dataToIterate = this.data;
    this.sortData();
    this.loading = false;
    this._bd.onPost.subscribe((data: any) => {
      console.log(data);
      this.data.push(data[0]);
      if (this.activeChar != '' && data[0].text[0].toLowerCase().startsWith(this.activeChar)) {
        this.dataToIterate.push(data[0]);
      }
      this.showToast("Agregado", "Se agregó exitosamente el Vocabulario.", 'success');
    });
    this._bd.onDelete.subscribe((id: any) => {
      this.data = this.data.filter((e: any) => e.id != id);
      this.dataToIterate = this.data;
      this.showToast("Eliminado", "Se eliminó correctamente el Vocabulario.", 'warning');
    });
    this._bd.onPut.subscribe((data: any) => {
      console.log(data);
      this.data = this.data.filter((e: any) => e.id != data.id);
      this.data.push(data);
      this.dataToIterate = this.data;
      this.sortData();
      this.showToast("Editado", "Se editó correctamente el Vocabulario.", 'success');
    });
  }

  sortData() {
    this.dataToIterate.sort((a: any, b: any) => {
      // return a.text[0].localeCompare(b.text[0]);
      const textA = a.text[0].replace(/\s/g, '').toLowerCase();
      const textB = b.text[0].replace(/\s/g, '').toLowerCase();
      return textA.localeCompare(textB);
    });
  }

  getWordCount(filtered: boolean) {
    if (filtered) {
      return this.data.filter((word: any) => word.text[0].toLowerCase().startsWith(this.activeChar)).length;
    }
    return this.data.length;
  }

  filterData(char: string) {
    if (this.loading) return;
    this.loading = true;
    if (this.activeChar == char) {
      this.activeChar = '';
      this.dataToIterate = this.data;
      this.loading = false;
    } else {
      this.activeChar = char;
      this.dataToIterate = this.data.filter((vocab: any) => vocab.text[0].toLowerCase().startsWith(char));
      this.loading = false;
    }
  }

  delete(id: string, name: string) {
    this._deleteComponent = this._viewContainerRef.createComponent(DeleteComponent);
    this._deleteComponent.instance.id = id;
    this._deleteComponent.instance.name = name;
    this._deleteComponent.instance.onClose.subscribe((d: any) => this.deleteComponentClose(d))
  }

  deleteComponentClose(deleted: boolean) {
    this._deleteComponent?.destroy();
    this._deleteComponent = null;
    if (deleted) {
      this.sortData();
    }
  }

  edit(palabra: any) {
    this._editVocabComponent = this._viewContainerRef.createComponent(EditVocabularyComponent);
    this._editVocabComponent.instance.palabra = palabra;
    this._editVocabComponent.instance.onClose.subscribe((d: any) => this.editComponentClose(d));
  }

  editComponentClose(data: any) {
    this._editVocabComponent?.destroy();
    this._editVocabComponent = null;
    if (data instanceof Object) {
      console.log("Object edited.");
    }
  }

  showToast(title: string, message: string, type: 'error' | 'success' | 'warning') {
    this._toastComponent = this._viewContainerRef.createComponent(ToastComponent);
    this._toastComponent.instance.message = message;
    this._toastComponent.instance.title = title;
    this._toastComponent.instance.type = type;
    this._toastComponent.instance.onToastClosed.subscribe(() => this._toastComponent?.destroy())
  }
}
