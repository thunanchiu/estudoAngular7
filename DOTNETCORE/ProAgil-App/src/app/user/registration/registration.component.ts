import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;

  constructor(public fb: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.validation();
  }

  validation(){
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required] 
      }, { validator: this.compararSenhas})
    });
  }

  compararSenhas(fb: FormGroup){
    //pega o componente confirmPassword por reactiveForm
    const confirmSenhaCtrl = fb.get('confirmPassword');
    const senha = fb.get('password');
    //verifica se o componente esta vazio ou esta de acordo com a validação colocada nele
    if(confirmSenhaCtrl.errors == null || 'mismatch' in confirmSenhaCtrl.errors){
      //Verifica se o valor de password é diferente do confirmPassword
      if(senha.value !== confirmSenhaCtrl.value){
        //seta o mismatch já que não possuem as mesmas senhas
        confirmSenhaCtrl.setErrors({ mismatch: true });
      }else{
        confirmSenhaCtrl.setErrors(null);
      }
    }

  }

  cadastrarUsuario(){
    console.log("Cadastrar usuário");
  }

}
