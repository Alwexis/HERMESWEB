import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BdService } from '../../services/bd.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  @Input('id') id: string = '';
  @Input('name') name: string = '';
  @Output('onClose') onClose = new EventEmitter<boolean>();
  loading: boolean = false;
  
  constructor(private _http: BdService) { }

  cancelDelete() {
    if (!this.loading) {
      this.onClose.emit(false);
    }
  }

  async deleteVocab() {
    this.loading = true;
    const response = await this._http.delete('/Diccionario/', this.id);
    console.log(response);
    this.onClose.emit(true);
    this.loading = false;
  }
}
