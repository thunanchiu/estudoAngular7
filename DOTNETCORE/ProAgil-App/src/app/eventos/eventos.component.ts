import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { templateJitUrl } from '@angular/compiler';
import { Template } from '@angular/compiler/src/render3/r3_ast';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})

export class EventosComponent implements OnInit {

  eventos: Evento[] = [];
  evento: Evento;
  eventosFiltrados: Evento[] = [];
  imagemLargura = 50;
  imagemAltura = 2;
  mostrarImagem = false;
  _filtroLista: string;
  registerForm: FormGroup;

  constructor(
    private eventoService : EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localService: BsLocaleService
    ) { 
      this.localService.use('pt-br')
    }

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
  
  openModal(template: any){ 
    //Reseta o form   
    this.registerForm.reset();
    template.show();
  }

  openModalEditar(id: number, template: any){
    var eventoEditar = this.eventoService.getEventoById(id).subscribe(
      (novoEvento: Evento) => {
        //Faz copia do objeto novoEvento para evento
        this.evento = Object.assign({}, novoEvento);   
        this.openModal(template);
        //Preenche o modal
        this.registerForm.patchValue(this.evento);     
      }, error => {
        console.log(error);
      }
    );        
  }

  salvarAlteracao(template: any){
    if(this.registerForm.valid){
      this.evento = Object.assign({}, this.registerForm.value);
    this.eventoService.postEvento(this.evento).subscribe(
      (novoEvento: Evento) => {
        console.log(novoEvento);
        template.hide();
        this.getEventos();
      }, error => {
        console.log(error);
      }
      
    )      

    }
  }


  
  validation(){
    this.registerForm = this.fb.group({
    tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    local: ['', Validators.required],
    dataEvento: ['', Validators.required],
    qtdPessoas: ['', [Validators.required, Validators.max(50000)]], 
    telefone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    imagemURL: ['', Validators.required]
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

  getEvendo(id : number){
    this.eventoService.getEventoById(id).subscribe(
      (_evento: Evento) => {
        this.evento = _evento;        
      }, error => {
        console.log(error);
      }
    );
  }

}
