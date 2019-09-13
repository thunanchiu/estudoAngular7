import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/_services/evento.service';
import { BsModalService, BsLocaleService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/_models/Evento';

@Component({
  selector: 'app-evento-edit',
  templateUrl: './eventoEdit.component.html',
  styleUrls: ['./eventoEdit.component.css']
})
export class EventoEditComponent implements OnInit {

  registerForm: FormGroup;
  titulo = 'Editar Evento';  
  evento: Evento = new Evento;
  imagemURL = 'assets/img/download.png';
  file: File;

  get lotes(): FormArray{
    return <FormArray>this.registerForm.get('lotes');
  }

  get redesSociais(): FormArray{
    return <FormArray>this.registerForm.get('lotes');
  }

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
    this.validation();
  }

  validation() {
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(50000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: [''],
      lotes: this.fb.array([this.criaLote()]) ,
      redesSociais:  this.fb.array([this.criaRedesSociais()])
    })
  }

  criaLote(): FormGroup{
    return this.fb.group({
      nome:['', Validators.required],
      quantidade: ['', Validators.required],
      preco: ['', Validators.required],
      dataInicio: [''],
      dataFim: ['']
    });
  }

  criaRedesSociais(): FormGroup{
    return this.fb.group({
      nome:['', Validators.required],
      url: ['', Validators.required],
    });
  }

  adicionarLote(){
    this.lotes.push(this.criaLote());
  }

  adicionarRedeSocial(){
    this.redesSociais.push(this.criaRedesSociais());
  }

  removerLote(id: number){
    this.lotes.removeAt(id)
  }

  removerRedeSocial(id: number){
    this.redesSociais.removeAt(id);
  }

  onFileChange(file: FileList){
    const reader = new FileReader();

    reader.onload = (event: any) => this.imagemURL = event.target.result;

    reader.readAsDataURL(file[0]);
  }

}
