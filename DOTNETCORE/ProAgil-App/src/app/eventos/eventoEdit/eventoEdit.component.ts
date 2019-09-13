import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/_services/evento.service';
import { BsModalService, BsLocaleService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/_models/Evento';
import { Router, ActivatedRoute } from '@angular/router';

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
  fileNameToUpDate: string;
  dataAtual ='';

  get lotes(): FormArray{
    return <FormArray>this.registerForm.get('lotes');
  }

  get redesSociais(): FormArray{
    return <FormArray>this.registerForm.get('redesSociais');
  }

  constructor(
    private eventoService: EventoService,
    private fb: FormBuilder,
    private localService: BsLocaleService,
    private toastr: ToastrService,
    private Router: ActivatedRoute
  ) {
    this.localService.use('pt-br')
  }

  ngOnInit() {
    this.validation();
    this.carregarEvento();
  }

  validation() {
    this.registerForm = this.fb.group({
      id: [],
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(50000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: [''],
      lotes: this.fb.array([]),
      redesSociais:  this.fb.array([])
    })
  }

  carregarEvento(){
    const idEvento = +this.Router.snapshot.paramMap.get('id');
    this.eventoService.getEventoById(idEvento).subscribe( 
      (evento: Evento) =>{
        debugger
        this.evento = Object.assign({}, evento);
        this.fileNameToUpDate = evento.imagemURL.toString();
        this.imagemURL = `http://localhost:5000/Resources/Images/${this.evento.imagemURL}?_ts=${this.dataAtual}`
        this.evento.imagemURL = '';     
        this.registerForm.patchValue(this.evento);

        this.evento.lotes.forEach(lote => {
          this.lotes.push(this.criaLote(lote));
        });
        this.evento.redesSociais.forEach(redeSocial => {
          this.redesSociais.push(this.criaRedesSociais(redeSocial));
        });
      }
    )
  }

  criaLote(lote: any): FormGroup{
    return this.fb.group({
      id: [lote.id],
      nome:[lote.nome, Validators.required],
      quantidade: [lote.qauntidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio, Validators.required],
      dataFim: [lote.dataFim, Validators.required]
    });
  }

  criaRedesSociais(redeSocial: any): FormGroup{
    return this.fb.group({
      id: [redeSocial.id],
      nome:[redeSocial.nome, Validators.required],
      url: [redeSocial.url, Validators.required],
    });
  }

  adicionarLote(){
    this.lotes.push(this.criaLote({ id: 0 }));
  }

  adicionarRedeSocial(){
    this.redesSociais.push(this.criaRedesSociais({ id: 0 }));
  }

  removerLote(id: number){
    this.lotes.removeAt(id)
  }

  removerRedeSocial(id: number){
    this.redesSociais.removeAt(id);
  }

  onFileChange(evento: any ,file: FileList){
    const reader = new FileReader();

    reader.onload = (event: any) => this.imagemURL = event.target.result;
    this.file = evento.target.files;
    reader.readAsDataURL(file[0]);
  }

  salvarEvento(){
    debugger
    this.evento = Object.assign({ eventoId: this.evento.eventoId }, this.registerForm.value);
    this.evento.imagemURL = this.fileNameToUpDate;
        this.uploadImagem();
        this.eventoService.putEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            console.log(novoEvento);
            this.toastr.success('Alterado com sucesso!') 
          }, error => {
            this.toastr.error('Erro ao tentar alterar.')
            console.log(error);
          }
        )
  }

  uploadImagem(){
    
    if(this.registerForm.get('imagemURL').value != ''){
      this.eventoService.postUpload(this.file, this.fileNameToUpDate)
      .subscribe(
        () => {
          this.dataAtual = new Date().getMilliseconds().toString();
          this.imagemURL = `http://localhost:5000/Resources/Images/${this.evento.imagemURL}?_ts=${this.dataAtual}`;
          
        }
      )
    }    

  }

}
