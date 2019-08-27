import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})

export class EventosComponent implements OnInit {

  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];
  imagemLargura = 50;
  imagemAltura = 2;
  mostrarImagem = false;
  modalRef: BsModalRef;
  _filtroLista: string;
  registerForm: FormGroup;

  constructor(
    private eventoService : EventoService,
    private modalService: BsModalService
    ) { }

    ngOnInit() {
      this.getEventos();
      this.validation();
    }
  

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }
  
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  salvarAlteracao(){

  }
  
  validation(){
    this.registerForm = new FormGroup({
    tema: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    local: new FormControl('', Validators.required),
    dataEvento: new FormControl('', Validators.required),
    qtdPessoas: new FormControl('', [Validators.required, Validators.max(50000)]), 
    telefone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    imagemURL: new FormControl('', Validators.required)
    })
  }  

  filtrarEventos(filtrarPor: string): Evento[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
  }

  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

  getEventos(){
    this.eventoService.getAllEvento().subscribe(
      (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = _eventos;
      }, error => {
        console.log(error);
      }
    );
  }

}
