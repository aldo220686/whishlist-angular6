import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import { DestinosApiClient } from '../models/destino-api-client.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers: [DestinosApiClient]
})
export class ListaDestinosComponent implements OnInit {

  @Output() ItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];
  /*destinos: DestinoViaje[];*/

  constructor(private destinosApiClient: DestinosApiClient) {
    this.ItemAdded = new EventEmitter();
    this.updates = [];
    this.destinosApiClient.subscribeOnChange((d: DestinoViaje) => {
      if (d != null) {
        this.updates.push('Se ha elegido a ', d.nombre);
      }
    });
  }

  ngOnInit() {
  }

  agregado(d: DestinoViaje) {
    this.destinosApiClient.add(d);
    this.ItemAdded.emit(d);

  }

  elegido(e: DestinoViaje) {
    /*this.destinosApiClient.getAll().forEach(x => x.setSelected(false));
    d.setSelected(true);*/
    this.destinosApiClient.elegir(e);
  }
}
  /*agregar (titulo: HTMLInputElement)	{
    console.log(titulo.value);
  }*/
