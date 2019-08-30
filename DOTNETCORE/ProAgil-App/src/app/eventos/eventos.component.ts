import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
  modoSalvar = 'post';
  bodyDeletarEvento = '';
  titulo = "Eventos";
  file: File;

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localService: BsLocaleService,
    private toastr: ToastrService
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
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  openModal(template: any) {
    //Reseta o form   
    this.registerForm.reset();
    template.show();
  }

  openModalNovo(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  openModalEditar(id: number, template: any) {
    this.modoSalvar = 'put';
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

  deletarEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza quedeseja excluir o Evento: ${evento.tema} ?`;
  }

  confirmeDelete(template: any) {
    this.eventoService.delete(this.evento.eventoId).subscribe(
      () => {
        template.hide();
        this.getEventos();
        this.toastr.success('Deletado com sucesso!')       
        
      }, error => {
        this.toastr.error('Erro ao tentar deletar.')
        console.log(error);
      }
    )
  }

  onFileChenge(event){
    const reader = new FileReader();

    if(event.target.files && event.target.files.length){
      this.file = event.target.files;
    }
  }

  salvarAlteracao(template: any) {
    if (this.modoSalvar == 'post') {
      if (this.registerForm.valid) {
        this.evento = Object.assign({}, this.registerForm.value);
        this.eventoService.postEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            console.log(novoEvento);
            template.hide();
            this.getEventos();
            this.toastr.success('Salvo com sucesso!')  
          }, error => {
            this.toastr.error('Erro ao tentar salvar.')
            console.log(error);
          }
        )

      }
    } else {
      if (this.registerForm.valid) {
        this.evento = Object.assign({ eventoId: this.evento.eventoId }, this.registerForm.value);
        this.eventoService.putEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            console.log(novoEvento);
            template.hide();
            this.getEventos();
            this.toastr.success('Alterado com sucesso!') 
          }, error => {
            this.toastr.error('Erro ao tentar alterar.')
            console.log(error);
          }
        )

      }
    }


  }



  validation() {
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

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  getEventos() {
    this.eventoService.getAllEvento().subscribe(
      (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = _eventos;
      }, error => {
        console.log(error);
      }
    );
  }

  getEvendo(id: number) {
    this.eventoService.getEventoById(id).subscribe(
      (_evento: Evento) => {
        this.evento = _evento;
      }, error => {
        console.log(error);
      }
    );
  }

}
