import { CUSTOM_ELEMENTS_SCHEMA, Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { BdService } from '../../services/bd.service';
import { DeleteComponent } from '../delete/delete.component';
import { ViewContainerRef } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';

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
  characters: string[] = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
  private _deleteComponent!: ComponentRef<DeleteComponent> | null;
  private _toastComponent!: ComponentRef<ToastComponent> | null;

  constructor(private _bd: BdService, private _viewContainerRef: ViewContainerRef) { }

  async ngOnInit() {
    this.data = await this._bd.get('/Diccionario/');
    this.sortData();
    this._bd.onPost.subscribe((data: any) => {
      this.data.push(data[0]);
      this.showToast("Agregado", "Se agregó exitosamente el Vocabulario.", 'success');
    });
    this._bd.onDelete.subscribe((id: any) => {
      this.data = this.data.filter((e: any) => e.id != id);
      this.showToast("Eliminado", "Se eliminó correctamente el Vocabulario.", 'warning');
    });
  }

  sortData() {
    this.data.sort((a: any, b: any) => {
      // return a.text[0].localeCompare(b.text[0]);
      const textA = a.text[0].replace(/\s/g, '').toLowerCase();
      const textB = b.text[0].replace(/\s/g, '').toLowerCase();
      return textA.localeCompare(textB);
    });
  }

  delete(id: string, name: string) {
    this._deleteComponent = this._viewContainerRef.createComponent(DeleteComponent);
    this._deleteComponent.instance.id = id;
    this._deleteComponent.instance.name = name;
    this._deleteComponent.instance.onClose.subscribe((d: any) => this.deleteComponentClose(d))
  }

  deleteComponentClose(deleted: boolean) {
    if (deleted) {
      this._deleteComponent?.destroy();
      this._deleteComponent = null;
      this.sortData();
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
